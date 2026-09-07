/**
 * Base de conocimiento local del Asistente MBC.
 *
 * A diferencia de Escuelita (que sí llama a un modelo real vía el proxy de
 * escuelitaChat.ts), este asistente no tiene backend de IA propio todavía:
 * responde por coincidencia de palabras clave contra un índice fijo,
 * construido a mano con contenido real ya existente en la app (Recursos,
 * Best Practices). Es deliberadamente honesto — si no hay una coincidencia
 * razonable, lo dice y redirige a la sección correcta en vez de inventar
 * una respuesta.
 */

export type Categoria = "herramienta" | "persona" | "documento" | "cliente" | "app";

export interface Entrada {
  id: string;
  categoria: Categoria;
  pregunta: string;
  keywords: string[];
  respuesta: string;
  href?: string;
  ctaLabel?: string;
}

export const BASE: Entrada[] = [
  // Herramientas operativas (Recursos > Perú)
  {
    id: "my-place",
    categoria: "herramienta",
    pregunta: "¿Qué es My Place?",
    keywords: ["my place", "evaluacion", "evaluación", "pas", "mentoring", "plan de accion", "desarrollo"],
    respuesta:
      "My Place es la herramienta corporativa de desarrollo: evaluaciones semestrales, Plan de Acción (PAS) y el módulo de Mentoring. Se accede desde Indraweb.",
    href: "https://indraweb.indracompany.com/my-place",
    ctaLabel: "Abrir My Place",
  },
  {
    id: "service-point",
    categoria: "herramienta",
    pregunta: "¿Dónde hago una consulta general?",
    keywords: ["service point", "consulta", "duda", "ticket", "ayuda general"],
    respuesta:
      "Service Point es el punto único corporativo para cualquier consulta: busca por palabra clave (ej. 'proyecto', 'gastos') y te enruta al departamento correcto.",
    href: "https://servicepoint.indracompany.com",
    ctaLabel: "Abrir Service Point",
  },
  {
    id: "gae",
    categoria: "herramienta",
    pregunta: "¿Cómo reporto un gasto de viaje?",
    keywords: ["gae", "gasto", "viatico", "viático", "anticipo", "liquidacion", "liquidación", "viaje"],
    respuesta:
      "GAE (Gastos de Empleado) gestiona solicitudes, anticipos y liquidaciones de viajes y gastos. De Analyst a Sr Manager el trámite es autónomo; el manual está en el post de Teams.",
    href: "https://indraweb.indracompany.com/gae",
    ctaLabel: "Abrir GAE",
  },
  {
    id: "workin",
    categoria: "herramienta",
    pregunta: "¿Dónde veo mi boleta de pago?",
    keywords: ["workin", "boleta", "vacaciones", "certificado", "carta consular", "5ta categoria", "quinta categoria"],
    respuesta:
      "Workin centraliza lo administrativo del empleado en Perú: vacaciones, boletas de pago, carta consular, certificado de 5ta y certificado de trabajo.",
    href: "https://workin.grupotawa.com/",
    ctaLabel: "Abrir Workin",
  },
  {
    id: "davidocs",
    categoria: "herramienta",
    pregunta: "¿Dónde firmo mi contrato?",
    keywords: ["davidocs", "firma digital", "contrato", "adenda", "renovacion", "renovación"],
    respuesta:
      "Davidocs es la plataforma de firma digital para contratos, renovaciones, adendas y documentos adicionales con la empresa.",
    href: "https://davidocs.com",
    ctaLabel: "Abrir Davidocs",
  },
  {
    id: "open-university",
    categoria: "herramienta",
    pregunta: "¿Dónde encuentro cursos?",
    keywords: ["open university", "udemy", "curso", "formacion", "formación", "capacitacion", "capacitación"],
    respuesta:
      "Open University (Udemy) es el catálogo masivo de formación on-demand, con rutas de aprendizaje MBC por categoría (Analyst a Sr Manager). Se accede desde Indraweb.",
    href: "https://indraweb.indracompany.com/open-university",
    ctaLabel: "Acceder a Open University",
  },

  // Personas / contactos reales
  {
    id: "bp-peru",
    categoria: "persona",
    pregunta: "¿Quién es mi contacto de RR.HH.?",
    keywords: ["rrhh", "recursos humanos", "business partner", "majo", "licencia", "eps", "beneficios"],
    respuesta:
      "Majo Ríos es la Business Partner de RR.HH. para Perú y Brasil: dudas de licencias, EPS, beneficios y procesos locales.",
    href: "mailto:mjrios@minsait.com",
    ctaLabel: "Escribir a Majo Ríos",
  },
  {
    id: "soporte-it",
    categoria: "persona",
    pregunta: "¿A quién le pido mi laptop?",
    keywords: ["laptop", "portatil", "portátil", "it", "soporte tecnico", "soporte técnico", "tarjeta de acceso", "office 365", "percy"],
    respuesta:
      "Percy Rojas es soporte IT Perú: entrega de portátil, terminal móvil, licencias y tarjeta de acceso; también soporte de periféricos, Office 365 y conexión corporativa (Basadre piso 8).",
    href: "mailto:phrojas@indracompany.com",
    ctaLabel: "Escribir a Percy Rojas",
  },
  {
    id: "canal-directo",
    categoria: "persona",
    pregunta: "¿Cómo denuncio una conducta no ética?",
    keywords: ["etica", "ética", "acoso", "denuncia", "canal directo", "compliance"],
    respuesta:
      "Canal Directo es la vía confidencial para denunciar conductas no éticas, con acceso directo al Presidente de la Comisión de Auditoría y Cumplimiento de Indra.",
    href: "mailto:canaldirecto@indra.es",
    ctaLabel: "Escribir al Canal Directo",
  },

  // Documentos / Welcome Kit
  {
    id: "firma",
    categoria: "documento",
    pregunta: "¿Cómo pongo mi firma de correo?",
    keywords: ["firma", "correo", "outlook", "email signature", "mail"],
    respuesta:
      "En Recursos → Welcome Kit tienes la firma oficial de correo Minsait: abre la página, dale a 'Copiar firma' y pégala en Outlook → Archivo → Opciones → Correo → Firmas.",
    href: "/resources",
    ctaLabel: "Ir a Recursos",
  },
  {
    id: "plantilla-ppt",
    categoria: "documento",
    pregunta: "¿Dónde está la plantilla de PowerPoint?",
    keywords: ["plantilla", "powerpoint", "potx", "ppt", "presentacion", "presentación", "crisol"],
    respuesta:
      "La plantilla oficial .potx con las maquetas, la paleta y el crisol está en Recursos → Welcome Kit. Doble click para crear una presentación nueva basada en ella.",
    href: "/resources",
    ctaLabel: "Ir a Recursos",
  },
  {
    id: "tipografias",
    categoria: "documento",
    pregunta: "¿Qué tipografía usa la marca?",
    keywords: ["tipografia", "tipografía", "fuente", "font", "forfuture", "montserrat"],
    respuesta:
      "ForFuture Sans es la tipografía corporativa Minsait; el pack oficial con todos los pesos está en Recursos → Welcome Kit.",
    href: "/resources",
    ctaLabel: "Ir a Recursos",
  },
  {
    id: "cv-template",
    categoria: "documento",
    pregunta: "¿Dónde descargo la plantilla de CV?",
    keywords: ["cv", "curriculum", "currículum", "plantilla cv", "perfil profesional"],
    respuesta:
      "La plantilla de CV corporativo la armas y descargas directamente en la sección CV Corporativo de esta app.",
    href: "/cv",
    ctaLabel: "Ir a CV Corporativo",
  },
  {
    id: "canal-onboarding",
    categoria: "documento",
    pregunta: "¿Hay un grupo de bienvenida?",
    keywords: ["teams", "canal", "onboarding", "bienvenida", "grupo", "equipo"],
    respuesta:
      "Únete al canal de Teams #onboarding-mbc para presentarte al resto del equipo de Management & Business Consulting.",
    href: "https://teams.microsoft.com/l/channel/onboarding-mbc",
    ctaLabel: "Abrir Teams",
  },

  // Herramientas de la propia app
  {
    id: "app-journey",
    categoria: "app",
    pregunta: "¿Qué es My Journey?",
    keywords: ["journey", "reto", "retos", "xp", "nivel", "mision", "misión", "misiones"],
    respuesta:
      "My Journey es tu ruta de onboarding gamificada: 6 semanas de retos que suman XP y desbloquean tu siguiente nivel de carrera.",
    href: "/journey",
    ctaLabel: "Ir a My Journey",
  },
  {
    id: "app-escuelita",
    categoria: "app",
    pregunta: "¿Qué es Escuelita?",
    keywords: ["escuelita", "medios de pago", "visa", "autorizacion", "autorización", "tokenizacion", "tokenización"],
    respuesta:
      "Escuelita enseña Medios de Pago: autorizaciones, autenticación y tokenización, con el diccionario Visa y un chat que sí responde con IA sobre el material real de capacitación.",
    href: "/escuelita",
    ctaLabel: "Ir a Escuelita",
  },
  {
    id: "app-simulator",
    categoria: "app",
    pregunta: "¿Qué es el Simulador?",
    keywords: ["simulador", "caso", "decision", "decisión", "cliente dificil", "cliente difícil"],
    respuesta:
      "El Simulador te pone casos reales de consultoría (por ejemplo, un dato cuestionado en vivo por el cliente) y evalúa la decisión que tomarías.",
    href: "/simulator",
    ctaLabel: "Ir al Simulador",
  },
  {
    id: "app-best-practices",
    categoria: "cliente",
    pregunta: "¿Qué offerings vende MBC?",
    keywords: ["offering", "oferta", "servicio", "que vendemos", "qué vendemos", "practica", "práctica"],
    respuesta:
      "Best Practices resume las 6 offerings que más vende MBC: Data Strategy & Platform, Artificial Intelligence, Medios de Pago, Adquirencia, Open Finance y Efficiency · Operational Excellence — con metodología, plantillas y decks de cada una.",
    href: "/best-practices",
    ctaLabel: "Ir a Best Practices",
  },

  // Clientes / sectores (a partir de las 6 offerings reales de Best Practices)
  {
    id: "cliente-data",
    categoria: "cliente",
    pregunta: "¿Qué clientes usan Data Strategy?",
    keywords: ["data strategy", "data lake", "gobierno del dato", "cdo", "data platform"],
    respuesta:
      "Data Strategy & Platform es habitual en Banca, Retail, Telco, Energía y Seguros: clientes con varios data lakes, ETLs duplicados y un CDO bajo presión que necesita roadmap, governance y arquitectura objetivo.",
    href: "/best-practices",
    ctaLabel: "Ver offering Data",
  },
  {
    id: "cliente-ai",
    categoria: "cliente",
    pregunta: "¿Qué clientes usan AI?",
    keywords: ["inteligencia artificial", "ia", "poc", "mlops", "artificial intelligence"],
    respuesta:
      "Artificial Intelligence es habitual en Banca, Seguros, Retail, Telco y Sector Público: de POCs huérfanos a productos de IA en producción.",
    href: "/best-practices",
    ctaLabel: "Ver offering AI",
  },
  {
    id: "cliente-pagos",
    categoria: "cliente",
    pregunta: "¿Qué clientes usan Medios de Pago?",
    keywords: ["medios de pago", "core bancario", "iso 20022", "instant payments", "core de pagos"],
    respuesta:
      "Medios de Pago trabaja con Banca, Fintech, EMIs y Sector Público: core de pagos moderno, instant payments e ISO 20022.",
    href: "/best-practices",
    ctaLabel: "Ver offering Medios de Pago",
  },
  {
    id: "cliente-adquirencia",
    categoria: "cliente",
    pregunta: "¿Qué clientes usan Adquirencia?",
    keywords: ["adquirencia", "acquiring", "merchant", "tpv", "comercios"],
    respuesta:
      "Adquirencia (Acquiring) trabaja con Banca de adquirencia, Fintechs de pagos y Procesadores: crecimiento de portfolio comercial, TPV, pricing y onboarding de comercios.",
    href: "/best-practices",
    ctaLabel: "Ver offering Adquirencia",
  },
  {
    id: "cliente-open-finance",
    categoria: "cliente",
    pregunta: "¿Qué clientes usan Open Finance?",
    keywords: ["open finance", "api", "embedded finance", "psd2", "baas"],
    respuesta:
      "Open Finance trabaja con Banca, Fintech, Insurtech, Retail (BaaS) y Sector Público: APIs, embedded finance y ecosistemas financieros.",
    href: "/best-practices",
    ctaLabel: "Ver offering Open Finance",
  },
  {
    id: "cliente-efficiency",
    categoria: "cliente",
    pregunta: "¿Qué clientes usan Efficiency?",
    keywords: ["eficiencia", "opex", "rpa", "automatizacion", "automatización"],
    respuesta:
      "Efficiency · Operational Excellence trabaja con Banca, Telco, Energía, Industria, Retail y Sector Público: reducción de OPEX, automatización y optimización de procesos.",
    href: "/best-practices",
    ctaLabel: "Ver offering Efficiency",
  },
];

function normaliza(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Palabras interrogativas y de relleno: presentes en casi todas las
 *  preguntas de ejemplo del índice, así que si no se filtran generan
 *  coincidencias falsas (p.ej. "cómo" empareja cualquier entrada cuya
 *  pregunta también empiece con "¿Cómo...?"). */
// Ya pasaron por normaliza() (NFD + sin diacríticos) al llegar aquí, así que
// solo hacen falta las formas sin tilde.
const RELLENO = new Set([
  "como", "que", "cual", "cuales", "quien", "quienes", "donde", "cuando",
  "para", "por", "con", "sin", "una", "uno", "unos", "unas", "los", "las",
  "del", "sobre", "hay", "soy", "esta", "este", "esto",
]);

/** Busca por solapamiento de palabras clave. Sin modelo detrás: puro match textual. */
export function buscar(pregunta: string, max = 3): Entrada[] {
  const q = normaliza(pregunta);
  const terminos = q
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2 && !RELLENO.has(t));
  if (terminos.length === 0) return [];

  const puntuadas = BASE.map((e) => {
    const texto = normaliza(e.keywords.join(" ") + " " + e.pregunta + " " + e.respuesta);
    let score = 0;
    for (const t of terminos) {
      if (texto.includes(t)) score += 1;
    }
    return { e, score };
  }).filter((p) => p.score > 0);

  puntuadas.sort((a, b) => b.score - a.score);
  return puntuadas.slice(0, max).map((p) => p.e);
}

export const SUGERENCIAS: string[] = [
  "¿Dónde descargo la plantilla de CV?",
  "¿Quién es mi contacto de RR.HH.?",
  "¿Qué clientes usan Medios de Pago?",
  "¿Cómo reporto un gasto de viaje?",
  "¿Qué es Escuelita?",
];

export const CATEGORIAS: Array<{ id: Categoria; label: string; ejemplo: string }> = [
  { id: "herramienta", label: "Herramientas", ejemplo: "GAE, Workin, My Place, Service Point..." },
  { id: "persona", label: "Personas", ejemplo: "RR.HH., soporte IT, canal de ética..." },
  { id: "documento", label: "Documentos", ejemplo: "Firma, plantillas, CV, kit de bienvenida..." },
  { id: "cliente", label: "Clientes", ejemplo: "Sectores y offerings que vende MBC..." },
];
