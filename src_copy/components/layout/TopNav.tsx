"use client";

import Link from "next/link";
import { Search, UserCircle, LogOut, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-surface/80 backdrop-blur-xl flex justify-between items-center px-8 h-16 z-50 border-b border-surface-container shadow-sm">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold text-electric-rose">Aether Consulting</span>
        <div className="hidden md:flex gap-6">
          <Link
            href="/dashboard"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname === "/dashboard" || pathname === "/"
                ? "text-electric-rose border-b-2 border-electric-rose"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/simulator"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/simulator")
                ? "text-electric-rose border-b-2 border-electric-rose"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            Simulador
          </Link>
          <Link
            href="/simulator"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/journey")
                ? "text-electric-rose border-b-2 border-electric-rose"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            Copilot
          </Link>
          <Link
            href="/resources"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/journey")
                ? "text-electric-rose border-b-2 border-electric-rose"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            Linea de tiempo
          </Link>
          <Link
            href="/resources"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/resources")
                ? "text-electric-rose border-b-2 border-electric-rose"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            Recursos
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search insights..."
            className="bg-surface-container/50 border border-surface-container rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-electric-rose w-64 text-on-surface"
          />
          <Search className="absolute right-3 top-1.5 text-on-surface-variant w-4 h-4" />
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="text-on-surface-variant hover:text-electric-rose transition-colors focus:outline-none p-1 rounded-full hover:bg-surface-container/50"
          >
            <UserCircle className="w-6 h-6" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-surface border border-surface-container rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-surface-container mb-2">
                <p className="text-sm font-bold text-on-surface">Analyst</p>
                <p className="text-xs text-on-surface-variant mt-0.5 truncate">name@company.com</p>
              </div>

              <button
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container hover:text-electric-rose transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Mi Perfil
              </button>

              <button
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container hover:text-electric-rose transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" /> Configuración
              </button>

              <div className="h-px bg-surface-container my-2"></div>

              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-[#FF0B53] hover:bg-[#FF0B53]/10 font-medium transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
