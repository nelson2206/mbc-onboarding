"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Dna,
  Route,
  Compass,
  Award,
  GraduationCap,
  FolderOpen,
} from "lucide-react";

/** Barra de navegación inferior — solo en móvil (< md).
 *  En pantallas grandes navegan por el Sidebar/TopNav; en celular esos se
 *  ocultan, así que esta barra es la única forma de moverse entre secciones.
 *  Se desplaza horizontalmente si no caben todos los ítems. */
const items = [
  { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { name: "Simulador", href: "/simulator", icon: Dna },
  { name: "Journey", href: "/journey", icon: Route },
  { name: "Cultura", href: "/cultura", icon: Compass },
  { name: "Prácticas", href: "/best-practices", icon: Award },
  { name: "Escuelita", href: "/escuelita", icon: GraduationCap },
  { name: "Recursos", href: "/resources", icon: FolderOpen },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl border-t border-surface-container shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-2 px-0.5 transition-colors",
                active
                  ? "text-mbc-blue"
                  : "text-on-surface-variant hover:text-on-surface",
              )}
            >
              <item.icon className="w-5 h-5 flex-none" />
              <span className="text-[9px] font-semibold leading-none w-full text-center truncate">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
