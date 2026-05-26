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
      setMaturity(p.maturity_percent);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [user]);

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
          <div className="w-14 h-14 rounded-2xl bg-electric-rose/10 border border-electric-rose/30 mx-auto mb-4 flex items-center justify-center">
            <LockKeyhole className="w-7 h-7 text-electric-rose" />
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
          <Settings className="w-4 h-4 text-electric-rose" />
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Configuración</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
          Mi <span className="text-electric-rose">perfil</span> profesional
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
                    onClick={() => setLevel(c.id)}
                    className={`relative rounded-2xl border p-4 text-left transition-all ${
                      selected
                        ? "border-electric-rose bg-electric-rose/10 ai-glow"
                        : "border-surface-container hover:border-electric-rose/30 hover:bg-surface-container/30"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {c.shortLabel}
                    </span>
                    <p className={`mt-1 text-sm font-bold ${selected ? "text-electric-rose" : "text-on-surface"}`}>
                      {c.label}
                    </p>
                    {selected && (
                      <Check className="absolute top-3 right-3 w-4 h-4 text-electric-rose" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* % de madurez */}
          <section className="glass-panel rounded-3xl p-6 md:p-8 border border-surface-container">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-on-surface mb-1">% de madurez en el cargo</h2>
                <p className="text-sm text-on-surface-variant">
                  Cuánto te queda para promocionar a la siguiente categoría. Suele venir de tu mentor en cada evaluación semestral.
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-bold text-electric-rose">{maturity}%</div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  {maturity >= 95 ? "Listo para promoción" : "En desarrollo"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={maturity}
                onChange={(e) => setMaturity(parseInt(e.target.value, 10))}
                className="flex-1 accent-[#FF0054]"
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

            {/* Visual bar */}
            <div className="h-3 bg-surface-container rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-rose via-primary to-tertiary"
                initial={{ width: 0 }}
                animate={{ width: `${maturity}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant">
              <TrendingUp className="w-3.5 h-3.5" /> 95% es el umbral típico para optar a promoción.
            </div>
          </section>

          {/* Save */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-on-surface-variant">
              Guardado seguro vía Supabase · solo tú puedes leer estos datos (RLS).
            </p>
            <div className="flex items-center gap-3">
              {error && (
                <span className="flex items-center gap-2 text-xs text-electric-rose bg-electric-rose/10 border border-electric-rose/30 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4" /> {error}
                </span>
              )}
              {saved && (
                <span className="flex items-center gap-2 text-xs text-tertiary bg-tertiary/10 border border-tertiary/30 rounded-lg px-3 py-2">
                  <Check className="w-4 h-4" /> Guardado
                </span>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="bg-electric-rose hover:bg-primary disabled:opacity-60 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors flex items-center gap-2"
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
