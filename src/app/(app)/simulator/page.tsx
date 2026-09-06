"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  MessageSquare,
  Target,
  Zap,
  ChevronRight,
  TrendingUp,
  Brain,
  Clock,
  RefreshCw,
  Check,
  AlertTriangle,
  Trophy,
  Sparkles,
  RotateCcw,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Rotación · cada caso vigente 7 días
// ---------------------------------------------------------------------------
const ROTATION_DAYS = 7;
const ROTATION_MS = ROTATION_DAYS * 24 * 60 * 60 * 1000;
const EPOCH_MS = Date.UTC(2026, 0, 5, 0, 0, 0);

type Tension = "Baja" | "Media" | "Alta";
type Verdict = "best" | "good" | "risky";

interface SimuOption {
  id: string;
  label: string;
  text: string;
  accent: "success" | "mbc-electric" | "mbc-sky";
  icon: typeof TrendingUp;
  verdict: Verdict;
  score: number;
  reaction: string;
  analysis: string;
}

interface SimuCase {
  id: string;
  title: string;
  objective: string;
  client: string;
  sector: string;
  npc: { initials: string; name: string; role: string };
  npcMessage: string;
  tension: { level: Tension; percent: number; explanation: string };
  options: SimuOption[];
  tip: string;
}

const VERDICT_META: Record<Verdict, { label: string; color: string; bg: string; border: string; icon: typeof Check }> = {
  best: {
    label: "Excelente decisión",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/40",
    icon: Trophy,
  },
  good: {
    label: "Bien, pero hay mejor",
    color: "text-mbc-electric-strong",
    bg: "bg-mbc-sky/10",
    border: "border-mbc-sky/40",
    icon: Check,
  },
  risky: {
    label: "Cuidado con esa jugada",
    color: "text-amber-700",
    bg: "bg-amber-500/10",
    border: "border-amber-500/40",
    icon: AlertTriangle,
  },
};

const CASES: SimuCase[] = [
  {
    id: "error-numero",
    title: "Error en pleno comité",
    objective: "Resolver una inconsistencia sin perder credibilidad",
    client: "Banco mediano · Comité de Dirección",
    sector: "Servicios financieros",
    npc: {
      initials: "MV",
      name: "Mauricio Vega",
      role: "CFO · Comité del cliente",
    },
    npcMessage:
      "Espera. En la slide 14 dicen que la cargabilidad del equipo comercial es 87%. Yo tengo el reporte de RRHH abierto aquí mismo y dice 79%. ¿De dónde sale tu 87%?",
    tension: {
      level: "Alta",
      percent: 78,
      explanation:
        "Inconsistencia detectada en vivo. 7 personas mirando. La forma en que respondas vale más que el número.",
    },
    options: [
      {
        id: "verificar",
        label: "Ganar tiempo con plan",
        text: "Tienes razón en revisarlo. Déjame validar la fuente con mi equipo durante el break y te lo confirmo en los próximos 30 minutos. Mientras tanto, ¿podemos avanzar al siguiente punto?",
        accent: "success",
        icon: TrendingUp,
        verdict: "best",
        score: 100,
        reaction:
          "Mauricio asiente: 'Ok, lo dejamos para después del break. Pero quiero la respuesta antes de cerrar el comité.'",
        analysis:
          "Reconociste la observación sin asumir culpa, te diste tiempo sin parar la reunión, y pusiste un plazo concreto. Mantienes el control del comité y proteges la opción de defender el número si era correcto.",
      },
      {
        id: "defender",
        label: "Defender el dato en vivo",
        text: "Lo verifiqué con dos fuentes. Mi número viene de la extracción de Workday que ustedes mismos nos compartieron. Si quieres, lo abrimos en pantalla ahora.",
        accent: "mbc-sky",
        icon: Zap,
        verdict: "risky",
        score: 20,
        reaction:
          "Mauricio se cruza de brazos: 'Pues hagámoslo.' Toda la sala mira la pantalla mientras buscas la fuente. El silencio dura demasiado.",
        analysis:
          "Confrontaste en frío sin garantía 100% de tener razón. Si te equivocas en vivo, quemas la credibilidad de TODO el deck. Defender está bien cuando estás solo con el cliente, no en un comité con audiencia.",
      },
      {
        id: "asumir",
        label: "Asumir la culpa rápido",
        text: "Tienes razón, lo más probable es que cogí un corte distinto. Lo corrijo y mando la versión nueva esta misma tarde.",
        accent: "mbc-electric",
        icon: ShieldAlert,
        verdict: "risky",
        score: 20,
        reaction:
          "Mauricio asiente seco: 'Bien.' Pero su director financiero murmura algo y empieza a marcar otras slides con dudas.",
        analysis:
          "Asumiste el error antes de verificar. Quizás tu número era correcto y el de ellos estaba desactualizado. Disculparte rápido siente correcto pero abre la puerta a que cuestionen todo lo demás del deck.",
      },
    ],
    tip: "Cuando detectan una inconsistencia en vivo, primero gana tiempo con un plan concreto. Defender o asumir sin verificar te quita el control de la reunión.",
  },
  {
    id: "pregunta-sin-respuesta",
    title: "La pregunta que no esperabas",
    objective: "Responder lo que no sabes sin perder autoridad",
    client: "Aseguradora · Reunión semanal",
    sector: "Seguros",
    npc: {
      initials: "LM",
      name: "Lucía Marín",
      role: "Directora de Operaciones · Cliente",
    },
    npcMessage:
      "Una última cosa antes de cerrar. ¿Cómo afecta esta propuesta al cálculo de reservas técnicas según la SBS? Porque si me obligan a constituir un buffer extra, todo el caso de negocio cambia.",
    tension: {
      level: "Media",
      percent: 55,
      explanation:
        "No estaba en el scope. No sabes la respuesta. Lo que digas en los próximos 10 segundos define la confianza para el resto del proyecto.",
    },
    options: [
      {
        id: "honesto",
        label: "Honesto con plan",
        text: "Buen punto, Lucía. No lo hemos validado todavía con la normativa SBS. Te propongo levantar una opinión con compliance y entregártela en 48h con tu equipo legal involucrado.",
        accent: "success",
        icon: TrendingUp,
        verdict: "best",
        score: 100,
        reaction:
          "Lucía sonríe levemente: 'Prefiero eso a una respuesta inventada. Coordínalo con mi legal directo, su nombre es Andrea.'",
        analysis:
          "Decir 'no sé' con un plan concreto vale 10x más que improvisar bien. Lucía no esperaba que supieras de SBS — esperaba ver cómo manejas no saber. Construiste credibilidad para todo el resto del proyecto.",
      },
      {
        id: "improvisar",
        label: "Improvisar lo plausible",
        text: "Por lo que vimos en proyectos similares, la SBS suele aceptar este tipo de modelos siempre que se mantenga el coverage ratio. No debería haber buffer extra.",
        accent: "mbc-sky",
        icon: Zap,
        verdict: "risky",
        score: 20,
        reaction:
          "Lucía anota la respuesta: 'Perfecto, mandaré tu comentario a compliance para que lo confirmen.' Tu estómago se hunde un poco.",
        analysis:
          "Improvisaste algo que suena correcto. Si su compliance te contradice, no solo pierdes esta pregunta — pierdes la base de tu propuesta. Una respuesta no verificada por escrito termina en email enviado al cliente.",
      },
      {
        id: "esquivar",
        label: "Esquivar elegantemente",
        text: "Eso depende mucho de cómo lo presenten. Sugiero abordarlo en una sesión específica con tus expertos regulatorios.",
        accent: "mbc-electric",
        icon: ShieldAlert,
        verdict: "good",
        score: 60,
        reaction:
          "Lucía frunce el ceño: 'Bueno, vale. Pero ese punto bloquea la decisión. Necesito el ángulo regulatorio antes del próximo comité.'",
        analysis:
          "Esquivaste sin mentir, pero tampoco aportaste valor. El cliente nota que no sabes y le pasas su propio problema. Funciona pero deja una impresión tibia. Mejor honestidad + plan.",
      },
    ],
    tip: "Decir 'no sé' con un plan de respuesta concreta vale más que cualquier improvisación plausible. Los clientes premian la honestidad estructurada.",
  },
  {
    id: "scope-creep",
    title: "Solo una cosita más...",
    objective: "Manejar scope creep sin dañar la relación",
    client: "Retail multimarca · Email del sponsor",
    sector: "Retail & consumo",
    npc: {
      initials: "RC",
      name: "Roberto Cárdenas",
      role: "Sponsor del proyecto · Director Comercial",
    },
    npcMessage:
      "Antes del entregable final, ¿podrían incluir también el análisis de la región norte? Es solo replicar lo que ya hicieron para sur. No debería tomarles mucho, ¿verdad? Tenemos junta directiva el viernes y me ayudaría tenerlo.",
    tension: {
      level: "Media",
      percent: 50,
      explanation:
        "El sponsor pide algo razonable que en realidad suma 80 horas de trabajo. Decir 'sí' sin condiciones sienta precedente. Decir 'no' tajante daña la relación.",
    },
    options: [
      {
        id: "aceptar",
        label: "Aceptar sin reabrir",
        text: "Claro, lo incluimos. Es una extensión razonable de lo que ya tenemos. Te lo tenemos para el viernes.",
        accent: "success",
        icon: TrendingUp,
        verdict: "risky",
        score: 20,
        reaction:
          "Roberto responde inmediato: 'Genial, sabía que se podía. Aprovechando, ¿qué tal si añadimos también un breakdown por categoría de producto?'",
        analysis:
          "Sentaste el precedente de que 'cositas más' son gratis. La próxima petición será mayor. Además quemaste 80h de tu equipo que no están facturadas, lo cual tu manager va a notar en el margen del proyecto.",
      },
      {
        id: "negociar",
        label: "Negociar visible",
        text: "Es una buena idea. Te propongo esto: ampliamos a norte y movemos el entregable final 1 semana, sin cambio de fee. Si lo necesitas para el viernes, tendría que ser una versión parcial. ¿Cómo prefieres?",
        accent: "mbc-sky",
        icon: Zap,
        verdict: "best",
        score: 100,
        reaction:
          "Roberto responde: 'No, el viernes parcial me sirve. Quiero ese material para defender presupuesto, no necesito profundidad todavía.'",
        analysis:
          "Aceptaste el valor de la idea pero pusiste un costo visible (tiempo, no dinero). Le diste al sponsor la elección. Esto te protege en margen, mantiene la relación, y a Roberto le sirve la versión parcial porque su necesidad real era política, no analítica.",
      },
      {
        id: "rechazar",
        label: "Rechazar formal",
        text: "Roberto, el alcance está cerrado en la propuesta. Si quieren incluir norte, podemos abrir un addendum con cifras y plazos nuevos. Te paso una cotización hoy.",
        accent: "mbc-electric",
        icon: ShieldAlert,
        verdict: "good",
        score: 60,
        reaction:
          "Roberto responde tras 2 horas: 'Mira, déjalo. Lo armo internamente. Hablamos en el comité del lunes.' Te queda la sensación de haber perdido un punto.",
        analysis:
          "Es la respuesta más correcta contractualmente pero suena rígida para una relación que aún se está construyendo. La línea entre 'profesional' y 'frío' es delgada. Mejor cuando ya hay 6+ meses de relación. Antes, negocia visible.",
      },
    ],
    tip: "Al scope creep, di sí con una contrapartida visible (tiempo, alcance, profundidad). Nunca regales horas sin que el cliente sepa el costo.",
  },
  {
    id: "stakeholder-bloqueador",
    title: "El que no quiere darte la data",
    objective: "Desbloquear la entrega sin quemar capital político",
    client: "Industrial · Gerencia de TI",
    sector: "Industria",
    npc: {
      initials: "RL",
      name: "Raúl Lozano",
      role: "Gerente de TI · Cliente",
    },
    npcMessage:
      "Mira, te he mandado el access request tres veces. Aquí en TI tenemos cola de 20 tickets de proyectos prioritarios. Tu data va a tener que esperar 3 semanas. Sé que vienes por la directiva, pero la prioridad la pongo yo.",
    tension: {
      level: "Alta",
      percent: 72,
      explanation:
        "Bloqueo activo. No es maldad — es carga. Pero el proyecto se atrasa 3 semanas si esperas y tu sponsor está mirando.",
    },
    options: [
      {
        id: "negociar",
        label: "Reducir su carga",
        text: "Raúl, te entiendo. Si te paso una lista exacta de las 4 tablas y las columnas específicas que necesito — para que sea solo un export — ¿podrías sacarlo el viernes? Reduce el ticket a 30 min de trabajo.",
        accent: "success",
        icon: TrendingUp,
        verdict: "best",
        score: 100,
        reaction:
          "Raúl se relaja: 'Si me lo dejas tan concreto, lo saco el jueves. Pero confírmame las tablas hoy.'",
        analysis:
          "Convertiste el bloqueo en colaboración haciendo tu trabajo más fácil para él. Raúl no quería molestarte, quería defenderse de un ticket vago. Cuando concretas, le ahorras tiempo a su equipo y te conviertes en su aliado.",
      },
      {
        id: "escalar",
        label: "Escalar al sponsor",
        text: "Entiendo. Voy a llevar el tema a la próxima reunión de sponsor del proyecto para que se priorice formalmente.",
        accent: "mbc-sky",
        icon: Zap,
        verdict: "good",
        score: 60,
        reaction:
          "Raúl asiente seco: 'Haz lo que tengas que hacer.' Sales con la data pero notas que el siguiente request va a ser más lento aún.",
        analysis:
          "Camino legítimo pero quemaste una bala política. Raúl ahora te ve como 'el que va al jefe en lugar de hablar conmigo'. Funciona una vez. La próxima vez vas a estar al final de la cola otra vez.",
      },
      {
        id: "presion",
        label: "Apelar a la directiva",
        text: "Hablé con tu director general y mencionó que esta es una prioridad para él. ¿Te paso copia del email para que ajustes tu cola?",
        accent: "mbc-electric",
        icon: ShieldAlert,
        verdict: "risky",
        score: 20,
        reaction:
          "Raúl te mira fijo unos segundos: 'Perfecto. Te lo saco cuando aparezca el email firmado.' La temperatura de la sala bajó 5 grados.",
        analysis:
          "Te convertiste en 'el consultor chivato'. Aunque consigas la data esta vez, dañaste la relación con un stakeholder que vas a necesitar por 6 meses más. La presión política funciona una sola vez antes de aislarte.",
      },
    ],
    tip: "Cuando un stakeholder te bloquea sin maldad, su problema es la carga, no tú. Reduce su trabajo antes de escalarlo. Las balas políticas son escasas.",
  },
  {
    id: "partner-cuestiona",
    title: "El partner no está convencido",
    objective: "Defender tu análisis sin pelear, ni ceder sin criterio",
    client: "Interno MBC · Revisión de equipo",
    sector: "Interno · Management & Business Consulting",
    npc: {
      initials: "AP",
      name: "Ana Paredes",
      role: "Senior Manager · Tu responsable de proyecto",
    },
    npcMessage:
      "Revisé tu análisis de rentabilidad por segmento. No estoy convencida de la conclusión: dices que cliente premium es el más rentable, pero el modelo no parece capturar el costo de adquisición. Antes de mostrárselo al cliente quiero que rehagas con otra hipótesis. Tienes hasta el miércoles.",
    tension: {
      level: "Alta",
      percent: 75,
      explanation:
        "Faltan 2 días para el deck final. Si rehaces todo, no entregas. Si no rehaces, tu Sr Manager va al cliente con dudas. Y tu evaluación pasa por ella.",
    },
    options: [
      {
        id: "defender",
        label: "Defender con datos",
        text: "Ana, antes de rehacer, ¿puedo pasarte 15 min mañana para mostrarte el análisis de sensibilidad? El CAC sí está incluido en la columna H. Si después de verlo sigues con dudas, lo rehago el miércoles sin problema.",
        accent: "success",
        icon: TrendingUp,
        verdict: "best",
        score: 100,
        reaction:
          "Ana abre la calendar: 'Ok, mañana a las 9. Si me convences, vamos con tu versión. Si no, rehaces.'",
        analysis:
          "Defendiste tu trabajo con respeto y datos. Mostraste que escuchaste su preocupación específica (CAC) y propusiste el camino más eficiente para todos. Si tienes razón, sales con tu análisis intacto. Si no, igual rehaces a tiempo. Cero pierde.",
      },
      {
        id: "aceptar",
        label: "Aceptar y rehacer todo",
        text: "Claro, Ana. Lo rehago con la hipótesis nueva. Te lo paso mañana en la noche para revisión final el miércoles.",
        accent: "mbc-sky",
        icon: Zap,
        verdict: "good",
        score: 60,
        reaction:
          "Ana asiente: 'Bien.' Sales del meeting con 2 noches en blanco por delante. Y tu análisis original — que probablemente era correcto — nunca verá la luz.",
        analysis:
          "Cumpliste sin fricción pero no defendiste tu criterio. Esto erosiona dos cosas: tu propio aprendizaje (¿estaba bien o mal tu análisis original?) y la percepción que Ana tiene de ti como alguien que se sostiene en su análisis. Promociones se construyen también con desacuerdos bien manejados.",
      },
      {
        id: "delegar",
        label: "Repartir con el equipo",
        text: "Te entiendo. Voy a coordinar con Diego y Lucía para repartir la nueva versión y entregar a tiempo. Te paso un borrador esta noche.",
        accent: "mbc-electric",
        icon: ShieldAlert,
        verdict: "risky",
        score: 20,
        reaction:
          "Ana frunce el ceño: 'Diego y Lucía están en otro proyecto. Esto lo haces tú porque tú lo armaste. Y tampoco quiero que lo entregues sin pensarlo.'",
        analysis:
          "Saltaste a la solución logística antes de evaluar si la solicitud era correcta. Movilizaste recursos del equipo (que ya están ocupados) y proyectaste que delegas el problema en lugar de razonarlo. La Sr Manager quiere ver tu criterio, no tu capacidad de tercerizar.",
      },
    ],
    tip: "Antes de aceptar rehacer trabajo, defiende tu análisis con datos. Una buena defensa o te da el OK, o te aclara qué rehacer. Cualquiera de las dos es mejor que dos noches en blanco rehaciendo a ciegas.",
  },
];

// ---------------------------------------------------------------------------

function useRotation() {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  return useMemo(() => {
    const elapsed = now - EPOCH_MS;
    const slot = Math.floor(elapsed / ROTATION_MS);
    const activeIdx = ((slot % CASES.length) + CASES.length) % CASES.length;
    const nextIdx = (activeIdx + 1) % CASES.length;
    const slotStart = EPOCH_MS + slot * ROTATION_MS;
    const slotEnd = slotStart + ROTATION_MS;
    const remainingMs = slotEnd - now;
    const elapsedInSlot = now - slotStart;
    const progressPct = Math.min(100, Math.max(0, (elapsedInSlot / ROTATION_MS) * 100));
    return {
      active: CASES[activeIdx],
      next: CASES[nextIdx],
      activeIdx,
      nextIdx,
      remainingMs,
      progressPct,
      slotEnd,
    };
  }, [now]);
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return "Cambiando...";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  if (days >= 1) return `${days}d ${hours}h`;
  if (hours >= 1) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

const ACCENT = {
  success: { text: "text-success", border: "hover:border-success/50", bg: "from-success/10" },
  "mbc-electric": {
    text: "text-mbc-blue",
    border: "hover:border-mbc-electric/50",
    bg: "from-mbc-electric/10",
  },
  "mbc-sky": { text: "text-mbc-electric-strong", border: "hover:border-mbc-sky/50", bg: "from-mbc-sky/10" },
};

// ---------------------------------------------------------------------------

export default function SimuladorPage() {
  const { active, next, activeIdx, remainingMs, progressPct, slotEnd } = useRotation();
  const totalCases = CASES.length;

  // Per-case state of which option was chosen + cumulative XP across attempts.
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<Record<string, number>>({}); // optionId -> times
  const [totalXP, setTotalXP] = useState<number>(8450);

  // Reset chosen when active case changes (rotation tick)
  useEffect(() => {
    setChosenOptionId(null);
    setAttempts({});
  }, [active.id]);

  const chosenOption = active.options.find((o) => o.id === chosenOptionId) ?? null;

  function pick(opt: SimuOption) {
    // Only award XP on the FIRST attempt for each option (so retries don't farm)
    if (!attempts[opt.id]) {
      setTotalXP((x) => x + opt.score);
    }
    setAttempts((a) => ({ ...a, [opt.id]: (a[opt.id] ?? 0) + 1 }));
    setChosenOptionId(opt.id);
  }

  function retry() {
    setChosenOptionId(null);
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Banner de rotación */}
      <div className="glass-panel rounded-3xl p-5 md:p-6 border border-surface-container">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-mbc-electric/10 border border-mbc-electric/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-mbc-blue" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-0.5">
                Caso vigente · {activeIdx + 1} / {totalCases}
                <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px]">
                  rota cada {ROTATION_DAYS} días
                </span>
              </div>
              <p className="text-sm text-on-surface">
                <span className="font-bold">{active.client}</span> · {active.sector}
              </p>
            </div>
          </div>
          <div className="md:text-right shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Próximo caso en
            </p>
            <p className="text-xl font-bold text-mbc-blue flex items-center md:justify-end gap-2">
              <RefreshCw className="w-4 h-4" />
              {formatRemaining(remainingMs)}
            </p>
            <p className="text-[10px] text-on-surface-variant">
              ↻ {new Date(slotEnd).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}
              {" "}· "{next.title}"
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-surface-container rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-mbc-electric via-mbc-sky to-success"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-on-surface-variant">
          <span>Inicio del caso</span>
          <span>Rotación</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main */}
        <section className="flex-1 flex flex-col relative rounded-3xl overflow-hidden border border-surface-container bg-surface-container/20 min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-mbc-blue/30 via-background to-background opacity-80" />

          <header className="relative z-10 p-6 flex justify-between items-center border-b border-surface-container backdrop-blur-md bg-surface/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-mbc-electric/10 flex items-center justify-center border border-mbc-electric/20">
                <MessageSquare className="text-mbc-blue w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-surface">{active.title}</h2>
                <p className="text-sm text-on-surface-variant flex items-center gap-2">
                  <Target className="w-3 h-3 text-success" />
                  <span>Objetivo: {active.objective}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                Puntaje
              </p>
              <p className="text-xl font-bold text-mbc-electric-strong">
                {totalXP.toLocaleString()}{" "}
                <span className="text-xs text-on-surface-variant">XP</span>
              </p>
            </div>
          </header>

          <div className="relative z-10 flex-1 flex flex-col p-8 justify-end">
            <div className="max-w-3xl mb-8 space-y-6">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-surface/80 backdrop-blur-lg border border-surface-container rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="text-xs font-bold text-on-surface-variant">
                      {active.npc.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">{active.npc.name}</h4>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                      {active.npc.role}
                    </p>
                  </div>
                </div>
                <p className="text-lg text-on-surface leading-relaxed">"{active.npcMessage}"</p>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {!chosenOption ? (
                <motion.div
                  key="options"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
                >
                  {active.options.map((opt, i) => {
                    const Icon = opt.icon;
                    const acc = ACCENT[opt.accent];
                    const span =
                      i === active.options.length - 1 && active.options.length % 2 === 1
                        ? "md:col-span-2"
                        : "";
                    return (
                      <motion.button
                        key={opt.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => pick(opt)}
                        className={`group flex flex-col text-left p-5 rounded-2xl border border-surface-container bg-surface-container/30 hover:bg-surface-container/60 ${acc.border} transition-all relative overflow-hidden ${span}`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${acc.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                        />
                        <div className="relative z-10 flex justify-between items-start mb-2">
                          <span
                            className={`text-[10px] font-bold ${acc.text} uppercase tracking-widest flex items-center gap-1`}
                          >
                            <Icon className="w-3 h-3" /> {opt.label}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 text-on-surface-variant group-hover:${acc.text} transition-colors`}
                          />
                        </div>
                        <p className="text-sm font-medium text-on-surface relative z-10">
                          "{opt.text}"
                        </p>
                      </motion.button>
                    );
                  })}
                </motion.div>
              ) : (
                <FeedbackPanel
                  key="feedback"
                  option={chosenOption}
                  npcName={active.npc.name}
                  npcInitials={active.npc.initials}
                  tip={active.tip}
                  onRetry={retry}
                  attemptCount={attempts[chosenOption.id] ?? 1}
                />
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                Termómetro de Reunión
              </h3>
              <div className="w-2 h-2 rounded-full bg-mbc-electric-strong animate-pulse" />
            </div>
            <div className="mb-2 flex justify-between items-end">
              <span className="text-2xl font-bold text-on-surface">
                Tensión {active.tension.level}
              </span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <motion.div
                key={active.id}
                initial={{ width: "30%" }}
                animate={{ width: `${active.tension.percent}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="bg-gradient-to-r from-mbc-sky to-mbc-electric h-full"
              />
            </div>
            <p className="text-xs text-on-surface-variant mt-4">{active.tension.explanation}</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 flex-1">
            <h3 className="text-[10px] font-bold tracking-widest text-on-surface-variant mb-6 uppercase flex items-center gap-2">
              <Brain className="w-4 h-4" /> Desarrollo de Skills
            </h3>
            <div className="space-y-6">
              <SkillBar label="Habilidad de comunicación" lvl={4} color="success" />
              <SkillBar label="Relación con el cliente" lvl={2} color="mbc-electric" />
              <SkillBar label="Problem Solving" lvl={3} color="mbc-sky" />
            </div>
            <div className="mt-8 p-4 rounded-xl border border-mbc-electric/20 bg-mbc-electric/5">
              <p className="text-xs text-on-surface">
                <span className="font-bold text-mbc-blue">Tip del Copilot:</span> {active.tip}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

interface FeedbackPanelProps {
  option: SimuOption;
  npcName: string;
  npcInitials: string;
  tip: string;
  onRetry: () => void;
  attemptCount: number;
}
function FeedbackPanel({
  option,
  npcName,
  npcInitials,
  tip,
  onRetry,
  attemptCount,
}: FeedbackPanelProps) {
  const meta = VERDICT_META[option.verdict];
  const Icon = meta.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl space-y-4"
    >
      {/* Tu elección */}
      <div className={`rounded-2xl border ${meta.border} ${meta.bg} p-5`}>
        <div className="flex items-center justify-between mb-3">
          <span
            className={`inline-flex items-center gap-2 text-xs font-bold ${meta.color} uppercase tracking-widest`}
          >
            <Icon className="w-4 h-4" /> {meta.label}
          </span>
          <span className={`text-sm font-bold ${meta.color}`}>
            +{attemptCount === 1 ? option.score : 0} XP
            {attemptCount > 1 && (
              <span className="text-[10px] ml-1 text-on-surface-variant">
                (intento {attemptCount} · sin XP extra)
              </span>
            )}
          </span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
          Tu respuesta · {option.label}
        </p>
        <p className="text-sm text-on-surface italic">"{option.text}"</p>
      </div>

      {/* Reacción del NPC */}
      <div className="bg-surface/80 backdrop-blur-lg border border-surface-container rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
            <span className="text-xs font-bold text-on-surface-variant">{npcInitials}</span>
          </div>
          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
            Reacción de {npcName}
          </p>
        </div>
        <p className="text-sm text-on-surface leading-relaxed">{option.reaction}</p>
      </div>

      {/* Análisis del coach */}
      <div className="glass-panel rounded-2xl border border-surface-container p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-mbc-blue" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Análisis del coach
          </p>
        </div>
        <p className="text-sm text-on-surface leading-relaxed">{option.analysis}</p>
      </div>

      {/* Aprendizaje + acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <p className="text-xs text-on-surface-variant flex items-center gap-2">
          <Brain className="w-3.5 h-3.5 text-mbc-blue shrink-0" />
          <span>
            <span className="font-bold text-on-surface">Aprendizaje:</span> {tip}
          </span>
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-on-surface hover:bg-mbc-electric-strong text-background hover:text-white text-sm font-bold transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4" /> Probar otra opción
        </button>
      </div>
    </motion.div>
  );
}

interface SkillBarProps {
  label: string;
  lvl: number;
  color: "success" | "mbc-electric" | "mbc-sky";
}
function SkillBar({ label, lvl, color }: SkillBarProps) {
  const bg =
    color === "success"
      ? "bg-success"
      : color === "mbc-electric"
      ? "bg-mbc-electric-strong"
      : "bg-mbc-sky";
  const text =
    color === "success"
      ? "text-success"
      : color === "mbc-electric"
      ? "text-mbc-blue"
      : "text-mbc-electric-strong";
  return (
    <div>
      <div className="flex justify-between text-xs text-on-surface mb-2">
        <span className="font-medium">{label}</span>
        <span className={`${text} font-bold`}>Lvl {lvl}</span>
      </div>
      <div className="flex gap-1 h-1.5 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full ${i < lvl ? bg : "bg-surface-container"}`}
          />
        ))}
      </div>
    </div>
  );
}
