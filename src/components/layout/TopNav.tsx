"use client";

import Link from "next/link";
import { Search, UserCircle, LogOut, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { useCurrentUser, signOut } from "@/lib/userStorage";
import { MbcLogo } from "@/components/brand/MbcLogo";

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useCurrentUser();
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

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    await signOut();
    router.push("/");
  };

  const displayEmail = currentUser ?? "Invitado";
  const displayInitial = (currentUser ?? "?").charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 left-0 right-0 md:left-64 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 h-16 z-50 border-b border-surface-container shadow-sm">
      <div className="flex items-center gap-6 lg:gap-8 min-w-0">
        <Link href="/dashboard" className="flex-none md:hidden" aria-label="MBC — inicio">
          <MbcLogo className="h-5 md:h-6 w-auto text-mbc-blue" />
        </Link>
        <div className="hidden md:flex gap-6">
          <Link
            href="/dashboard"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname === "/dashboard" || pathname === "/"
                ? "text-mbc-blue border-b-2 border-mbc-electric"
                : "text-on-surface-variant hover:text-mbc-electric-strong"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/simulator"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/simulator")
                ? "text-mbc-blue border-b-2 border-mbc-electric"
                : "text-on-surface-variant hover:text-mbc-electric-strong"
            )}
          >
            Simulador
          </Link>
          <Link
            href="/copilot"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/copilot")
                ? "text-mbc-blue border-b-2 border-mbc-electric"
                : "text-on-surface-variant hover:text-mbc-electric-strong"
            )}
          >
            Copilot
          </Link>
          <Link
            href="/journey"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/journey")
                ? "text-mbc-blue border-b-2 border-mbc-electric"
                : "text-on-surface-variant hover:text-mbc-electric-strong"
            )}
          >
            My Journey
          </Link>
          <Link
            href="/cultura"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/cultura")
                ? "text-mbc-blue border-b-2 border-mbc-electric"
                : "text-on-surface-variant hover:text-mbc-electric-strong"
            )}
          >
            Cultura
          </Link>
          <Link
            href="/best-practices"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/best-practices")
                ? "text-mbc-blue border-b-2 border-mbc-electric"
                : "text-on-surface-variant hover:text-mbc-electric-strong"
            )}
          >
            Best Practices
          </Link>
          <Link
            href="/escuelita"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/escuelita")
                ? "text-mbc-blue border-b-2 border-mbc-electric"
                : "text-on-surface-variant hover:text-mbc-electric-strong"
            )}
          >
            Escuelita
          </Link>
          <Link
            href="/resources"
            className={clsx(
              "text-sm pb-1 transition-colors",
              pathname.includes("/resources")
                ? "text-mbc-blue border-b-2 border-mbc-electric"
                : "text-on-surface-variant hover:text-mbc-electric-strong"
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
            className="bg-surface-container/50 border border-surface-container rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-mbc-electric w-64 text-on-surface"
          />
          <Search className="absolute right-3 top-1.5 text-on-surface-variant w-4 h-4" />
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 text-on-surface-variant hover:text-mbc-blue transition-colors focus:outline-none p-1 rounded-full hover:bg-surface-container/50"
            aria-label="Menú de usuario"
          >
            {currentUser ? (
              <span className="w-7 h-7 rounded-full bg-mbc-electric/15 border border-mbc-electric/30 text-mbc-blue text-xs font-bold flex items-center justify-center">
                {displayInitial}
              </span>
            ) : (
              <UserCircle className="w-6 h-6" />
            )}
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-surface border border-surface-container rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-surface-container mb-2">
                <p className="text-sm font-bold text-on-surface">Analyst</p>
                <p className="text-xs text-on-surface-variant mt-0.5 truncate">{displayEmail}</p>
              </div>

              <button
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container hover:text-mbc-blue transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Mi Perfil
              </button>

              <button
                onClick={() => setIsUserMenuOpen(false)}
                className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container hover:text-mbc-blue transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" /> Configuración
              </button>

              <div className="h-px bg-surface-container my-2"></div>

              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-600/10 font-medium transition-colors flex items-center gap-2"
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
