"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Sparkles,
  Users,
  HeartHandshake,
  Zap,
  ScrollText,
  Building2,
  Network,
  Award,
  MapPin,
  Briefcase,
  ShieldCheck,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Data extraída del PPT Onboarding Perú (oficial MBC)
// ---------------------------------------------------------------------------

interface AdnPilar {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  comportamientos: string[];
}

const ADN: AdnPilar[] = [
  {
    id: "excelencia",
    number: "01",
    title: "Excelencia",
    icon: Sparkles,
    accent: "from-electric-rose to-primary",
    comportamientos: [
      "Búsqueda de la calidad y máxima exigencia",
      "Entusiasmo por aprender",
      "Cuidado de las formas y los detalles",
      "Orientación a resultados",
      "Dedicación y compromiso",
      "Reconocimiento meritocrático",
      "Resiliencia",
      "Respeto a la exigencia profesional",
    ],
  },
  {
    id: "diversidad",
    number: "02",
    title: "Diversidad",
    icon: Users,
    accent: "from-tertiary to-primary",
    comportamientos: [
      "Mente abierta",
      "Igualdad de oportunidades",
      "Globalidad y sensibilidad cultural",
      "Trabajo en equipo multidisciplinar (E2E)",
      "Empatía en todos los niveles de relación",
      "Orgullo y sentido de pertenencia",
    ],
  },
  {
    id: "generosidad",
    number: "03",
    title: "Generosidad",
    icon: HeartHandshake,
    accent: "from-primary to-electric-rose",
    comportamientos: [
      "Colaboración desinteresada",
      "Búsqueda del bien común del Grupo",
      "Transparencia total: gestión, feedback, comunicación",
      "Organización más plana",
      "Agilidad, flexibilidad y personalización",
      "Conocimiento y empatía hacia el resto de áreas Minsait",
    ],
  },
  {
    id: "impacto",
    number: "04",
    title: "Impacto",
    icon: Zap,
    accent: "from-electric-rose to-tertiary",
    comportamientos: [
      "Aportación de valor al cliente",
      "Impacto en personas y el equipo que nos rodea",
      "Siempre buena impresión",
      "Diferenciación frente a la competencia",
      "Creación de marca-firma reconocida",
      "Emprendimiento de acciones sociales",
      "Conciencia sobre la huella del Grupo en la sociedad",
    ],
  },
];

interface HitoHistoria {
  rango: string;
  titulo: string;
  descripcion: string;
}

const HISTORIA: HitoHistoria[] = [
  {
    rango: "2001 - 2012",
    titulo: "Adquisición de EuroPraxis",
    descripcion:
      "EuroPraxis nace en 1994 y es adquirida por Indra en 2001. La unidad funciona como una 'boutique' de consultoría con autonomía de gestión.",
  },
  {
    rango: "2013 - 2015",
    titulo: "Integración operativa dentro de Indra",
    descripcion:
      "Proceso de restructuración por falta de crecimiento y baja rentabilidad. La consultoría se integra plenamente en el grupo.",
  },
  {
    rango: "2016 - 2018",
    titulo: "Lanzamiento de Minsait Digital",
    descripcion:
      "Consultoría se configura como una de las piezas claves de la Propuesta de Valor Digital de Indra. Recuperación de la senda de crecimiento rentable.",
  },
  {
    rango: "2019 - Hoy",
    titulo: "MBC como unidad de Consultoría de Negocio",
    descripcion:
      "Management & Business Consulting absorbe la consultoría de todo Minsait manteniendo su propio modo de gestión. Transformación de la propuesta de valor para crecer por encima del sector.",
  },
];

interface Marca {
  id: string;
  nombre: string;
  tagline: string;
  detalle: string;
  badge?: string;
  accent: string;
}

const MARCAS: Marca[] = [
  {
    id: "mbc",
    nombre: "MBC",
    tagline: "Grueso de la Unidad de Consultoría",
    detalle:
      "Especialización vertical y transversal. 181M€ de facturación. Proviene de la adquisición de EuroPraxis en 2001.",
    accent: "from-electric-rose to-primary",
  },
  {
    id: "xtudio",
    nombre: "Xtudio",
    tagline: "Diseño, innovación y UX",
    detalle:
      "Unidad especializada en experiencia de usuario, diseño de servicios e innovación.",
    accent: "from-tertiary to-primary",
  },
  {
    id: "flat101",
    nombre: "Flat 101",
    tagline: "Marketing digital",
    detalle:
      "Compañía adquirida en 2021. Experta en CRO, tráfico web, analítica digital y eCommerce.",
    accent: "from-primary to-electric-rose",
  },
  {
    id: "telco",
    nombre: "Specialist Telco",
    tagline: "Sector telecomunicaciones",
    detalle: "Consultora especializada en telecomunicaciones. Adquirida en diciembre 2023.",
    badge: "NEW 2023",
    accent: "from-electric-rose to-tertiary",
  },
  {
    id: "alg",
    nombre: "ALG",
    tagline: "Transporte e infraestructuras",
    detalle:
      "Especialista en gestión logística e infraestructuras de transporte. 'Carve-in' en enero 2024.",
    badge: "NEW 2024",
    accent: "from-tertiary to-electric-rose",
  },
];

interface OrgStat {
  label: string;
  value: string;
  sub?: string;
}

const ORG_STATS: OrgStat[] = [
  { label: "Empleados", value: "57.000", sub: "Grupo Indra" },
  { label: "Ingresos Minsait", value: "2,5 BN €", sub: "Mercados y Verticales · 2023" },
  { label: "Ingresos ATM + Mobility", value: "3,8 BN €", sub: "Defensa, ATM y Mobility · 2023" },
  { label: "Unidad Consultoría", value: "181 M €", sub: "Facturación MBC" },
  { label: "Socios MBC", value: "31", sub: "Liderando los sectores" },
  { label: "Profesionales MBC", value: "+2.100", sub: "En 10 países" },
];

interface MiembroEquipo {
  nombre: string;
  rol: string;
  area?: string;
}

const EQUIPO_PERU: MiembroEquipo[] = [
  { nombre: "Pablo Wong", rol: "Director", area: "SSFF MBC Perú" },
  { nombre: "Víctor Menghi", rol: "Director", area: "I&C y E&U MBC Perú" },
  { nombre: "Geraldine Mouchard", rol: "Directora", area: "AAPP MBC Perú" },
  { nombre: "Camilo Botero", rol: "Director", area: "Responsable de Telco" },
  { nombre: "Nelson Bernal", rol: "Manager", area: "Perú" },
  { nombre: "Marita Castro-Mendivil", rol: "Consulting Specialist Leader" },
  { nombre: "Ana Cecilia Quispe", rol: "Senior Manager", area: "Perú" },
  { nombre: "Aracelli Guevara", rol: "Senior Manager", area: "Perú" },
  { nombre: "Anderson Barrantes", rol: "Manager", area: "Perú" },
  { nombre: "Diego Hinostroza", rol: "Manager", area: "Perú" },
  { nombre: "Athena Aguirre", rol: "Manager", area: "Perú" },
];

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------

export default function CulturaPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 animate-in fade-in duration-500 space-y-24">
      {/* HERO */}
      <header className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-6">
          <Compass className="w-4 h-4 text-electric-rose" />
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface">
            Inmersión Cultural
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-on-surface mb-4">
          El <span className="text-electric-rose">ADN</span> que llevamos a
          cualquier proyecto
        </h1>
        <p className="text-lg text-on-surface-variant max-w-3xl mx-auto">
          MBC es la unidad de Consultoría de Negocio de Minsait, parte del Grupo
          Indra. Más de 20 años de historia, multi-marca y multi-geografía.
          Aquí está quién somos, de dónde venimos y los valores que nos
          definen.
        </p>
      </header>

      {/* SECCIÓN 1 · ADN MBC */}
      <section id="adn" className="scroll-mt-24">
        <SectionHeader
          eyebrow="01"
          title="Nuestro ADN"
          subtitle="Cuatro pilares culturales que llevamos a equipos, clientes y compañeros. Como embajadores de MBC, los conocemos y los amplificamos."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADN.map((pilar, i) => (
            <motion.article
              key={pilar.id}
              id={`adn-${pilar.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-panel rounded-3xl p-7 relative overflow-hidden border border-surface-container scroll-mt-24"
            >
              <div
                className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${pilar.accent} opacity-15 blur-3xl`}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${pilar.accent}`}
                  >
                    <pilar.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-5xl font-bold text-on-surface-variant/30 leading-none">
                    {pilar.number}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-4">
                  {pilar.title}
                </h3>
                <ul className="space-y-2">
                  {pilar.comportamientos.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm text-on-surface-variant"
                    >
                      <span className="text-electric-rose mt-1 shrink-0">·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SECCIÓN 2 · HISTORIA */}
      <section id="historia" className="scroll-mt-24">
        <SectionHeader
          eyebrow="02"
          title="Nuestra historia"
          subtitle="Más de 20 años de historia dentro del Grupo Indra. Cuatro etapas que nos llevaron de boutique de consultoría a la unidad MBC actual."
        />
        <ol className="relative border-l-2 border-surface-container ml-6 md:ml-10 space-y-10 pb-4">
          {HISTORIA.map((hito, i) => (
            <motion.li
              key={hito.rango}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-background bg-electric-rose" />
              <p className="text-xs font-bold uppercase tracking-widest text-electric-rose mb-1">
                {hito.rango}
              </p>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {hito.titulo}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {hito.descripcion}
              </p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* SECCIÓN 3 · MODELO ORGANIZATIVO */}
      <section id="organizacion" className="scroll-mt-24">
        <SectionHeader
          eyebrow="03"
          title="Modelo organizativo Indra"
          subtitle="Indra es la matriz. Se divide en Mercados y Verticales (donde vive Minsait), Oferta y Operaciones, e Internacional."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {ORG_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="glass-panel rounded-2xl p-5 border border-surface-container"
            >
              <p className="text-3xl font-bold text-electric-rose mb-1">
                {s.value}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface mb-0.5">
                {s.label}
              </p>
              {s.sub && (
                <p className="text-[11px] text-on-surface-variant">{s.sub}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-surface-container">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-rose to-primary flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">
              Mercados y Verticales · donde vive Minsait
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Administración Pública",
              "Energía",
              "Industria y Consumo",
              "Telecomunicaciones y Media",
              "Sanidad",
              "Minsait Payments (MPS)",
              "Ciberseguridad (SIA)",
              "Servicios Financieros",
              "Unidad Consultoría · MBC",
            ].map((vertical) => (
              <div
                key={vertical}
                className="px-4 py-3 rounded-xl bg-surface-container/40 border border-surface-container text-sm text-on-surface"
              >
                {vertical}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-surface-container">
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
              Otras unidades del Grupo Indra
            </p>
            <div className="flex flex-wrap gap-2">
              {["Air Traffic Management (ATM)", "Mobility & Technology", "Defensa & Seguridad"].map(
                (u) => (
                  <span
                    key={u}
                    className="px-3 py-1.5 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold"
                  >
                    {u}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4 · MARCAS */}
      <section id="marcas" className="scroll-mt-24">
        <SectionHeader
          eyebrow="04"
          title="Multi-marca de la Unidad de Consultoría"
          subtitle="MBC se configura como un proyecto con fuerte ambición de crecimiento, anclado en especialización vertical y multi-marca."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARCAS.map((marca, i) => (
            <motion.div
              key={marca.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-panel rounded-3xl p-6 border border-surface-container relative overflow-hidden"
            >
              <div
                className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${marca.accent} opacity-15 blur-3xl`}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <Award
                    className={`w-8 h-8 ${
                      marca.badge ? "text-tertiary" : "text-electric-rose"
                    }`}
                  />
                  {marca.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-tertiary/15 text-tertiary px-2 py-1 rounded">
                      {marca.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-on-surface">
                  {marca.nombre}
                </h3>
                <p className="text-sm font-bold text-electric-rose mb-3">
                  {marca.tagline}
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {marca.detalle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 5 · EQUIPO PERÚ */}
      <section id="equipo-peru" className="scroll-mt-24">
        <SectionHeader
          eyebrow="05"
          title="Equipo MBC Perú"
          subtitle="El liderazgo local que te acompañará durante tu desarrollo. Filial Perú: Av. Jorge Basadre 233, San Isidro · Lima."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EQUIPO_PERU.map((m, i) => (
            <motion.div
              key={m.nombre}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="glass-panel rounded-2xl p-5 border border-surface-container flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-rose to-primary flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-base">
                  {m.nombre
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-on-surface truncate">
                  {m.nombre}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {m.rol}
                  {m.area ? ` · ${m.area}` : ""}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 glass-panel rounded-2xl p-5 border border-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-electric-rose shrink-0" />
            <div>
              <p className="text-sm font-bold text-on-surface">
                Sede principal · Oficina de Lima
              </p>
              <p className="text-xs text-on-surface-variant">
                Av. Jorge Basadre 233, San Isidro, Lima
              </p>
            </div>
          </div>
          <a
            href="mailto:mjrios@minsait.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-rose/10 border border-electric-rose/30 text-electric-rose text-xs font-bold uppercase tracking-widest hover:bg-electric-rose/20 transition-colors"
          >
            <Mail className="w-4 h-4" /> BP People · Majo Ríos
          </a>
        </div>
      </section>

      {/* CIERRE */}
      <section className="text-center pb-8">
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass-panel border border-electric-rose/30">
          <ShieldCheck className="w-5 h-5 text-electric-rose" />
          <span className="text-sm text-on-surface">
            ¿Listo para tu primer entregable?{" "}
            <a
              href="/journey/"
              className="font-bold text-electric-rose hover:underline"
            >
              Volver a My Journey →
            </a>
          </span>
        </div>
      </section>
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <p className="text-xs font-bold uppercase tracking-widest text-electric-rose mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-on-surface-variant max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
