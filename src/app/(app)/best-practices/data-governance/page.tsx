"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Lock,
  RotateCcw,
  Sparkles,
  Tag,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import {
  DATA_GOVERNANCE_CURRICULUM as CURR,
  type Modulo,
} from "@/lib/dataGovernanceCurriculum";

// ---------------------------------------------------------------------------
// Persistencia de progreso (localStorage con fallback en memoria)
// ---------------------------------------------------------------------------

const STORE_KEY = "mbc_dg_academy_progress";
const LAST_KEY = "mbc_dg_academy_last";

interface ModProgress {
  completed: boolean;
  score: number;
  total: number;
  pct: number;
}
type ProgressMap = Record<string, ModProgress>;

function loadProgress(): ProgressMap {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}
function saveProgress(p: ProgressMap) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(p));
  } catch {
    /* no-op */
  }
}

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------

const PASS = CURR.meta.aprobacion; // 0.6
const MODS = CURR.modulos;

export default function DataGovernanceAcademyPage() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [selectedId, setSelectedId] = useState<string>(MODS[0].id);
  const [hydrated, setHydrated] = useState(false);

  // Cargar progreso al montar (evita mismatch SSR/CSR)
  useEffect(() => {
    setProgress(loadProgress());
    try {
      const last = window.localStorage.getItem(LAST_KEY);
      if (last && MODS.some((m) => m.id === last)) setSelectedId(last);
    } catch {
      /* no-op */
    }
    setHydrated(true);
  }, []);

  const selectIndex = useMemo(
    () => Math.max(0, MODS.findIndex((m) => m.id === selectedId)),
    [selectedId]
  );
  const current = MODS[selectIndex];

  // Gating: un módulo está desbloqueado si es el primero o si el anterior se completó
  function isUnlocked(i: number): boolean {
    if (!hydrated) return i === 0; // antes de hidratar, solo el primero
    if (i === 0) return true;
    const prev = MODS[i - 1];
    return !!progress[prev.id]?.completed;
  }

  function selectModule(id: string) {
    setSelectedId(id);
    try {
      window.localStorage.setItem(LAST_KEY, id);
    } catch {
      /* no-op */
    }
    if (typeof document !== "undefined") {
      document.getElementById("dg-module-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function recordResult(mod: Modulo, correct: number, total: number) {
    const pct = Math.round((correct / total) * 100);
    const passed = correct / total >= PASS;
    setProgress((prev) => {
      const old = prev[mod.id];
      const next: ProgressMap = { ...prev };
      if (!old || pct >= old.pct) {
        next[mod.id] = {
          completed: passed || !!old?.completed,
          score: correct,
          total,
          pct,
        };
      }
      if (passed) next[mod.id] = { ...next[mod.id], completed: true };
      saveProgress(next);
      return next;
    });
  }

  function resetAll() {
    if (!window.confirm("¿Reiniciar todo tu progreso de la academia? No se puede deshacer.")) return;
    setProgress({});
    saveProgress({});
    setSelectedId(MODS[0].id);
  }

  // Stats globales
  const totalMods = MODS.length;
  const doneMods = MODS.filter((m) => progress[m.id]?.completed).length;
  const pctGlobal = totalMods ? Math.round((doneMods / totalMods) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto py-10 animate-in fade-in duration-500 space-y-8">
      {/* Volver */}
      <Link
        href="/best-practices"
        className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-electric-rose transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Best Practices
      </Link>

      {/* HERO */}
      <header className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4">
          <GraduationCap className="w-4 h-4 text-electric-rose" />
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface">
            Data · Data Governance Academy
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-on-surface mb-3">
          Gobierno del Dato <span className="text-electric-rose">de cero a profundidad</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-3xl mx-auto">
          {CURR.meta.subtitulo}. Un programa de {totalMods} módulos con lectura, terminología
          propia de Minsait y quizzes con feedback. Completa cada día para desbloquear el siguiente.
        </p>
      </header>

      {/* PROGRESO GLOBAL */}
      <section className="glass-panel rounded-3xl p-6 border border-surface-container">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Tu avance
              </p>
              <p className="text-xs font-bold text-on-surface">
                {doneMods} / {totalMods} módulos · {pctGlobal}%
              </p>
            </div>
            <div className="h-2.5 rounded-full bg-surface-container overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-tertiary to-electric-rose"
                initial={{ width: 0 }}
                animate={{ width: `${pctGlobal}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-surface-container text-xs font-bold text-on-surface-variant hover:border-electric-rose/40 hover:text-electric-rose transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reiniciar progreso
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6" id="dg-module-top">
        {/* NAVEGACIÓN DE MÓDULOS */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-5 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto custom-scrollbar pr-1">
          {CURR.meta.bloques.map((bloque) => {
            const mods = MODS.map((m, i) => ({ m, i })).filter(({ m }) => m.bloque === bloque.id);
            if (!mods.length) return null;
            return (
              <div key={bloque.id}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-electric-rose mb-2 px-1">
                  {bloque.nombre}
                </p>
                <div className="space-y-1.5">
                  {mods.map(({ m, i }) => {
                    const unlocked = isUnlocked(i);
                    const p = progress[m.id];
                    const isActive = m.id === selectedId;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        disabled={!unlocked}
                        onClick={() => unlocked && selectModule(m.id)}
                        className={`w-full text-left rounded-2xl border p-3 flex items-center gap-3 transition-all ${
                          isActive
                            ? "border-electric-rose ai-glow glass-panel"
                            : unlocked
                            ? "border-surface-container hover:border-electric-rose/30 glass-panel"
                            : "border-surface-container opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <span className="text-lg shrink-0 w-7 text-center">{m.icono}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                            Día {m.dia}
                          </span>
                          <span
                            className={`block text-xs font-medium leading-tight truncate ${
                              isActive ? "text-electric-rose" : "text-on-surface"
                            }`}
                          >
                            {m.titulo}
                          </span>
                        </span>
                        {!unlocked ? (
                          <Lock className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                        ) : p?.completed ? (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-tertiary shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {p.pct}%
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </aside>

        {/* CONTENIDO DEL MÓDULO */}
        <ModuleView
          key={current.id}
          mod={current}
          index={selectIndex}
          progress={progress[current.id]}
          onResult={recordResult}
          onNext={() => {
            const ni = selectIndex + 1;
            if (ni < MODS.length) selectModule(MODS[ni].id);
          }}
          hasNext={selectIndex + 1 < MODS.length}
        />
      </div>

      {/* CIERRE */}
      <section className="text-center pb-8">
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass-panel border border-electric-rose/30">
          <Sparkles className="w-5 h-5 text-electric-rose" />
          <span className="text-sm text-on-surface">
            Material vivo basado en DAMA-DMBOK2 + metodología Minsait ·{" "}
            <a href="mailto:mbcresearch@minsait.com" className="font-bold text-electric-rose hover:underline">
              MBC Research →
            </a>
          </span>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Vista de un módulo: lectura + términos + Minsait + quiz
// ---------------------------------------------------------------------------

interface ModuleViewProps {
  mod: Modulo;
  index: number;
  progress?: ModProgress;
  onResult: (mod: Modulo, correct: number, total: number) => void;
  onNext: () => void;
  hasNext: boolean;
}

function ModuleView({ mod, index, progress, onResult, onNext, hasNext }: ModuleViewProps) {
  // respuestas seleccionadas por pregunta (índice de opción)
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [graded, setGraded] = useState(false);

  // Reset al cambiar de módulo
  useEffect(() => {
    setAnswers({});
    setGraded(false);
  }, [mod.id]);

  const total = mod.quiz.length;
  const correct = mod.quiz.reduce(
    (acc, q, qi) => acc + (answers[qi] === q.respuesta ? 1 : 0),
    0
  );
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const passed = total ? correct / total >= PASS : false;

  function grade() {
    setGraded(true);
    onResult(mod, correct, total);
    if (typeof document !== "undefined") {
      setTimeout(
        () => document.getElementById("dg-quiz-result")?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
        60
      );
    }
  }

  function retry() {
    setAnswers({});
    setGraded(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 min-w-0"
    >
      {/* Cabecera */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-surface-container relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-tertiary to-electric-rose opacity-20 blur-3xl" />
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            {mod.icono} Día {mod.dia} · {mod.area}
            {mod.tiempo ? ` · ${mod.tiempo}` : ""}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-4">{mod.titulo}</h2>
          {mod.objetivos?.length > 0 && (
            <div className="rounded-2xl bg-surface-container/30 border border-surface-container p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 flex items-center gap-1">
                <Target className="w-3 h-3 text-electric-rose" /> Objetivos de aprendizaje
              </p>
              <ul className="space-y-1.5">
                {mod.objetivos.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-on-surface">
                    <ChevronRight className="w-4 h-4 text-electric-rose shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Secciones de lectura */}
      {mod.secciones.map((s) => (
        <section key={s.h} className="glass-panel rounded-2xl p-6 border border-surface-container">
          <h3 className="text-lg font-bold text-on-surface mb-3">{s.h}</h3>
          <div className="dg-prose text-sm text-on-surface-variant" dangerouslySetInnerHTML={{ __html: s.html }} />
        </section>
      ))}

      {/* Términos clave */}
      {mod.terminos?.length > 0 && (
        <Section title="Términos clave" eyebrow="Glosario" icon={Tag}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mod.terminos.map((t) => (
              <div key={t.t} className="glass-panel rounded-2xl p-4 border border-surface-container">
                <p className="text-sm font-bold text-electric-rose mb-1">{t.t}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{t.d}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Nota Minsait */}
      {mod.minsait && (
        <section className="rounded-3xl p-6 border border-electric-rose/30 bg-gradient-to-br from-electric-rose/10 to-tertiary/5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-electric-rose mb-2">
            Minsait Business Consulting
          </p>
          <div className="dg-prose text-sm text-on-surface" dangerouslySetInnerHTML={{ __html: mod.minsait }} />
        </section>
      )}

      {/* Quiz */}
      {mod.quiz?.length > 0 && (
        <Section
          title="Comprueba lo aprendido"
          eyebrow="Quiz"
          icon={GraduationCap}
          subtitle={`Marca una opción por pregunta. Necesitas ${Math.round(PASS * 100)}% para aprobar y desbloquear el siguiente día.`}
        >
          <div className="space-y-4">
            {mod.quiz.map((q, qi) => {
              const chosen = answers[qi];
              return (
                <div key={qi} className="glass-panel rounded-2xl p-5 border border-surface-container">
                  <p className="text-sm font-bold text-on-surface mb-3 flex gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-electric-rose text-white text-xs shrink-0">
                      {qi + 1}
                    </span>
                    <span>{q.q}</span>
                  </p>
                  <div className="space-y-2">
                    {q.opciones.map((op, oi) => {
                      const isChosen = chosen === oi;
                      const isCorrect = oi === q.respuesta;
                      let cls =
                        "border-surface-container hover:border-electric-rose/30 cursor-pointer";
                      if (graded) {
                        if (isCorrect) cls = "border-tertiary bg-tertiary/10";
                        else if (isChosen) cls = "border-electric-rose bg-electric-rose/10";
                        else cls = "border-surface-container opacity-70";
                      } else if (isChosen) {
                        cls = "border-electric-rose bg-electric-rose/5";
                      }
                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={graded}
                          onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                          className={`w-full text-left flex items-center gap-3 rounded-xl border p-3 transition-all ${cls}`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                              isChosen ? "border-electric-rose" : "border-on-surface-variant/40"
                            }`}
                          >
                            {isChosen && <span className="w-2 h-2 rounded-full bg-electric-rose" />}
                          </span>
                          <span className="text-sm text-on-surface">{op}</span>
                          {graded && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-tertiary ml-auto shrink-0" />
                          )}
                          {graded && isChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-electric-rose ml-auto shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {graded && (
                    <div
                      className={`mt-3 rounded-xl p-3 text-xs leading-relaxed ${
                        chosen === q.respuesta
                          ? "bg-tertiary/10 text-on-surface"
                          : "bg-electric-rose/10 text-on-surface"
                      }`}
                    >
                      <span className="font-bold">
                        {chosen === undefined
                          ? "Sin responder. "
                          : chosen === q.respuesta
                          ? "✓ Correcto. "
                          : "✗ Incorrecto. "}
                      </span>
                      {q.explica}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Acciones / resultado */}
          <div id="dg-quiz-result" className="mt-5 scroll-mt-24">
            {!graded ? (
              <button
                type="button"
                onClick={grade}
                disabled={Object.keys(answers).length === 0}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-electric-rose text-white text-sm font-bold hover:ai-glow-strong transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" /> Comprobar respuestas
              </button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl p-5 border ${
                    passed ? "border-tertiary/40 bg-tertiary/10" : "border-electric-rose/40 bg-electric-rose/10"
                  }`}
                >
                  <p className="text-sm font-bold text-on-surface flex items-center gap-2 mb-3">
                    {passed ? (
                      <Trophy className="w-5 h-5 text-tertiary" />
                    ) : (
                      <RotateCcw className="w-5 h-5 text-electric-rose" />
                    )}
                    {passed
                      ? `¡Aprobado! ${correct}/${total} (${pct}%). Has desbloqueado el siguiente día.`
                      : `${correct}/${total} (${pct}%). Repasa el feedback y reintenta (necesitas ${Math.round(PASS * 100)}%).`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={retry}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-container text-xs font-bold text-on-surface hover:border-electric-rose/40 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reintentar
                    </button>
                    {passed && hasNext && (
                      <button
                        type="button"
                        onClick={onNext}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-rose text-white text-xs font-bold hover:ai-glow-strong transition-all"
                      >
                        Siguiente día <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </Section>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section helper (mismo patrón visual que best-practices)
// ---------------------------------------------------------------------------

interface SectionProps {
  title: string;
  eyebrow: string;
  subtitle?: string;
  icon: typeof Target;
  children: React.ReactNode;
}

function Section({ title, eyebrow, subtitle, icon: Icon, children }: SectionProps) {
  return (
    <section>
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-electric-rose/10 border border-electric-rose/30 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-electric-rose" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-electric-rose mb-1">{eyebrow}</p>
          <h3 className="text-xl font-bold text-on-surface leading-tight">{title}</h3>
          {subtitle && <p className="text-sm text-on-surface-variant mt-1 max-w-2xl">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
