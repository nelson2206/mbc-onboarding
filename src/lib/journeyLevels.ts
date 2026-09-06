/**
 * Catálogo del Journey de onboarding: las 6 semanas y sus retos.
 *
 * Vivía dentro de `src/app/(app)/journey/page.tsx`. Se movió aquí sin cambios
 * cuando apareció el segundo consumidor —el Panel Admin— porque el porcentaje
 * de avance que ve el admin tiene que salir del mismo catálogo que ve el
 * consultor. Si se duplicara, un reto nuevo movería una barra y no la otra.
 *
 * `journey_progress` en Supabase solo guarda `challenge_id`; el peso en XP y la
 * pertenencia a una semana viven aquí.
 */

import {
  Sparkles,
  PenLine,
  FileText,
  Type,
  UserCircle,
  MessageCircle,
  Compass,
  Briefcase,
  Award,
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
  Database,
  TrendingUp,
  Coins,
  PartyPopper,
  Heart,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ChallengeId = string;

export interface Challenge {
  id: ChallengeId;
  title: string;
  description: string;
  xp: number;
  icon: LucideIcon;
  resourceHref?: string;
  resourceLabel?: string;
  external?: boolean;
}

export interface Level {
  id: string;
  week: number;
  title: string;
  tagline: string;
  icon: LucideIcon;
  side: "left" | "right";
  accent: string;
  challenges: Challenge[];
}

export const LEVELS: Level[] = [
  {
    id: "week-1",
    week: 1,
    title: "Setup Corporativo",
    tagline: "Equipa tu kit Minsait",
    icon: Sparkles,
    side: "left",
    accent: "from-mbc-electric to-mbc-sky",
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
      {
        id: "buddy",
        title: "Conoce a tu Buddy",
        description:
          "Compañero asignado para acompañarte tus primeros 100 días. Te ayuda con dudas de día a día, cultura y procesos. Más adelante lo reconocerás con la plataforma Mates (Ring the bell).",
        xp: 30,
        icon: HeartHandshake,
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
    accent: "from-success to-mbc-sky",
    challenges: [
      {
        id: "adn-mbc",
        title: "Conoce el ADN MBC",
        description:
          "Los 4 pilares culturales: Excelencia, Diversidad, Generosidad e Impacto. Léelos y reflexiona cómo los aplicas en tu día a día.",
        xp: 30,
        icon: Heart,
        resourceHref: "/cultura#adn",
        resourceLabel: "Ver pilares",
      },
      {
        id: "historia-mbc",
        title: "Conoce la historia de MBC",
        description:
          "De EuroPraxis (2001) a MBC hoy: 4 etapas, +20 años dentro de Indra. Forma parte de la unidad de Consultoría (181M€).",
        xp: 20,
        icon: ScrollText,
        resourceHref: "/cultura#historia",
        resourceLabel: "Ver timeline",
      },
      {
        id: "equipo-peru",
        title: "Identifica al equipo de Perú",
        description:
          "Directores: Pablo Wong (SSFF), Víctor Menghi (I&C/E&U), Geraldine Mouchard (AAPP). Sr Managers: Ana Cecilia Quispe, Aracelli Guevara.",
        xp: 30,
        icon: Users,
        resourceHref: "/cultura#equipo-peru",
        resourceLabel: "Ver equipo",
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
    accent: "from-mbc-sky to-mbc-electric",
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
    accent: "from-mbc-electric to-success",
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
      {
        id: "calidad",
        title: "Aplica los estándares de Calidad",
        description:
          "Indra opera bajo ISO 9001. Si el cliente pide info sobre calidad, consulta el Gestor de Calidad. Para dudas, gestorcalidad@indra.es.",
        xp: 20,
        icon: ShieldCheck,
        resourceHref: "mailto:gestorcalidad@indra.es",
        resourceLabel: "Escribir a Calidad",
      },
      {
        id: "brain",
        title: "Sube tu entregable a Brain",
        description:
          "Brain es la herramienta interna de Knowledge Management. Documentar tu proyecto ayuda al equipo a reutilizar y acelera futuros encargos.",
        xp: 20,
        icon: Database,
        resourceHref: "mailto:mbcresearch@minsait.com",
        resourceLabel: "Contactar Research",
      },
    ],
  },
  {
    id: "week-5",
    week: 5,
    title: "Mentor & Red de soporte",
    tagline: "Activa tu red interna",
    icon: HeartHandshake,
    side: "left",
    accent: "from-success to-mbc-electric",
    challenges: [
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
      {
        id: "ring-the-bell",
        title: "Reconoce a tu Buddy en Ring the Bell",
        description:
          "Plataforma Mates de reconocimientos. Al cerrar los 100 días con tu Buddy, agradécele públicamente con un Bell. Refuerza la cultura.",
        xp: 20,
        icon: PartyPopper,
      },
      {
        id: "intercambio-internacional",
        title: "Descubre el Programa ICE",
        description:
          "Intercambio de oficina por mínimo 1 año en cualquiera de los 10 países donde MBC opera. Habla con Movilidad & Internacional cuando estés listo.",
        xp: 20,
        icon: Building2,
        resourceHref: "mailto:internationalmbc@indra.es",
        resourceLabel: "Conocer ICE",
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
    accent: "from-mbc-sky to-success",
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
        id: "calificaciones",
        title: "Domina las calificaciones A-C",
        description:
          "B = cumple expectativas. A excede, B+ supera, B- rinde por debajo, C no cumple. La nota final se calibra contra toda MBC (campana de Gauss).",
        xp: 20,
        icon: TrendingUp,
      },
      {
        id: "open-university",
        title: "Configura tu Plan de Formación",
        description:
          "Open University + Udemy + vías de aprendizaje MBC por categoría (Analyst a Sr Manager). Toma el itinerario que corresponde a tu nivel.",
        xp: 20,
        icon: GraduationCap,
        resourceHref: "/resources#open-university",
        resourceLabel: "Ir a Open University",
      },
      {
        id: "beca-empower",
        title: "Anota el Programa Beca Empower",
        description:
          "Al cumplir tu primer año, puedes pedir subvención para un programa formativo externo (con anexo de permanencia). Plántalo en tu PAS.",
        xp: 10,
        icon: Coins,
      },
      {
        id: "afterwork",
        title: "Celebra en el Afterwork New Minsaiter",
        description:
          "Evento de cierre del onboarding. Conoce a tus pares de otras geografías, comparte aprendizajes y celebra superar el periodo de prueba.",
        xp: 20,
        icon: PartyPopper,
      },
    ],
  },
];

export const TOTAL_XP = LEVELS.reduce(
  (acc, lvl) => acc + lvl.challenges.reduce((a, c) => a + c.xp, 0),
  0
);

export const TOTAL_CHALLENGES = LEVELS.reduce(
  (acc, lvl) => acc + lvl.challenges.length,
  0
);

export const TOTAL_WEEKS = LEVELS.length;

/** XP de cada reto, indexado por `challenge_id` tal como se guarda en Supabase. */
const XP_BY_CHALLENGE: Record<ChallengeId, number> = Object.fromEntries(
  LEVELS.flatMap((lvl) => lvl.challenges.map((c) => [c.id, c.xp] as const))
);

export interface JourneySummary {
  /** XP acumulado, ponderado igual que la barra que ve el consultor. */
  xp: number;
  /** 0-100. Es el % de avance oficial del onboarding. */
  percent: number;
  challengesDone: number;
  weeksDone: number;
}

/**
 * Resume el avance de onboarding a partir de los `challenge_id` completados.
 *
 * Ignora ids que ya no existan en el catálogo: si un reto se retira, sus filas
 * siguen en `journey_progress` y sin este filtro el avance podría pasar de 100%.
 */
export function summarizeJourney(completedIds: Iterable<string>): JourneySummary {
  const done = new Set(completedIds);

  let xp = 0;
  let challengesDone = 0;
  for (const id of done) {
    const value = XP_BY_CHALLENGE[id];
    if (value === undefined) continue; // reto retirado del catálogo
    xp += value;
    challengesDone += 1;
  }

  const weeksDone = LEVELS.filter(
    (lvl) =>
      lvl.challenges.length > 0 && lvl.challenges.every((c) => done.has(c.id))
  ).length;

  return {
    xp,
    percent: TOTAL_XP === 0 ? 0 : Math.round((xp / TOTAL_XP) * 100),
    challengesDone,
    weeksDone,
  };
}
