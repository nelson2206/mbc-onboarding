"use client";

import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  BookOpen,
  Video,
  FileText,
  Bookmark,
  TrendingUp,
  Download
} from "lucide-react";

export default function RecursosPage() {
  const categories = [
    { name: "Metodología", icon: BookOpen },
    { name: "Casos de Estudio", icon: FileText },
    { name: "Video Trainings", icon: Video },
    { name: "Frameworks", icon: TrendingUp },
  ];

  const Recursos = [
    {
      title: "Framework de Transformación Digital 2024",
      category: "Frameworks",
      type: "PDF",
      readTime: "15 min",
      recommended: true,
      description: "La guía definitiva utilizada por los Partners para estructurar proyectos de transformación end-to-end."
    },
    {
      title: "Masterclass: Gestión de Stakeholders Difíciles",
      category: "Video Trainings",
      type: "Video",
      readTime: "45 min",
      recommended: true,
      description: "Sesión grabada con el Director de Operaciones EMEA sobre técnicas avanzadas de negociación."
    },
    {
      title: "Plantilla de Assessment de Madurez Tecnológica",
      category: "Metodología",
      type: "Excel",
      readTime: "5 min",
      recommended: false,
      description: "Herramienta estandarizada para evaluar la infraestructura IT del cliente en la fase de discovery."
    },
    {
      title: "Caso de Éxito: Neo-Tokyo Logistics",
      category: "Casos de Estudio",
      type: "PDF",
      readTime: "20 min",
      recommended: false,
      description: "Desglose de cómo redujimos los costos operativos en un 30% mediante gemelos digitales."
    },
    {
      title: "Guía de Estilo para Presentaciones Ejecutivas",
      category: "Metodología",
      type: "PDF",
      readTime: "10 min",
      recommended: false,
      description: "Manual de marca y mejores prácticas para crear decks con impacto visual."
    },
    {
      title: "Prompt Engineering para Consultores",
      category: "Video Trainings",
      type: "Video",
      readTime: "30 min",
      recommended: true,
      description: "Aprende a aprovechar el Copilot para acelerar la investigación de mercado y síntesis de datos."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header & Search */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">Resource Hub</h1>
          <p className="text-on-surface-variant">Conocimiento colectivo curado para tu desarrollo.</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-rose/20 to-primary/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative bg-surface/80 backdrop-blur-md border border-surface-container rounded-2xl flex items-center px-4 py-3">
            <Search className="text-on-surface-variant w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Buscar metodologías, plantillas, casos..."
              className="bg-transparent border-none focus:ring-0 flex-1 text-on-surface placeholder-on-surface-variant/50 text-sm outline-none"
            />
            <div className="px-2 py-1 bg-surface-container rounded text-[10px] font-bold text-on-surface-variant ml-2">
              ⌘ K
            </div>
          </div>
        </div>
      </header>

      {/* AI Recommendations */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-electric-rose w-5 h-5" />
          <h2 className="text-lg font-bold text-on-surface">Recomendaciones del Copilot</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Recursos.filter(r => r.recommended).map((resource, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-panel rounded-3xl p-6 group cursor-pointer border border-electric-rose/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-rose/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-electric-rose/20" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-surface-container text-[10px] font-bold uppercase tracking-widest text-on-surface rounded-full">
                    {resource.category}
                  </span>
                  <Bookmark className="w-5 h-5 text-on-surface-variant hover:text-electric-rose transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-electric-rose transition-colors">{resource.title}</h3>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{resource.description}</p>
                <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" /> {resource.type}
                  </span>
                  <span>{resource.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          <button className="px-6 py-2.5 rounded-full bg-on-surface text-background font-bold text-sm whitespace-nowrap">
            Todos
          </button>
          {categories.map((cat, i) => (
            <button
              key={i}
              className="px-6 py-2.5 rounded-full glass-panel border border-surface-container hover:bg-surface-container transition-colors text-sm font-medium text-on-surface whitespace-nowrap flex items-center gap-2"
            >
              <cat.icon className="w-4 h-4" /> {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* All Recursos Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Recursos.filter(r => !r.recommended).map((resource, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="glass-panel rounded-3xl p-6 group cursor-pointer border border-surface-container hover:border-surface-container-highest transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                {resource.category}
              </span>
              <button className="w-8 h-8 rounded-full bg-surface-container/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4 text-on-surface" />
              </button>
            </div>
            <h3 className="text-base font-bold text-on-surface mb-2">{resource.title}</h3>
            <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{resource.description}</p>
            <div className="flex items-center justify-between text-xs text-on-surface-variant mt-auto">
              <span className="px-2 py-1 bg-surface-container/50 rounded flex items-center gap-1 font-medium">
                {resource.type}
              </span>
              <span>{resource.readTime}</span>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
