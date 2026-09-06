"use client";

/**
 * Capa de datos del Panel Admin.
 *
 * No hay backend: el panel usa el mismo cliente Supabase del navegador que el
 * resto de la app. Lo que decide si un admin ve las filas de todos es la
 * política RLS "admin lee todo" de `supabase/migrations/003_admin_role.sql`.
 * Si esa migración no se ha corrido, estas funciones devuelven listas vacías
 * (no fallan): RLS simplemente filtra todo lo ajeno.
 *
 * Ojo con el alcance de los datos: solo aparecen los consultores con sesión
 * REAL de Supabase. Quien entró sin contraseña quedó en localStorage y no
 * tiene fila en `profiles` (ver `signIn` en userStorage.ts).
 */

import { useCallback, useEffect, useState } from "react";
import { supabase, supabaseEnabled } from "@/lib/supabase";
import type { CareerLevel } from "@/lib/userStorage";
import { summarizeJourney, type JourneySummary } from "@/lib/journeyLevels";

export type UserRole = "consultor" | "admin";

export interface ConsultantRow {
  userId: string;
  email: string;
  /** display_name si existe; si no, se deriva de la parte local del correo. */
  displayName: string;
  initials: string;
  careerLevel: CareerLevel;
  maturityPercent: number;
  role: UserRole;
  createdAt: string | null;
  /** Avance del onboarding calculado con el catálogo de journeyLevels. */
  journey: JourneySummary;
  /** completed_at más reciente en journey_progress, o null si nunca marcó nada. */
  lastActivity: string | null;
}

// --- Sesión del admin ------------------------------------------------------

export interface AdminSession {
  loading: boolean;
  /** Supabase está configurado en este build. */
  supabaseReady: boolean;
  /** Hay sesión real de Supabase (no el modo localStorage sin contraseña). */
  hasSession: boolean;
  isAdmin: boolean;
  email: string | null;
  error: string | null;
}

const INITIAL_SESSION: AdminSession = {
  loading: true,
  supabaseReady: supabaseEnabled,
  hasSession: false,
  isAdmin: false,
  email: null,
  error: null,
};

/**
 * Resuelve si el usuario de la sesión actual es admin.
 *
 * Pregunta a `supabase.auth.getUser()` en vez de usar `useAuthUser()`: en modo
 * sin contraseña ese hook devuelve el correo como userId, y filtrar una
 * columna uuid por un correo revienta la consulta.
 */
export function useAdminSession(): AdminSession {
  const [state, setState] = useState<AdminSession>(INITIAL_SESSION);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      if (!supabaseEnabled || !supabase) {
        if (!cancelled) {
          setState({ ...INITIAL_SESSION, loading: false, supabaseReady: false });
        }
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user ?? null;
      if (!user) {
        if (!cancelled) {
          setState({
            loading: false,
            supabaseReady: true,
            hasSession: false,
            isAdmin: false,
            email: null,
            error: null,
          });
        }
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (cancelled) return;
      setState({
        loading: false,
        supabaseReady: true,
        hasSession: true,
        isAdmin: data?.role === "admin",
        email: user.email ?? null,
        // Si la columna `role` aún no existe, Supabase responde 42703. Se
        // reporta tal cual para que se vea que falta correr la migración 003.
        error: error?.message ?? null,
      });
    }

    void resolve();

    const sub = supabase?.auth.onAuthStateChange(() => {
      void resolve();
    });

    return () => {
      cancelled = true;
      sub?.data.subscription.unsubscribe();
    };
  }, []);

  return state;
}

// --- Lista de consultores --------------------------------------------------

interface ProfileRecord {
  id: string;
  email: string | null;
  display_name: string | null;
  display_initials: string | null;
  career_level: string | null;
  maturity_percent: number | null;
  role: string | null;
  created_at: string | null;
}

interface ProgressRecord {
  user_id: string;
  challenge_id: string;
  completed_at: string | null;
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? email;
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Trae todos los consultores visibles y les calcula el avance del onboarding.
 *
 * Son dos consultas y no un join: `journey_progress.user_id` referencia
 * `auth.users`, no `profiles`, así que PostgREST no puede anidar las tablas.
 * El cruce se hace en memoria — el universo son decenas de consultores, no
 * millones de filas.
 */
export async function fetchConsultants(): Promise<ConsultantRow[]> {
  if (!supabaseEnabled || !supabase) return [];

  const [profilesRes, progressRes] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "id, email, display_name, display_initials, career_level, maturity_percent, role, created_at"
      ),
    supabase.from("journey_progress").select("user_id, challenge_id, completed_at"),
  ]);

  if (profilesRes.error) throw new Error(profilesRes.error.message);
  if (progressRes.error) throw new Error(progressRes.error.message);

  const profiles = (profilesRes.data ?? []) as ProfileRecord[];
  const progress = (progressRes.data ?? []) as ProgressRecord[];

  const byUser = new Map<string, { ids: string[]; last: string | null }>();
  for (const row of progress) {
    const entry = byUser.get(row.user_id) ?? { ids: [], last: null };
    entry.ids.push(row.challenge_id);
    if (row.completed_at && (!entry.last || row.completed_at > entry.last)) {
      entry.last = row.completed_at;
    }
    byUser.set(row.user_id, entry);
  }

  const rows: ConsultantRow[] = profiles.map((p) => {
    const email = p.email ?? "";
    const displayName = p.display_name?.trim() || nameFromEmail(email) || email;
    const entry = byUser.get(p.id);

    return {
      userId: p.id,
      email,
      displayName,
      initials: p.display_initials?.trim() || initialsFrom(displayName),
      careerLevel: (p.career_level as CareerLevel) ?? "analyst",
      maturityPercent: p.maturity_percent ?? 0,
      role: p.role === "admin" ? "admin" : "consultor",
      createdAt: p.created_at,
      journey: summarizeJourney(entry?.ids ?? []),
      lastActivity: entry?.last ?? null,
    };
  });

  // Mayor avance primero; a igual avance, orden alfabético.
  rows.sort(
    (a, b) =>
      b.journey.percent - a.journey.percent ||
      a.displayName.localeCompare(b.displayName, "es")
  );
  return rows;
}

export interface ConsultantsState {
  rows: ConsultantRow[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/** Carga la lista y expone `refresh()` para el botón de recargar. */
export function useConsultants(enabled: boolean): ConsultantsState {
  const [rows, setRows] = useState<ConsultantRow[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setRows(await fetchConsultants());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { rows, loading, error, refresh };
}
