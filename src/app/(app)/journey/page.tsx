"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Map,
  Briefcase,
  Users,
  Presentation,
  Trophy,
  CheckCircle2,
  Lock
} from "lucide-react";

export default function JourneyPage() {
  const milestones = [
    {
      id: "analyst-start",
      title: "Inicio: Nivel Analyst",
      description: "Tus primeros pasos. Apoyarás en análisis, elaboración de documentos y coordinarás a miembros del equipo con ayuda del Sr. Consultant.",
      status: "completed",
      icon: Rocket,
      date: "Mes 1-6",
      color: "bg-tertiary",
      textColor: "text-tertiary"
    },
    {
      id: "operacion",
      title: "Dominio de La Operación",
      description: "Alcanza autonomía en la gestión de streams sencillos y en la elaboración de documentos verticales. Muestra capacidad de análisis y síntesis.",
      status: "completed",
      icon: Map,
      date: "Mes 6-12",
      color: "bg-tertiary",
      textColor: "text-tertiary"
    },
    {
      id: "promocion-consultant",
      title: "Promoción a Consultant",
      description: "Logra 100% de evaluación en 'La Operación' y más del 95% global. Gestiona recursos con éxito para avanzar de cargo.",
      status: "active",
      icon: Briefcase,
      date: "Activo",
      color: "bg-electric-rose",
      textColor: "text-electric-rose"
    },
    {
      id: "clientes",
      title: "Gestión de Los Clientes",
      description: "Adquiere responsabilidad en el proyecto. Colabora en preparación de ofertas y desarrolla relaciones de trabajo sólidas en el cliente.",
      status: "locked",
      icon: Users,
      date: "Bloqueado",
      color: "bg-surface-container",
      textColor: "text-on-surface-variant"
    },
    {
      id: "promocion-sr-consultant",
      title: "Promoción a Sr. Consultant",
      description: "Logra 100% en 'La Operación' y 'Las Personas'. El cliente te identifica como referente en tu ámbito de responsabilidad.",
      status: "locked",
      icon: Presentation,
      date: "Bloqueado",
      color: "bg-surface-container",
      textColor: "text-on-surface-variant"
    },
    {
      id: "manager",
      title: "Camino a Manager",
      description: "Autonomía en gestión de línea de proyecto. Identifica oportunidades comerciales, dirige workshops y alcanza un nivel Advanced en inglés.",
      status: "locked",
      icon: Trophy,
      date: "Bloqueado",
      color: "bg-surface-container",
      textColor: "text-on-surface-variant"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 py-10">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-on-surface">Tu <span className="text-electric-rose">Journey</span> de Carrera</h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          Cada hito representa el desarrollo de competencias en Operación, Clientes, Personas y como Profesional. Prepara tu camino al próximo cargo.
        </p>
      </header>

      <div className="relative border-l-2 border-surface-container ml-6 md:ml-12 pb-20">
        {milestones.map((milestone, index) => {
          const isActive = milestone.status === "active";
          const isCompleted = milestone.status === "completed";
          const isLocked = milestone.status === "locked";

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative pl-12 md:pl-16 pb-16 last:pb-0 ${isLocked ? 'opacity-50' : ''}`}
            >
              {/* Linea de tiempo dot */}
              <div className="absolute -left-[17px] top-0">
                <div className={`w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${milestone.color} ${isActive ? 'shadow-[0_0_15px_rgba(255,0,84,0.5)] animate-pulse' : ''}`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-background" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3 text-on-surface-variant" />
                  ) : (
                    <div className="w-3 h-3 bg-background rounded-full" />
                  )}
                </div>
              </div>

              {/* Content Card */}
              <div className={`glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 ${isActive ? 'border-electric-rose/50 ai-glow' : 'border-surface-container hover:bg-surface-container/30'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-surface/50 border border-surface-container`}>
                      <milestone.icon className={`w-6 h-6 ${milestone.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${isActive ? 'text-on-surface' : 'text-on-surface/80'}`}>
                        {milestone.title}
                      </h3>
                      <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mt-1">
                        {milestone.date}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <div className="px-4 py-1.5 rounded-full bg-electric-rose/10 border border-electric-rose/30 text-electric-rose text-xs font-bold uppercase tracking-wider">
                      Misión Actual
                    </div>
                  )}
                </div>

                <p className="text-base text-on-surface-variant leading-relaxed">
                  {milestone.description}
                </p>

                {isActive && (
                  <div className="mt-6">
                    <button className="bg-electric-rose px-6 py-2 rounded-full text-sm font-bold text-white hover:bg-primary transition-colors">
                      Ver Requisitos
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
