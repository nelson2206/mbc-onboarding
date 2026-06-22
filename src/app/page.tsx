"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, HelpCircle, Building2, Loader2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/userStorage";
import { supabaseEnabled } from "@/lib/supabase";
import { BrandConstellation } from "@/components/brand/BrandConstellation";
import { AmbientOrbs } from "@/components/brand/AmbientOrbs";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(emailToUse: string, passwordToUse: string) {
    setError(null);
    setLoading(true);
    const result = await signIn(emailToUse, passwordToUse);
    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? "No se pudo iniciar sesión");
      return;
    }
    router.push("/dashboard");
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    submit(email, password);
  };

  // Acceso sin fricción: los botones entran directo con un correo demo
  // (la contraseña se deriva automáticamente del correo en signIn).
  const handleCorporateSSO = () => submit("corporate.demo@minsait.com", "");
  const handleGoogleSSO = () => submit("google.demo@minsait.com", "");
  const handleMicrosoftSSO = () => submit("microsoft.demo@minsait.com", "");

  return (
    <div className="min-h-dvh grid lg:grid-cols-[1.05fr_1fr] bg-background text-foreground font-sans">
      {/* ============ Panel de marca (izquierda) ============ */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2a0e1a] via-[#480e2a] to-[#1c0712] p-12 text-white">
        <AmbientOrbs />

        {/* Logo / wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative z-10"
        >
          <span className="text-xl font-bold tracking-tight">
            Minsait <span className="text-electric-rose">Business Consulting</span>
          </span>
        </motion.div>

        {/* Constelación central */}
        <div className="relative z-10 flex-1 flex items-center justify-center py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="w-full max-w-sm"
          >
            <BrandConstellation className="w-full h-auto drop-shadow-2xl" />
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
          className="relative z-10 max-w-md"
        >
          <h2 className="text-3xl font-bold leading-tight mb-3">
            Tu camino en <span className="text-electric-rose">consultoría</span> empieza aquí.
          </h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Onboarding gamificado, plan de carrera y las mejores prácticas de
            Management & Business Consulting — todo en un solo lugar.
          </p>
          <div className="mt-6 flex items-center gap-5 text-[11px] font-bold uppercase tracking-widest text-white/50">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-electric-rose" /> Journey</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-tertiary" /> Seguro</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-primary" /> Minsait</span>
          </div>
        </motion.div>
      </aside>

      {/* ============ Panel de formulario (derecha) ============ */}
      <main className="relative flex flex-col items-center justify-center p-6 sm:p-10">
        {/* Marca compacta en móvil */}
        <div className="lg:hidden mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">
            Minsait <span className="text-electric-rose">Business Consulting</span>
          </h1>
          <p className="text-[10px] text-on-surface-variant mt-1 tracking-widest uppercase">
            Onboarding · Inteligencia Operativa
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-7 hidden lg:block">
            <h1 className="text-2xl font-bold text-on-surface">Bienvenido de vuelta</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Inicia sesión para continuar tu onboarding.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-7 sm:p-8">
            {/* Corporate SSO */}
            <motion.button
              type="button"
              onClick={handleCorporateSSO}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full bg-electric-rose hover:bg-[#e00045] disabled:opacity-60 text-white font-bold text-sm py-3.5 rounded-xl flex justify-center items-center gap-2 transition-colors mb-6 shadow-[0_6px_20px_-6px_rgba(255,0,84,0.5)]"
            >
              <Building2 className="w-4 h-4" />
              Corporate Login
            </motion.button>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px bg-surface-container flex-1" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">
                o continúa con
              </span>
              <div className="h-px bg-surface-container flex-1" />
            </div>

            {/* Social SSO */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={handleGoogleSSO}
                disabled={loading}
                className="flex-1 bg-surface-container/40 hover:bg-surface-container disabled:opacity-60 border border-surface-container py-3 rounded-xl flex justify-center items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-xs font-bold text-on-surface">Google</span>
              </button>
              <button
                type="button"
                onClick={handleMicrosoftSSO}
                disabled={loading}
                className="flex-1 bg-surface-container/40 hover:bg-surface-container disabled:opacity-60 border border-surface-container py-3 rounded-xl flex justify-center items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 21 21">
                  <path d="M0 0h10v10H0z" fill="#f25022" />
                  <path d="M11 0h10v10H11z" fill="#7fba00" />
                  <path d="M0 11h10v10H0z" fill="#00a4ef" />
                  <path d="M11 11h10v10H11z" fill="#ffb900" />
                </svg>
                <span className="text-xs font-bold text-on-surface">Microsoft</span>
              </button>
            </div>

            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-[11px] font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full bg-surface border border-surface-container rounded-xl px-4 py-3.5 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-electric-rose focus:ring-2 focus:ring-electric-rose/20 transition-all"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Password
                  <span className="ml-2 text-[9px] font-normal text-on-surface-variant/70 normal-case tracking-normal">
                    (opcional · entra solo con tu correo)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full bg-surface border border-surface-container rounded-xl pl-4 pr-12 py-3.5 text-sm text-on-surface tracking-widest placeholder-on-surface-variant/50 focus:outline-none focus:border-electric-rose focus:ring-2 focus:ring-electric-rose/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 text-xs text-electric-rose bg-electric-rose/10 border border-electric-rose/30 rounded-lg px-3 py-2"
                  role="alert"
                >
                  {error}
                </motion.div>
              )}

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-4 h-4 rounded border border-surface-container bg-surface peer-checked:bg-electric-rose peer-checked:border-electric-rose transition-colors" />
                    <svg className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Remember me
                  </span>
                </label>
                <a href="#" className="text-[11px] font-bold text-electric-rose hover:underline">
                  Forgot password?
                </a>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group w-full bg-on-surface hover:bg-electric-rose disabled:opacity-60 text-background font-bold text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Verificando..." : "Sign In"}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
              </motion.button>

              <p className="mt-4 text-center text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70">
                {supabaseEnabled ? "Modo Supabase · sesiones reales" : "Modo Demo · localStorage"}
              </p>
            </form>
          </div>

          <div className="mt-6 flex items-center justify-center gap-8 text-[11px] font-bold text-on-surface-variant">
            <button className="flex items-center gap-2 hover:text-electric-rose transition-colors uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" /> Support
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
