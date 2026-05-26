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
  accent: "tertiary" | "electric-rose" | "primary";
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
    color: "text-tertiary",
    bg: "bg-tertiary/10",
    border: "border-tertiary/40",
    icon: Trophy,
  },
  good: {
    label: "Bien, pero hay mejor",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/40",
    icon: Check,
  },
  risky: {
    label: "Cuidado con esa jugada",
    color: "text-electric-rose",
    bg: "bg-electric-rose/10",
    border: "border-electric-rose/40",
    icon: AlertTriangle,
  },
};

const CASES: SimuCase[] = [
  {
    id: "neo-logistics",
    title: "Módulo de Sinergia C-Level",
    objective: "Ganar la confianza del CFO",
    client: "Neo Logistics",
    sector: "Logística & Supply Chain",
    npc: { initials: "HR", name: "Helena Rodríguez", role: "CFO · Neo Logistics" },
    npcMessage:
      "He revisado la propuesta preliminar. Los números no cuadran con nuestra proyección del Q3. Si van a reestructurar la cadena de suministro, necesito garantías de que el margen no caerá por debajo del 12%. ¿Cómo planean asegurar esto en los primeros tres meses?",
    tension: {
      level: "Alta",
      percent: 75,
      explanation:
        "El CFO está a la defensiva sobre el margen. Requiere evidencia cuantitativa o reducción de riesgo.",
    },
    options: [
      {
        id: "analytical",
        label: "Enfoque Analítico",
        text: "Nuestros modelos de IA predictiva muestran que optimizando rutas B y C reduciremos los costos operativos un 15%, compensando cualquier caída de margen.",
        accent: "tertiary",
        icon: TrendingUp,
        verdict: "good",
        score: 60,
        reaction:
          "Helena anota algo y levanta la vista: 'El 15% es una promesa, no una garantía. ¿De dónde sale ese número?'",
        analysis:
          "El dato es relevante pero responde a la pregunta equivocada. Helena pidió GARANTÍAS, no proyecciones. Aterrizar el dato a un compromiso (penalty clause, KPI auditable) lo convertiría en una mejor respuesta.",
      },
      {
        id: "objection",
        label: "Manejo de Objeciones",
        text: "Entiendo, Helena. El 12% es la línea roja. Hemos diseñado una fase de contingencia de 30 días donde el algoritmo corre en paralelo sin afectar la operación actual.",
        accent: "electric-rose",
        icon: ShieldAlert,
        verdict: "best",
        score: 100,
        reaction:
          "Helena suaviza el tono: 'Eso me da margen para defenderlo internamente. Mándame el plan de los 30 días por escrito.'",
        analysis:
          "Bajaste la tensión reconociendo la línea roja del cliente y ofreciendo una salida sin riesgo. La fase de contingencia transforma la decisión de 'apuesta' a 'experimento controlado'.",
      },
      {
        id: "value",
        label: "Propuesta de Valor",
        text: "El valor real no está en proteger el 12% a corto plazo, sino en desbloquear un crecimiento sostenido del 18% para el Q4.",
        accent: "primary",
        icon: Zap,
        verdict: "risky",
        score: 20,
        reaction:
          "Helena cruza los brazos: 'Mi Q4 depende de no morir en el Q3. Si no puedes protegerme ahora, no me sirve tu Q4.'",
        analysis:
          "Saltaste la objeción real (el riesgo inmediato) hablando del upside futuro. Cuando el cliente está en modo defensivo, las promesas a largo plazo se leen como evasión.",
      },
    ],
    tip: "Cuando el cliente plantea una objeción de riesgo inmediato, primero baja la temperatura con un plan de mitigación. El upside se vende después.",
  },
  {
    id: "core-banking",
    title: "Modernización del Core Bancario",
    objective: "Convencer al CTO escéptico de la migración por fases",
    client: "Banco Regional Andino",
    sector: "Banca · Servicios Financieros",
    npc: { initials: "MC", name: "Mauricio Castillo", role: "CTO · Banco Regional Andino" },
    npcMessage:
      "Otra consultora intentó esto hace 2 años y nos quedamos un sábado entero offline. Si te doy luz verde para tocar el core, necesito un plan de rollback que se ejecute en menos de 4 horas. Mi gente está quemada con migraciones.",
    tension: {
      level: "Alta",
      percent: 80,
      explanation:
        "Mala experiencia previa. El miedo al downtime pesa más que cualquier business case.",
    },
    options: [
      {
        id: "rollback",
        label: "Plan de Rollback",
        text: "Diseñamos un strangler pattern: el core viejo y el nuevo conviven 90 días con feature flag. Rollback es flip de bandera, no migración inversa. <4h garantizadas.",
        accent: "electric-rose",
        icon: ShieldAlert,
        verdict: "best",
        score: 100,
        reaction:
          "Mauricio asiente despacio: 'Ok, eso sí es serio. ¿Cuándo me lo puedes presentar a mi comité?'",
        analysis:
          "Atacaste el trauma directamente con una solución arquitectónica concreta (strangler pattern). Cumpliste el SLA pedido sin negociarlo. Eso construye credibilidad técnica instantánea.",
      },
      {
        id: "showcase",
        label: "Referencia Cercana",
        text: "Hemos migrado el core de 3 bancos en LatAm con metodología Strangler. Te pongo en contacto con el CTO de uno este viernes para que te cuente sin filtro.",
        accent: "tertiary",
        icon: TrendingUp,
        verdict: "good",
        score: 60,
        reaction:
          "Mauricio entrecierra los ojos: 'Las referencias siempre dicen lo bueno. Mándame el caso pero también dime tu plan técnico.'",
        analysis:
          "La prueba social construye confianza pero no responde a la preocupación inmediata. Funciona como complemento, no como respuesta principal. Un CTO experimentado quiere arquitectura, no testimonios.",
      },
      {
        id: "value",
        label: "Propuesta de Valor",
        text: "Mauricio, el riesgo de no hacerlo también cuenta: cada mes en el core legacy pierdes 1.2% de market share en clientes digitales. Eso es 18% al año.",
        accent: "primary",
        icon: Zap,
        verdict: "risky",
        score: 20,
        reaction:
          "Mauricio se inclina hacia adelante: 'Estás presionándome. Mi trabajo no es perseguir market share, es no romper el sistema.'",
        analysis:
          "Disparaste loss aversion antes de bajar el miedo al downtime. Un CTO con trauma de migración no procesa el costo de oportunidad — procesa el riesgo operativo. Inviertes el orden.",
      },
    ],
    tip: "Cuando el cliente arrastra trauma de implementaciones pasadas, primero le das certeza técnica. La visión estratégica viene después.",
  },
  {
    id: "data-retail",
    title: "Monetización del Dato",
    objective: "Convencer al CDO de una plataforma de datos unificada",
    client: "Grupo Retail Multimarca",
    sector: "Retail & Consumo",
    npc: { initials: "VG", name: "Valeria Guerrero", role: "Chief Data Officer · Grupo Retail" },
    npcMessage:
      "Tengo 4 data lakes, 7 ETLs distintos y 3 vendors gritándome que solo el suyo unifica todo. ¿Qué te hace diferente y por qué tu propuesta dura 9 meses si me venden lo mismo en 4?",
    tension: {
      level: "Media",
      percent: 55,
      explanation:
        "La CDO está abrumada por vendors. Compite el rigor metodológico contra promesas rápidas.",
    },
    options: [
      {
        id: "phased",
        label: "Roadmap por Olas",
        text: "Nuestros 9 meses no son monolíticos: ola 1 (mes 1-3) son quick wins en marketing data. Si no ves ROI antes del mes 4, paramos sin penalidad.",
        accent: "tertiary",
        icon: TrendingUp,
        verdict: "good",
        score: 60,
        reaction:
          "Valeria toma nota: 'Interesante el opt-out. Pero los quick wins suenan a placebo. ¿Qué hace tu metodología?'",
        analysis:
          "El opt-out es una buena táctica defensiva pero no te diferencia. Compites en plazos en lugar de en sustancia. Una CDO experimentada va a comparar tu opt-out contra cualquier otro vendor.",
      },
      {
        id: "differentiator",
        label: "Diferenciador",
        text: "Los otros venden la plataforma. Nosotros traemos un governance model basado en data products (data mesh) que convierte tu CDO office en una unidad de servicio interna.",
        accent: "primary",
        icon: Zap,
        verdict: "best",
        score: 100,
        reaction:
          "Valeria deja el lápiz: 'Eso sí es distinto. Cuéntame cómo opera la data mesh aquí — sectoriales, dominios, ownership.'",
        analysis:
          "Cambiaste el plano de la conversación: dejaste de competir en tecnología y pasaste a método organizacional. Una CDO bajo presión de vendors siempre prefiere la conversación de gobierno a la de stack.",
      },
      {
        id: "objection",
        label: "Manejo de Objeciones",
        text: "Valeria, los 4 meses suelen incluir solo la ingesta. Pregúntales por el modelo de gobierno y verás que se cae. Llevamos 6 implementaciones en Retail solo este año.",
        accent: "electric-rose",
        icon: ShieldAlert,
        verdict: "risky",
        score: 20,
        reaction:
          "Valeria se cruza de brazos: 'Si tan seguros estás de tu solución, no necesitas hablarme mal de los otros.'",
        analysis:
          "Hablar mal de los competidores ante un CDO experimentado proyecta inseguridad. Tu producto debe sostenerse solo. Esta táctica funciona mejor con compradores junior, no con C-level técnico.",
      },
    ],
    tip: "Cuando compites contra vendors técnicamente similares, mueve la conversación al plano de método (gobierno, ownership) en lugar de defender features.",
  },
  {
    id: "telco-cost",
    title: "Reducción de Costes Operativos",
    objective: "Bajar la temperatura del COO bajo presión del board",
    client: "Operadora Telco",
    sector: "Telecomunicaciones",
    npc: { initials: "JA", name: "Jorge Andrade", role: "COO · Operadora Telco" },
    npcMessage:
      "El board quiere -15% en OPEX para fin de año. Llevamos 6 meses recortando y el equipo está exhausto. Si vienes a decirme 'optimicemos procesos' una vez más, sales por esa puerta.",
    tension: {
      level: "Alta",
      percent: 85,
      explanation:
        "Equipo agotado, COO bajo presión política. La fatiga es un activo mal gestionado: hay margen sin recortar más cabezas.",
    },
    options: [
      {
        id: "automation",
        label: "Automatización",
        text: "Identificamos 12 procesos backoffice donde RPA libera 4.500 horas/mes sin tocar headcount. Eso son 8 puntos de OPEX antes de Q4.",
        accent: "tertiary",
        icon: TrendingUp,
        verdict: "good",
        score: 60,
        reaction:
          "Jorge baja la guardia un poco: 'Las horas suenan reales. Pero RPA es 2018, ¿qué hace al tuyo distinto?'",
        analysis:
          "Aterrizaste en cifras concretas y eso ayuda, pero Jorge ya está cansado de 'optimicemos'. Faltó conectar con su agotamiento emocional antes de soltar la solución. La técnica fría enfría a alguien quemado.",
      },
      {
        id: "objection",
        label: "Manejo de Objeciones",
        text: "Jorge, te entiendo. No vengo a recortar más, vengo a devolverle horas a tu gente. La promesa es: tu equipo trabaja menos y entrega más en Q4. ¿Te interesa cómo?",
        accent: "electric-rose",
        icon: ShieldAlert,
        verdict: "best",
        score: 100,
        reaction:
          "Jorge afloja los hombros y asiente: 'Ok. Cuéntame. Si lo que tienes es real, te doy 30 min con mi gente.'",
        analysis:
          "Inviertes el frame: el cliente espera otro 'optimicemos' y le ofreces 'aliviar al equipo'. Reconoces el costo humano antes que el costo de OPEX. Eso destraba la puerta que el board cierra con presión.",
      },
      {
        id: "value",
        label: "Propuesta de Valor",
        text: "El -15% sin estrategia es masacre. Te propongo -10% con automatización pura y -5% real que sale solo en Q1 cuando los nuevos procesos hayan madurado.",
        accent: "primary",
        icon: Zap,
        verdict: "risky",
        score: 20,
        reaction:
          "Jorge se tensa: 'No le voy al board con 'masacre'. Y -5% en Q1 no le interesa al board ahora.'",
        analysis:
          "El lenguaje fuerte ('masacre') puede leerse como agresivo o moralizante. Además, mover la meta del board a Q1 sin haber construido confianza primero es prematuro. La idea es buena, el timing es malo.",
      },
    ],
    tip: "Cuando el cliente está agotado, el lenguaje empático destraba más puertas que cualquier dato. Reconoce el costo humano antes que el costo financiero.",
  },
  {
    id: "energy-transition",
    title: "Transición Energética",
    objective: "Alinear al Director de Sostenibilidad con un plan a 3 años",
    client: "Utility Eléctrica",
    sector: "Energía & Sostenibilidad",
    npc: {
      initials: "ED",
      name: "Elena Domínguez",
      role: "Directora de Sostenibilidad · Utility Eléctrica",
    },
    npcMessage:
      "Mi mandato es net-zero a 2030. Tu plan habla de 2027. Si no puedes acelerar, el competidor 2 ya me presentó un plan a 2026 con compromiso de penalty si fallan. ¿Por qué iría con ustedes?",
    tension: {
      level: "Media",
      percent: 60,
      explanation:
        "Decisión política presionada por el regulador. El compromiso del competidor activa loss-aversion.",
    },
    options: [
      {
        id: "realism",
        label: "Realismo Estratégico",
        text: "Su competidor compromete 2026 con penalty porque sabe que va a fallar y absorber el costo. Nosotros entregamos 2027 sin asterisco, con auditoría externa cada 6 meses.",
        accent: "electric-rose",
        icon: ShieldAlert,
        verdict: "best",
        score: 100,
        reaction:
          "Elena se reclina y sonríe levemente: 'Esa lectura coincide con lo que vi en sus números. Quiero saber más sobre tu modelo de auditoría.'",
        analysis:
          "Cambiaste la pregunta. En lugar de competir en fechas, expusiste el incentivo perverso del competidor (prometer y pagar penalty). La auditoría externa cada 6 meses convierte tu plan en algo verificable, que es lo que el regulador valora.",
      },
      {
        id: "acceleration",
        label: "Aceleración",
        text: "Podemos llevar el plan a 2026.5 si activamos en paralelo solar distribuido en sucursales y un PPA verde para los 3 sites más grandes. Te dejo cifras esta semana.",
        accent: "tertiary",
        icon: TrendingUp,
        verdict: "good",
        score: 60,
        reaction:
          "Elena toma notas: 'Suena interesante, pero ahora estás cerca del competidor. ¿Qué más me das?'",
        analysis:
          "Aceptaste la cancha del competidor (velocidad) en lugar de redefinirla (credibilidad). Acelerar es viable pero te pone en una guerra que el competidor ya prepara. Mejor disparar primero la lectura crítica de su plan.",
      },
      {
        id: "value",
        label: "Propuesta de Valor",
        text: "El verdadero KPI no es la fecha, es el bond verde que emitirán al alcanzarlo. Cuanto más creíble el plan, mejor el rating. Trabajamos con Moody's en este tema.",
        accent: "primary",
        icon: Zap,
        verdict: "good",
        score: 60,
        reaction:
          "Elena levanta una ceja: 'Cierto, el rating importa. ¿Cómo se materializa tu trabajo con Moody's en mi plan?'",
        analysis:
          "Conectaste con un KPI real (rating del bond verde) y mostraste una credencial fuerte. Pero todavía no respondiste al miedo del momento: el competidor con penalty. Es bueno como segundo argumento, no como primer impacto.",
      },
    ],
    tip: "Cuando un competidor establece la cancha (fecha + penalty), expón el incentivo perverso detrás. La credibilidad gana donde la velocidad invita a fallar.",
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
  tertiary: { text: "text-tertiary", border: "hover:border-tertiary/50", bg: "from-tertiary/10" },
  "electric-rose": {
    text: "text-electric-rose",
    border: "hover:border-electric-rose/50",
    bg: "from-electric-rose/10",
  },
  primary: { text: "text-primary", border: "hover:border-primary/50", bg: "from-primary/10" },
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
            <div className="w-10 h-10 rounded-xl bg-electric-rose/10 border border-electric-rose/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-electric-rose" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-0.5">
                Caso vigente · {activeIdx + 1} / {totalCases}
                <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-[10px]">
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
            <p className="text-xl font-bold text-electric-rose flex items-center md:justify-end gap-2">
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
            className="h-full bg-gradient-to-r from-electric-rose via-primary to-tertiary"
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
          <div className="absolute inset-0 bg-gradient-to-br from-deep-plum/30 via-background to-background opacity-80" />

          <header className="relative z-10 p-6 flex justify-between items-center border-b border-surface-container backdrop-blur-md bg-surface/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-electric-rose/10 flex items-center justify-center border border-electric-rose/20">
                <MessageSquare className="text-electric-rose w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-surface">{active.title}</h2>
                <p className="text-sm text-on-surface-variant flex items-center gap-2">
                  <Target className="w-3 h-3 text-tertiary" />
                  <span>Objetivo: {active.objective}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                Puntaje
              </p>
              <p className="text-xl font-bold text-primary">
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
              <div className="w-2 h-2 rounded-full bg-electric-rose animate-pulse" />
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
                className="bg-gradient-to-r from-primary to-electric-rose h-full"
              />
            </div>
            <p className="text-xs text-on-surface-variant mt-4">{active.tension.explanation}</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 flex-1">
            <h3 className="text-[10px] font-bold tracking-widest text-on-surface-variant mb-6 uppercase flex items-center gap-2">
              <Brain className="w-4 h-4" /> Desarrollo de Skills
            </h3>
            <div className="space-y-6">
              <SkillBar label="Habilidad de comunicación" lvl={4} color="tertiary" />
              <SkillBar label="Relación con el cliente" lvl={2} color="electric-rose" />
              <SkillBar label="Problem Solving" lvl={3} color="primary" />
            </div>
            <div className="mt-8 p-4 rounded-xl border border-electric-rose/20 bg-electric-rose/5">
              <p className="text-xs text-on-surface">
                <span className="font-bold text-electric-rose">Tip del Copilot:</span> {active.tip}
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
          <Sparkles className="w-4 h-4 text-electric-rose" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Análisis del coach
          </p>
        </div>
        <p className="text-sm text-on-surface leading-relaxed">{option.analysis}</p>
      </div>

      {/* Aprendizaje + acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <p className="text-xs text-on-surface-variant flex items-center gap-2">
          <Brain className="w-3.5 h-3.5 text-electric-rose shrink-0" />
          <span>
            <span className="font-bold text-on-surface">Aprendizaje:</span> {tip}
          </span>
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-on-surface hover:bg-electric-rose text-background hover:text-white text-sm font-bold transition-colors shrink-0"
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
  color: "tertiary" | "electric-rose" | "primary";
}
function SkillBar({ label, lvl, color }: SkillBarProps) {
  const bg =
    color === "tertiary"
      ? "bg-tertiary"
      : color === "electric-rose"
      ? "bg-electric-rose"
      : "bg-primary";
  const text =
    color === "tertiary"
      ? "text-tertiary"
      : color === "electric-rose"
      ? "text-electric-rose"
      : "text-primary";
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
