"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

// ---------------------------------------------------------------------------
// Rotación · cada caso vigente 7 días, alineado a una época fija para que
// todos los consultores vean el mismo caso al mismo tiempo.
// ---------------------------------------------------------------------------
const ROTATION_DAYS = 7;
const ROTATION_MS = ROTATION_DAYS * 24 * 60 * 60 * 1000;
const EPOCH_MS = Date.UTC(2026, 0, 5, 0, 0, 0); // lunes 5-ene-2026 00:00 UTC

type Tension = "Baja" | "Media" | "Alta";

interface SimuOption {
  id: string;
  label: string;
  text: string;
  accent: "tertiary" | "electric-rose" | "primary";
  icon: typeof TrendingUp;
}

interface SimuCase {
  id: string;
  title: string;
  objective: string;
  client: string;
  sector: string;
  npc: {
    initials: string;
    name: string;
    role: string;
  };
  npcMessage: string;
  tension: { level: Tension; percent: number; explanation: string };
  options: SimuOption[];
  tip: string;
}

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
      },
      {
        id: "objection",
        label: "Manejo de Objeciones",
        text: "Entiendo, Helena. El 12% es la línea roja. Hemos diseñado una fase de contingencia de 30 días donde el algoritmo corre en paralelo sin afectar la operación actual.",
        accent: "electric-rose",
        icon: ShieldAlert,
      },
      {
        id: "value",
        label: "Propuesta de Valor",
        text: "El valor real no está en proteger el 12% a corto plazo, sino en desbloquear un crecimiento sostenido del 18% para el Q4. Déjame mostrarte los datos de simulación.",
        accent: "primary",
        icon: Zap,
      },
    ],
    tip: "Evita prometer ganancias futuras si la objeción actual es el riesgo inmediato.",
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
      explanation: "Mala experiencia previa. El miedo al downtime pesa más que cualquier business case.",
    },
    options: [
      {
        id: "rollback",
        label: "Plan de Rollback",
        text: "Diseñamos un strangler pattern: el core viejo y el nuevo conviven 90 días con feature flag. Rollback es flip de bandera, no migración inversa. <4h garantizadas.",
        accent: "electric-rose",
        icon: ShieldAlert,
      },
      {
        id: "showcase",
        label: "Referencia Cercana",
        text: "Hemos migrado el core de 3 bancos en LatAm con metodología Strangler. Te pongo en contacto con el CTO de uno este viernes para que te cuente sin filtro.",
        accent: "tertiary",
        icon: TrendingUp,
      },
      {
        id: "value",
        label: "Propuesta de Valor",
        text: "Mauricio, el riesgo de no hacerlo también cuenta: cada mes en el core legacy pierdes 1.2% de market share en clientes digitales. Eso es 18% al año.",
        accent: "primary",
        icon: Zap,
      },
    ],
    tip: "Cuando el cliente arrastra trauma, primero baja la temperatura con plan de mitigación. La visión viene después.",
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
      },
      {
        id: "differentiator",
        label: "Diferenciador",
        text: "Los otros venden la plataforma. Nosotros traemos un governance model basado en data products (data mesh) que en 6 meses convierte tu CDO office en una unidad de servicio interna.",
        accent: "primary",
        icon: Zap,
      },
      {
        id: "objection",
        label: "Manejo de Objeciones",
        text: "Valeria, los 4 meses suelen incluir solo la ingesta. Pregúntales por el modelo de gobierno y verás que se cae. Llevamos 6 implementaciones en Retail solo este año.",
        accent: "electric-rose",
        icon: ShieldAlert,
      },
    ],
    tip: "En ventas técnicas, diferenciarte por método (no por tecnología) gana al CDO experimentado.",
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
      },
      {
        id: "objection",
        label: "Manejo de Objeciones",
        text: "Jorge, te entiendo. No vengo a recortar más, vengo a devolverle horas a tu gente. La promesa es: tu equipo trabaja menos y entrega más en Q4. ¿Te interesa cómo?",
        accent: "electric-rose",
        icon: ShieldAlert,
      },
      {
        id: "value",
        label: "Propuesta de Valor",
        text: "El -15% sin estrategia es masacre. Te propongo -10% con automatización pura y -5% real que sale solo en Q1 cuando los nuevos procesos hayan madurado.",
        accent: "primary",
        icon: Zap,
      },
    ],
    tip: "Cuando el cliente está agotado, el lenguaje empático destraba más puertas que el dato.",
  },
  {
    id: "energy-transition",
    title: "Transición Energética",
    objective: "Alinear al Director de Sostenibilidad con un plan a 3 años",
    client: "Utility Eléctrica",
    sector: "Energía & Sostenibilidad",
    npc: { initials: "ED", name: "Elena Domínguez", role: "Directora de Sostenibilidad · Utility Eléctrica" },
    npcMessage:
      "Mi mandato es net-zero a 2030. Tu plan habla de 2027. Si no puedes acelerar, el competidor 2 ya me presentó un plan a 2026 con compromiso de penalty si fallan. ¿Por qué iría con ustedes?",
    tension: {
      level: "Media",
      percent: 60,
      explanation:
        "Decisión política presionada por el regulador. El compromiso del competidor activa loss-aversion en la directora.",
    },
    options: [
      {
        id: "realism",
        label: "Realismo Estratégico",
        text: "Su competidor compromete 2026 con penalty porque sabe que va a fallar y absorber el costo. Nosotros entregamos 2027 sin asterisco, con auditoría externa cada 6 meses.",
        accent: "electric-rose",
        icon: ShieldAlert,
      },
      {
        id: "acceleration",
        label: "Aceleración",
        text: "Podemos llevar el plan a 2026.5 si activamos en paralelo solar distribuido en sucursales y un PPA verde para los 3 sites más grandes. Te dejo cifras esta semana.",
        accent: "tertiary",
        icon: TrendingUp,
      },
      {
        id: "value",
        label: "Propuesta de Valor",
        text: "El verdadero KPI no es la fecha, es el bond verde que emitirán al alcanzarlo. Cuanto más creíble el plan, mejor el rating. Trabajamos con Moody's en este tema.",
        accent: "primary",
        icon: Zap,
      },
    ],
    tip: "En decisiones reguladas, la credibilidad del plan vale más que la velocidad del competidor.",
  },
];

// ---------------------------------------------------------------------------
// Hook · activo + tiempo restante
// ---------------------------------------------------------------------------

function useRotation() {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000 * 30); // tick cada 30s
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
// UI
// ---------------------------------------------------------------------------

export default function SimuladorPage() {
  const { active, next, activeIdx, remainingMs, progressPct, slotEnd } = useRotation();
  const totalCases = CASES.length;

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
        {/* Barra */}
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

      {/* Layout original */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Simulation Area */}
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
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
                  Puntaje
                </p>
                <p className="text-xl font-bold text-primary">
                  8,450 <span className="text-xs text-on-surface-variant">XP</span>
                </p>
              </div>
            </div>
          </header>

          {/* Narrative Scene */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              {active.options.map((opt, i) => {
                const Icon = opt.icon;
                const acc = ACCENT[opt.accent];
                const span = i === active.options.length - 1 && active.options.length % 2 === 1 ? "md:col-span-2" : "";
                return (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group flex flex-col text-left p-5 rounded-2xl border border-surface-container bg-surface-container/30 hover:bg-surface-container/60 ${acc.border} transition-all relative overflow-hidden ${span}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${acc.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative z-10 flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold ${acc.text} uppercase tracking-widest flex items-center gap-1`}>
                        <Icon className="w-3 h-3" /> {opt.label}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-on-surface-variant group-hover:${acc.text} transition-colors`} />
                    </div>
                    <p className="text-sm font-medium text-on-surface relative z-10">"{opt.text}"</p>
                  </motion.button>
                );
              })}
            </div>
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
              <span className="text-2xl font-bold text-on-surface">Tensión {active.tension.level}</span>
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

interface SkillBarProps {
  label: string;
  lvl: number;
  color: "tertiary" | "electric-rose" | "primary";
}
function SkillBar({ label, lvl, color }: SkillBarProps) {
  const colorClass =
    color === "tertiary" ? "bg-tertiary text-tertiary" :
    color === "electric-rose" ? "bg-electric-rose text-electric-rose" :
    "bg-primary text-primary";
  const [bg, text] = colorClass.split(" ");
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
