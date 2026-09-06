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

  // Mensaje unico para los dos formatos del listado (tarjetas y tabla).
  const emptyState: React.ReactNode =
    loading && rows.length === 0 ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
        Cargando consultores…
      </>
    ) : filtered.length === 0 ? (
      rows.length === 0
        ? "Todavía no hay consultores con sesión de Supabase."
        : "Ningún consultor coincide con la búsqueda."
    ) : null;

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
        <code className="text-mbc-blue">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
        <code className="text-mbc-blue">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> y
        vuelve a desplegar.
      </Gate>
    );
  }

  if (!session.hasSession) {
    return (
      <Gate icon={LogIn} title="Necesitas una sesión real de Supabase">
        Entraste en modo local (sin contraseña), así que el navegador no tiene
        sesión con la base de datos. Vuelve al{" "}
        <Link href="/" className="text-mbc-blue font-bold hover:underline">
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
          <span className="mt-3 block text-[11px] text-mbc-blue">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/15 border border-success/40 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-success">
                Acceso administrador
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
              Panel de <span className="text-mbc-blue">Administración</span>
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
            className="self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel border border-surface-container text-sm font-bold text-on-surface hover:border-mbc-electric/50 disabled:opacity-60 transition-colors"
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
          className="w-full bg-surface border border-surface-container rounded-xl pl-11 pr-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-mbc-electric focus:ring-2 focus:ring-mbc-electric/20 transition-all"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-mbc-electric/40 bg-mbc-electric/10 px-4 py-3 text-sm text-mbc-blue"
        >
          No se pudo cargar la lista: {error}
        </div>
      )}

      {/* Listado de consultores.
          La tabla tiene 6 columnas y no baja de 820px, asi que en movil obliga
          a scroll horizontal y el nombre se pierde al desplazarse. Por debajo
          de md se cambia por tarjetas con los mismos datos. */}
      <section className="glass-panel rounded-3xl border border-surface-container overflow-hidden">
        {emptyState ? (
          <>
            <p className="md:hidden px-5 py-12 text-center text-on-surface-variant">
              {emptyState}
            </p>
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <tbody>
                  <EmptyRow>{emptyState}</EmptyRow>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <ul className="md:hidden divide-y divide-surface-container/50">
              {filtered.map((row) => (
                <ConsultantCard key={row.userId} row={row} />
              ))}
            </ul>

            <div className="hidden md:block overflow-x-auto">
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
                  {filtered.map((row) => (
                    <ConsultantTr key={row.userId} row={row} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
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

function progressTone(pct: number) {
  if (pct >= 100) return "bg-success";
  if (pct >= 50) return "bg-gradient-to-r from-mbc-electric to-mbc-sky";
  return "bg-mbc-electric/70";
}

function formatActivity(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ConsultantTr({ row }: { row: ConsultantRow }) {
  const pct = row.journey.percent;
  const tone = progressTone(pct);

  return (
    <tr className="border-b border-surface-container/50 last:border-0 hover:bg-surface-container/25 transition-colors">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="shrink-0 w-9 h-9 rounded-xl bg-mbc-electric/15 border border-mbc-electric/30 flex items-center justify-center text-[11px] font-bold text-mbc-blue">
            {row.initials}
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-on-surface truncate">
              {row.displayName}
              {row.role === "admin" && (
                <span className="ml-2 align-middle text-[9px] font-bold uppercase tracking-widest text-success border border-success/40 rounded px-1.5 py-0.5">
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
        {formatActivity(row.lastActivity)}
      </td>
    </tr>
  );
}

function ConsultantCard({ row }: { row: ConsultantRow }) {
  const pct = row.journey.percent;
  return (
    <li className="p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="shrink-0 w-9 h-9 rounded-xl bg-mbc-electric/15 border border-mbc-electric/30 flex items-center justify-center text-[11px] font-bold text-mbc-blue">
          {row.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-on-surface truncate">
            {row.displayName}
            {row.role === "admin" && (
              <span className="ml-2 align-middle text-[9px] font-bold uppercase tracking-widest text-success border border-success/40 rounded px-1.5 py-0.5">
                admin
              </span>
            )}
          </p>
          <p className="text-xs text-on-surface-variant truncate">{row.email}</p>
        </div>
        <span className="shrink-0 text-sm font-bold text-on-surface tabular-nums">
          {pct}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-surface-container overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ${progressTone(pct)}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-on-surface-variant">
        <div className="flex justify-between gap-2">
          <dt>Nivel</dt>
          <dd className="text-on-surface font-medium truncate">
            {careerLevelLabel(row.careerLevel)}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Retos</dt>
          <dd className="text-on-surface font-medium tabular-nums">
            {row.journey.challengesDone} / {TOTAL_CHALLENGES}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Semanas</dt>
          <dd className="text-on-surface font-medium tabular-nums">
            {row.journey.weeksDone} / {TOTAL_WEEKS}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Actividad</dt>
          <dd className="text-on-surface font-medium">{formatActivity(row.lastActivity)}</dd>
        </div>
      </dl>
    </li>
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
        <Icon className="w-4 h-4 text-mbc-blue" />
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
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-mbc-electric/15 border border-mbc-electric/30 flex items-center justify-center">
          <Icon className={`w-6 h-6 text-mbc-blue ${spin ? "animate-spin" : ""}`} />
        </div>
        <h1 className="text-xl font-bold text-on-surface mb-2">{title}</h1>
        <div className="text-sm text-on-surface-variant leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
