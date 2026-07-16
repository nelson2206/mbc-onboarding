"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Send, User, Sparkles, CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { SUGERENCIAS, QUIZ, type QuizItem } from "@/lib/escuelitaKb";
import { resolver, TOTAL_INDEXADO, type Resultado } from "@/lib/escuelitaSearch";
import { TOTAL_SECCIONES } from "@/lib/escuelitaData";
import { md } from "@/lib/escuelitaMd";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Msg = { id: number; who: "bot" | "user"; text?: string; res?: Resultado };

const GREETING =
  "¡Hola! Soy la **Escuelita de Medios de Pago**. 👋\n\n" +
  "Tengo cargado el **diccionario de autorizaciones Visa** (544 códigos en 20 tablas), el **historial de 116 iniciativas** del área y los conceptos de Autorizaciones, Autenticación y Tokenización.\n\n" +
  "Puedes preguntarme por:\n" +
  "• Un **código concreto** — *\"¿qué significa el código 51?\"*, *\"MCC 5411\"*, *\"STIP 9001\"*.\n" +
  "• Un **concepto** — *\"diferencia entre autenticación y autorización\"*.\n" +
  "• **Precedentes** — *\"¿qué hicimos en MAR y Reintentos?\"*.\n\n" +
  "O pasa al **modo Entrenamiento** para poner a prueba al equipo con un quiz.";

const FALLBACK =
  "No encontré eso en la base de conocimiento.\n\n" +
  "**Puedo ayudarte con:**\n" +
  "• **Códigos Visa** — 544 registros: respuesta, STIP, MCC, CVV2/CAVV, ECI, POS, Processing, Response Source.\n" +
  "• **Autorizaciones** — flujo E2E, actores, validaciones del emisor, CP vs CNP, Approval Rate.\n" +
  "• **Autenticación** — 3DS, VCAS, frictionless vs challenge, OTP, CVV2.\n" +
  "• **Tokenización** — ciclo de vida, aprovisionamiento, Green/Yellow/Red.\n" +
  "• **Iniciativas** — 116 precedentes en 30 conceptos (MAR, VSPS, Bloqueos, Fraude…).\n\n" +
  "Para un código, menciónalo así: **código 05**, **MCC 5411**, **STIP 9001**.";

const PRI_STYLE: Record<string, string> = {
  Alta: "bg-tertiary/15 text-tertiary",
  Media: "bg-electric-rose/10 text-electric-rose",
  Baja: "bg-surface-container text-on-surface-variant",
};

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  );
}

/** Categoría del resultado de autorización (columna "Categoría" de CodResVisa). */
const CAT_LABEL: Record<string, string> = {
  "1": "Categoría 1 · Crítico / Retención / Fraude",
  "2": "Categoría 2 · Decline",
  "3": "Categoría 3 · Seguridad / Verificación",
  "4": "Categoría 4 · Error / Procesamiento",
};

/** Respuesta a un lookup de código: ground truth, se muestra literal. */
function CodigoCard({ res }: { res: Extract<Resultado, { kind: "codigo" }> }) {
  return (
    <>
      <p className="text-sm text-on-surface mb-3">
        {res.filas.length > 1 ? (
          <>
            El código <strong className="text-electric-rose">{res.cod}</strong> existe en{" "}
            <strong>{res.filas.length} tablas</strong> del diccionario:
          </>
        ) : (
          <>
            Código <strong className="text-electric-rose">{res.cod}</strong> en el diccionario Visa:
          </>
        )}
      </p>

      {res.filas.map((f, i) => (
        <div key={i} className="rounded-xl border border-surface-container bg-surface-container/25 p-3.5 mb-2.5 last:mb-0">
          <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
            <Chip className="bg-deep-plum text-white">{f.sheet}</Chip>
            {f.sec !== f.sheet && <Chip className="bg-surface-container text-on-surface-variant">{f.sec}</Chip>}
            <Chip className={PRI_STYLE[f.pri] ?? PRI_STYLE.Media}>Prioridad {f.pri}</Chip>
          </div>

          <dl className="space-y-1.5">
            {f.row.map((v, j) => {
              if (!v) return null;
              const label = f.hdr[j] ?? `Campo ${j + 1}`;
              const esCod = j === 0;
              const esCat = /categor/i.test(label);
              return (
                <div key={j} className="flex gap-2.5 text-sm">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant w-24 flex-none pt-0.5">
                    {label}
                  </dt>
                  <dd className={`flex-1 leading-snug ${esCod ? "font-bold text-electric-rose" : "text-on-surface"}`}>
                    {esCat && CAT_LABEL[v] ? CAT_LABEL[v] : v}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}

      <p className="text-[10px] text-on-surface-variant italic mt-2.5">
        Ground truth · citado literalmente del Diccionario de Autorizaciones Visa.
      </p>
    </>
  );
}

/** Respuesta a una búsqueda de precedentes en el historial de iniciativas. */
function IniciativasCard({ res }: { res: Extract<Resultado, { kind: "iniciativas" }> }) {
  return (
    <>
      <p className="text-sm text-on-surface mb-3">
        {res.concepto ? (
          <>
            <strong>{res.items.length}</strong> {res.items.length === 1 ? "iniciativa" : "iniciativas"} en{" "}
            <strong className="text-electric-rose">{res.concepto}</strong>:
          </>
        ) : (
          <>
            <strong>{res.items.length}</strong> {res.items.length === 1 ? "iniciativa" : "iniciativas"} relacionadas:
          </>
        )}
      </p>

      <ol className="space-y-2.5">
        {res.items.map(([concepto, nombre, desc], i) => (
          <li key={i} className="rounded-xl border border-surface-container bg-surface-container/25 p-3.5">
            <div className="flex items-start gap-2.5">
              <span className="flex-none w-5 h-5 rounded-md bg-electric-rose/15 text-electric-rose text-[10px] font-bold grid place-items-center mt-0.5">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-on-surface leading-snug">{nombre}</p>
                {!res.concepto && (
                  <Chip className="bg-surface-container text-on-surface-variant mt-1 inline-block">{concepto}</Chip>
                )}
                {desc && <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5">{desc}</p>}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="text-[10px] text-on-surface-variant italic mt-2.5">
        Memoria organizacional · Manual de iniciativas macro (116 iniciativas / 30 conceptos).
      </p>
    </>
  );
}

/* ══════════════ CHAT ══════════════ */
function ChatMode() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, who: "bot", text: GREETING }]);
  const [value, setValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, thinking]);

  const ask = useCallback((q: string) => {
    const query = q.trim();
    if (!query) return;
    setValue("");
    setMsgs((m) => [...m, { id: nextId.current++, who: "user", text: query }]);
    setThinking(true);
    setTimeout(() => {
      const res = resolver(query);
      setThinking(false);
      setMsgs((m) => [
        ...m,
        res.kind === "vacio"
          ? { id: nextId.current++, who: "bot", text: FALLBACK }
          : { id: nextId.current++, who: "bot", res },
      ]);
    }, 480 + Math.random() * 260);
  }, []);

  return (
    <div className="flex gap-6 h-full min-h-0">
      {/* Sugerencias */}
      <aside className="hidden lg:block w-64 flex-none overflow-y-auto custom-scrollbar pr-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
          Preguntas frecuentes
        </p>
        {SUGERENCIAS.map((g) => (
          <div key={g.grupo} className="mb-5">
            <h4 className="text-xs font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-rose" />
              {g.grupo}
            </h4>
            {g.items.map((i) => (
              <button
                key={i}
                onClick={() => ask(i)}
                className="block w-full text-left text-xs leading-snug text-on-surface-variant hover:text-electric-rose border border-surface-container hover:border-electric-rose/50 rounded-lg px-2.5 py-2 mb-1.5 transition-all hover:translate-x-0.5"
              >
                {i}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Conversación */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-5">
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className={`flex gap-3 ${m.who === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex-none flex items-center justify-center ${
                  m.who === "bot"
                    ? "bg-deep-plum border border-electric-rose/30"
                    : "bg-electric-rose/15 border border-electric-rose/25"
                }`}
              >
                {m.who === "bot" ? (
                  <GraduationCap className="w-4.5 h-4.5 text-electric-rose" />
                ) : (
                  <User className="w-4.5 h-4.5 text-electric-rose" />
                )}
              </div>

              <div className={`max-w-[calc(100%-3.5rem)] ${m.who === "user" ? "text-right" : ""}`}>
                {m.who === "user" ? (
                  <div className="inline-block bg-electric-rose/10 border border-electric-rose/20 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-on-surface text-left">
                    {m.text}
                  </div>
                ) : (
                  <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-3.5">
                    {/* Lookup de código: ground truth */}
                    {m.res?.kind === "codigo" && <CodigoCard res={m.res} />}

                    {/* Precedentes del historial */}
                    {m.res?.kind === "iniciativas" && <IniciativasCard res={m.res} />}

                    {/* Concepto (KB) o texto plano */}
                    {(!m.res || m.res.kind === "concepto") && (
                      <div
                        className="dg-prose text-sm text-on-surface"
                        dangerouslySetInnerHTML={{
                          __html: md(m.res?.kind === "concepto" ? m.res.hits[0].c.respuesta : m.text ?? ""),
                        }}
                      />
                    )}

                    {m.res?.kind === "concepto" && (
                      <>
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-dashed border-surface-container">
                          <Chip className="bg-electric-rose/10 text-electric-rose">{m.res.hits[0].c.fuente}</Chip>
                          <Chip className="bg-surface-container text-on-surface-variant">{m.res.hits[0].c.dominio}</Chip>
                          <Chip className="bg-surface-container text-on-surface-variant">{m.res.hits[0].c.tipo}</Chip>
                          <Chip className={PRI_STYLE[m.res.hits[0].c.prioridad]}>
                            Prioridad {m.res.hits[0].c.prioridad}
                          </Chip>
                        </div>
                        {m.res.hits.length > 1 && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">
                              Relacionado
                            </span>
                            {m.res.hits.slice(1).map((r) => (
                              <button
                                key={r.c.id}
                                onClick={() => ask(r.c.titulo)}
                                className="text-[11px] font-semibold text-on-surface-variant hover:text-electric-rose border border-surface-container hover:border-electric-rose/50 rounded-full px-2.5 py-1 transition-colors"
                              >
                                {r.c.tema}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {thinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-9 h-9 rounded-xl flex-none bg-deep-plum border border-electric-rose/30 flex items-center justify-center">
                <GraduationCap className="w-4.5 h-4.5 text-electric-rose" />
              </div>
              <div className="glass-panel rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-electric-rose"
                    animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <div className="pt-4 flex-none">
          <div className="glass-panel rounded-2xl flex items-end gap-2 p-2 pl-4 focus-within:ring-2 focus-within:ring-electric-rose/25 transition-all">
            <textarea
              ref={taRef}
              rows={1}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                const el = e.target;
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 120) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  ask(value);
                  if (taRef.current) taRef.current.style.height = "auto";
                }
              }}
              placeholder="Pregunta sobre autorizaciones, autenticación, tokenización, el diccionario Visa…"
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-on-surface placeholder:text-on-surface-variant/60 py-2.5 max-h-[120px]"
            />
            <button
              onClick={() => {
                ask(value);
                if (taRef.current) taRef.current.style.height = "auto";
              }}
              disabled={!value.trim()}
              aria-label="Enviar"
              className="flex-none w-9 h-9 rounded-xl bg-electric-rose flex items-center justify-center text-white disabled:opacity-35 hover:shadow-[0_0_15px_rgba(255,0,84,0.4)] transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-on-surface-variant/70 text-center mt-2">
            Diccionario Visa ({TOTAL_SECCIONES} tablas) · 116 iniciativas · {TOTAL_INDEXADO} registros indexados
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════ QUIZ ══════════════ */
function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function QuizMode() {
  const [order, setOrder] = useState<QuizItem[]>(() => shuffle(QUIZ));
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const restart = () => {
    setOrder(shuffle(QUIZ));
    setQi(0);
    setScore(0);
    setPicked(null);
  };

  if (qi >= order.length) {
    const pct = Math.round((score / order.length) * 100);
    const msg =
      pct >= 80
        ? "Dominas el material. Listo para soporte de primera línea."
        : pct >= 50
        ? "Buena base. Repasa en el chat los temas que fallaste."
        : "Conviene repasar. Usa el modo Resolver dudas para reforzar.";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="glass-panel rounded-3xl p-10 text-center max-w-lg mx-auto"
      >
        <div className="text-5xl font-bold text-electric-rose mb-2">
          {score}/{order.length}
        </div>
        <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
          {pct}% de aciertos.
          <br />
          {msg}
        </p>
        <button
          onClick={restart}
          className="inline-flex items-center gap-2 bg-electric-rose text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:shadow-[0_0_18px_rgba(255,0,84,0.45)] transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" /> Reintentar quiz
        </button>
      </motion.div>
    );
  }

  const q = order[qi];
  const answered = picked !== null;
  const ok = picked === q.c;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Pregunta {qi + 1} de {order.length}
        </span>
        <span className="text-xs font-bold text-on-surface">
          {score} {score === 1 ? "acierto" : "aciertos"}
        </span>
      </div>
      <div className="h-1.5 bg-surface-container rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-electric-rose rounded-full"
          animate={{ width: `${(qi / order.length) * 100}%` }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        />
      </div>

      <motion.div
        key={qi}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className="glass-panel rounded-3xl p-7"
      >
        <h3 className="text-base font-bold text-on-surface leading-snug mb-5">{q.p}</h3>

        {q.o.map((o, i) => {
          const state = !answered ? "idle" : i === q.c ? "ok" : i === picked ? "bad" : "muted";
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => {
                setPicked(i);
                if (i === q.c) setScore((s) => s + 1);
              }}
              className={`block w-full text-left text-sm leading-snug rounded-xl px-4 py-3 mb-2.5 border transition-all ${
                state === "idle"
                  ? "border-surface-container text-on-surface hover:border-electric-rose/60 hover:translate-x-0.5"
                  : state === "ok"
                  ? "border-tertiary bg-tertiary/10 text-on-surface font-semibold"
                  : state === "bad"
                  ? "border-electric-rose bg-electric-rose/10 text-on-surface"
                  : "border-surface-container text-on-surface-variant/60"
              }`}
            >
              {o}
            </button>
          );
        })}

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <div
                className={`mt-4 rounded-xl p-4 border ${
                  ok ? "bg-tertiary/10 border-tertiary/30" : "bg-electric-rose/8 border-electric-rose/25"
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                    ok ? "text-tertiary" : "text-electric-rose"
                  }`}
                >
                  {ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {ok ? "Correcto" : "Incorrecto"}
                </div>
                <p className="text-sm text-on-surface leading-relaxed">{q.e}</p>
                <p className="text-[10px] text-on-surface-variant italic mt-2">Fuente: {q.ref}</p>
              </div>
              <button
                onClick={() => {
                  setQi((i) => i + 1);
                  setPicked(null);
                }}
                className="mt-4 inline-flex items-center gap-2 bg-deep-plum text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:gap-3 transition-all"
              >
                {qi + 1 >= order.length ? "Ver resultado" : "Siguiente"} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ══════════════ PAGE ══════════════ */
export default function EscuelitaPage() {
  const [mode, setMode] = useState<"chat" | "quiz">("chat");

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] animate-in fade-in duration-500">
      <header className="flex-none mb-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-electric-rose"
            />
            <span className="text-[10px] font-bold text-electric-rose tracking-widest uppercase">
              Escuelita activa
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-electric-rose" />
            Escuelita · Medios de Pago
          </h1>
          <p className="text-sm text-on-surface-variant mt-1 max-w-2xl">
            Resuelve dudas del equipo y entrena a nuevos analistas sobre autorizaciones, autenticación,
            tokenización y el diccionario Visa.
          </p>
        </div>

        <div className="flex gap-1 bg-surface-container/40 p-1 rounded-xl border border-surface-container">
          {(
            [
              { k: "chat", label: "Resolver dudas", icon: Sparkles },
              { k: "quiz", label: "Entrenamiento", icon: GraduationCap },
            ] as const
          ).map((t) => (
            <button
              key={t.k}
              onClick={() => setMode(t.k)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition-all ${
                mode === t.k
                  ? "bg-surface text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden">
        {mode === "chat" ? (
          <ChatMode />
        ) : (
          <div className="h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
            <QuizMode />
          </div>
        )}
      </div>
    </div>
  );
}
