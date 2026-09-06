"use client";

import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  BookOpen,
  Video,
  FileText,
  Bookmark,
  TrendingUp,
  Download,
  PenLine,
  Type,
  MessageCircle,
  Package,
  Network,
  Wallet,
  CalendarCheck,
  ClipboardList,
  ShieldCheck,
  Briefcase,
  Mail,
  GraduationCap,
} from "lucide-react";
import { MyDocuments } from "@/components/MyDocuments";

interface OperativaItem {
  id: string;
  title: string;
  description: string;
  icon: typeof Network;
  type: string;
  cta: string;
  href: string;
  external?: boolean;
}

const operativaPeru: OperativaItem[] = [
  {
    id: "my-place",
    title: "My Place",
    description:
      "Herramienta corporativa de desarrollo: evaluaciones semestrales, Plan de Acción (PAS) y módulo de Mentoring. Acceso desde Indraweb.",
    icon: Network,
    type: "Plataforma",
    cta: "Abrir en Indraweb",
    href: "https://indraweb.indracompany.com/my-place",
    external: true,
  },
  {
    id: "service-point",
    title: "Service Point",
    description:
      "Punto único corporativo para cualquier consulta. Búsqueda por palabra clave (ej. 'proyecto', 'gastos') y enrutamiento al departamento correcto.",
    icon: ClipboardList,
    type: "Plataforma",
    cta: "Abrir Service Point",
    href: "https://servicepoint.indracompany.com",
    external: true,
  },
  {
    id: "gae",
    title: "GAE · Gastos de Empleado",
    description:
      "Solicitudes, anticipos y liquidaciones de viajes y gastos. De Analyst a Sr Manager los trámites son autónomos. Manual en post Teams.",
    icon: Wallet,
    type: "Plataforma",
    cta: "Abrir GAE",
    href: "https://indraweb.indracompany.com/gae",
    external: true,
  },
  {
    id: "workin",
    title: "Workin",
    description:
      "Vacaciones, boletas de pago, carta consular, certificado de 5ta y certificado de trabajo. Todo lo administrativo del empleado Perú.",
    icon: CalendarCheck,
    type: "Plataforma",
    cta: "Abrir Workin",
    href: "https://workin.grupotawa.com/",
    external: true,
  },
  {
    id: "davidocs",
    title: "Davidocs",
    description:
      "Plataforma de firma digital: contratos, renovaciones, adendas y documentos adicionales que firmas con la empresa.",
    icon: FileText,
    type: "Plataforma",
    cta: "Abrir Davidocs",
    href: "https://davidocs.com",
    external: true,
  },
  {
    id: "open-university",
    title: "Open University · Udemy",
    description:
      "Catálogo masivo de formación on-demand. Vías de aprendizaje MBC por categoría (Analyst a Sr Manager). Acceso desde Indraweb.",
    icon: GraduationCap,
    type: "Formación",
    cta: "Acceder",
    href: "https://indraweb.indracompany.com/open-university",
    external: true,
  },
  {
    id: "bp-peru",
    title: "BP People Perú · Majo Ríos",
    description:
      "Business Partner de RRHH para Perú y Brasil. Para dudas de licencias, EPS, beneficios y procesos locales.",
    icon: Mail,
    type: "Contacto",
    cta: "mjrios@minsait.com",
    href: "mailto:mjrios@minsait.com",
    external: true,
  },
  {
    id: "soporte-it",
    title: "Soporte IT Perú · Percy Rojas",
    description:
      "Entrega de portátil, terminal móvil, licencias y tarjeta de acceso. Soporte continuo en periféricos, Office 365 y conexión corporativa. Basadre piso 8.",
    icon: ShieldCheck,
    type: "Contacto",
    cta: "phrojas@indracompany.com",
    href: "mailto:phrojas@indracompany.com",
    external: true,
  },
  {
    id: "canal-directo",
    title: "Canal Directo · Ética y Acoso",
    description:
      "Plataforma confidencial para denunciar conductas no éticas. Acceso directo al Presidente de la Comisión de Auditoría y Cumplimiento de Indra.",
    icon: ShieldCheck,
    type: "Canal denuncia",
    cta: "canaldirecto@indra.es",
    href: "mailto:canaldirecto@indra.es",
    external: true,
  },
];

const welcomeKit = [
  {
    id: "firma-minsait",
    title: "Firma de correo Minsait",
    description: "Tu firma oficial con logo, tipografía y links sociales. Abre la página, click en 'Copiar firma' y pega en Outlook → Archivo → Opciones → Correo → Firmas.",
    icon: PenLine,
    type: "Plantilla HTML",
    cta: "Abrir y copiar",
    href: "/kit/firma-minsait.html",
    accent: "from-mbc-electric to-mbc-sky"
  },
  {
    id: "plantillas-corporativas",
    title: "Plantilla PowerPoint Minsait",
    description: "Template oficial .potx con maquetas, paleta y el crisol. Doble click para crear una nueva presentación basada en la plantilla.",
    icon: Package,
    type: ".potx · 27 MB",
    cta: "Descargar plantilla",
    href: "/kit/plantilla-minsait.potx",
    accent: "from-success to-mbc-sky"
  },
  {
    id: "tipografias-corporativas",
    title: "Tipografías corporativas Minsait",
    description: "ForFuture Sans · pack oficial 2026 con todos los pesos. Descomprime y haz doble click en cada .otf para instalar.",
    icon: Type,
    type: ".zip · 1 MB",
    cta: "Descargar pack",
    href: "/kit/tipografias-minsait.zip",
    accent: "from-mbc-sky to-mbc-electric"
  },
  {
    id: "canal-onboarding",
    title: "Canal #onboarding-mbc",
    description: "Únete al canal de Teams de bienvenida y preséntate al resto del equipo de Management & Business Consulting.",
    icon: MessageCircle,
    type: "Microsoft Teams",
    cta: "Abrir Teams",
    href: "https://teams.microsoft.com/l/channel/onboarding-mbc",
    accent: "from-mbc-electric to-success"
  },
  {
    id: "brand-center-galeria",
    title: "Galería · Indra Brand Center",
    description: "Banco oficial de imágenes corporativas para usar en presentaciones, documentos y decks de cliente. Búsqueda por temática y formato.",
    icon: BookOpen,
    type: "Portal externo",
    cta: "Abrir galería",
    href: "https://www.indrabrandcenter.com/document/365",
    accent: "from-success to-mbc-electric"
  }
];

export default function RecursosPage() {
  const categories = [
    { name: "Metodología", icon: BookOpen },
    { name: "Casos de Estudio", icon: FileText },
    { name: "Video Trainings", icon: Video },
    { name: "Frameworks", icon: TrendingUp },
  ];

  const Recursos = [
    {
      title: "Framework de Transformación Digital 2024",
      category: "Frameworks",
      type: "PDF",
      readTime: "15 min",
      recommended: true,
      description: "La guía definitiva utilizada por los Partners para estructurar proyectos de transformación end-to-end."
    },
    {
      title: "Masterclass: Gestión de Stakeholders Difíciles",
      category: "Video Trainings",
      type: "Video",
      readTime: "45 min",
      recommended: true,
      description: "Sesión grabada con el Director de Operaciones EMEA sobre técnicas avanzadas de negociación."
    },
    {
      title: "Plantilla de Assessment de Madurez Tecnológica",
      category: "Metodología",
      type: "Excel",
      readTime: "5 min",
      recommended: false,
      description: "Herramienta estandarizada para evaluar la infraestructura IT del cliente en la fase de discovery."
    },
    {
      title: "Caso de Éxito: Neo-Tokyo Logistics",
      category: "Casos de Estudio",
      type: "PDF",
      readTime: "20 min",
      recommended: false,
      description: "Desglose de cómo redujimos los costos operativos en un 30% mediante gemelos digitales."
    },
    {
      title: "Guía de Estilo para Presentaciones Ejecutivas",
      category: "Metodología",
      type: "PDF",
      readTime: "10 min",
      recommended: false,
      description: "Manual de marca y mejores prácticas para crear decks con impacto visual."
    },
    {
      title: "Prompt Engineering para Consultores",
      category: "Video Trainings",
      type: "Video",
      readTime: "30 min",
      recommended: true,
      description: "Aprende a aprovechar el Copilot para acelerar la investigación de mercado y síntesis de datos."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header & Search */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">Resource Hub</h1>
          <p className="text-on-surface-variant">Conocimiento colectivo curado para tu desarrollo.</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-mbc-electric/20 to-mbc-sky/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative bg-surface/80 backdrop-blur-md border border-surface-container rounded-2xl flex items-center px-4 py-3">
            <Search className="text-on-surface-variant w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Buscar metodologías, plantillas, casos..."
              className="bg-transparent border-none focus:ring-0 flex-1 text-on-surface placeholder-on-surface-variant/50 text-sm outline-none"
            />
            <div className="px-2 py-1 bg-surface-container rounded text-[10px] font-bold text-on-surface-variant ml-2">
              ⌘ K
            </div>
          </div>
        </div>
      </header>

      {/* Kit de Bienvenida - anchor targets para /journey */}
      <section id="welcome-kit" className="scroll-mt-24">
        <div className="flex items-center gap-2 mb-6">
          <Package className="text-mbc-blue w-5 h-5" />
          <h2 className="text-lg font-bold text-on-surface">Kit de Bienvenida</h2>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-mbc-electric/10 text-mbc-blue text-[10px] font-bold uppercase tracking-widest">Semana 1</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {welcomeKit.map((item, i) => (
            <motion.a
              key={item.id}
              id={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="scroll-mt-24 glass-panel rounded-3xl p-6 group relative overflow-hidden border border-surface-container hover:border-mbc-electric/40 transition-colors block"
            >
              <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${item.accent} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container/70 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-mbc-blue" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-2 py-1 bg-surface-container/50 rounded">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-mbc-blue transition-colors">{item.title}</h3>
                <p className="text-sm text-on-surface-variant mb-6 flex-1">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-mbc-blue flex items-center gap-1.5">
                    <Download className="w-4 h-4" /> {item.cta}
                  </span>
                  <span className="text-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">↗ externo</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Operativa Perú - plataformas y contactos del PPT oficial */}
      <section id="operativa-peru" className="scroll-mt-24">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="text-mbc-blue w-5 h-5" />
          <h2 className="text-lg font-bold text-on-surface">Operativa Perú</h2>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest">
            Día a día
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {operativaPeru.map((item, i) => (
            <motion.a
              key={item.id}
              id={item.id}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className="scroll-mt-24 glass-panel rounded-2xl p-5 group border border-surface-container hover:border-mbc-electric/40 transition-colors block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container/70 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-mbc-blue" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant px-2 py-1 bg-surface-container/50 rounded">
                  {item.type}
                </span>
              </div>
              <h3 className="text-base font-bold text-on-surface mb-1 group-hover:text-mbc-blue transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-on-surface-variant mb-4 line-clamp-3">{item.description}</p>
              <p className="text-xs font-bold text-mbc-blue truncate">{item.cta} ↗</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Mis Documentos (solo si Supabase está activo) */}
      <MyDocuments />

      {/* AI Recommendations */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-mbc-blue w-5 h-5" />
          <h2 className="text-lg font-bold text-on-surface">Recomendaciones del Copilot</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Recursos.filter(r => r.recommended).map((resource, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-panel rounded-3xl p-6 group cursor-pointer border border-mbc-electric/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-mbc-electric/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-mbc-electric/20" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-surface-container text-[10px] font-bold uppercase tracking-widest text-on-surface rounded-full">
                    {resource.category}
                  </span>
                  <Bookmark className="w-5 h-5 text-on-surface-variant hover:text-mbc-blue transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-mbc-blue transition-colors">{resource.title}</h3>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{resource.description}</p>
                <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" /> {resource.type}
                  </span>
                  <span>{resource.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          <button className="px-6 py-2.5 rounded-full bg-on-surface text-background font-bold text-sm whitespace-nowrap">
            Todos
          </button>
          {categories.map((cat, i) => (
            <button
              key={i}
              className="px-6 py-2.5 rounded-full glass-panel border border-surface-container hover:bg-surface-container transition-colors text-sm font-medium text-on-surface whitespace-nowrap flex items-center gap-2"
            >
              <cat.icon className="w-4 h-4" /> {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* All Recursos Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Recursos.filter(r => !r.recommended).map((resource, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="glass-panel rounded-3xl p-6 group cursor-pointer border border-surface-container hover:border-surface-container-highest transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                {resource.category}
              </span>
              <button className="w-8 h-8 rounded-full bg-surface-container/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4 text-on-surface" />
              </button>
            </div>
            <h3 className="text-base font-bold text-on-surface mb-2">{resource.title}</h3>
            <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{resource.description}</p>
            <div className="flex items-center justify-between text-xs text-on-surface-variant mt-auto">
              <span className="px-2 py-1 bg-surface-container/50 rounded flex items-center gap-1 font-medium">
                {resource.type}
              </span>
              <span>{resource.readTime}</span>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
