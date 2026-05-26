"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Dna,
  Route,
  FolderOpen,
  Settings,
  HelpCircle,
  Bot,
  Compass
} from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Simulador", href: "/simulator", icon: Dna },
    { name: "My Journey", href: "/journey", icon: Route },
    { name: "Inmersión Cultural", href: "/cultura", icon: Compass },
    { name: "Recursos", href: "/resources", icon: FolderOpen },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 h-full w-64 bg-surface-container/50 backdrop-blur-2xl flex-col py-24 px-4 gap-6 border-r border-surface-container z-40">
      <div className="px-2 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-electric-rose/20 flex items-center justify-center border border-electric-rose/30">
            <Bot className="text-electric-rose w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface">AI Copilot</h3>
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Strategic Onboarding</p>
          </div>
        </div>
        <Link href="/copilot">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 bg-electric-rose py-2 rounded-xl text-xs font-bold text-white hover:ai-glow-strong transition-all"
          >
            Summon Copilot
          </motion.button>
        </Link>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "text-electric-rose bg-electric-rose/10"
                  : "text-on-surface-variant hover:bg-white/5 hover:translate-x-1"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pb-4 flex flex-col gap-1">
        <button className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-white/5 rounded-xl transition-all">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Configuración</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-white/5 rounded-xl transition-all">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Support</span>
        </button>
      </div>
    </aside>
  );
}
