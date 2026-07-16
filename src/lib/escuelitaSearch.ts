import { KB, type Chunk } from "./escuelitaKb";
import { SECCIONES, INICIATIVAS, lookupCodigo, type Fila, type Iniciativa } from "./escuelitaData";

/** Normaliza: minúsculas, sin acentos, sin puntuación. */
export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOP = new Set([
  "que","de","la","el","los","las","un","una","en","y","o","a","es","se","por","para","con","del","al",
  "como","cual","cuales","me","mi","su","lo","le","sus","este","esta","esto","son","ser","hay","tiene",
  "tienen","puede","pueden","si","no","mas","pero","cuando","donde","porque","quien","sobre","entre",
  "todo","toda","yo","tu","nos","ha","han","fue","era","muy","ya","hace","sirve","significa","funciona",
  "explicame","explica","dime","cuentame","quiero","saber","ayuda","ayudame","entender","diferencia",
]);

/** Sinónimos del dominio: permiten preguntar en lenguaje de negocio. */
const SYN: Record<string, string[]> = {
  stip: ["stand in", "standin", "stand-in", "sustituto"],
  cnp: ["card not present", "no presencial", "ecommerce", "e-commerce"],
  cp: ["card present", "presencial"],
  otp: ["codigo", "clave", "token sms", "challenge"],
  "3ds": ["3d secure", "three d secure", "emv 3ds", "autenticacion"],
  mcc: ["merchant category", "rubro", "giro"],
  vcas: ["motor de riesgo", "risk engine"],
  "approval rate": ["tasa de aprobacion", "aprobacion", "aprobados"],
  token: ["tokenizacion", "tokenizado"],
  aprovisionamiento: ["enrolamiento", "provisioning", "enrolar"],
  emisor: ["issuer", "banco"],
  adquirente: ["acquirer"],
  "codigo de respuesta": ["codres", "codresvisa", "response code", "rechazo"],
  gap: ["brecha", "pendiente", "falta"],
  "ground truth": ["verdad", "autoritativa", "fuente"],
  iniciativas: ["historial", "precedente", "memoria"],
  cvv2: ["cvv", "dcvv", "dcvv2", "codigo de seguridad"],
  eci: ["moto", "indicador"],
  green: ["verde", "semaforo", "elegibilidad"],
  prioridad: ["fase", "carga", "piloto"],
};

function expand(q: string) {
  let t = " " + q + " ";
  for (const [k, vs] of Object.entries(SYN)) {
    const kn = norm(k);
    if (t.includes(kn)) t += " " + vs.map(norm).join(" ");
    for (const v of vs) if (t.includes(norm(v))) t += " " + kn;
  }
  return t;
}

function tokens(q: string) {
  return [...new Set(expand(norm(q)).split(" ").filter((w) => w.length > 2 && !STOP.has(w)))];
}

/* ═════════════ RESULTADOS ═════════════ */
export type Hit = { c: Chunk; s: number };
export type Resultado =
  | { kind: "concepto"; hits: Hit[] }
  | { kind: "codigo"; cod: string; filas: Fila[] }
  | { kind: "iniciativas"; concepto: string | null; query: string; items: Iniciativa[] }
  | { kind: "vacio" };

/* ═════════════ 1 · LOOKUP DE CÓDIGO ═════════════ */
/** Nombres de tabla → hoja, para desambiguar "código 1 de CAVV" vs "categoría 1". */
const TABLA_HINT: Record<string, string> = {
  cavv: "CVV2", cvv2: "CVV2", dcvv2: "CVV2",
  stip: "STIP", mcc: "MCC", eci: "MOTO", moto: "MOTO",
  pos: "POS", "response source": "Response source",
  "processing code": "Procesing Code", "processing": "Procesing Code",
  "account funding": "Account Fonding", "funding": "Account Fonding",
  respuesta: "CodResVisa", codres: "CodResVisa", rechazo: "CodResVisa",
};

/** Detecta "¿qué significa el código 05?", "mcc 5411", "stip 9001", "código 51". */
function detectarCodigo(q: string): { cod: string; hint?: string } | null {
  const qn = norm(q);
  // Debe mencionar código/mcc/stip/etc. para no confundir con años o cantidades sueltas.
  const mencionaTabla = Object.keys(TABLA_HINT).find((k) => qn.includes(k));
  const mencionaCodigo = /\b(codigo|code|cod)\b/.test(qn);
  if (!mencionaTabla && !mencionaCodigo) return null;

  // Captura el token alfanumérico corto que sigue a la palabra clave, o cualquier número.
  const m =
    qn.match(/\b(?:codigo|code|cod|mcc|stip|eci|pos|cavv|cvv2)\s+(?:de\s+respuesta\s+)?([a-z0-9]{1,6})\b/) ||
    qn.match(/\b(\d{1,4})\b/);
  if (!m) return null;

  let cod = m[1];
  if (/^\d+$/.test(cod)) cod = String(parseInt(cod, 10)); // "05" -> "5"
  return { cod, hint: mencionaTabla ? TABLA_HINT[mencionaTabla] : undefined };
}

/* ═════════════ 2 · BÚSQUEDA DE INICIATIVAS ═════════════ */
const PIDE_INICIATIVAS = /\b(iniciativa|iniciativas|hicimos|hemos hecho|se hizo|antecedente|antecedentes|precedente|historial|ya se trabajo|que se hizo)\b/;

function buscarIniciativas(q: string): Resultado | null {
  const qn = norm(q);
  // Solo responde precedentes si se piden explícitamente. Sin esta guarda, los
  // conceptos del manual ("Autorización y reglas", "Fraude", "Tokenización")
  // secuestrarían cualquier pregunta conceptual que use esas palabras.
  if (!PIDE_INICIATIVAS.test(qn)) return null;

  const toks = tokens(q);
  if (!toks.length) return null;

  // ¿Menciona un concepto del manual? (ej. "MAR y Reintentos", "VSPS", "Bloqueos")
  let concepto: string | null = null;
  let mejor = 0;
  for (const c of new Set(INICIATIVAS.map((i) => i[0]))) {
    const cn = norm(c);
    const partes = cn.split(" ").filter((w) => w.length > 2 && !STOP.has(w));
    const match = partes.filter((p) => toks.includes(p)).length;
    if (match > mejor) {
      mejor = match;
      concepto = c;
    }
  }

  if (concepto && mejor >= 1) {
    const items = INICIATIVAS.filter((i) => i[0] === concepto);
    if (items.length) return { kind: "iniciativas", concepto, query: q, items };
  }

  // Búsqueda libre sobre nombre + descripción
  const scored = INICIATIVAS.map((i) => {
    const hay = norm(i[1] + " " + i[2] + " " + i[0]);
    const s = toks.filter((t) => hay.includes(t)).length;
    return { i, s };
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 8);

  if (!scored.length) return null;
  return { kind: "iniciativas", concepto: null, query: q, items: scored.map((x) => x.i) };
}

/* ═════════════ 3 · CONCEPTOS (KB) ═════════════ */
function buscarConceptos(query: string): Hit[] {
  const qn = norm(query);
  const toks = tokens(query);
  if (!toks.length) return [];

  return KB.map((c) => {
    const T = norm(c.titulo);
    const TAGS = norm(c.tags.join(" "));
    const B = norm(c.respuesta);
    const TEMA = norm(c.tema);
    let s = 0;
    for (const t of toks) {
      if (TEMA.includes(t)) s += 5;
      if (T.includes(t)) s += 4;
      if (TAGS.includes(t)) s += 3;
      if (B.includes(t)) s += 1;
    }
    for (const tag of c.tags) {
      const tn = norm(tag);
      if (tn.length > 4 && qn.includes(tn)) s += 6;
    }
    return { c, s: s / Math.sqrt(toks.length) };
  })
    .filter((x) => x.s > 2.2)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4);
}

/* ═════════════ ORQUESTADOR ═════════════ */
/** Prioridad: código exacto (ground truth) > iniciativas > conceptos. */
export function resolver(query: string): Resultado {
  const cod = detectarCodigo(query);
  if (cod) {
    let filas = lookupCodigo(cod.cod);
    if (cod.hint) {
      const f = filas.filter((x) => x.sheet === cod.hint);
      if (f.length) filas = f;
    }
    if (filas.length) return { kind: "codigo", cod: cod.cod, filas };
  }

  const ini = buscarIniciativas(query);
  if (ini) return ini;

  const hits = buscarConceptos(query);
  if (hits.length) return { kind: "concepto", hits };

  return { kind: "vacio" };
}

/** Compat: búsqueda conceptual directa. */
export function search(query: string): Hit[] {
  return buscarConceptos(query);
}

export const TOTAL_INDEXADO =
  KB.length + SECCIONES.reduce((n, s) => n + s.rows.length, 0) + INICIATIVAS.length;
