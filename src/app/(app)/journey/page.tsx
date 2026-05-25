"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Lock,
  Check,
  ChevronRight,
  PenLine,
  FileText,
  Type,
  UserCircle,
  MessageCircle,
  Compass,
  Briefcase,
  Award,
  Flame,
  Star,
  Zap,
  Map as MapIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ChallengeId = string;

interface Challenge {
  id: ChallengeId;
  title: string;
  description: string;
  xp: number;
  icon: LucideIcon;
  resourceHref?: string;
  resourceLabel?: string;
  external?: boolean;
}

interface Level {
  id: string;
  week: number;
  title: string;
  tagline: string;
  icon: LucideIcon;
  side: "left" | "right";
  accent: string;
  challenges: Challenge[];
}

const LEVELS: Level[] = [
  {
    id: "week-1",
    week: 1,
    title: "Setup Corporativo",
    tagline: "Equipa tu kit Minsait",
    icon: Sparkles,
    side: "left",
    accent: "from-electric-rose to-primary",
    challenges: [
      {
        id: "firma",
        title: "Actualizar firma de correo",
        description: "Configura tu firma oficial con la plantilla Minsait en Outlook.",
        xp: 50,
        icon: PenLine,
        resourceHref: "/resources#firma-minsait",
        resourceLabel: "Ir al recurso",
      },
      {
        id: "plantillas",
        title: "Descargar plantillas corporativas",
        description: "PowerPoint, Word y Excel con identidad Minsait listas para usar.",
        xp: 50,
        icon: FileText,
        resourceHref: "/resources#plantillas-corporativas",
        resourceLabel: "Descargar pack",
      },
      {
        id: "tipografias",
        title: "Instalar tipografías corporativas",
        description: "Instala Gotham y Aleo en tu equipo de trabajo.",
        xp: 30,
        icon: Type,
        resourceHref: "/resources#tipografias-corporativas",
        resourceLabel: "Descargar fuentes",
      },
      {
        id: "foto",
        title: "Subir foto de perfil a Teams",
        description: "Foto profesional en el directorio interno y avatar de cuenta.",
        xp: 20,
        icon: UserCircle,
      },
      {
        id: "canal",
        title: "Unirte al canal #onboarding-mbc",
        description: "Preséntate al equipo de Management & Business Consulting.",
        xp: 20,
        icon: MessageCircle,
        resourceHref: "/resources#canal-onboarding",
        resourceLabel: "Abrir Teams",
      },
    ],
  },
  {
    id: "week-2",
    week: 2,
    title: "Inmersión Cultural",
    tagline: "Descubre el ADN Minsait",
    icon: Compass,
    side: "right",
    accent: "from-tertiary to-primary",
    challenges: [],
  },
  {
    id: "week-3",
    week: 3,
    title: "Toolkit Operativo",
    tagline: "Domina Jira, Confluence y SAP",
    icon: Briefcase,
    side: "left",
    accent: "from-primary to-electric-rose",
    challenges: [],
  },
  {
    id: "week-4",
    week: 4,
    title: "Primer Entregable",
    tagline: "Tu primer deck con estilo MBB",
    icon: FileText,
    side: "right",
    accent: "from-electric-rose to-tertiary",
    challenges: [],
  },
  {
    id: "week-5",
    week: 5,
    title: "Networking & Mentor",
    tagline: "Conecta con tu Sr. Consultant",
    icon: Trophy,
    side: "left",
    accent: "from-tertiary to-electric-rose",
    challenges: [],
  },
  {
    id: "week-6",
    week: 6,
    title: "Checkpoint 30 días",
    tagline: "Evaluación y subida de nivel",
    icon: Award,
    side: "right",
    accent: "from-primary to-tertiary",
    challenges: [],
  },
];

const TOTAL_XP = LEVELS.reduce(
  (acc, lvl) => acc + lvl.challenges.reduce((a, c) => a + c.xp, 0),
  0
);

export default function JourneyPage() {
  const [completed, setCompleted] = useState<Set<ChallengeId>>(new Set());

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
          Mi <span className="text-electric-rose">Journey</span>
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
      <div className="relative">
        {/* dashed central guide */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 border-l-2 border-dashed border-surface-container"
        />

        <ol className="relative space-y-12">
          {LEVELS.map((level, i) => {
            const prevLevel = LEVELS[i - 1];
            const prevDone =
              !prevLevel ||
              (prevLevel.challenges.length > 0 &&
                prevLevel.challenges.every((c) => completed.has(c.id)));
            const isLocked = i > 0 && !prevDone;
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
              Promoción a Consultant
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
      {/* LEFT side card slot */}
      <div
        className={`col-span-9 md:col-span-4 ${
          sideLeft ? "md:order-1 md:text-right" : "md:order-3"
        }`}
      >
        {sideLeft && (
          <LevelCard
            level={level}
            isLocked={isLocked}
            isCompleted={isCompleted}
            isActive={isActive}
            align="right"
            completed={completed}
            onToggle={onToggle}
          />
        )}
        {!sideLeft && (
          <div className="hidden md:block" aria-hidden />
        )}
      </div>

      {/* NODE in the middle */}
      <div className="col-span-9 md:col-span-1 md:order-2 flex justify-center">
        <NodeMarker
          level={level}
          isLocked={isLocked}
          isCompleted={isCompleted}
          isActive={isActive}
          progress={progress}
        />
      </div>

      {/* RIGHT side card slot */}
      <div
        className={`col-span-9 md:col-span-4 ${
          sideLeft ? "md:order-3" : "md:order-1 md:text-right"
        }`}
      >
        {!sideLeft && (
          <LevelCard
            level={level}
            isLocked={isLocked}
            isCompleted={isCompleted}
            isActive={isActive}
            align="left"
            completed={completed}
            onToggle={onToggle}
          />
        )}
        {sideLeft && (
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

  return (
    <div
      className={`glass-panel rounded-3xl p-6 md:p-7 border transition-all duration-300 ${
        isActive
          ? "border-electric-rose/50 ai-glow"
          : isCompleted
          ? "border-tertiary/40"
          : "border-surface-container"
      } ${isLocked ? "opacity-55" : ""}`}
    >
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
            <div
              className={`flex items-center gap-2 mb-4 text-xs font-bold ${
                align === "right" ? "md:justify-end" : ""
              }`}
            >
              <span
                className={
                  isCompleted ? "text-tertiary" : "text-electric-rose"
                }
              >
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
    </div>
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
      <button
        type="button"
        onClick={() => onToggle(challenge.id)}
        aria-pressed={done}
        aria-label={done ? "Marcar como pendiente" : "Marcar como completado"}
        className={`shrink-0 mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
          done
            ? "bg-tertiary border-tertiary"
            : "border-on-surface-variant/40 hover:border-electric-rose"
        }`}
      >
        {done && <Check className="w-4 h-4 text-background" strokeWidth={3} />}
      </button>

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
        {challenge.resourceHref && (
          <Link
            href={challenge.resourceHref}
            className={`inline-flex items-center gap-1 text-xs font-bold text-electric-rose hover:text-primary transition-colors ${
              align === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            {challenge.resourceLabel ?? "Ir al recurso"}
            <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </li>
  );
}
