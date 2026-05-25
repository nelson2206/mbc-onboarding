"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe key/value persistence for the demo onboarding app.
 *
 * The site is a fully static export deployed to GitHub Pages — there is no
 * backend, so "per-user" persistence is just localStorage keyed by the email
 * captured at sign-in.
 *
 * - `currentUser` holds the active email (or null when signed out).
 * - Per-user state lives under `<namespace>:<email>` so multiple emails in the
 *   same browser keep independent progress.
 * - Mutations dispatch a `mbc:user-storage` CustomEvent so other components in
 *   the same tab can re-read; the standard `storage` event handles other tabs.
 */

const CURRENT_USER_KEY = "mbc:current-user";
const JOURNEY_PROGRESS_NS = "mbc:journey-progress";
const STORAGE_EVENT = "mbc:user-storage";

function emit(detail: { key: string }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail }));
}

export const GUEST_KEY = "__guest__";

export function getCurrentUser(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY);
    return raw && raw.trim().length > 0 ? raw : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(email: string): void {
  if (typeof window === "undefined") return;
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return;
  try {
    window.localStorage.setItem(CURRENT_USER_KEY, trimmed);
    emit({ key: CURRENT_USER_KEY });
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearCurrentUser(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CURRENT_USER_KEY);
    emit({ key: CURRENT_USER_KEY });
  } catch {
    /* ignore */
  }
}

function progressKey(userKey: string): string {
  return `${JOURNEY_PROGRESS_NS}:${userKey}`;
}

export function getJourneyProgress(userKey: string): string[] {
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

export function setJourneyProgress(userKey: string, ids: Iterable<string>): void {
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
 * React hook that returns the current signed-in email (or null), kept in sync
 * with both same-tab mutations (via CustomEvent) and other tabs (via `storage`).
 *
 * Returns `null` on the first render (SSR/SSG) and hydrates after mount, which
 * avoids hydration mismatches in the static export.
 */
export function useCurrentUser(): string | null {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());

    function onStorage(event: StorageEvent) {
      if (event.key === CURRENT_USER_KEY) {
        setUser(event.newValue && event.newValue.trim().length > 0 ? event.newValue : null);
      }
    }
    function onCustom(event: Event) {
      const detail = (event as CustomEvent<{ key: string }>).detail;
      if (detail?.key === CURRENT_USER_KEY) {
        setUser(getCurrentUser());
      }
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener(STORAGE_EVENT, onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STORAGE_EVENT, onCustom as EventListener);
    };
  }, []);

  return user;
}
