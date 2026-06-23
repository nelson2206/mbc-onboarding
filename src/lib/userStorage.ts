"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, supabaseEnabled } from "@/lib/supabase";

/**
 * Unified auth + per-user persistence layer.
 *
 * Two backends, same surface:
 * - Supabase (when NEXT_PUBLIC_SUPABASE_URL/ANON_KEY are set at build time):
 *   Supabase Auth for sessions, Postgres `journey_progress` table for state.
 *   Row-Level Security in the DB is what actually isolates users.
 * - localStorage (fallback): the email typed at "login" is stored locally
 *   and progress is namespaced under `mbc:journey-progress:<email>`.
 *
 * Components consume {@link useAuthUser} (rich object) or {@link useCurrentUser}
 * (just the email, kept for backward compat). Persistence uses
 * {@link fetchJourneyProgress} / {@link syncJourneyProgress}.
 */

// --- Legacy localStorage keys ----------------------------------------------

const CURRENT_USER_KEY = "mbc:current-user";
const JOURNEY_PROGRESS_NS = "mbc:journey-progress";
const STORAGE_EVENT = "mbc:user-storage";

export const GUEST_KEY = "__guest__";

function emit(detail: { key: string }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail }));
}

// --- Types -----------------------------------------------------------------

export interface AuthUser {
  /** Stable ID used as DB row / storage prefix. UUID under Supabase, lowercased email otherwise. */
  userId: string;
  email: string;
}

// --- localStorage helpers (used by fallback path) --------------------------

function getLocalEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY);
    return raw && raw.trim().length > 0 ? raw : null;
  } catch {
    return null;
  }
}

function setLocalEmail(email: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CURRENT_USER_KEY, email.trim().toLowerCase());
    emit({ key: CURRENT_USER_KEY });
  } catch {
    /* ignore */
  }
}

function clearLocalEmail() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CURRENT_USER_KEY);
    emit({ key: CURRENT_USER_KEY });
  } catch {
    /* ignore */
  }
}

// --- Auth API --------------------------------------------------------------

export interface SignInResult {
  ok: boolean;
  error?: string;
  /** True if the action created a new account (Supabase signUp). */
  signedUp?: boolean;
}

/**
 * Sign in with email + password. If Supabase is enabled and the credentials
 * don't match an existing user, this transparently signs the user up and
 * then signs them in. With Supabase disabled, we just store the email
 * locally (the password is ignored — demo mode).
 */
export async function signIn(email: string, password: string): Promise<SignInResult> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { ok: false, error: "Email requerido" };

  const hasRealPassword = password && password.length >= 6;

  // Frictionless path: no password → localStorage (no Supabase auth).
  // Guarantees zero auth errors for any email. Progress is per-device.
  if (!hasRealPassword || !supabaseEnabled || !supabase) {
    setLocalEmail(trimmed);
    return { ok: true };
  }

  // Real password provided → use Supabase for cross-device session.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: trimmed,
    password,
  });
  if (!signInError) return { ok: true };

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: trimmed,
    password,
  });
  if (signUpError) {
    return { ok: false, error: signInError.message || signUpError.message };
  }
  if (signUpData.session) return { ok: true, signedUp: true };

  const { error: retryError } = await supabase.auth.signInWithPassword({
    email: trimmed,
    password,
  });
  if (!retryError) return { ok: true, signedUp: true };

  return {
    ok: false,
    signedUp: true,
    error: "Cuenta creada. Revisa tu correo para confirmar el acceso antes de iniciar sesión.",
  };
}

export async function signOut(): Promise<void> {
  if (supabaseEnabled && supabase) {
    await supabase.auth.signOut();
  }
  clearLocalEmail();
}

// --- Auth React hooks ------------------------------------------------------

/**
 * Returns the active {@link AuthUser} (or null), reactive to sign-in/out and
 * cross-tab changes. Safe during SSR — returns null on first render and
 * hydrates after mount.
 */
/** Returns true if the string looks like a Supabase UUID (real auth session). */
function isSupabaseUUID(s: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}

export function useAuthUser(): AuthUser | null {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Helper: resolve localStorage user as fallback when Supabase has no session.
    function localFallback(): AuthUser | null {
      const email = getLocalEmail();
      return email ? { userId: email, email } : null;
    }

    if (supabaseEnabled && supabase) {
      // Initial read: prefer Supabase session, fall back to localStorage.
      supabase.auth.getUser().then(({ data }) => {
        const u: User | null = data?.user ?? null;
        setUser(u ? { userId: u.id, email: u.email ?? "" } : localFallback());
      });
      // Subscribe to Supabase auth changes.
      const sub = supabase.auth.onAuthStateChange((_event, session) => {
        const u = session?.user ?? null;
        setUser(u ? { userId: u.id, email: u.email ?? "" } : localFallback());
      });
      // Also react to frictionless localStorage sign-ins (no Supabase session).
      const onStorage = (e: StorageEvent) => {
        if (e.key === CURRENT_USER_KEY) setUser(localFallback());
      };
      const onCustom = (e: Event) => {
        const d = (e as CustomEvent<{ key: string }>).detail;
        if (d?.key === CURRENT_USER_KEY) setUser(localFallback());
      };
      window.addEventListener("storage", onStorage);
      window.addEventListener(STORAGE_EVENT, onCustom as EventListener);
      cleanup = () => {
        sub.data.subscription.unsubscribe();
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(STORAGE_EVENT, onCustom as EventListener);
      };
    } else {
      // Pure localStorage mode.
      const hydrate = () => {
        const email = getLocalEmail();
        setUser(email ? { userId: email, email } : null);
      };
      hydrate();
      const onStorage = (e: StorageEvent) => {
        if (e.key === CURRENT_USER_KEY) hydrate();
      };
      const onCustom = (e: Event) => {
        const d = (e as CustomEvent<{ key: string }>).detail;
        if (d?.key === CURRENT_USER_KEY) hydrate();
      };
      window.addEventListener("storage", onStorage);
      window.addEventListener(STORAGE_EVENT, onCustom as EventListener);
      cleanup = () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(STORAGE_EVENT, onCustom as EventListener);
      };
    }
    return () => cleanup?.();
  }, []);

  return user;
}

/** Backwards-compatible: returns just the email (or null) for components
 *  that don't need the user id. */
export function useCurrentUser(): string | null {
  return useAuthUser()?.email ?? null;
}

// --- Journey progress: DB-aware ---------------------------------------------

function progressKey(userKey: string): string {
  return `${JOURNEY_PROGRESS_NS}:${userKey}`;
}

function readLocalProgress(userKey: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(progressKey(userKey));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

function writeLocalProgress(userKey: string, ids: Iterable<string>) {
  if (typeof window === "undefined") return;
  try {
    const arr = Array.from(new Set(Array.from(ids).filter(Boolean)));
    window.localStorage.setItem(progressKey(userKey), JSON.stringify(arr));
    emit({ key: progressKey(userKey) });
  } catch {
    /* ignore */
  }
}

/**
 * Resolves the storage key to use for an auth user, including the guest
 * fallback when the user is not signed in (only valid when running on
 * localStorage). Returns null if Supabase is enabled and no user — there is
 * no anonymous storage in DB mode.
 */
export function progressUserKey(user: AuthUser | null): string | null {
  if (user) return user.userId;
  if (supabaseEnabled) return null; // no anonymous progress in DB mode
  return GUEST_KEY;
}

/** Load completed challenge IDs for the given user. */
export async function fetchJourneyProgress(user: AuthUser | null): Promise<string[]> {
  const key = progressUserKey(user);
  if (!key) return [];

  // Only hit Supabase DB for real Supabase sessions (UUID userId).
  // Frictionless users (email as userId) use localStorage.
  if (supabaseEnabled && supabase && user && isSupabaseUUID(user.userId)) {
    const { data, error } = await supabase
      .from("journey_progress")
      .select("challenge_id")
      .eq("user_id", user.userId);
    if (error) {
      console.warn("[supabase] fetchJourneyProgress failed", error.message);
      return readLocalProgress(key);
    }
    return (data ?? []).map((r) => r.challenge_id as string);
  }
  return readLocalProgress(key);
}

/**
 * Persist the full progress set, computing an insert/delete diff so we
 * minimise writes. Fire-and-forget from the UI's perspective; failures are
 * logged and silently fall back to localStorage.
 */
export async function syncJourneyProgress(
  user: AuthUser | null,
  ids: Iterable<string>
): Promise<void> {
  const key = progressUserKey(user);
  if (!key) return;
  const next = Array.from(new Set(Array.from(ids).filter(Boolean)));

  if (supabaseEnabled && supabase && user && isSupabaseUUID(user.userId)) {
    try {
      const { data } = await supabase
        .from("journey_progress")
        .select("challenge_id")
        .eq("user_id", user.userId);
      const current = new Set((data ?? []).map((r) => r.challenge_id as string));
      const toAdd = next.filter((id) => !current.has(id));
      const toDelete = Array.from(current).filter((id) => !next.includes(id));

      if (toAdd.length > 0) {
        await supabase.from("journey_progress").insert(
          toAdd.map((id) => ({ user_id: user.userId, challenge_id: id }))
        );
      }
      if (toDelete.length > 0) {
        await supabase
          .from("journey_progress")
          .delete()
          .eq("user_id", user.userId)
          .in("challenge_id", toDelete);
      }
    } catch (err) {
      console.warn("[supabase] syncJourneyProgress failed", err);
      writeLocalProgress(key, next);
    }
  } else {
    writeLocalProgress(key, next);
  }
}

// --- Career profile (career_level + maturity_percent) ----------------------

export type CareerLevel =
  | "analyst"
  | "consultant"
  | "senior_consultant"
  | "manager"
  | "senior_manager"
  | "partner";

export interface CareerProfile {
  career_level: CareerLevel;
  maturity_percent: number;
}

const DEFAULT_PROFILE: CareerProfile = {
  career_level: "analyst",
  maturity_percent: 0,
};

const PROFILE_NS = "mbc:profile";
const PROFILE_EVENT = "mbc:profile-update";

function profileLocalKey(userKey: string): string {
  return `${PROFILE_NS}:${userKey}`;
}

function readLocalProfile(userKey: string): CareerProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(profileLocalKey(userKey));
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      career_level: parsed.career_level ?? "analyst",
      maturity_percent:
        typeof parsed.maturity_percent === "number"
          ? Math.max(0, Math.min(100, parsed.maturity_percent))
          : 0,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function writeLocalProfile(userKey: string, profile: CareerProfile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(profileLocalKey(userKey), JSON.stringify(profile));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(PROFILE_EVENT));
    }
  } catch {
    /* ignore */
  }
}

export async function fetchProfile(user: AuthUser | null): Promise<CareerProfile> {
  if (!user) return DEFAULT_PROFILE;
  if (supabaseEnabled && supabase && isSupabaseUUID(user.userId)) {
    const { data, error } = await supabase
      .from("profiles")
      .select("career_level, maturity_percent")
      .eq("id", user.userId)
      .single();
    if (error || !data) return readLocalProfile(user.userId);
    return {
      career_level: (data.career_level as CareerLevel) ?? "analyst",
      maturity_percent: data.maturity_percent ?? 0,
    };
  }
  return readLocalProfile(user.userId);
}

export async function updateProfile(
  user: AuthUser | null,
  patch: Partial<CareerProfile>
): Promise<{ ok: boolean; error?: string }> {
  if (!user) return { ok: false, error: "No hay sesión" };
  const next: CareerProfile = {
    ...(await fetchProfile(user)),
    ...patch,
  };
  if (next.maturity_percent < 0) next.maturity_percent = 0;
  if (next.maturity_percent > 100) next.maturity_percent = 100;

  if (supabaseEnabled && supabase && isSupabaseUUID(user.userId)) {
    const { error } = await supabase
      .from("profiles")
      .update({
        career_level: next.career_level,
        maturity_percent: next.maturity_percent,
      })
      .eq("id", user.userId);
    if (error) {
      console.warn("[supabase] updateProfile failed", error.message);
      writeLocalProfile(user.userId, next);
      return { ok: false, error: error.message };
    }
    writeLocalProfile(user.userId, next); // mirror for fast reads
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(PROFILE_EVENT));
    }
    return { ok: true };
  }
  writeLocalProfile(user.userId, next);
  return { ok: true };
}

/** Reactive profile hook with cross-tab + same-tab event sync. */
export function useProfile(): { profile: CareerProfile; loading: boolean; refresh: () => Promise<void> } {
  const user = useAuthUser();
  const [profile, setProfile] = useState<CareerProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!user) {
      setProfile(DEFAULT_PROFILE);
      setLoading(false);
      return;
    }
    setLoading(true);
    const p = await fetchProfile(user);
    setProfile(p);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    function onUpdate() { refresh(); }
    if (typeof window !== "undefined") {
      window.addEventListener(PROFILE_EVENT, onUpdate);
      return () => window.removeEventListener(PROFILE_EVENT, onUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

  return { profile, loading, refresh };
}

/**
 * Niveles de carrera expuestos en esta herramienta de onboarding.
 * MBC tiene también Manager / Senior Manager / Partner, pero esta app cubre
 * sólo el equipo de consulta (Analyst → Sr Consultant). La meta del journey
 * es "Graduado MBC", no una promoción a Manager.
 */
export const CAREER_LEVELS: Array<{ id: CareerLevel; label: string; shortLabel: string }> = [
  { id: "analyst", label: "Analyst", shortLabel: "AN" },
  { id: "consultant", label: "Consultant", shortLabel: "CO" },
  { id: "senior_consultant", label: "Senior Consultant", shortLabel: "SC" },
];

export function careerLevelLabel(id: CareerLevel): string {
  return CAREER_LEVELS.find((l) => l.id === id)?.label ?? id;
}

export function careerLevelShort(id: CareerLevel): string {
  return CAREER_LEVELS.find((l) => l.id === id)?.shortLabel ?? "??";
}

/**
 * Allowed discrete maturity values for the lower levels. Per the carrera
 * Management de MBC, Analyst / Consultant / Senior Consultant only have 4
 * grados de madurez: 25%, 50%, 75% y 100%. Manager onwards keep the slider
 * continuous because their evaluation is more granular.
 */
export const DISCRETE_MATURITY: Partial<Record<CareerLevel, number[]>> = {
  analyst: [25, 50, 75, 100],
  consultant: [25, 50, 75, 100],
  senior_consultant: [25, 50, 75, 100],
};

export function maturityStepsFor(level: CareerLevel): number[] | null {
  return DISCRETE_MATURITY[level] ?? null;
}

/** Snap an arbitrary maturity value to the nearest valid step for the level. */
export function snapMaturity(level: CareerLevel, value: number): number {
  const steps = maturityStepsFor(level);
  if (!steps) return Math.max(0, Math.min(100, Math.round(value)));
  // Find nearest step
  let best = steps[0];
  let bestDist = Math.abs(value - best);
  for (const s of steps) {
    const d = Math.abs(value - s);
    if (d < bestDist) {
      best = s;
      bestDist = d;
    }
  }
  return best;
}
