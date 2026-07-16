import { KB, type Chunk } from "./escuelitaKb";

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
  iniciativas: ["historial", "precedente", "memoria", "mar"],
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

export type Hit = { c: Chunk; s: number };

/** Recuperación por scoring: tema > título > tags > cuerpo, con bonus de frase exacta. */
export function search(query: string): Hit[] {
  const qn = norm(query);
  if (!qn) return [];
  const toks = [...new Set(expand(qn).split(" ").filter((w) => w.length > 2 && !STOP.has(w)))];
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
