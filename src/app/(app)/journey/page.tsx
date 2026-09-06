"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Lock,
  Check,
  ChevronRight,
  Award,
  Flame,
  Star,
  Zap,
  Map as MapIcon,
} from "lucide-react";
import {
  fetchJourneyProgress,
  progressUserKey,
  syncJourneyProgress,
  useAuthUser,
} from "@/lib/userStorage";
// El catálogo de semanas y retos vive en lib porque el Panel Admin necesita
// el mismo peso en XP para calcular el % de avance de cada consultor.
import { LEVELS, TOTAL_XP } from "@/lib/journeyLevels";
import type { Challenge, ChallengeId, Level } from "@/lib/journeyLevels";

export default function JourneyPage() {
  const authUser = useAuthUser();
  const userKey = progressUserKey(authUser) ?? "__guest__";

  const [completed, setCompleted] = useState<Set<ChallengeId>>(new Set());
  // Tracks whether we've hydrated from storage for the current userKey.
  // Until hydrated for a given key, we skip the persistence effect so we
  // don't clobber stored progress with the empty initial state.
  const hydratedKeyRef = useRef<string | null>(null);

  // Celebración cuando una semana se completa
  const [celebratingLevel, setCelebratingLevel] = useState<Level | null>(null);
  const completedLevelsRef = useRef<Set<string>>(new Set());

  // Scroll-driven animation through the path
  const pathRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pathRef,
    // "end end": el progreso llega a 1 cuando el final del recorrido toca el
    // borde inferior del viewport — así la bolita/barra siempre completan el
    // camino al hacer scroll hasta el fondo (antes "end 30%" quedaba corto).
    offset: ["start 80%", "end end"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const cometTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Parallax for ambient floating sparkles (each drifts a different amount)
  const driftA = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const driftC = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);

  // (Re)hydrate when the active user changes (login / logout / cross-tab).
  useEffect(() => {
    let cancelled = false;
    fetchJourneyProgress(authUser).then((ids) => {
      if (cancelled) return;
      setCompleted(new Set(ids));
      hydratedKeyRef.current = userKey;
    });
    return () => {
      cancelled = true;
    };
  }, [authUser, userKey]);

  // Persist whenever the set changes — but only after hydration for this key.
  useEffect(() => {
    if (hydratedKeyRef.current !== userKey) return;
    // Fire-and-forget; errors are logged inside syncJourneyProgress.
    void syncJourneyProgress(authUser, completed);
  }, [authUser, completed, userKey]);

  // Detecta semanas recién completadas y dispara la celebración.
  // También limpia el ref cuando una semana deja de estar completa (re-bloqueo),
  // de modo que volver a completarla vuelve a disparar la animación.
  useEffect(() => {
    if (hydratedKeyRef.current !== userKey) return;
    const currentlyComplete = new Set<string>();
    for (const lv of LEVELS) {
      const done =
        lv.challenges.length > 0 &&
        lv.challenges.every((c) => completed.has(c.id));
      if (done) currentlyComplete.add(lv.id);
    }
    // Primer ID recién completado
    let newlyCompleted: Level | null = null;
    for (const lv of LEVELS) {
      if (
        currentlyComplete.has(lv.id) &&
        !completedLevelsRef.current.has(lv.id)
      ) {
        newlyCompleted = lv;
        break;
      }
    }
    completedLevelsRef.current = currentlyComplete;
    if (newlyCompleted) {
      setCelebratingLevel(newlyCompleted);
    }
  }, [completed, userKey]);

  const week1 = LEVELS[0];
  const week1Done = week1.challenges.every((c) => completed.has(c.id));
  const week1Progress =
    week1.challenges.filter((c) => completed.has(c.id)).length /
    Math.max(1, week1.challenges.length);

  const totalXp = useMemo(() => {
    let xp = 0;
    LEVELS.forEach((l) =>
      l.challenges.forEach((c) => {
        if (completed.has(c.id)) xp += c.xp;
      })
    );
    return xp;
  }, [completed]);

  const xpPercent = Math.min(100, TOTAL_XP === 0 ? 0 : (totalXp / TOTAL_XP) * 100);

  function toggle(id: ChallengeId) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="max-w-5xl mx-auto py-10 animate-in fade-in duration-500">
      {/* HUD / Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel">
            <Flame className="w-4 h-4 text-electric-rose" />
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface">
              Racha 3 días
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel">
            <Star className="w-4 h-4 text-tertiary fill-tertiary" />
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface">
              {totalXp} XP
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface">
              Nivel 1 · Analyst
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-3 text-on-surface text-center">
          My <span className="text-electric-rose">Journey</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-center mb-8">
          Sube de nivel completando misiones semanales. Cada reto suma XP y
          desbloquea tu siguiente etapa en el camino Minsait.
        </p>

        {/* XP Progress Bar */}
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span className="text-on-surface-variant uppercase tracking-widest">
              Progreso del Journey
            </span>
            <span className="text-electric-rose">
              {totalXp} / {TOTAL_XP} XP
            </span>
          </div>
          <div className="h-3 bg-surface-container rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-electric-rose via-primary to-tertiary relative"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Path */}
      <div ref={pathRef} className="relative">
        {/* Capa 1 · guía punteada de fondo (muy sutil) */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 border-l-2 border-dashed border-surface-container/40"
        />

        {/* Capa 2 · gradiente que se rellena con scroll */}
        <motion.div
          aria-hidden
          style={{ height: fillHeight }}
          className="absolute left-1/2 top-0 w-1 -translate-x-1/2 bg-gradient-to-b from-electric-rose via-primary to-tertiary rounded-full shadow-[0_0_24px_rgba(255,0,84,0.5)] pointer-events-none"
        />

        {/* Capa 3 · cometa que viaja con el scroll */}
        <motion.div
          aria-hidden
          style={{ top: cometTop, y: "-50%" }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20"
        >
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-electric-rose/40 blur-3xl rounded-full" />
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
              className="relative w-9 h-9 rounded-full bg-gradient-to-br from-electric-rose to-primary flex items-center justify-center shadow-[0_0_30px_rgba(255,0,84,0.8)] border-2 border-white/30"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Capa 4 · sparkles ambientales con parallax (drift diferente por elemento) */}
        <motion.div
          aria-hidden
          style={{ y: driftA }}
          className="absolute left-[18%] top-[12%] pointer-events-none"
        >
          <Sparkles className="w-5 h-5 text-electric-rose/40" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ y: driftB }}
          className="absolute right-[15%] top-[28%] pointer-events-none"
        >
          <Star className="w-4 h-4 text-tertiary/40 fill-tertiary/30" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ y: driftC }}
          className="absolute left-[10%] top-[55%] pointer-events-none"
        >
          <Sparkles className="w-6 h-6 text-primary/40" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ y: driftA }}
          className="absolute right-[20%] top-[72%] pointer-events-none"
        >
          <Star className="w-4 h-4 text-electric-rose/30 fill-electric-rose/20" />
        </motion.div>
        <motion.div
          aria-hidden
          style={{ y: driftB }}
          className="absolute left-[22%] top-[88%] pointer-events-none"
        >
          <Sparkles className="w-5 h-5 text-tertiary/40" />
        </motion.div>

        <ol className="relative space-y-12">
          {LEVELS.map((level, i) => {
            // Cascada: TODAS las semanas previas deben estar completas
            // para desbloquear esta. Si alguna previa pierde un reto,
            // esta y las siguientes vuelven a bloquearse automáticamente.
            const allPrevDone = LEVELS.slice(0, i).every(
              (lv) =>
                lv.challenges.length > 0 &&
                lv.challenges.every((c) => completed.has(c.id))
            );
            const isLocked = i > 0 && !allPrevDone;
            const isCompleted =
              level.challenges.length > 0 &&
              level.challenges.every((c) => completed.has(c.id));
            const isActive = !isLocked && !isCompleted;

            return (
              <PathNode
                key={level.id}
                level={level}
                index={i}
                isLocked={isLocked}
                isCompleted={isCompleted}
                isActive={isActive}
                progress={
                  level.id === "week-1" ? week1Progress : isCompleted ? 1 : 0
                }
                completed={completed}
                onToggle={toggle}
              />
            );
          })}
        </ol>

        {/* Celebración cuando una semana se completa */}
        <AnimatePresence>
          {celebratingLevel && (
            <CelebrationOverlay
              level={celebratingLevel}
              onDone={() => setCelebratingLevel(null)}
            />
          )}
        </AnimatePresence>

        {/* Final flag */}
        <div className="relative flex justify-center mt-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-panel rounded-3xl px-8 py-6 text-center border border-surface-container"
          >
            <Trophy className="w-10 h-10 text-electric-rose mx-auto mb-2" />
            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">
              Meta final
            </p>
            <p className="text-lg font-bold text-on-surface">
              Graduado MBC 🎓
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface PathNodeProps {
  level: Level;
  index: number;
  isLocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  progress: number;
  completed: Set<ChallengeId>;
  onToggle: (id: ChallengeId) => void;
}

function PathNode({
  level,
  index,
  isLocked,
  isCompleted,
  isActive,
  progress,
  completed,
  onToggle,
}: PathNodeProps) {
  const sideLeft = level.side === "left";

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative grid grid-cols-9 gap-4 items-center"
    >
      {/* Visual LEFT slot */}
      <div className="col-span-9 md:col-span-4 md:order-1 md:text-right">
        {sideLeft ? (
          <LevelCard
            level={level}
            isLocked={isLocked}
            isCompleted={isCompleted}
            isActive={isActive}
            align="right"
            completed={completed}
            onToggle={onToggle}
          />
        ) : (
          <div className="hidden md:block" aria-hidden />
        )}
      </div>

      {/* Center NODE */}
      <div className="col-span-9 md:col-span-1 md:order-2 flex justify-center">
        <NodeMarker
          level={level}
          isLocked={isLocked}
          isCompleted={isCompleted}
          isActive={isActive}
          progress={progress}
        />
      </div>

      {/* Visual RIGHT slot */}
      <div className="col-span-9 md:col-span-4 md:order-3">
        {!sideLeft ? (
          <LevelCard
            level={level}
            isLocked={isLocked}
            isCompleted={isCompleted}
            isActive={isActive}
            align="left"
            completed={completed}
            onToggle={onToggle}
          />
        ) : (
          <div className="hidden md:block" aria-hidden />
        )}
      </div>
    </motion.li>
  );
}

interface NodeMarkerProps {
  level: Level;
  isLocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  progress: number;
}

function NodeMarker({
  level,
  isLocked,
  isCompleted,
  isActive,
  progress,
}: NodeMarkerProps) {
  const size = 88;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - progress * c;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* progress ring */}
      <svg className="absolute inset-0" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-surface-container"
        />
        {!isLocked && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            className={
              isCompleted ? "stroke-tertiary" : "stroke-electric-rose"
            }
            initial={{ strokeDasharray: c, strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        )}
      </svg>

      {/* inner disc */}
      <div
        className={`absolute inset-2 rounded-full flex flex-col items-center justify-center ${
          isLocked
            ? "bg-surface-container/60"
            : isCompleted
            ? "bg-tertiary/20"
            : `bg-gradient-to-br ${level.accent}`
        } ${isActive ? "ai-glow-strong animate-pulse" : ""}`}
      >
        {isLocked ? (
          <Lock className="w-6 h-6 text-on-surface-variant" />
        ) : isCompleted ? (
          <Check className="w-7 h-7 text-tertiary" strokeWidth={3} />
        ) : (
          <level.icon className="w-7 h-7 text-white" />
        )}
        {!isLocked && (
          <span
            className={`absolute -bottom-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
              isCompleted
                ? "bg-tertiary text-background"
                : "bg-background text-electric-rose border border-electric-rose/40"
            }`}
          >
            S{level.week}
          </span>
        )}
      </div>
    </div>
  );
}

interface LevelCardProps {
  level: Level;
  isLocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  align: "left" | "right";
  completed: Set<ChallengeId>;
  onToggle: (id: ChallengeId) => void;
}

function LevelCard({
  level,
  isLocked,
  isCompleted,
  isActive,
  align,
  completed,
  onToggle,
}: LevelCardProps) {
  const xpTotal = level.challenges.reduce((a, c) => a + c.xp, 0);
  const xpEarned = level.challenges
    .filter((c) => completed.has(c.id))
    .reduce((a, c) => a + c.xp, 0);

  const xpPct = xpTotal > 0 ? (xpEarned / xpTotal) * 100 : 0;

  return (
    <motion.div
      whileHover={isLocked ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative glass-panel rounded-3xl p-6 md:p-7 border overflow-hidden ${
        isActive
          ? "border-electric-rose/50 ai-glow"
          : isCompleted
          ? "border-tertiary/40"
          : "border-surface-container"
      } ${isLocked ? "opacity-55" : ""}`}
    >
      {/* Franja de acento superior (gradiente de la semana) */}
      {!isLocked && (
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${
            isCompleted ? "from-tertiary to-tertiary/40" : level.accent
          }`}
          style={{
            transform: `scaleX(${isCompleted ? 1 : Math.max(0.06, xpPct / 100)})`,
            transformOrigin: align === "right" ? "right" : "left",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      )}

      {/* Title row */}
      <div
        className={`flex items-center gap-3 mb-2 ${
          align === "right" ? "md:flex-row-reverse md:text-right" : ""
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isLocked
              ? "bg-surface-container/50"
              : `bg-gradient-to-br ${level.accent}`
          }`}
        >
          <level.icon
            className={`w-5 h-5 ${
              isLocked ? "text-on-surface-variant" : "text-white"
            }`}
          />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Semana {level.week}
          </p>
          <h3 className="text-xl font-bold text-on-surface leading-tight">
            {level.title}
          </h3>
        </div>
      </div>
      <p
        className={`text-sm text-on-surface-variant mb-4 ${
          align === "right" ? "md:text-right" : ""
        }`}
      >
        {level.tagline}
      </p>

      {/* Status / progress */}
      {level.challenges.length > 0 ? (
        <>
          {!isLocked && (
            <div className="mb-4">
              <div
                className={`flex items-center gap-2 mb-2 text-xs font-bold ${
                  align === "right" ? "md:justify-end" : ""
                }`}
              >
                <span className={isCompleted ? "text-tertiary" : "text-electric-rose"}>
                  {xpEarned} / {xpTotal} XP
                </span>
                <span className="text-on-surface-variant">·</span>
                <span className="text-on-surface-variant">
                  {completed.size === 0
                    ? `${level.challenges.length} retos`
                    : `${
                        level.challenges.filter((c) => completed.has(c.id)).length
                      } / ${level.challenges.length} retos`}
                </span>
                {isCompleted && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="inline-flex items-center gap-1 text-tertiary"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </motion.span>
                )}
              </div>
              {/* Barra de progreso XP animada */}
              <div className="h-2 rounded-full bg-surface-container/70 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    isCompleted
                      ? "bg-gradient-to-r from-tertiary to-tertiary"
                      : "bg-gradient-to-r from-electric-rose to-primary"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${xpTotal > 0 ? (xpEarned / xpTotal) * 100 : 0}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {!isLocked && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                {level.challenges.map((challenge) => (
                  <ChallengeRow
                    key={challenge.id}
                    challenge={challenge}
                    done={completed.has(challenge.id)}
                    onToggle={onToggle}
                    align={align}
                  />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${
            align === "right" ? "md:justify-end" : ""
          } ${isLocked ? "text-on-surface-variant" : "text-electric-rose"}`}
        >
          {isLocked ? (
            <>
              <Lock className="w-3 h-3" /> Bloqueado · completa la semana
              anterior
            </>
          ) : (
            <>
              <MapIcon className="w-3 h-3" /> Próximamente
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}

interface ChallengeRowProps {
  challenge: Challenge;
  done: boolean;
  onToggle: (id: ChallengeId) => void;
  align: "left" | "right";
}

function ChallengeRow({ challenge, done, onToggle, align }: ChallengeRowProps) {
  return (
    <li
      className={`group flex items-start gap-3 p-3 rounded-2xl bg-surface-container/30 hover:bg-surface-container/60 transition-colors ${
        align === "right" ? "md:flex-row-reverse md:text-right" : ""
      } ${done ? "opacity-70" : ""}`}
    >
      <motion.button
        type="button"
        onClick={() => onToggle(challenge.id)}
        aria-pressed={done}
        aria-label={done ? "Marcar como pendiente" : "Marcar como completado"}
        whileTap={{ scale: 0.85 }}
        className={`shrink-0 mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${
          done
            ? "bg-tertiary border-tertiary"
            : "border-on-surface-variant/40 hover:border-electric-rose"
        }`}
      >
        <AnimatePresence>
          {done && (
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
            >
              <Check className="w-4 h-4 text-background" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="flex-1 min-w-0">
        <div
          className={`flex items-center gap-2 mb-1 ${
            align === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          <challenge.icon className="w-4 h-4 text-electric-rose shrink-0" />
          <p
            className={`text-sm font-bold ${
              done ? "line-through text-on-surface-variant" : "text-on-surface"
            }`}
          >
            {challenge.title}
          </p>
          <span className="text-[10px] font-bold text-electric-rose bg-electric-rose/10 px-1.5 py-0.5 rounded">
            +{challenge.xp} XP
          </span>
        </div>
        <p className="text-xs text-on-surface-variant mb-2">
          {challenge.description}
        </p>
        {challenge.resourceHref &&
          (challenge.external ||
          /^(https?:|mailto:|msteams:)/.test(challenge.resourceHref) ? (
            <a
              href={challenge.resourceHref}
              target={challenge.resourceHref.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-xs font-bold text-electric-rose hover:text-primary transition-colors ${
                align === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {challenge.resourceLabel ?? "Ir al recurso"}
              <ChevronRight className="w-3 h-3" />
            </a>
          ) : (
            <Link
              href={challenge.resourceHref}
              className={`inline-flex items-center gap-1 text-xs font-bold text-electric-rose hover:text-primary transition-colors ${
                align === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {challenge.resourceLabel ?? "Ir al recurso"}
              <ChevronRight className="w-3 h-3" />
            </Link>
          ))}
      </div>
    </li>
  );
}

// =============================================================
// CelebrationOverlay
// Confetti + toast cuando una semana se completa al 100%.
// Se auto-cierra a los 3.5s. El usuario también puede cerrarlo.
// =============================================================
interface CelebrationOverlayProps {
  level: Level;
  onDone: () => void;
}

function CelebrationOverlay({ level, onDone }: CelebrationOverlayProps) {
  const isFinalWeek = level.week >= 6;
  const xpTotal = level.challenges.reduce((a, c) => a + c.xp, 0);

  // Auto-dismiss
  useEffect(() => {
    const t = setTimeout(onDone, 3800);
    return () => clearTimeout(t);
  }, [onDone]);

  // Generación determinista de las partículas (sin Math.random a nivel de render
  // para evitar diferencias entre SSR y CSR; usamos seeds derivados del id).
  const particles = useMemo(() => {
    const seed = level.id.length + level.week * 7;
    return Array.from({ length: 36 }, (_, i) => {
      const a = ((i * 137 + seed * 13) % 360) * (Math.PI / 180);
      const dist = 220 + ((i * 53 + seed) % 160);
      const dx = Math.cos(a) * dist;
      const dy = Math.sin(a) * dist;
      const palette = ["#ff0054", "#ffb2b8", "#69dbab", "#480e2a", "#ffffff"];
      const color = palette[(i + seed) % palette.length];
      const size = 6 + ((i * 11 + seed) % 8);
      const delay = ((i * 3 + seed) % 12) / 100;
      const duration = 1.2 + ((i * 7 + seed) % 9) / 10;
      const shape: "circle" | "square" | "star" =
        i % 3 === 0 ? "star" : i % 3 === 1 ? "circle" : "square";
      const rot = ((i * 71 + seed) % 360) + 180;
      return { i, dx, dy, color, size, delay, duration, shape, rot };
    });
  }, [level.id, level.week]);

  return (
    <motion.div
      key={level.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
    >
      {/* Backdrop suave */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 backdrop-blur-[2px] pointer-events-auto"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,0,84,0.15), rgba(72,14,42,0.18) 60%, transparent 90%)",
        }}
        onClick={onDone}
      />

      {/* Confetti burst */}
      <div className="absolute inset-0 flex items-center justify-center">
        {particles.map((p) => (
          <motion.div
            key={p.i}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
            animate={{
              x: p.dx,
              y: p.dy,
              opacity: 0,
              rotate: p.rot,
              scale: 1,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.shape === "star" ? "transparent" : p.color,
              borderRadius: p.shape === "circle" ? "9999px" : "2px",
              boxShadow:
                p.shape !== "star"
                  ? `0 0 8px ${p.color}, 0 0 16px ${p.color}55`
                  : undefined,
            }}
          >
            {p.shape === "star" && (
              <Sparkles
                className="w-full h-full"
                style={{ color: p.color }}
                fill={p.color}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Toast central */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -10 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative glass-panel rounded-3xl border border-electric-rose/40 px-8 py-7 max-w-sm text-center shadow-[0_30px_80px_-20px_rgba(255,0,84,0.6)] pointer-events-auto"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -8, 8, -4, 4, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: 0.3,
            ease: "easeInOut",
          }}
          className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-electric-rose to-primary flex items-center justify-center shadow-[0_0_40px_rgba(255,0,84,0.7)]"
        >
          {isFinalWeek ? (
            <Trophy className="w-10 h-10 text-white" strokeWidth={2.4} />
          ) : (
            <Award className="w-10 h-10 text-white" strokeWidth={2.4} />
          )}
        </motion.div>

        <p className="text-[11px] uppercase tracking-[0.25em] text-electric-rose font-bold mb-1">
          {isFinalWeek ? "¡Journey completo!" : "¡Nivel desbloqueado!"}
        </p>
        <h3 className="text-2xl font-bold text-on-surface mb-1">
          Semana {level.week} · {level.title}
        </h3>
        <p className="text-sm text-on-surface-variant mb-4">
          {isFinalWeek
            ? "Eres oficialmente Graduado MBC 🎓"
            : level.tagline}
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary/15 border border-tertiary/40">
          <Star className="w-4 h-4 text-tertiary fill-tertiary" />
          <span className="text-xs font-bold uppercase tracking-widest text-tertiary">
            +{xpTotal} XP
          </span>
        </div>

        <button
          onClick={onDone}
          className="block mx-auto mt-5 text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-electric-rose transition-colors"
        >
          Continuar
        </button>
      </motion.div>
    </motion.div>
  );
}
