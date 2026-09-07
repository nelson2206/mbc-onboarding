"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Send,
  User,
  ArrowUpRight,
  Wrench,
  Users,
  FileText,
  Building2,
} from "lucide-react";
import { buscar, SUGERENCIAS, CATEGORIAS, type Entrada, type Categoria } from "@/lib/copilotKb";

/**
 * Asistente MBC: resuelve dudas de consultores sobre herramientas, personas,
 * documentos y clientes/offerings. No hay backend de IA conectado todavía
 * (a diferencia de Escuelita) — busca por palabras clave en
 * src/lib/copilotKb.ts, construida con contenido real de Recursos y Best
 * Practices. Si no encuentra nada razonable, lo dice y no inventa.
 */

const ICONO: Record<Categoria, typeof Wrench> = {
  herramienta: Wrench,
  persona: Users,
  documento: FileText,
  cliente: Building2,
  app: Bot,
};

interface Mensaje {
  id: string;
  who: "bot" | "user";
  texto: string;
  resultados?: Entrada[];
}

function idUnico() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const BIENVENIDA: Mensaje = {
  id: "bienvenida",
  who: "bot",
  texto:
    "Hola, soy el Asistente MBC. Pregúntame sobre herramientas (GAE, Workin, My Place...), personas de contacto, documentos del kit de bienvenida, o qué clientes trabajamos en cada offering.",
};

export default function CopilotPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([BIENVENIDA]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [mensajes]);

  function responder(pregunta: string) {
    const limpia = pregunta.trim();
    if (!limpia) return;

    const resultados = buscar(limpia);
    const botTexto =
      resultados.length > 0
        ? resultados[0].respuesta
        : "No tengo esa información todavía. Prueba con Recursos, Best Practices, o pregunta directamente en el canal #onboarding-mbc de Teams.";

    setMensajes((prev) => [
      ...prev,
      { id: idUnico(), who: "user", texto: limpia },
      { id: idUnico(), who: "bot", texto: botTexto, resultados: resultados.slice(0, 3) },
    ]);
    setInput("");
  }

  return (
    <div className="flex h-[calc(100dvh-11rem)] md:h-[calc(100dvh-7rem)] relative overflow-hidden animate-in fade-in duration-500">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-mbc-electric-strong rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-mbc-sky rounded-full blur-[160px]" />
      </div>

      {/* Main Conversation Area */}
      <section className="flex-1 flex flex-col max-w-4xl mx-auto relative z-10 w-full">
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-mbc-electric-strong"
            />
            <span className="text-[10px] font-bold text-mbc-blue tracking-widest uppercase">ASISTENTE MBC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-on-surface">¿En qué te ayudo?</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Herramientas, personas de contacto, documentos del kit de bienvenida o clientes de cada offering.
          </p>
        </header>

        {/* Conversation Flow */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto md:pr-4 space-y-6 custom-scrollbar pb-40">
          {mensajes.map((m) =>
            m.who === "bot" ? (
              <article key={m.id} className="glass-panel rounded-3xl p-5 md:p-8 max-w-3xl">
                <div className="flex gap-3 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-mbc-blue flex items-center justify-center border border-mbc-electric/30">
                      <Bot className="text-mbc-sky w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base text-on-surface leading-relaxed">{m.texto}</p>
                    {m.resultados && m.resultados.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                        {m.resultados.map((r) => {
                          const Icon = ICONO[r.categoria];
                          return (
                            <a
                              key={r.id}
                              href={r.href}
                              target={r.href?.startsWith("http") ? "_blank" : undefined}
                              rel={r.href?.startsWith("http") ? "noreferrer" : undefined}
                              className="p-4 rounded-xl border border-surface-container bg-surface-container/30 hover:bg-surface-container/50 transition-colors group"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <Icon className="text-mbc-blue w-5 h-5" />
                                <ArrowUpRight className="text-on-surface-variant w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </div>
                              <p className="font-medium text-on-surface text-sm">{r.pregunta}</p>
                              {r.ctaLabel && (
                                <p className="text-xs text-mbc-electric-strong mt-1 font-semibold">{r.ctaLabel}</p>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ) : (
              <div key={m.id} className="flex justify-end gap-4 max-w-3xl ml-auto">
                <div className="bg-mbc-electric/10 border border-mbc-electric/20 rounded-2xl rounded-tr-none p-4 md:p-6">
                  <p className="text-base text-on-surface">{m.texto}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-white/10 flex-shrink-0">
                  <User className="text-on-surface w-5 h-5" />
                </div>
              </div>
            )
          )}
        </div>

        {/* Floating Dock */}
        <div className="absolute bottom-4 left-0 w-full bg-gradient-to-t from-background via-background/80 to-transparent pt-10 pb-2 z-20">
          <div className="flex flex-col gap-4">
            <div className="flex md:justify-center gap-3 overflow-x-auto pb-1 px-1 custom-scrollbar">
              {SUGERENCIAS.map((s) => (
                <button
                  key={s}
                  onClick={() => responder(s)}
                  className="bg-surface/80 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-surface-container hover:border-mbc-electric/50 transition-all text-on-surface-variant shrink-0 whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                responder(input);
              }}
              className="relative group mx-auto w-full max-w-3xl"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-mbc-electric/20 to-mbc-sky/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative glass-panel rounded-2xl flex items-center gap-1 p-2 pr-2 sm:pr-4 shadow-xl">
                <div className="hidden sm:block p-2 ml-2">
                  <Bot className="text-mbc-blue w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregunta sobre herramientas, personas, documentos o clientes..."
                  className="bg-transparent border-none focus:outline-none focus:ring-0 flex-1 min-w-0 text-on-surface placeholder:text-on-surface-variant/50 py-3 font-body-md"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="ml-1 sm:ml-2 w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-mbc-electric-strong flex items-center justify-center text-white hover:shadow-[0_0_15px_rgba(20,122,255,0.4)] transition-all active:scale-95 disabled:opacity-40"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Right Side: Categorías */}
      <section className="hidden xl:flex flex-col w-72 gap-4 ml-8 h-full overflow-y-auto custom-scrollbar relative z-10 pr-4 pb-20">
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-[10px] font-bold tracking-widest text-on-surface-variant mb-4">SOBRE QUÉ PREGUNTAR</h3>
          <div className="space-y-4">
            {CATEGORIAS.map((c) => {
              const Icon = ICONO[c.id];
              return (
                <div key={c.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-mbc-electric/10 border border-mbc-electric/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-mbc-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{c.label}</p>
                    <p className="text-xs text-on-surface-variant">{c.ejemplo}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Este asistente responde por coincidencia de palabras clave sobre contenido real de la app — no tiene un
            modelo de IA conectado todavía. Si no encuentra tu respuesta, revisa{" "}
            <a href="/resources" className="text-mbc-electric-strong font-semibold hover:underline">
              Recursos
            </a>{" "}
            o{" "}
            <a href="/best-practices" className="text-mbc-electric-strong font-semibold hover:underline">
              Best Practices
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
