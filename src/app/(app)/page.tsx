"use client";

import { motion } from "framer-motion";
import {
  Route,
  Lock,
  Plus,
  LineChart,
  Users,
  ArrowRight,
  Sparkles,
  Rocket,
  Brain,
  Award,
  Medal
} from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Context */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface mb-2">
            Plan de Carrera <span className="text-mbc-blue">Management</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            Tu viaje de evolución en el Equipo de Consulta. Desarrolla tus competencias en Operación, Clientes, Personas y como Profesional.
          </p>
        </div>
        {/* XP / Level Badge */}
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-4 ai-glow">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="text-mbc-blue/10" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" />
              <circle
                className="text-mbc-blue transition-all duration-1000 ease-out"
                cx="50" cy="50" fill="transparent" r="40" stroke="currentColor"
                strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" strokeWidth="8"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-on-surface">AN</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">CARGO ACTUAL: ANALYST</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-on-surface">65%</span>
              <span className="text-on-surface-variant">/ 95% para Promoción</span>
            </div>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">

        {/* Learning Linea de tiempo (Vertical) */}
        <section className="md:col-span-4 lg:col-span-3 glass-panel rounded-3xl p-6 h-[700px] overflow-hidden flex flex-col">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-on-surface">
            <Route className="text-mbc-blue w-6 h-6" />
            Evolución
          </h2>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="relative border-l-2 border-surface-container ml-3 pl-8 py-2 space-y-10">
              {/* Step 1 (Active) */}
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-mbc-electric-strong border-4 border-surface ring-4 ring-mbc-electric/30 animate-pulse" />
                <div>
                  <h4 className="text-base font-bold text-on-surface">Analyst</h4>
                  <p className="text-sm text-on-surface-variant">Realiza análisis básicos, apoya la gestión y coordina soporte.</p>
                  <div className="mt-2 text-[10px] font-bold bg-mbc-electric/20 text-mbc-blue px-2 py-0.5 rounded-full inline-block">EN PROGRESO</div>
                </div>
              </div>
              {/* Step 2 (Locked) */}
              <div className="relative opacity-40">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-surface-container border-4 border-surface" />
                <div>
                  <h4 className="text-base font-bold text-on-surface">Consultant</h4>
                  <p className="text-sm text-on-surface-variant">Autónomo en streams sencillos, interlocutor válido y gestiona analysts.</p>
                  <div className="mt-2 text-on-surface-variant flex items-center gap-1 text-sm"><Lock className="w-3 h-3" /> Bloqueado</div>
                </div>
              </div>
              {/* Step 3 (Locked) */}
              <div className="relative opacity-40">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-surface-container border-4 border-surface" />
                <div>
                  <h4 className="text-base font-bold text-on-surface">Sr. Consultant</h4>
                  <p className="text-sm text-on-surface-variant">Supervisa trabajo, apoya pre-venta y lidera equipos de proyecto.</p>
                  <div className="mt-2 text-on-surface-variant flex items-center gap-1 text-sm"><Lock className="w-3 h-3" /> Bloqueado</div>
                </div>
              </div>
              {/* Step 4 (Locked) */}
              <div className="relative opacity-40">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-surface-container border-4 border-surface" />
                <div>
                  <h4 className="text-base font-bold text-on-surface">Manager</h4>
                  <p className="text-sm text-on-surface-variant">Consolida la relación comercial y gestiona la rentabilidad.</p>
                  <div className="mt-2 text-on-surface-variant flex items-center gap-1 text-sm"><Lock className="w-3 h-3" /> Bloqueado</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Missions & Quick Actions */}
        <div className="md:col-span-8 lg:col-span-6 space-y-6">
          {/* Quick Actions */}
          <div className="glass-panel rounded-2xl p-4 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container/30 border border-surface-container rounded-xl hover:bg-surface-container/50 transition-all text-sm font-medium text-on-surface">
              <Plus className="text-mbc-blue w-4 h-4" /> Solicitar Feedback
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container/30 border border-surface-container rounded-xl hover:bg-surface-container/50 transition-all text-sm font-medium text-on-surface">
              <LineChart className="text-mbc-electric-strong w-4 h-4" /> Ver Evaluación
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container/30 border border-surface-container rounded-xl hover:bg-surface-container/50 transition-all text-sm font-medium text-on-surface">
              <Users className="text-success w-4 h-4" /> CV Coporativo
            </button>
            <div className="flex-grow" />
            <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface text-sm transition-colors">
              Ocultar
            </button>
          </div>

          {/* Active Missions */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-on-surface">Objetivos de Proyecto Actual</h2>
              <button className="text-mbc-blue text-sm font-bold flex items-center gap-1 hover:text-mbc-electric-strong transition-colors">
                Ver KPI <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mission Card 1 */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group glass-panel rounded-3xl overflow-hidden hover:ai-glow transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden relative bg-surface-container">
                  {/* Utilizando un placeholder con gradiente por ahora */}
                  <div className="absolute inset-0 bg-gradient-to-br from-mbc-blue to-surface-container group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/50 sm:to-surface-container/50" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-on-surface">Dimensión: La Operación</h3>
                      <span className="text-success font-bold text-sm">Alta Ponderación (60%)</span>
                    </div>
                    <p className="text-sm text-on-surface-variant line-clamp-2">
                      Demuestra capacidad de análisis y síntesis. Elabora documentos de calidad, aplica metodologías adecuadas y transmite las conclusiones al responsable.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-surface bg-mbc-blue flex items-center justify-center text-[10px] font-bold text-white">OP</div>
                      </div>
                      <span className="text-xs text-on-surface-variant">Evaluación en curso</span>
                    </div>
                    <button className="bg-mbc-electric-strong px-6 py-2 rounded-full text-sm font-bold text-white hover:bg-mbc-sky transition-colors">
                      Ver detalle
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission Card 2 */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="group glass-panel rounded-3xl overflow-hidden hover:ai-glow transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden relative bg-surface-container">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-mbc-electric/20 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/50 sm:to-surface-container/50" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-on-surface">Dimensión: Las Personas</h3>
                      <span className="text-success font-bold text-sm">Ponderación (25%)</span>
                    </div>
                    <p className="text-sm text-on-surface-variant line-clamp-2">
                      Fomenta la contribución al equipo, mantén una actitud de cooperación, colabora en el buen clima y muestra interés en progresar.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-surface bg-on-surface-variant flex items-center justify-center text-[10px] font-bold text-white">PE</div>
                      </div>
                      <span className="text-xs text-on-surface-variant">Desarrollo continuo</span>
                    </div>
                    <button className="bg-surface-container/50 border border-surface-container px-6 py-2 rounded-full text-sm font-bold text-on-surface hover:bg-surface-container transition-colors">
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Right Sidebar: AI Copilot & Badges */}
        <section className="md:col-span-12 lg:col-span-3 space-y-6">
          {/* AI Copilot Recommendations Widget */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-mbc-electric/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-mbc-blue w-5 h-5" />
              <h2 className="text-base font-bold text-on-surface">Tips de Promoción</h2>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-surface-container/30 rounded-xl border border-surface-container hover:border-mbc-electric/30 transition-colors cursor-pointer relative z-10">
                <p className="text-[10px] font-bold text-on-surface-variant mb-1 uppercase">GAP ESTRATÉGICO</p>
                <p className="text-sm font-medium text-on-surface">Para ascender a Consultant requieres llegar al 100% en 'La Operación'.</p>
                <div className="mt-2 text-mbc-blue text-[10px] font-bold uppercase tracking-wider">Ver criterios →</div>
              </div>
              <div className="p-3 bg-surface-container/30 rounded-xl border border-surface-container hover:border-mbc-electric/30 transition-colors cursor-pointer relative z-10">
                <p className="text-[10px] font-bold text-on-surface-variant mb-1 uppercase">REQUISITO CORPORATIVO</p>
                <p className="text-sm font-medium text-on-surface">Actualiza tu CV al menos una vez cada seis meses e imputa horas semanalmente.</p>
                <div className="mt-2 text-mbc-blue text-[10px] font-bold uppercase tracking-wider">Ir a CV →</div>
              </div>
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
              <Medal className="text-mbc-electric-strong w-5 h-5" />
              Logros
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-1 group">
                <div className="w-14 h-14 rounded-full bg-mbc-blue/50 flex items-center justify-center border border-mbc-electric/40 group-hover:scale-110 transition-transform">
                  <Rocket className="text-mbc-sky w-6 h-6" />
                </div>
                <span className="text-[10px] text-on-surface-variant text-center">English Adv</span>
              </div>
              <div className="flex flex-col items-center gap-1 group opacity-30 grayscale">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center border border-success/40 group-hover:scale-110 transition-transform">
                  <Brain className="text-success w-6 h-6" />
                </div>
                <span className="text-[10px] text-on-surface-variant text-center">Problem Solver</span>
              </div>
              <div className="flex flex-col items-center gap-1 group opacity-30 grayscale">
                <div className="w-14 h-14 rounded-full bg-surface-container/50 flex items-center justify-center border border-surface-container">
                  <Award className="text-on-surface w-6 h-6" />
                </div>
                <span className="text-[10px] text-on-surface-variant text-center">Consultant</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2 border border-surface-container rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container/50 transition-colors">
              Ver Criterios
            </button>
          </div>

          {/* Daily Progress Stats */}
          <div className="glass-panel rounded-3xl p-6 bg-gradient-to-br from-surface-container to-mbc-blue/20">
            <h2 className="text-[10px] font-bold tracking-widest text-on-surface-variant mb-4 uppercase">KPIs Corporativos</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-on-surface mb-1">
                  <span>Cargabilidad Mensual</span>
                  <span className="font-bold">75%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-mbc-electric-strong w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-on-surface mb-1">
                  <span>Letra Evaluación</span>
                  <span className="font-bold">A</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-mbc-sky w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

