"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client wrapper.
 *
 * Supabase is enabled when both NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY are set at build time (via GitHub Actions
 * secrets). When they're missing — e.g. local dev with no .env, or a fork
 * that hasn't configured Supabase — the rest of the app falls back to the
 * localStorage-only behavior so the demo keeps working.
 *
 * The anon key is safe to ship to the browser: Row-Level Security on the
 * Postgres side is what actually gates access. See supabase/README.md for
 * the SQL policies that enforce per-user isolation.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/** Storage bucket where user-uploaded documents live. */
export const DOCUMENTS_BUCKET = "documents";
