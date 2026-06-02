"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Database,
  Sparkles,
  Wallet,
  Building2,
  Network,
  Zap,
  FileText,
  Presentation,
  Lightbulb,
  Target,
  ChevronRight,
  BookOpen,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Data model
// ---------------------------------------------------------------------------

interface MethodPhase {
  step: string;
  title: string;
  detail: string;
}

interface TemplateRef {
  type: string;
  name: string;
  desc: string;
}

interface DeckRef {
  name: string;
  audience: string;
}

interface Offering {
  id: string;
  shortName: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  accent: string;
  // Hero stats — siempre 3
  stats: Array<{ value: string; label: string }>;
  // Cuándo te lo asignan
  whenApplies: string;
  // Sectores donde es habitual
  sectors: string[];
  // Metodología — 4 fases
  methodology: MethodPhase[];
  // Plantillas — 3-4 entregables
  templates: TemplateRef[];
  // Presentaciones — 2-3 decks
  decks: DeckRef[];
  // Casos típicos
  typicalCases: string[];
  // KPIs
  kpis: string[];
}

// ---------------------------------------------------------------------------
// Catálogo de offerings
// ---------------------------------------------------------------------------

const OFFERINGS: Offering[] = [
  {
    id: "data",
    shortName: "Data",
    name: "Data Strategy & Platform",
    tagline: "De data lakes desordenados a una plataforma de datos accionable",
    icon: Database,
    accent: "from-tertiary to-primary",
    stats: [
      { value: "60-70%", label: "del valor de un proyecto digital sale del dato" },
      { value: "9 meses", label: "duración típica de un programa de Data Strategy" },
      { value: "ROI 18m", label: "horizonte habitual de payback" },
    ],
    whenApplies:
      "El cliente tiene 3-4 data lakes, ETLs duplicados, vendors gritando 'unifico todo' y un CDO bajo presión del board. Necesita roadmap, governance y arquitectura objetivo.",
    sectors: ["Banca", "Retail", "Telco", "Energía", "Seguros"],
    methodology: [
      {
        step: "01",
        title: "Data Maturity Assessment",
        detail:
          "Diagnóstico de 6 dimensiones: arquitectura, governance, talento, casos de uso, calidad y monetización. Output: matriz de gap vs benchmark sectorial.",
      },
      {
        step: "02",
        title: "Target Operating Model",
        detail:
          "Diseño del modelo de gobierno (data office, ownership, comités) + arquitectura objetivo (data mesh vs data fabric vs lakehouse). Decisión make-or-buy.",
      },
      {
        step: "03",
        title: "Roadmap por olas",
        detail:
          "3 olas de 3 meses con quick wins en ola 1 (marketing data o riesgo). Cada ola con business case auditable y opt-out al mes 4 si no hay ROI.",
      },
      {
        step: "04",
        title: "Build & Operate",
        detail:
          "Acompañamiento en la implementación: arquitectura, casos de uso prioritarios, formación del data office del cliente. Handover progresivo.",
      },
    ],
    templates: [
      { type: ".xlsx", name: "Data Maturity Assessment Workbook", desc: "Matriz de 6 dimensiones × 4 niveles con scoring auto" },
      { type: ".pptx", name: "Diagnóstico Data Strategy · Template", desc: "Plantilla de deck con secciones del DMA y benchmark" },
      { type: ".pptx", name: "Target Architecture Canvas", desc: "Slides para diseño de arquitectura objetivo (mesh/fabric/lakehouse)" },
      { type: ".docx", name: "Data Governance Charter", desc: "Plantilla de carta de gobierno del dato (ownership, comités, políticas)" },
    ],
    decks: [
      { name: "MBC Data Strategy · Standard Pitch", audience: "Comité de dirección · venta" },
      { name: "Data Mesh vs Fabric · Decision Frame", audience: "CDO / CIO · diseño" },
      { name: "Data Value Realization · Closing Deck", audience: "Sponsor · cierre de fase" },
    ],
    typicalCases: [
      "Diseño de Data Office desde cero para un banco regional",
      "Roadmap de data products en retail (CDP + churn + pricing)",
      "Carve-out de datos en M&A de aseguradora",
    ],
    kpis: [
      "Time-to-insight de los casos de uso prioritarios",
      "Cobertura de catálogo de datos críticos",
      "Adoption rate del Data Office por sector",
    ],
  },
  {
    id: "ai",
    shortName: "AI",
    name: "Artificial Intelligence",
    tagline: "De POCs huérfanos a productos de IA en producción",
    icon: Sparkles,
    accent: "from-electric-rose to-primary",
    stats: [
      { value: "85%", label: "de POCs de IA nunca llegan a producción" },
      { value: "4-6m", label: "tiempo típico de un caso piloto-a-producción" },
      { value: "+22%", label: "lift en KPIs cuando se hace bien" },
    ],
    whenApplies:
      "El cliente tiene 20 ideas de IA, 3 vendors prometiendo 'plataforma de IA' y 0 productos en producción. Pide priorización, MLOps real y modelo de governance de IA.",
    sectors: ["Banca", "Seguros", "Retail", "Telco", "Sector Público"],
    methodology: [
      {
        step: "01",
        title: "AI Discovery & Priorización",
        detail:
          "Workshops por dominio para identificar casos. Matriz valor × factibilidad. Output: cartera priorizada de 3-5 casos pilot-able.",
      },
      {
        step: "02",
        title: "Use case design & POC",
        detail:
          "Para cada caso prioritario: hipótesis de negocio, KPIs, datos requeridos, baseline. POC de 6-8 semanas con criterios go/no-go claros.",
      },
      {
        step: "03",
        title: "MLOps & Producción",
        detail:
          "Pipeline de despliegue (CI/CD, monitoring, drift detection). Modelos pasan de notebook a servicio observado. Handover a IT del cliente.",
      },
      {
        step: "04",
        title: "AI Governance & Scaling",
        detail:
          "Modelo de governance (responsible AI, comité de modelos, registro). Plantilla de model cards. Cultura de re-training y guardrails con AI Act / regulación local.",
      },
    ],
    templates: [
      { type: ".xlsx", name: "AI Use Case Prioritization Matrix", desc: "Matriz valor × factibilidad con scoring de 8 criterios" },
      { type: ".pptx", name: "POC Charter · Template", desc: "Brief de POC con hipótesis, KPIs y criterios go/no-go" },
      { type: ".docx", name: "Model Card Template", desc: "Ficha de modelo (datos, métricas, fairness, limitaciones)" },
      { type: ".pptx", name: "Responsible AI Framework", desc: "Plantilla de gobierno de IA alineada a AI Act" },
    ],
    decks: [
      { name: "MBC AI Strategy · Standard Pitch", audience: "C-level · venta" },
      { name: "From POC to Production · Playbook", audience: "CTO / CDO · diseño" },
      { name: "Responsible AI Briefing", audience: "Riesgo / compliance" },
    ],
    typicalCases: [
      "Plataforma de pricing dinámico en retail",
      "Asistente conversacional para call center con LLM auto-hospedado",
      "Modelos de scoring de riesgo crediticio con validación regulatoria",
    ],
    kpis: [
      "% de POCs que llegan a producción",
      "Tiempo desde notebook a primer endpoint productivo",
      "Lift de KPI de negocio por caso desplegado",
    ],
  },
  {
    id: "medios-pago",
    shortName: "Medios de Pago",
    name: "Medios de Pago",
    tagline: "Core de pagos moderno, instant payments, ISO 20022",
    icon: Wallet,
    accent: "from-primary to-electric-rose",
    stats: [
      { value: "ISO 20022", label: "estándar global obligatorio en migración" },
      { value: "24/7", label: "expectativa de instant payments del cliente final" },
      { value: "12-24m", label: "duración típica de un programa de modernización" },
    ],
    whenApplies:
      "El cliente es un banco, EMI o fintech que necesita modernizar su core de pagos: instant payments, migración a ISO 20022, racionalización de switches, integración con esquemas locales (Yape, Plin, Bizum, SPEI).",
    sectors: ["Banca", "Fintech", "EMIs", "Sector Público"],
    methodology: [
      {
        step: "01",
        title: "Payments Landscape Assessment",
        detail:
          "Mapeo de canales, productos, esquemas (locales + internacionales), switches y pasarelas. Identificación de deuda técnica y riesgos regulatorios.",
      },
      {
        step: "02",
        title: "Target Operating Model",
        detail:
          "Diseño del modelo target: arquitectura de payments hub, separación de orquestación vs liquidación, estrategia ISO 20022, hoja de ruta de instant payments.",
      },
      {
        step: "03",
        title: "Migración por waves",
        detail:
          "Plan de migración por producto (transferencias, débito directo, tarjetas, billeteras). Coexistencia old/new con strangler pattern. Pruebas de continuidad de servicio.",
      },
      {
        step: "04",
        title: "Run & Optimize",
        detail:
          "Monitorización de NPS de pagos, fraude, disputa, conciliación. Iteración continua y onboarding de nuevos esquemas / corredores remesa.",
      },
    ],
    templates: [
      { type: ".xlsx", name: "Payments Inventory Workbook", desc: "Mapeo completo de canales, productos, esquemas, volúmenes y SLAs" },
      { type: ".pptx", name: "Target Architecture Canvas Pagos", desc: "Slides de arquitectura objetivo de payments hub" },
      { type: ".docx", name: "ISO 20022 Migration Playbook", desc: "Guía paso a paso de migración con checkpoints" },
      { type: ".xlsx", name: "Wave Plan Calculator", desc: "Calculadora de waves con effort, riesgo y dependencia" },
    ],
    decks: [
      { name: "MBC Pagos · Standard Pitch", audience: "C-level banca / fintech · venta" },
      { name: "Instant Payments Readiness", audience: "COO de pagos · diagnóstico" },
      { name: "ISO 20022 Briefing Ejecutivo", audience: "Comité de tecnología" },
    ],
    typicalCases: [
      "Migración a ISO 20022 de un banco mediano LatAm",
      "Lanzamiento de instant payments para una EMI",
      "Integración con esquema local (Yape, Plin) para banco comercial",
    ],
    kpis: [
      "% volumen transaccional en ISO 20022",
      "Latencia p99 de instant payments",
      "Fraud rate y dispute rate por canal",
    ],
  },
  {
    id: "adquirencia",
    shortName: "Adquirencia",
    name: "Adquirencia (Acquiring)",
    tagline: "Crecimiento de portfolio comercial, TPV, pricing, onboarding",
    icon: Building2,
    accent: "from-tertiary to-electric-rose",
    stats: [
      { value: "MDR", label: "merchant discount rate es la palanca clave de margen" },
      { value: "70%+", label: "del crecimiento viene de retención + cross-sell, no nuevo" },
      { value: "<48h", label: "time-to-activate esperado por SMB hoy" },
    ],
    whenApplies:
      "Un adquirente comercial (banco con división de adquirencia o standalone) necesita defender su portfolio del avance de fintechs, optimizar MDR, rediseñar onboarding o desarrollar nuevos canales (PSP, marketplaces).",
    sectors: ["Banca de adquirencia", "Fintechs de pagos", "Procesadores"],
    methodology: [
      {
        step: "01",
        title: "Diagnóstico de Portfolio",
        detail:
          "Segmentación de comercios (SMB / corporativo / e-commerce / marketplaces). Análisis de churn, MDR efectivo, costo de servicio por segmento. Identificación de focos de pérdida.",
      },
      {
        step: "02",
        title: "Pricing Strategy",
        detail:
          "Rediseño de modelos de pricing: bundling, dynamic MDR, interchange++. Modelo de elasticidad por segmento. Business case de migración.",
      },
      {
        step: "03",
        title: "Onboarding Redesign",
        detail:
          "Rediseño del onboarding de comercios: KYC simplificado, activación digital, time-to-first-transaction <48h. Reducción de tasa de abandono.",
      },
      {
        step: "04",
        title: "Value-added Services",
        detail:
          "Diseño de servicios complementarios (financiamiento, pricing dinámico para el comercio, fidelidad, BI para SMB). Incremento de ARPM y retención.",
      },
    ],
    templates: [
      { type: ".xlsx", name: "Merchant Portfolio Segmentation", desc: "Plantilla de segmentación con clustering por revenue, MCC y comportamiento" },
      { type: ".xlsx", name: "MDR & Margin Calculator", desc: "Calculadora de MDR efectivo, interchange y margen por segmento" },
      { type: ".pptx", name: "Acquiring Strategy Deck Template", desc: "Slides para presentar estrategia comercial y de pricing" },
      { type: ".docx", name: "Merchant Onboarding Playbook", desc: "Guía de rediseño de onboarding con benchmarks de SMB" },
    ],
    decks: [
      { name: "MBC Adquirencia · Standard Pitch", audience: "Director comercial banca · venta" },
      { name: "Defending Acquiring Margins", audience: "C-level · estrategia" },
      { name: "SMB Onboarding Best Practices", audience: "Producto / operaciones" },
    ],
    typicalCases: [
      "Defensa de portfolio frente a fintech disruptora en LatAm",
      "Lanzamiento de PSP / marketplace acquiring",
      "Rediseño de pricing para corporate acquiring",
    ],
    kpis: [
      "MDR efectivo por segmento",
      "Time-to-first-transaction (TTFT)",
      "Churn de comercios y ARPM",
    ],
  },
  {
    id: "open-finance",
    shortName: "Open Finance",
    name: "Open Finance",
    tagline: "APIs, embedded finance y ecosistemas financieros",
    icon: Network,
    accent: "from-electric-rose to-tertiary",
    stats: [
      { value: "PSD2 / OF", label: "marco regulatorio en expansión global" },
      { value: "3x", label: "ARPU típico de un cliente con embedded finance" },
      { value: "API-first", label: "approach mandatorio para core nuevos" },
    ],
    whenApplies:
      "Banco, fintech o no-bancario que quiere abrir/consumir APIs financieras. Casos típicos: cumplir con regulación PSD2/Open Finance local, monetizar APIs (API products), o lanzar embedded finance (BaaS).",
    sectors: ["Banca", "Fintech", "Insurtech", "Retail (BaaS)", "Sector Público"],
    methodology: [
      {
        step: "01",
        title: "Regulación + Estrategia",
        detail:
          "Mapeo de obligaciones regulatorias (PSD2, Open Finance local, sandbox del regulador). Decisión make/buy del Open Banking platform. Visión de ecosistema (consumer vs producer vs both).",
      },
      {
        step: "02",
        title: "API Design & Catalog",
        detail:
          "Diseño del catálogo de APIs (cuentas, pagos, productos, datos). API-first con OpenAPI specs. Estrategia de developer experience (portal, sandbox, docs).",
      },
      {
        step: "03",
        title: "Monetización & Partners",
        detail:
          "Modelo de monetización: freemium, revenue-share, suscripción. Onboarding de partners (TPPs, retailers, insurtechs). Esquemas de consentimiento y revocación.",
      },
      {
        step: "04",
        title: "Embedded Finance",
        detail:
          "Lanzamiento de productos embedded: BNPL en checkout, accounts-as-a-service, lending para SMB en plataformas. Modelo operativo y riesgo.",
      },
    ],
    templates: [
      { type: ".xlsx", name: "Open Finance Regulatory Map", desc: "Plantilla por país de obligaciones y deadlines regulatorios" },
      { type: ".pptx", name: "Ecosystem Vision Canvas", desc: "Slides para diseñar la visión de ecosistema (consumer/producer)" },
      { type: ".docx", name: "API Product Charter", desc: "Brief para diseñar un API product con KPIs y go-to-market" },
      { type: ".pptx", name: "Embedded Finance Pitch Template", desc: "Slides para vender embedded finance a un retailer/marketplace" },
    ],
    decks: [
      { name: "MBC Open Finance · Standard Pitch", audience: "C-level banca · venta" },
      { name: "Embedded Finance Briefing", audience: "Retailers / verticals · educacion" },
      { name: "Open Banking Compliance Playbook", audience: "Riesgo / compliance" },
    ],
    typicalCases: [
      "Diseño de plataforma de Open Banking para banco regional",
      "Lanzamiento de embedded lending para un retailer",
      "API monetization strategy para neobanco",
    ],
    kpis: [
      "# de TPPs activos en el portal",
      "Volumen y revenue de APIs consumidas",
      "Time-to-onboard de un partner",
    ],
  },
  {
    id: "efficiency",
    shortName: "Efficiency",
    name: "Efficiency · Operational Excellence",
    tagline: "Reducción de OPEX, automatización y optimización de procesos",
    icon: Zap,
    accent: "from-primary to-tertiary",
    stats: [
      { value: "10-20%", label: "ahorro OPEX típico en programas de eficiencia" },
      { value: "6-9m", label: "horizonte habitual para materializar ahorros" },
      { value: "RPA + IA", label: "combinación que multiplica el ROI vs RPA solo" },
    ],
    whenApplies:
      "El cliente tiene presión del board para reducir OPEX -10% / -15%. Lleva 6 meses recortando y el equipo está exhausto. Necesita ahorros sin headcount cut adicional: automatización, simplificación, sourcing.",
    sectors: ["Banca", "Telco", "Energía", "Industria", "Retail", "Sector Público"],
    methodology: [
      {
        step: "01",
        title: "Diagnóstico OPEX",
        detail:
          "Análisis bottom-up de costos por proceso, función y unidad. Benchmark vs sector. Identificación de quick wins (12 semanas) y palancas estructurales (12 meses).",
      },
      {
        step: "02",
        title: "Roadmap de Quick Wins",
        detail:
          "Cartera priorizada de iniciativas con effort × impact. Quick wins de automatización RPA + IA, racionalización de proveedores y procesos sin valor.",
      },
      {
        step: "03",
        title: "Implementación + RPA/AI",
        detail:
          "Despliegue de bots y modelos de IA en procesos backoffice (KYC, conciliaciones, reclamos). Acompañamiento en cambio cultural y re-skilling del equipo.",
      },
      {
        step: "04",
        title: "Operating Model y sostenibilidad",
        detail:
          "Diseño del operating model post-eficiencia: governance de mejora continua, centro de excelencia de automatización, modelo de medición de ahorros.",
      },
    ],
    templates: [
      { type: ".xlsx", name: "OPEX Diagnostic Workbook", desc: "Análisis bottom-up por proceso × función con benchmark sectorial" },
      { type: ".xlsx", name: "Initiative Prioritization Matrix", desc: "Effort × impact con scoring de quick wins y estructurales" },
      { type: ".pptx", name: "Efficiency Story Template", desc: "Plantilla narrativa para presentar al board (sin lenguaje 'recorte')" },
      { type: ".docx", name: "Automation CoE Charter", desc: "Carta de constitución del centro de excelencia de automatización" },
    ],
    decks: [
      { name: "MBC Efficiency · Standard Pitch", audience: "COO / CFO · venta" },
      { name: "Automation Playbook (RPA + IA)", audience: "Operaciones · diseño" },
      { name: "Board Story · Efficiency Without Layoffs", audience: "Comité ejecutivo" },
    ],
    typicalCases: [
      "Programa de -12% OPEX en una operadora telco LatAm",
      "Automatización backoffice de KYC y conciliaciones en banca",
      "Centro de excelencia de RPA para utility eléctrica",
    ],
    kpis: [
      "Run-rate savings ($) materializados",
      "FTE liberados por automatización",
      "Sustainability rate de los ahorros a 12 meses",
    ],
  },
];

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------

export default function BestPracticesPage() {
  const [active, setActive] = useState<string>(OFFERINGS[0].id);
  const activeOffering = OFFERINGS.find((o) => o.id === active) ?? OFFERINGS[0];

  return (
    <div className="relative -mx-4 sm:-mx-6 md:-mx-8 -my-10 min-h-screen">
      {/* Capa luminosa de fondo (rosa Minsait + crema + mint) — contrasta con el shell oscuro */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#fff5f7_0%,#fdf6f8_55%,#f3fbf6_100%)]"
      />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-primary/40 blur-3xl opacity-60"
      />
      <div
        aria-hidden
        className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-tertiary/30 blur-3xl opacity-50"
      />

      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-8 animate-in fade-in duration-500 space-y-10">
        {/* HERO */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-deep-plum/10 shadow-sm mb-4">
            <Award className="w-4 h-4 text-electric-rose" />
            <span className="text-xs font-bold uppercase tracking-widest text-deep-plum">
              Best Practices
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-deep-plum mb-3">
            Lo que <span className="text-electric-rose">debes saber</span> antes
            de tu primer proyecto
          </h1>
          <p className="text-lg text-deep-plum/70 max-w-3xl mx-auto">
            Las 6 offerings que más vendemos en MBC. Introducción, metodología,
            plantillas y decks reusables. Si te asignan a uno de estos sectores,
            esta es tu primera parada.
          </p>
        </header>

      {/* GRID DE OFFERINGS · top-level visual */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {OFFERINGS.map((o, i) => {
            const isActive = o.id === active;
            const Icon = o.icon;
            return (
              <motion.button
                key={o.id}
                type="button"
                onClick={() => {
                  setActive(o.id);
                  // Scroll the detail into view
                  document.getElementById(`offering-${o.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-3xl border p-5 text-left overflow-hidden transition-all shadow-sm bg-white/90 backdrop-blur ${
                  isActive
                    ? "border-electric-rose ring-2 ring-electric-rose/30 shadow-[0_8px_30px_rgba(255,0,84,0.15)]"
                    : "border-deep-plum/10 hover:border-electric-rose/40 hover:shadow-md"
                }`}
              >
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${o.accent} opacity-25 blur-2xl`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${o.accent} mb-3 shadow-sm`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-deep-plum/50">
                    Offering
                  </p>
                  <p
                    className={`text-base font-bold leading-tight ${
                      isActive ? "text-electric-rose" : "text-deep-plum"
                    }`}
                  >
                    {o.shortName}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* DETALLE DEL OFFERING ACTIVO */}
      <OfferingDetail offering={activeOffering} />

        {/* CIERRE */}
        <section className="text-center pb-8">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/95 border border-electric-rose/30 shadow-sm">
            <Lightbulb className="w-5 h-5 text-electric-rose" />
            <span className="text-sm text-deep-plum">
              ¿Echas en falta algún offering?{" "}
              <a
                href="mailto:mbcresearch@minsait.com"
                className="font-bold text-electric-rose hover:underline"
              >
                Escribe a MBC Research →
              </a>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

interface OfferingDetailProps {
  offering: Offering;
}

function OfferingDetail({ offering }: OfferingDetailProps) {
  const Icon = offering.icon;
  return (
    <motion.div
      key={offering.id}
      id={`offering-${offering.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 scroll-mt-24"
    >
      {/* Hero del offering */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-deep-plum/10 relative overflow-hidden shadow-sm">
        <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${offering.accent} opacity-20 blur-3xl`} />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${offering.accent} shrink-0 shadow-md`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-electric-rose mb-1">
                Best practice · Offering
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-deep-plum">{offering.name}</h2>
              <p className="text-sm text-deep-plum/70 mt-1">{offering.tagline}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {offering.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-gradient-to-br from-primary/15 to-tertiary/10 border border-deep-plum/10 p-4"
              >
                <p className="text-2xl font-bold text-electric-rose">{s.value}</p>
                <p className="text-xs text-deep-plum/75">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Cuando aplica + sectores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-2xl bg-primary/10 border border-deep-plum/10 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-electric-rose mb-2 flex items-center gap-1">
                <Target className="w-3 h-3" /> Cuándo te lo asignan
              </p>
              <p className="text-sm text-deep-plum leading-relaxed">{offering.whenApplies}</p>
            </div>
            <div className="rounded-2xl bg-tertiary/10 border border-deep-plum/10 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-deep-plum/60 mb-2">
                Sectores habituales
              </p>
              <div className="flex flex-wrap gap-1.5">
                {offering.sectors.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-1 rounded-full bg-white border border-tertiary/40 text-deep-plum text-[10px] font-bold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academia Data Governance — solo en el offering Data */}
      {offering.id === "data" && (
        <Link href="/best-practices/data-governance" className="block group">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -3 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-electric-rose/30 shadow-[0_8px_30px_rgba(255,0,84,0.12)] relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-tertiary to-electric-rose opacity-25 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-tertiary to-electric-rose shrink-0 shadow-md">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-electric-rose mb-1">
                  Academia · Formación profunda
                </p>
                <h3 className="text-lg md:text-xl font-bold text-deep-plum">
                  Data Governance Academy — de cero a profundidad
                </h3>
                <p className="text-sm text-deep-plum/70 mt-1">
                  Programa interactivo de 36 módulos (DAMA-DMBOK2 + metodología Minsait + Gobierno de
                  la IA): lecturas, terminología y quizzes con feedback y progreso.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-electric-rose text-white text-sm font-bold shrink-0 group-hover:shadow-lg group-hover:shadow-electric-rose/40 transition-all">
                Empezar <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        </Link>
      )}

      {/* Metodología */}
      <Section
        title="Metodología"
        eyebrow="01 · Cómo lo hacemos"
        icon={Target}
        subtitle="4 fases que estructuran el 80% de los engagements de este offering."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {offering.methodology.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-deep-plum/10 h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <p className={`text-3xl font-bold bg-gradient-to-br ${offering.accent} bg-clip-text text-transparent leading-none mb-2`}>
                {p.step}
              </p>
              <p className="text-sm font-bold text-deep-plum mb-2">{p.title}</p>
              <p className="text-xs text-deep-plum/70 leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Plantillas + decks · grid 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section
          title="Plantillas"
          eyebrow="02 · Para trabajar"
          icon={FileText}
          subtitle="Reusables para no empezar de cero."
        >
          <ul className="space-y-2">
            {offering.templates.map((t) => (
              <li
                key={t.name}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-deep-plum/10 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${offering.accent} shrink-0 shadow-sm`}>
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-deep-plum truncate">{t.name}</p>
                    <span className="text-[10px] font-bold text-deep-plum/70 bg-primary/15 px-1.5 py-0.5 rounded shrink-0">
                      {t.type}
                    </span>
                  </div>
                  <p className="text-xs text-deep-plum/70">{t.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[10px] text-deep-plum/60 flex items-center gap-1.5">
            <BookOpen className="w-3 h-3 text-electric-rose" />
            Plantillas vivas — pídelas a tu Sr Manager o a{" "}
            <a className="text-electric-rose hover:underline" href="mailto:mbcresearch@minsait.com">
              mbcresearch@minsait.com
            </a>
          </p>
        </Section>

        <Section
          title="Presentaciones"
          eyebrow="03 · Decks listos para reusar"
          icon={Presentation}
          subtitle="Standard pitches y playbooks por audiencia."
        >
          <ul className="space-y-2">
            {offering.decks.map((d) => (
              <li
                key={d.name}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-deep-plum/10 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${offering.accent} shrink-0 shadow-sm`}>
                  <Presentation className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-deep-plum mb-1">{d.name}</p>
                  <p className="text-xs text-deep-plum/70">
                    <span className="font-bold text-electric-rose">Audiencia:</span> {d.audience}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[10px] text-deep-plum/60 flex items-center gap-1.5">
            <BookOpen className="w-3 h-3 text-electric-rose" />
            Decks alojados en Brain · solicita acceso con código de proyecto.
          </p>
        </Section>
      </div>

      {/* Casos típicos + KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section
          title="Casos típicos"
          eyebrow="04 · Cómo se ven en la práctica"
          icon={TrendingUp}
          subtitle="Engagements representativos para conversar en cliente."
        >
          <ul className="space-y-2">
            {offering.typicalCases.map((c) => (
              <li
                key={c}
                className="rounded-2xl bg-primary/10 border border-deep-plum/10 p-4 flex items-start gap-2"
              >
                <ChevronRight className="w-4 h-4 text-electric-rose shrink-0 mt-0.5" />
                <span className="text-sm text-deep-plum">{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          title="KPIs que defendemos"
          eyebrow="05 · Cómo se mide el éxito"
          icon={Target}
          subtitle="Indicadores estándar para definir el caso de negocio."
        >
          <ul className="space-y-2">
            {offering.kpis.map((k) => (
              <li
                key={k}
                className="rounded-2xl bg-tertiary/10 border border-deep-plum/10 p-4 flex items-start gap-2"
              >
                <Target className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                <span className="text-sm text-deep-plum">{k}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </motion.div>
  );
}

interface SectionProps {
  title: string;
  eyebrow: string;
  subtitle?: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

function Section({ title, eyebrow, subtitle, icon: Icon, children }: SectionProps) {
  return (
    <section>
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-white border border-electric-rose/40 flex items-center justify-center shrink-0 shadow-sm">
          <Icon className="w-4 h-4 text-electric-rose" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-electric-rose mb-1">
            {eyebrow}
          </p>
          <h3 className="text-xl font-bold text-deep-plum leading-tight">{title}</h3>
          {subtitle && (
            <p className="text-sm text-deep-plum/70 mt-1 max-w-2xl">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
