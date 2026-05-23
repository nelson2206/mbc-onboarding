"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  MessageSquare,
  Target,
  Zap,
  ChevronRight,
  TrendingUp,
  Brain
} from "lucide-react";
import Image from "next/image";

export default function SimuladorPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)] animate-in fade-in duration-500">
      {/* Main Simulation Area */}
      <section className="flex-1 flex flex-col relative rounded-3xl overflow-hidden border border-surface-container bg-surface-container/20">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-plum/30 via-background to-background opacity-80" />

        {/* Top Header of Simulador */}
        <header className="relative z-10 p-6 flex justify-between items-center border-b border-surface-container backdrop-blur-md bg-surface/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-electric-rose/10 flex items-center justify-center border border-electric-rose/20">
              <MessageSquare className="text-electric-rose w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">Módulo de Sinergia C-Level</h2>
              <p className="text-sm text-on-surface-variant flex items-center gap-2">
                <Target className="w-3 h-3 text-tertiary" />
                <span>Objetivo: Ganar la confianza del CFO</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Puntaje Actual</p>
              <p className="text-xl font-bold text-primary">8,450 <span className="text-xs text-on-surface-variant">XP</span></p>
            </div>
          </div>
        </header>

        {/* Narrative Scene */}
        <div className="relative z-10 flex-1 flex flex-col p-8 justify-end">
          <div className="max-w-3xl mb-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface/80 backdrop-blur-lg border border-surface-container rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="text-xs font-bold text-on-surface-variant">HR</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Helena Rodríguez</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">CFO - Neo Logistics</p>
                </div>
              </div>
              <p className="text-lg text-on-surface leading-relaxed">
                "He revisado la propuesta preliminar. Los números no cuadran con nuestra proyección del Q3. Si van a reestructurar la cadena de suministro, necesito garantías de que el margen de beneficio no caerá por debajo del 12%. ¿Cómo planean asegurar esto en los primeros tres meses?"
              </p>
            </motion.div>
          </div>

          {/* Dialogue Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex flex-col text-left p-5 rounded-2xl border border-surface-container bg-surface-container/30 hover:bg-surface-container/60 hover:border-tertiary/50 transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-tertiary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Enfoque Analítico
                </span>
                <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-tertiary transition-colors" />
              </div>
              <p className="text-sm font-medium text-on-surface relative z-10">
                "Nuestros modelos de IA predictiva muestran que optimizando las rutas B y C reduciremos los costos operativos un 15%, compensando cualquier caída en el margen."
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex flex-col text-left p-5 rounded-2xl border border-surface-container bg-surface-container/30 hover:bg-surface-container/60 hover:border-electric-rose/50 transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-electric-rose/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-electric-rose uppercase tracking-widest flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Manejo de Objeciones
                </span>
                <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-electric-rose transition-colors" />
              </div>
              <p className="text-sm font-medium text-on-surface relative z-10">
                "Entiendo su preocupación, Helena. El 12% es la línea roja. Hemos diseñado una fase de contingencia de 30 días donde el algoritmo corre en paralelo sin afectar la operación actual."
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex flex-col text-left p-5 rounded-2xl border border-surface-container bg-surface-container/30 hover:bg-surface-container/60 hover:border-primary/50 transition-all relative overflow-hidden md:col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Propuesta de Valor
                </span>
                <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-medium text-on-surface relative z-10">
                "El valor real no está en proteger el 12% a corto plazo, sino en desbloquear un crecimiento sostenido del 18% para el Q4. Déjeme mostrarle los datos de simulación que respaldan esta inversión inicial."
              </p>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Right Sidebar: Metrics and Skill Progression */}
      <aside className="w-full lg:w-80 flex flex-col gap-6">
        {/* Tension Meter */}
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Termómetro de Reunión</h3>
            <div className="w-2 h-2 rounded-full bg-electric-rose animate-pulse" />
          </div>
          <div className="mb-2 flex justify-between items-end">
            <span className="text-2xl font-bold text-on-surface">Tensión Alta</span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "30%" }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary to-electric-rose h-full"
            />
          </div>
          <p className="text-xs text-on-surface-variant mt-4">
            El CFO está a la defensiva sobre el margen. Requiere evidencia cuantitativa o reducción de riesgo.
          </p>
        </div>

        {/* Skill Progression */}
        <div className="glass-panel rounded-3xl p-6 flex-1">
          <h3 className="text-[10px] font-bold tracking-widest text-on-surface-variant mb-6 uppercase flex items-center gap-2">
            <Brain className="w-4 h-4" /> Desarrollo de Skills
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs text-on-surface mb-2">
                <span className="font-medium">Habilidad de comunicación</span>
                <span className="text-tertiary font-bold">Lvl 4</span>
              </div>
              <div className="flex gap-1 h-1.5 w-full">
                <div className="flex-1 bg-tertiary rounded-full" />
                <div className="flex-1 bg-tertiary rounded-full" />
                <div className="flex-1 bg-tertiary rounded-full" />
                <div className="flex-1 bg-tertiary rounded-full" />
                <div className="flex-1 bg-surface-container rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-on-surface mb-2">
                <span className="font-medium">Relación con el cliente</span>
                <span className="text-electric-rose font-bold">Lvl 2</span>
              </div>
              <div className="flex gap-1 h-1.5 w-full">
                <div className="flex-1 bg-electric-rose rounded-full" />
                <div className="flex-1 bg-electric-rose rounded-full" />
                <div className="flex-1 bg-surface-container rounded-full" />
                <div className="flex-1 bg-surface-container rounded-full" />
                <div className="flex-1 bg-surface-container rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-on-surface mb-2">
                <span className="font-medium">Problem Solving</span>
                <span className="text-primary font-bold">Lvl 3</span>
              </div>
              <div className="flex gap-1 h-1.5 w-full">
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-primary rounded-full" />
                <div className="flex-1 bg-surface-container rounded-full" />
                <div className="flex-1 bg-surface-container rounded-full" />
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl border border-electric-rose/20 bg-electric-rose/5">
            <p className="text-xs text-on-surface">
              <span className="font-bold text-electric-rose">Tip del Copilot:</span> Evita prometer ganancias futuras si la objeción actual es el riesgo inmediato.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
