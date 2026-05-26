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

  if (!supabaseEnabled || !supabase) {
    setLocalEmail(trimmed);
    return { ok: true };
  }

  if (!password || password.length < 6) {
    return { ok: false, error: "La contraseña debe tener al menos 6 caracteres" };
  }

  // First try: sign in. Supabase returns the same error for "user not found"
  // and "wrong password" ("Invalid login credentials"), so we fall through to
  // sign-up on any failure and let the user discover wrong passwords later.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: trimmed,
    password,
  });
  if (!signInError) return { ok: true };

  // Try sign-up.
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: trimmed,
    password,
  });
  if (signUpError) {
    // Bubble up the original sign-in error if sign-up also failed — it's more
    // likely the relevant one (wrong password on an existing account).
    return { ok: false, error: signInError.message || signUpError.message };
  }

  // If email confirmation is disabled in the project, signUp returns a
  // session straight away. Use it without an extra getSession() round-trip
  // (which can lose the session due to a race condition on first paint).
  if (signUpData.session) return { ok: true, signedUp: true };

  // Edge case: signUp succeeded but didn't return a session (some
  // Supabase configurations defer session creation). Try a normal sign-in
  // with the same credentials — works when the user was created without
  // requiring email confirmation, or when an admin pre-confirmed them.
  const { error: postSignUpSignInError } = await supabase.auth.signInWithPassword({
    email: trimmed,
    password,
  });
  if (!postSignUpSignInError) return { ok: true, signedUp: true };

  return {
    ok: false,
    signedUp: true,
    error:
      "Cuenta creada. Revisa tu correo para confirmar el acceso antes de iniciar sesión.",
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
export function useAuthUser(): AuthUser | null {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (supabaseEnabled && supabase) {
      // Initial read.
      supabase.auth.getUser().then(({ data }) => {
        const u: User | null = data?.user ?? null;
        setUser(u ? { userId: u.id, email: u.email ?? "" } : null);
      });
      // Subscribe.
      const sub = supabase.auth.onAuthStateChange((_event, session) => {
        const u = session?.user ?? null;
        setUser(u ? { userId: u.id, email: u.email ?? "" } : null);
      });
      cleanup = () => sub.data.subscription.unsubscribe();
    } else {
      // localStorage fallback.
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

  if (supabaseEnabled && supabase && user) {
    const { data, error } = await supabase
      .from("journey_progress")
      .select("challenge_id")
      .eq("user_id", user.userId);
    if (error) {
      console.warn("[supabase] fetchJourneyProgress failed", error.message);
      // Fall back to localStorage if the network call fails.
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

  if (supabaseEnabled && supabase && user) {
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
