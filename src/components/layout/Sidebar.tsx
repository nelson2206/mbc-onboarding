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
  Compass,
  Award,
  GraduationCap,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { useAdminSession } from "@/lib/adminData";
import { MbcLogo } from "@/components/brand/MbcLogo";

export function Sidebar() {
  const pathname = usePathname();
  // El enlace solo se muestra a administradores. No es un control de seguridad
  // —la ruta sigue siendo accesible a mano—; quien protege los datos es RLS.
  const { isAdmin } = useAdminSession();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Simulador", href: "/simulator", icon: Dna },
    { name: "My Journey", href: "/journey", icon: Route },
    { name: "Inmersión Cultural", href: "/cultura", icon: Compass },
    { name: "Best Practices", href: "/best-practices", icon: Award },
    { name: "Escuelita", href: "/escuelita", icon: GraduationCap },
    { name: "Recursos", href: "/resources", icon: FolderOpen },
    ...(isAdmin
      ? [{ name: "Panel Admin", href: "/admin", icon: ShieldCheck }]
      : []),
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#002451] via-[#003478] to-[#00142e] flex-col pt-6 pb-8 px-4 gap-6 overflow-y-auto custom-scrollbar border-r border-white/10 z-40 text-white shadow-[4px_0_24px_-8px_rgba(0,0,0,0.4)]">
      <div className="px-2">
        <Link href="/dashboard" className="block mb-8" aria-label="MBC — inicio">
          <MbcLogo className="h-6 w-auto text-white" />
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-mbc-electric/20 flex items-center justify-center border border-mbc-electric/40">
            <Bot className="text-mbc-sky w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Copilot</h3>
            <p className="text-[10px] uppercase tracking-wider text-white/60">Strategic Onboarding</p>
          </div>
        </div>
        <Link href="/copilot">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 bg-mbc-electric-strong py-2.5 rounded-xl text-xs font-bold text-white hover:ai-glow-strong transition-all shadow-[0_6px_20px_-6px_rgba(20,122,255,0.6)]"
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
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "text-white bg-white/10 font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/5 hover:translate-x-1"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-full bg-mbc-sky shadow-[0_0_12px_rgba(127,178,255,0.9)]"
                />
              )}
              <item.icon className={clsx("w-5 h-5", isActive ? "text-mbc-sky" : "")} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pb-4 flex flex-col gap-1">
        <Link
          href="/settings"
          className={clsx(
            "relative flex items-center gap-3 px-4 py-2 rounded-xl transition-all",
            pathname.startsWith("/settings")
              ? "text-white bg-white/10"
              : "text-white/60 hover:text-white hover:bg-white/5"
          )}
        >
          <Settings className={clsx("w-5 h-5", pathname.startsWith("/settings") ? "text-mbc-sky" : "")} />
          <span className="text-sm">Configuración</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Support</span>
        </button>
      </div>
    </aside>
  );
}
