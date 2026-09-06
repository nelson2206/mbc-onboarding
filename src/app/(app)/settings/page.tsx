"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Check,
  AlertCircle,
  Loader2,
  LockKeyhole,
  TrendingUp,
} from "lucide-react";
import {
  CAREER_LEVELS,
  CareerLevel,
  fetchProfile,
  updateProfile,
  useAuthUser,
  maturityStepsFor,
  snapMaturity,
} from "@/lib/userStorage";

export default function SettingsPage() {
  const user = useAuthUser();
  const [level, setLevel] = useState<CareerLevel>("analyst");
  const [maturity, setMaturity] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchProfile(user).then((p) => {
      if (cancelled) return;
      setLevel(p.career_level);
      setMaturity(snapMaturity(p.career_level, p.maturity_percent));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [user]);

  // When level changes, snap the maturity into the allowed range for that level
  function selectLevel(next: CareerLevel) {
    setLevel(next);
    setMaturity((m) => snapMaturity(next, m));
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    const result = await updateProfile(user, {
      career_level: level,
      maturity_percent: maturity,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error ?? "No se pudo guardar");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="glass-panel rounded-3xl p-8 text-center border border-surface-container">
          <div className="w-14 h-14 rounded-2xl bg-mbc-electric/10 border border-mbc-electric/30 mx-auto mb-4 flex items-center justify-center">
            <LockKeyhole className="w-7 h-7 text-mbc-blue" />
          </div>
          <h1 className="text-2xl font-bold text-on-surface mb-2">Configuración</h1>
          <p className="text-sm text-on-surface-variant">
            Inicia sesión para gestionar tu cargo y porcentaje de madurez.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 animate-in fade-in duration-500 space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4">
          <Settings className="w-4 h-4 text-mbc-blue" />
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Configuración</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
          Mi <span className="text-mbc-blue">perfil</span> profesional
        </h1>
        <p className="text-base text-on-surface-variant max-w-2xl">
          Estos datos alimentan tu HUD del Journey, el Dashboard y el plan de carrera. Solo tú los puedes editar.
        </p>
      </header>

      {loading ? (
        <div className="glass-panel rounded-3xl p-12 border border-surface-container flex items-center justify-center gap-3 text-on-surface-variant">
          <Loader2 className="w-5 h-5 animate-spin" />
          Cargando perfil...
        </div>
      ) : (
        <>
          {/* Cargo actual */}
          <section className="glass-panel rounded-3xl p-6 md:p-8 border border-surface-container">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-on-surface mb-1">Cargo actual</h2>
              <p className="text-sm text-on-surface-variant">
                Selecciona tu categoría en la carrera Management de MBC.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CAREER_LEVELS.map((c) => {
                const selected = c.id === level;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectLevel(c.id)}
                    className={`relative rounded-2xl border p-4 text-left transition-all ${
                      selected
                        ? "border-mbc-electric bg-mbc-electric/10 ai-glow"
                        : "border-surface-container hover:border-mbc-electric/30 hover:bg-surface-container/30"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {c.shortLabel}
                    </span>
                    <p className={`mt-1 text-sm font-bold ${selected ? "text-mbc-blue" : "text-on-surface"}`}>
                      {c.label}
                    </p>
                    {selected && (
                      <Check className="absolute top-3 right-3 w-4 h-4 text-mbc-blue" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* % de madurez */}
          <MaturitySection level={level} maturity={maturity} setMaturity={setMaturity} />

          {/* Save */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-on-surface-variant">
              Guardado seguro vía Supabase · solo tú puedes leer estos datos (RLS).
            </p>
            <div className="flex items-center gap-3">
              {error && (
                <span className="flex items-center gap-2 text-xs text-mbc-blue bg-mbc-electric/10 border border-mbc-electric/30 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4" /> {error}
                </span>
              )}
              {saved && (
                <span className="flex items-center gap-2 text-xs text-success bg-success/10 border border-success/30 rounded-lg px-3 py-2">
                  <Check className="w-4 h-4" /> Guardado
                </span>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="bg-mbc-electric-strong hover:bg-mbc-sky disabled:opacity-60 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface MaturitySectionProps {
  level: CareerLevel;
  maturity: number;
  setMaturity: (n: number) => void;
}

function MaturitySection({ level, maturity, setMaturity }: MaturitySectionProps) {
  const steps = maturityStepsFor(level);
  const isDiscrete = steps !== null;
  const promoted = maturity >= 100;
  const subtitle = isDiscrete
    ? "En esta categoría sólo aplican 4 grados de madurez: 25%, 50%, 75% y 100%."
    : "Cuánto te queda para promocionar a la siguiente categoría. Suele venir de tu mentor en cada evaluación semestral.";

  return (
    <section className="glass-panel rounded-3xl p-6 md:p-8 border border-surface-container">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface mb-1">% de madurez en el cargo</h2>
          <p className="text-sm text-on-surface-variant">{subtitle}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-3xl font-bold text-mbc-blue">{maturity}%</div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            {promoted ? "Listo para promoción" : "En desarrollo"}
          </p>
        </div>
      </div>

      {isDiscrete ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {steps!.map((s) => {
            const selected = s === maturity;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setMaturity(s)}
                className={`relative rounded-2xl border p-4 text-center transition-all ${
                  selected
                    ? "border-mbc-electric bg-mbc-electric/10 ai-glow"
                    : "border-surface-container hover:border-mbc-electric/30 hover:bg-surface-container/30"
                }`}
              >
                <p className={`text-2xl font-bold ${selected ? "text-mbc-blue" : "text-on-surface"}`}>
                  {s}%
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  {s === 100 ? "Listo" : s === 75 ? "Avanzado" : s === 50 ? "Sólido" : "Inicial"}
                </p>
                {selected && (
                  <Check className="absolute top-2 right-2 w-4 h-4 text-mbc-blue" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-3">
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={maturity}
            onChange={(e) => setMaturity(parseInt(e.target.value, 10))}
            className="flex-1 accent-[#147aff]"
            aria-label="Porcentaje de madurez"
          />
          <input
            type="number"
            min={0}
            max={100}
            value={maturity}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              if (Number.isNaN(n)) return;
              setMaturity(Math.max(0, Math.min(100, n)));
            }}
            className="w-20 bg-surface-container/40 border border-surface-container rounded-lg px-3 py-2 text-sm text-on-surface text-right"
          />
        </div>
      )}

      {/* Visual bar */}
      <div className="h-3 bg-surface-container rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-mbc-electric via-mbc-sky to-success"
          initial={{ width: 0 }}
          animate={{ width: `${maturity}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant">
        <TrendingUp className="w-3.5 h-3.5" />
        {isDiscrete
          ? "Al alcanzar 100% optas a promoción en la siguiente evaluación."
          : "95% es el umbral típico para optar a promoción."}
      </div>
    </section>
  );
}
