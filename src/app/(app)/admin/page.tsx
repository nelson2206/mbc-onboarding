"use client";

/**
 * Panel Admin · Fase 1
 *
 * Lista de consultores con su avance de onboarding, calculado desde
 * `journey_progress` con los pesos en XP de `journeyLevels`.
 *
 * Sobre la "protección por rol": el bloqueo que hay aquí es de UX, no de
 * seguridad. Esto es un export estático servido por GitHub Pages, así que
 * cualquiera puede pedir /admin y descargarse el JS. Lo que de verdad protege
 * los datos es RLS: sin `role = 'admin'` en `profiles`, Supabase devuelve
 * exactamente cero filas ajenas por más que se fuerce la vista.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  TrendingUp,
  GraduationCap,
  Search,
  RefreshCw,
  Loader2,
  LogIn,
  Database,
  Info,
} from "lucide-react";
import { useAdminSession, useConsultants, type ConsultantRow } from "@/lib/adminData";
import { careerLevelLabel } from "@/lib/userStorage";
import { TOTAL_CHALLENGES, TOTAL_WEEKS } from "@/lib/journeyLevels";
import { FadeIn } from "@/components/motion/Motion";

export default function AdminPage() {
  const session = useAdminSession();
  const { rows, loading, error, refresh } = useConsultants(session.isAdmin);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.displayName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const kpis = useMemo(() => {
    if (rows.length === 0) return { total: 0, avg: 0, graduados: 0, sinIniciar: 0 };
    const sum = rows.reduce((a, r) => a + r.journey.percent, 0);
    return {
      total: rows.length,
      avg: Math.round(sum / rows.length),
      graduados: rows.filter((r) => r.journey.percent >= 100).length,
      sinIniciar: rows.filter((r) => r.journey.challengesDone === 0).length,
    };
  }, [rows]);

  // --- Estados de acceso ---------------------------------------------------

  if (session.loading) {
    return (
      <Gate icon={Loader2} spin title="Verificando permisos…">
        Comprobando tu rol contra Supabase.
      </Gate>
    );
  }

  if (!session.supabaseReady) {
    return (
      <Gate icon={Database} title="Supabase no está configurado en este build">
        El panel necesita datos reales. Define{" "}
        <code className="text-electric-rose">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
        <code className="text-electric-rose">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> y
        vuelve a desplegar.
      </Gate>
    );
  }

  if (!session.hasSession) {
    return (
      <Gate icon={LogIn} title="Necesitas una sesión real de Supabase">
        Entraste en modo local (sin contraseña), así que el navegador no tiene
        sesión con la base de datos. Vuelve al{" "}
        <Link href="/" className="text-electric-rose font-bold hover:underline">
          login
        </Link>{" "}
        e inicia sesión con tu correo <strong>y contraseña</strong>.
      </Gate>
    );
  }

  if (!session.isAdmin) {
    return (
      <Gate icon={ShieldAlert} title="No tienes acceso al panel de administración">
        Tu cuenta ({session.email}) está registrada como consultor. Para acceder,
        un administrador debe ejecutar en el SQL Editor de Supabase:
        <code className="mt-3 block rounded-lg bg-surface-container/60 p-3 text-left text-[11px] leading-relaxed text-on-surface">
          update public.profiles set role = &#39;admin&#39; where email =
          &#39;{session.email}&#39;;
        </code>
        {session.error && (
          <span className="mt-3 block text-[11px] text-electric-rose">
            Detalle técnico: {session.error} — puede que falte correr la migración{" "}
            <code>003_admin_role.sql</code>.
          </span>
        )}
      </Gate>
    );
  }

  // --- Panel ---------------------------------------------------------------

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">
      <FadeIn>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/15 border border-tertiary/40 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary">
                Acceso administrador
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
              Panel de <span className="text-electric-rose">Administración</span>
            </h1>
            <p className="text-on-surface-variant max-w-2xl">
              Avance de onboarding por consultor. El porcentaje usa los mismos
              pesos en XP que ve cada persona en su Journey.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel border border-surface-container text-sm font-bold text-on-surface hover:border-electric-rose/50 disabled:opacity-60 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </button>
        </header>
      </FadeIn>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={Users} label="Consultores" value={String(kpis.total)} />
        <Kpi icon={TrendingUp} label="Avance promedio" value={`${kpis.avg}%`} />
        <Kpi
          icon={GraduationCap}
          label="Journey completo"
          value={String(kpis.graduados)}
        />
        <Kpi icon={Info} label="Sin empezar" value={String(kpis.sinIniciar)} />
      </div>

      {/* Buscador */}
      <div className="relative max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o correo…"
          className="w-full bg-surface border border-surface-container rounded-xl pl-11 pr-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-electric-rose focus:ring-2 focus:ring-electric-rose/20 transition-all"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-electric-rose/40 bg-electric-rose/10 px-4 py-3 text-sm text-electric-rose"
        >
          No se pudo cargar la lista: {error}
        </div>
      )}

      {/* Tabla */}
      <section className="glass-panel rounded-3xl border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-surface-container text-left">
                <Th>Consultor</Th>
                <Th>Nivel</Th>
                <Th className="w-[240px]">Avance onboarding</Th>
                <Th className="text-center">Retos</Th>
                <Th className="text-center">Semanas</Th>
                <Th>Última actividad</Th>
              </tr>
            </thead>
            <tbody>
              {loading && rows.length === 0 ? (
                <EmptyRow>
                  <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                  Cargando consultores…
                </EmptyRow>
              ) : filtered.length === 0 ? (
                <EmptyRow>
                  {rows.length === 0
                    ? "Todavía no hay consultores con sesión de Supabase."
                    : "Ningún consultor coincide con la búsqueda."}
                </EmptyRow>
              ) : (
                filtered.map((row) => <ConsultantTr key={row.userId} row={row} />)
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-on-surface-variant leading-relaxed max-w-3xl">
        <strong className="text-on-surface">Alcance de estos datos:</strong> aquí
        solo aparecen los consultores que iniciaron sesión con correo{" "}
        <em>y contraseña</em>. Quien entra con los botones de acceso rápido queda
        en modo local y su avance no llega a la base de datos. Las notas de
        evaluaciones aún no se persisten y llegan en la Fase 2.
      </p>
    </div>
  );
}

// --- Piezas de UI ----------------------------------------------------------

function ConsultantTr({ row }: { row: ConsultantRow }) {
  const pct = row.journey.percent;
  const tone =
    pct >= 100
      ? "bg-tertiary"
      : pct >= 50
      ? "bg-gradient-to-r from-electric-rose to-primary"
      : "bg-electric-rose/70";

  return (
    <tr className="border-b border-surface-container/50 last:border-0 hover:bg-surface-container/25 transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="shrink-0 w-9 h-9 rounded-xl bg-electric-rose/15 border border-electric-rose/30 flex items-center justify-center text-[11px] font-bold text-electric-rose">
            {row.initials}
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-on-surface truncate">
              {row.displayName}
              {row.role === "admin" && (
                <span className="ml-2 align-middle text-[9px] font-bold uppercase tracking-widest text-tertiary border border-tertiary/40 rounded px-1.5 py-0.5">
                  admin
                </span>
              )}
            </span>
            <span className="block text-xs text-on-surface-variant truncate">
              {row.email}
            </span>
          </span>
        </div>
      </td>

      <td className="px-5 py-4 whitespace-nowrap text-on-surface-variant">
        {careerLevelLabel(row.careerLevel)}
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 rounded-full bg-surface-container overflow-hidden">
            <div
              className={`h-full rounded-full transition-[width] duration-700 ${tone}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-11 text-right text-xs font-bold text-on-surface tabular-nums">
            {pct}%
          </span>
        </div>
      </td>

      <td className="px-5 py-4 text-center text-on-surface-variant tabular-nums whitespace-nowrap">
        {row.journey.challengesDone} / {TOTAL_CHALLENGES}
      </td>

      <td className="px-5 py-4 text-center text-on-surface-variant tabular-nums whitespace-nowrap">
        {row.journey.weeksDone} / {TOTAL_WEEKS}
      </td>

      <td className="px-5 py-4 whitespace-nowrap text-on-surface-variant">
        {row.lastActivity
          ? new Date(row.lastActivity).toLocaleDateString("es-PE", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—"}
      </td>
    </tr>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${className}`}
    >
      {children}
    </th>
  );
}

function EmptyRow({ children }: { children: React.ReactNode }) {
  return (
    <tr>
      <td colSpan={6} className="px-5 py-12 text-center text-on-surface-variant">
        {children}
      </td>
    </tr>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-panel rounded-2xl border border-surface-container p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-electric-rose" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          {label}
        </span>
      </div>
      <p className="text-3xl font-bold text-on-surface tabular-nums">{value}</p>
    </div>
  );
}

function Gate({
  icon: Icon,
  title,
  spin = false,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  spin?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-lg mx-auto py-24">
      <div className="glass-panel rounded-3xl border border-surface-container p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-electric-rose/15 border border-electric-rose/30 flex items-center justify-center">
          <Icon className={`w-6 h-6 text-electric-rose ${spin ? "animate-spin" : ""}`} />
        </div>
        <h1 className="text-xl font-bold text-on-surface mb-2">{title}</h1>
        <div className="text-sm text-on-surface-variant leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
