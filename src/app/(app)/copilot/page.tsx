"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  Lightbulb, 
  Mail, 
  Brain, 
  Paperclip, 
  Mic, 
  Send, 
  Info,
  Network,
  ShieldCheck,
  User,
  ArrowRight
} from "lucide-react";

export default function CopilotPage() {
  return (
    <div className="flex h-[calc(100dvh-11rem)] md:h-[calc(100dvh-7rem)] relative overflow-hidden animate-in fade-in duration-500">
      {/* Subtle Ambient Background Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-mbc-electric-strong rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-mbc-sky rounded-full blur-[160px]" />
      </div>

      {/* Main Conversation Area */}
      <section className="flex-1 flex flex-col max-w-4xl mx-auto relative z-10 w-full">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-mbc-electric-strong"
            />
            <span className="text-[10px] font-bold text-mbc-blue tracking-widest uppercase">COPILOT ACTIVO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-on-surface">Simulador de Onboarding Estratégico</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            He analizado tu trayectoria actual. Estás al 42% de completar la integración de la fase uno. ¿Deberíamos refinar el mapeo de stakeholders?
          </p>
        </header>

        {/* Conversation Flow */}
        <div className="flex-1 overflow-y-auto md:pr-4 space-y-8 custom-scrollbar pb-40">
          {/* History Block 1: The Briefing */}
          <article className="glass-panel rounded-3xl p-5 md:p-8 max-w-3xl">
            <div className="flex gap-3 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-mbc-blue flex items-center justify-center border border-mbc-electric/30">
                  <Bot className="text-mbc-sky w-5 h-5" />
                </div>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-on-surface-variant mb-2 block tracking-widest uppercase">BITÁCORA DE MISIÓN: 09:42 AM</span>
                <p className="text-base text-on-surface leading-relaxed mb-6">
                  Basado en los datos iniciales, el cuello de botella más crítico para <span className="text-mbc-electric-strong font-medium">Minsait Business Consulting</span> actualmente es la alineación cultural dentro de los equipos de liderazgo en EMEA. Recomiendo comenzar con el <span className="border-b border-mbc-electric/50">Módulo de Sinergia Simulado</span> para probar la resiliencia en comunicación.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-surface-container bg-surface-container/30 hover:bg-surface-container/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <Network className="text-mbc-blue w-5 h-5" />
                      <ArrowRight className="text-on-surface-variant w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="font-medium text-on-surface text-sm">Mapeo de Stakeholders</p>
                    <p className="text-xs text-on-surface-variant mt-1">Identificar y clasificar a 14 tomadores de decisiones clave.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-surface-container bg-surface-container/30 hover:bg-surface-container/50 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <ShieldCheck className="text-success w-5 h-5" />
                      <ArrowRight className="text-on-surface-variant w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="font-medium text-on-surface text-sm">Mitigación de Riesgos</p>
                    <p className="text-xs text-on-surface-variant mt-1">Evaluar posibles objeciones en la estrategia 2024.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* User Message */}
          <div className="flex justify-end gap-4 max-w-3xl ml-auto">
            <div className="bg-mbc-electric/10 border border-mbc-electric/20 rounded-2xl rounded-tr-none p-6">
              <p className="text-base text-on-surface">¿Puedes mostrarme la proyección del cronograma para el despliegue en EMEA si nos saltamos la fase piloto?</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-white/10 flex-shrink-0">
              <User className="text-on-surface w-5 h-5" />
            </div>
          </div>

          {/* AI Response / Thinking */}
          <article className="glass-panel ai-glow rounded-3xl p-5 md:p-8 max-w-3xl">
            <div className="flex gap-3 md:gap-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-mbc-blue flex items-center justify-center border border-mbc-electric/30">
                  <Bot className="text-mbc-sky w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-on-surface-variant mb-2 block tracking-widest uppercase">BITÁCORA DE MISIÓN: JUSTO AHORA</span>
                <p className="text-base text-on-surface leading-relaxed mb-6">
                  Calculando trayectoria... Saltar la fase piloto incrementa la eficiencia en un <span className="text-success">14%</span>, pero crea un <span className="text-red-400 font-medium">riesgo 32% mayor</span> de fricción interna. Aquí tienes la proyección ajustada:
                </p>

                {/* Bento Visualizer */}
                <div className="grid grid-cols-4 gap-3 md:gap-4 mb-6">
                  <div className="col-span-4 md:col-span-3 bg-black/20 rounded-2xl p-4 md:p-6 border border-white/5 h-48 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-mbc-electric via-transparent to-transparent" />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
                        <span className="text-[10px] font-bold tracking-widest text-on-surface">ESTIMACIÓN DESPLIEGUE EMEA</span>
                        <span className="text-success text-[10px] font-bold tracking-widest">CONFIANZA: 89%</span>
                      </div>
                      <div className="flex items-end gap-2 h-full pb-2">
                        <motion.div initial={{height: 0}} animate={{height: "20%"}} transition={{duration: 1}} className="w-3 bg-surface-container rounded-t-full" />
                        <motion.div initial={{height: 0}} animate={{height: "40%"}} transition={{duration: 1, delay: 0.1}} className="w-3 bg-surface-container rounded-t-full" />
                        <motion.div initial={{height: 0}} animate={{height: "30%"}} transition={{duration: 1, delay: 0.2}} className="w-3 bg-surface-container rounded-t-full" />
                        <motion.div initial={{height: 0}} animate={{height: "70%"}} transition={{duration: 1, delay: 0.3}} className="w-3 bg-mbc-electric-strong rounded-t-full" />
                        <motion.div initial={{height: 0}} animate={{height: "90%"}} transition={{duration: 1, delay: 0.4}} className="w-3 bg-mbc-electric-strong rounded-t-full shadow-[0_0_15px_rgba(20,122,255,0.5)]" />
                        <motion.div initial={{height: 0}} animate={{height: "50%"}} transition={{duration: 1, delay: 0.5}} className="w-3 bg-surface-container rounded-t-full" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-1 bg-mbc-electric/10 rounded-2xl p-4 md:p-6 border border-mbc-electric/20 flex flex-col justify-center items-center text-center">
                    <span className="text-3xl md:text-4xl font-bold text-mbc-blue">6.2</span>
                    <span className="text-[10px] font-bold tracking-widest mt-2 text-on-surface">MESES TOTALES</span>
                  </div>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                  <button className="px-4 py-2 rounded-full border border-surface-container bg-surface-container/30 hover:bg-surface-container transition-colors text-xs text-on-surface whitespace-nowrap">Ver Análisis Detallado</button>
                  <button className="px-4 py-2 rounded-full border border-surface-container bg-surface-container/30 hover:bg-surface-container transition-colors text-xs text-on-surface whitespace-nowrap">Comparar con APAC</button>
                  <button className="px-4 py-2 rounded-full border border-surface-container bg-surface-container/30 hover:bg-surface-container transition-colors text-xs text-on-surface whitespace-nowrap">Redactar correo</button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Floating Dock */}
        <div className="absolute bottom-4 left-0 w-full bg-gradient-to-t from-background via-background/80 to-transparent pt-10 pb-2 z-20">
          <div className="flex flex-col gap-4">
            <div className="flex md:justify-center gap-3 overflow-x-auto pb-1 px-1 custom-scrollbar">
              <button className="bg-surface/80 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-surface-container hover:border-mbc-electric/50 transition-all text-on-surface-variant flex items-center gap-2 shrink-0 whitespace-nowrap">
                <Lightbulb className="w-4 h-4" />
                Resumir Fase Uno
              </button>
              <button className="bg-surface/80 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-surface-container hover:border-mbc-electric/50 transition-all text-on-surface-variant flex items-center gap-2 shrink-0 whitespace-nowrap">
                <Mail className="w-4 h-4" />
                Generar reporte semanal
              </button>
              <button className="bg-surface/80 backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-surface-container hover:border-mbc-electric/50 transition-all text-on-surface-variant flex items-center gap-2 shrink-0 whitespace-nowrap">
                <Brain className="w-4 h-4" />
                Simular pitch de cliente
              </button>
            </div>
            <div className="relative group mx-auto w-full max-w-3xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-mbc-electric/20 to-mbc-sky/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative glass-panel rounded-2xl flex items-center gap-1 p-2 pr-2 sm:pr-4 shadow-xl">
                <div className="hidden sm:block p-2 ml-2">
                  <Bot className="text-mbc-blue w-5 h-5" />
                </div>
                <input 
                  type="text"
                  placeholder="Pregúntale a Copilot sobre estrategia, riesgo o datos..." 
                  className="bg-transparent border-none focus:outline-none focus:ring-0 flex-1 min-w-0 text-on-surface placeholder:text-on-surface-variant/50 py-3 font-body-md" 
                />
                <div className="flex items-center gap-1">
                  <button className="p-1.5 sm:p-2 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-container transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-1.5 sm:p-2 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-container transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button className="ml-1 sm:ml-2 w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-mbc-electric-strong flex items-center justify-center text-white hover:shadow-[0_0_15px_rgba(20,122,255,0.4)] transition-all active:scale-95">
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Live Insights Panel */}
      <section className="hidden xl:flex flex-col w-80 gap-6 ml-8 h-full overflow-y-auto custom-scrollbar relative z-10 pr-4 pb-20">
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold tracking-widest text-on-surface-variant">DATOS CONTEXTUALES</h3>
            <Info className="text-on-surface-variant w-4 h-4" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Estabilidad del Mercado</p>
                <div className="w-full bg-surface-container h-1 mt-1 rounded-full overflow-hidden">
                  <motion.div initial={{width: 0}} animate={{width: "75%"}} transition={{duration: 1}} className="bg-success h-full" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-mbc-electric-strong" />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Aprobación de Stakeholders</p>
                <div className="w-full bg-surface-container h-1 mt-1 rounded-full overflow-hidden">
                  <motion.div initial={{width: 0}} animate={{width: "33%"}} transition={{duration: 1, delay: 0.2}} className="bg-mbc-electric-strong h-full" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-mbc-sky" />
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">Disponibilidad de Recursos</p>
                <div className="w-full bg-surface-container h-1 mt-1 rounded-full overflow-hidden">
                  <motion.div initial={{width: 0}} animate={{width: "50%"}} transition={{duration: 1, delay: 0.4}} className="bg-mbc-sky h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-[10px] font-bold tracking-widest text-on-surface-variant mb-4">ONBOARDING ACTIVO</h3>
          <div className="space-y-6">
            <div className="relative pl-6 border-l border-surface-container pb-6">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-surface" />
              <p className="text-sm font-medium text-on-surface">Auditoría Inicial de Estrategia</p>
              <p className="text-xs text-on-surface-variant">Completado el 12 Oct</p>
            </div>
            <div className="relative pl-6 border-l border-mbc-electric/30 pb-6">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-mbc-electric-strong border-2 border-surface shadow-[0_0_8px_rgba(20,122,255,0.6)]" />
              <p className="text-sm font-medium text-mbc-blue">Mapeo de Integración Cultural</p>
              <p className="text-xs text-on-surface-variant">En progreso - 2 pasos restantes</p>
            </div>
            <div className="relative pl-6 border-l border-surface-container">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-surface-container border-2 border-surface" />
              <p className="text-sm font-medium text-on-surface/50">Calibración Post-Lanzamiento</p>
              <p className="text-xs text-on-surface-variant/50">Próximo</p>
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-surface-container/30 border border-surface-container text-sm font-medium text-on-surface hover:bg-surface-container transition-colors">
            Convocar Guía Copilot
          </button>
        </div>

        <div className="rounded-3xl overflow-hidden relative h-48 border border-surface-container bg-surface-container/50">
          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-mbc-blue via-surface to-surface" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent p-6 flex flex-col justify-end">
            <p className="text-sm font-medium text-on-surface-variant">Próximo Hito:</p>
            <p className="text-lg font-bold text-on-surface">Cierre de Estrategia Q4</p>
          </div>
        </div>
      </section>
    </div>
  );
}
