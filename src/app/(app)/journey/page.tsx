"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  Heart,
  Users,
  ShieldCheck,
  Wallet,
  CalendarCheck,
  ClipboardList,
  BookOpenCheck,
  HeartHandshake,
  ScrollText,
  Network,
  Stethoscope,
  Presentation,
  GraduationCap,
  Building2,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  fetchJourneyProgress,
  progressUserKey,
  syncJourneyProgress,
  useAuthUser,
} from "@/lib/userStorage";

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
        description:
          "Configura tu firma oficial con la plantilla Minsait. Descarga la firma corporativa desde Indra Brand Center.",
        xp: 50,
        icon: PenLine,
        resourceHref: "/resources#firma-minsait",
        resourceLabel: "Ir al recurso",
      },
      {
        id: "plantillas",
        title: "Descargar plantillas corporativas",
        description:
          "PowerPoint, Word y Excel con identidad Minsait. Disponibles en Indra Brand Center, sección Recursos corporativos.",
        xp: 50,
        icon: FileText,
        resourceHref: "/resources#plantillas-corporativas",
        resourceLabel: "Descargar pack",
      },
      {
        id: "tipografias",
        title: "Instalar tipografías corporativas",
        description:
          "Instala Gotham y Aleo en tu equipo de trabajo para que tus entregables sigan la guía de marca.",
        xp: 30,
        icon: Type,
        resourceHref: "/resources#tipografias-corporativas",
        resourceLabel: "Descargar fuentes",
      },
      {
        id: "foto",
        title: "Subir foto de perfil a Teams",
        description:
          "Foto profesional en el directorio interno y avatar de cuenta. Tarjeta de acceso entregada por Soporte IT (Percy Rojas, Basadre piso 8).",
        xp: 20,
        icon: UserCircle,
      },
      {
        id: "teams-bienvenida",
        title: "Únete a los Teams obligatorios",
        description:
          "Grp_T_Experiencia del Empleado Consultoría y Grp_T_Onboarding_MBC. Preséntate al equipo de Management & Business Consulting.",
        xp: 20,
        icon: MessageCircle,
        resourceHref: "/resources#canal-onboarding",
        resourceLabel: "Abrir Teams",
      },
      {
        id: "it-soporte",
        title: "Recoger portátil y licencias",
        description:
          "Coordina con Percy Rojas (Soporte IT Perú) la entrega de portátil, terminal móvil, licencia Office 365 y configuración de periféricos.",
        xp: 20,
        icon: ShieldCheck,
        resourceHref: "mailto:phrojas@indracompany.com",
        resourceLabel: "Escribir a Soporte IT",
      },
    ],
  },
  {
    id: "week-2",
    week: 2,
    title: "Inmersión Cultural",
    tagline: "Descubre el ADN MBC",
    icon: Compass,
    side: "right",
    accent: "from-tertiary to-primary",
    challenges: [
      {
        id: "adn-mbc",
        title: "Conoce el ADN MBC",
        description:
          "Los 4 pilares culturales: Excelencia, Diversidad, Generosidad e Impacto. Léelos y reflexiona cómo los aplicas en tu día a día.",
        xp: 30,
        icon: Heart,
      },
      {
        id: "historia-mbc",
        title: "Conoce la historia de MBC",
        description:
          "De EuroPraxis (2001) a MBC hoy: 4 etapas, +20 años dentro de Indra. Forma parte de la unidad de Consultoría (181M€).",
        xp: 20,
        icon: ScrollText,
      },
      {
        id: "equipo-peru",
        title: "Identifica al equipo de Perú",
        description:
          "Directores: Pablo Wong (SSFF), Víctor Menghi (I&C/E&U), Geraldine Mouchard (AAPP). Sr Managers: Ana Cecilia Quispe, Aracelli Guevara.",
        xp: 30,
        icon: Users,
      },
      {
        id: "cursos-obligatorios",
        title: "Completa los cursos obligatorios",
        description:
          "Ética y Cumplimiento Legal, Seguridad de la Información, Diversidad, Subcontratación. Aplican a todo empleado del grupo Indra.",
        xp: 50,
        icon: BookOpenCheck,
      },
      {
        id: "codigo-etico",
        title: "Lee el Código Ético y los 3 canales",
        description:
          "Política de tolerancia cero. Tres canales para reportar: HR Consultoría, HR Perú (Majo Ríos) y Canal Directo (canaldirecto@indra.es).",
        xp: 20,
        icon: ShieldCheck,
        resourceHref: "mailto:canaldirecto@indra.es",
        resourceLabel: "Canal Directo",
      },
    ],
  },
  {
    id: "week-3",
    week: 3,
    title: "Toolkit Operativo",
    tagline: "Workin, GAE, My Place, Davidocs",
    icon: Briefcase,
    side: "left",
    accent: "from-primary to-electric-rose",
    challenges: [
      {
        id: "my-place",
        title: "Accede a My Place",
        description:
          "Herramienta de desarrollo: ahí ves tus evaluaciones semestrales, tu PAS y a tu mentor asignado. Acceso desde Indraweb.",
        xp: 30,
        icon: Network,
        resourceHref: "/resources#my-place",
        resourceLabel: "Más info",
      },
      {
        id: "gae",
        title: "Configura GAE (gastos)",
        description:
          "Herramienta corporativa de gestión de gastos: solicitudes, anticipos y liquidaciones. De Analyst a Sr Manager los trámites son autónomos.",
        xp: 20,
        icon: Wallet,
        resourceHref: "/resources#gae",
        resourceLabel: "Manual GAE",
      },
      {
        id: "workin",
        title: "Familiarízate con Workin",
        description:
          "Plataforma para vacaciones, boletas de pago, carta consular, certificados de 5ta y certificado de trabajo.",
        xp: 20,
        icon: CalendarCheck,
        resourceHref: "/resources#workin",
        resourceLabel: "Más info",
      },
      {
        id: "davidocs",
        title: "Revisa tu contrato en Davidocs",
        description:
          "Plataforma de firma digital: contratos, renovaciones, adendas y todo documento que firmes con la empresa.",
        xp: 20,
        icon: FileText,
        resourceHref: "/resources#davidocs",
        resourceLabel: "Más info",
      },
      {
        id: "service-point",
        title: "Usa Service Point para tus consultas",
        description:
          "Punto único corporativo. Cualquier duda del día a día se enruta al departamento correcto. Búsqueda por palabra clave.",
        xp: 20,
        icon: ClipboardList,
        resourceHref: "/resources#service-point",
        resourceLabel: "Más info",
      },
      {
        id: "imputaciones",
        title: "Imputa tus horas cada viernes",
        description:
          "Obligatorio rellenar hoja de tiempos cada semana, incluyendo estimación hasta fin de mes. Las faltas de imputación afectan tu bono.",
        xp: 30,
        icon: CalendarCheck,
      },
      {
        id: "eps",
        title: "Inscríbete a EPS Pacífico Seguros",
        description:
          "Beneficio social: la empresa cubre el costo (dependientes se descuentan de boleta). Envía la ficha a tu BP antes del día 23 del mes.",
        xp: 30,
        icon: Stethoscope,
        resourceHref: "mailto:mjrios@minsait.com",
        resourceLabel: "Solicitar a BP",
      },
    ],
  },
  {
    id: "week-4",
    week: 4,
    title: "Primer Entregable",
    tagline: "Tu primer documento con estilo MBC",
    icon: Presentation,
    side: "right",
    accent: "from-electric-rose to-tertiary",
    challenges: [
      {
        id: "primer-encargo",
        title: "Recibe tu primer encargo",
        description:
          "Recoge requerimiento con tu responsable de proyecto. Define alcance, fecha de entrega y formato esperado.",
        xp: 30,
        icon: Briefcase,
      },
      {
        id: "deck-marca",
        title: "Construye con la plantilla Minsait",
        description:
          "Aplica plantilla corporativa, tipografía ForFuture Sans y la paleta oficial. Cumple la guía de marca desde el primer entregable.",
        xp: 40,
        icon: FileText,
        resourceHref: "/resources#plantillas-corporativas",
        resourceLabel: "Plantillas",
      },
      {
        id: "brand-center",
        title: "Imágenes corporativas desde Brand Center",
        description:
          "Sustituye stock genérico por imágenes oficiales de Indra Brand Center. Tu deck se verá hecho por Minsait, no por Pinterest.",
        xp: 30,
        icon: BookOpenCheck,
        resourceHref: "https://www.indrabrandcenter.com/document/365",
        resourceLabel: "Abrir galería",
        external: true,
      },
      {
        id: "produccion",
        title: "Solicita revisión a Producción",
        description:
          "Equipo de diseño y traducción de MBC: production@minsait.com. Requiere código de proyecto, así que pide aprobación a tu responsable primero.",
        xp: 30,
        icon: PenLine,
        resourceHref: "mailto:production@minsait.com",
        resourceLabel: "Escribir a Producción",
      },
      {
        id: "mkm",
        title: "Consulta MKM antes de empezar",
        description:
          "Minsait Knowledge Management: árbol del conocimiento interno, BBDD especializadas (Statista, Gartner, Factiva) y directorio de expertos.",
        xp: 20,
        icon: BookOpenCheck,
        resourceHref: "mailto:mkm@minsait.com",
        resourceLabel: "Contactar MKM",
      },
      {
        id: "imputa-proyecto",
        title: "Imputa horas al código de proyecto",
        description:
          "Especifica código y elemento de proyecto en tu hoja de tiempos. Es como queda el esfuerzo registrado para la facturación.",
        xp: 20,
        icon: CalendarCheck,
      },
    ],
  },
  {
    id: "week-5",
    week: 5,
    title: "Buddy & Mentor",
    tagline: "Activa tu red de soporte",
    icon: HeartHandshake,
    side: "left",
    accent: "from-tertiary to-electric-rose",
    challenges: [
      {
        id: "buddy",
        title: "Conoce a tu Buddy",
        description:
          "Compañero asignado para acompañarte tus primeros 100 días. Reconócele con la plataforma Mates (Ring the bell) cuando termine.",
        xp: 30,
        icon: HeartHandshake,
      },
      {
        id: "mentor-myplace",
        title: "Identifica a tu Mentor en My Place",
        description:
          "Recibirás un correo de asignación. En My Place → Mi Mentoring ves a tu mentor actual y el histórico. Mentor ≠ responsable de proyecto.",
        xp: 30,
        icon: Users,
        resourceHref: "/resources#my-place",
        resourceLabel: "My Place",
      },
      {
        id: "contacto-mentor",
        title: "Tu primer 1:1 con el Mentor (mes 3)",
        description:
          "Contacto informal al 3er mes: comparte expectativas, inquietudes y áreas en las que quieres crecer. Te guiará en tu carrera global.",
        xp: 40,
        icon: Compass,
      },
      {
        id: "bp-peru",
        title: "Reunión con tu BP de People Perú",
        description:
          "Majo Ríos (BP Perú y Brasil) centraliza RRHH local: dudas de licencias, EPS, beneficios y procesos. Agenda un café virtual.",
        xp: 20,
        icon: Mail,
        resourceHref: "mailto:mjrios@minsait.com",
        resourceLabel: "Escribir a Majo",
      },
      {
        id: "the-place-to-be",
        title: "Suma a 'The Place To Be'",
        description:
          "Motor de innovación con líneas en Deportes, Acción Social, Team Building, MBC Woman y Out & Proud. Apúntate a la que te conecte.",
        xp: 20,
        icon: Star,
      },
    ],
  },
  {
    id: "week-6",
    week: 6,
    title: "Checkpoint y Evaluación",
    tagline: "Prepara tu primera evaluación semestral",
    icon: Award,
    side: "right",
    accent: "from-primary to-tertiary",
    challenges: [
      {
        id: "plan-carrera",
        title: "Lee tu Plan de Carrera",
        description:
          "Categoría Analyst → Sr Consultant. Cada categoría tiene grados de madurez con comportamientos esperados. Disponible en Teams Formación.",
        xp: 40,
        icon: GraduationCap,
      },
      {
        id: "4-dimensiones",
        title: "Domina las 4 dimensiones",
        description:
          "La Operación, Los Clientes, Las Personas, El Profesional. Cada una pesa distinto según tu categoría. Consúltalo en tu Plan de Carrera.",
        xp: 30,
        icon: Network,
      },
      {
        id: "evaluacion-semestral",
        title: "Entiende el proceso de evaluación",
        description:
          "Nota proyecto + Nota mentor + Nota final (calibrada en campana de Gauss). Calificaciones A, B+, B, B-, C. Tu papel es activo.",
        xp: 40,
        icon: Award,
      },
      {
        id: "pas",
        title: "Prepara tu primer PAS con el Mentor",
        description:
          "Plan de Acción Semestral: planificación de desarrollo para el próximo ciclo. Lo trabajas con tu mentor tras la evaluación.",
        xp: 30,
        icon: ClipboardList,
      },
      {
        id: "afterwork",
        title: "Asiste al Afterwork New Minsaiter",
        description:
          "Evento de cierre del onboarding. Conoce a tus pares de otras geografías, comparte aprendizajes y celebra superar el periodo de prueba.",
        xp: 20,
        icon: Building2,
      },
    ],
  },
];

const TOTAL_XP = LEVELS.reduce(
  (acc, lvl) => acc + lvl.challenges.reduce((a, c) => a + c.xp, 0),
  0
);

export default function JourneyPage() {
  const authUser = useAuthUser();
  const userKey = progressUserKey(authUser) ?? "__guest__";

  const [completed, setCompleted] = useState<Set<ChallengeId>>(new Set());
  // Tracks whether we've hydrated from storage for the current userKey.
  // Until hydrated for a given key, we skip the persistence effect so we
  // don't clobber stored progress with the empty initial state.
  const hydratedKeyRef = useRef<string | null>(null);

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
