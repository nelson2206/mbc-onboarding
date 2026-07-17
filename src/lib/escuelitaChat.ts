import type { Fila } from "./escuelitaData";

/** Endpoint del proxy en Vercel. La API key vive allá, nunca aquí. */
const API = process.env.NEXT_PUBLIC_ESCUELITA_API ?? "";

export const chatDisponible = () => API.length > 0;

export type Turno = { rol: "user" | "assistant"; texto: string };

/** Aplana una ficha del diccionario a texto plano para pasarla como ground truth. */
export function filaATexto(filas: Fila[]): string {
  return filas
    .map((f) => {
      const campos = f.row
        .map((v, i) => (v ? `${f.hdr[i] ?? `Campo ${i + 1}`}: ${v}` : null))
        .filter(Boolean)
        .join("\n");
      return `[Tabla ${f.sheet} · ${f.sec} · prioridad ${f.pri}]\n${campos}`;
    })
    .join("\n\n");
}

export type RespuestaChat =
  | { ok: true; texto: string }
  | { ok: false; error: string };

/**
 * Pregunta a Haiku 4.5 vía el proxy.
 * `codigo` lleva la ficha ya resuelta por lookup exacto: el modelo la cita
 * literal en vez de reconstruirla (regla anti-alucinación de la matriz).
 */
export async function preguntarAlModelo(
  pregunta: string,
  historial: Turno[],
  codigo?: string,
  signal?: AbortSignal,
): Promise<RespuestaChat> {
  if (!API) return { ok: false, error: "El chat con IA no está configurado." };

  try {
    const r = await fetch(`${API.replace(/\/$/, "")}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta, historial, codigo }),
      signal,
    });

    if (!r.ok) {
      const cuerpo = await r.json().catch(() => null);
      return { ok: false, error: cuerpo?.error ?? `Error ${r.status} del servidor.` };
    }

    const data = await r.json();
    if (typeof data?.texto !== "string" || !data.texto.trim()) {
      return { ok: false, error: "El modelo devolvió una respuesta vacía." };
    }
    return { ok: true, texto: data.texto };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { ok: false, error: "Consulta cancelada." };
    }
    return { ok: false, error: "No se pudo contactar al servicio. Revisa tu conexión." };
  }
}
