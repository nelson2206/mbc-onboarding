"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Sun, HelpCircle, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "@/lib/userStorage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function signInAs(emailToUse: string) {
    const trimmed = emailToUse.trim().toLowerCase();
    if (!trimmed) return;
    setCurrentUser(trimmed);
    router.push("/dashboard");
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    signInAs(email);
  };

  const handleCorporateSSO = () => signInAs("corporate.demo@minsait.com");
  const handleGoogleSSO = () => signInAs("google.demo@minsait.com");
  const handleMicrosoftSSO = () => signInAs("microsoft.demo@minsait.com");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101014] text-white relative overflow-hidden font-sans">
      {/* Background Graphic placeholder to match the abstract web shape in the image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-gradient-to-l from-[#ffffff10] to-transparent">
        {/* Placeholder for the organic wireframe structure */}
        <div className="absolute top-1/4 right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffffff10] via-transparent to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="z-10 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Aether <span className="text-[#FF0B53]">Consulting</span>
        </h1>
        <p className="text-[10px] text-gray-400 mt-2 tracking-wide uppercase">Strategic Intelligence & Strategic Onboarding</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-[420px] bg-[#16161A] p-8 md:p-10 rounded-[20px] border border-[#22222A] shadow-2xl relative"
      >
        {/* Glow behind card matching the pink/red aura */}
        <div className="absolute -inset-1 bg-[#FF0B53]/10 blur-2xl -z-10 rounded-[24px]" />

        {/* Corporate Login Button */}
        <button
          type="button"
          onClick={handleCorporateSSO}
          className="w-full bg-[#FF0B53] hover:bg-[#E00045] text-white font-bold text-sm py-3.5 rounded-xl flex justify-center items-center gap-2 transition-colors mb-8 shadow-[0_4px_14px_0_rgba(255,11,83,0.39)]"
        >
          <Building2 className="w-4 h-4" />
          Corporate Login
        </button>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px bg-[#2A2A35] flex-1" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">OR CONTINUE WITH</span>
          <div className="h-px bg-[#2A2A35] flex-1" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-4 mb-8">
          <button type="button" onClick={handleGoogleSSO} className="flex-1 bg-[#22222A] hover:bg-[#2A2A35] border border-[#2A2A35] py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
            {/* Google SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
            <span className="text-xs font-bold text-gray-300">Google</span>
          </button>
          <button type="button" onClick={handleMicrosoftSSO} className="flex-1 bg-[#22222A] hover:bg-[#2A2A35] border border-[#2A2A35] py-3 rounded-xl flex justify-center items-center gap-2 transition-colors">
            {/* Microsoft SVG */}
            <svg className="w-4 h-4" viewBox="0 0 21 21" fill="currentColor">
              <path d="M0 0h10v10H0zM11 0h10v10H11zM0 11h10v10H0zM11 11h10v10H11z" fill="#00a4ef" />
              <path d="M0 0h10v10H0z" fill="#f25022" />
              <path d="M11 0h10v10H11z" fill="#7fba00" />
              <path d="M0 11h10v10H0z" fill="#00a4ef" />
              <path d="M11 11h10v10H11z" fill="#ffb900" />
            </svg>
            <span className="text-xs font-bold text-gray-300">Microsoft</span>
          </button>
        </div>

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-[11px] font-bold text-gray-400 mb-2">Work Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A24] border border-[#2A2A35] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FF0B53] transition-colors"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-[11px] font-bold text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#1A1A24] border border-[#2A2A35] rounded-xl pl-4 pr-12 py-3.5 text-sm text-white tracking-widest placeholder-gray-600 focus:outline-none focus:border-[#FF0B53] transition-colors"
                required
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              {/* Optional capslock/info icon placeholder */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-[#FF0B53]/20 text-[#FF0B53] rounded-sm flex items-center justify-center text-[8px] font-bold">A</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-4 h-4 rounded border border-[#2A2A35] bg-[#1A1A24] peer-checked:bg-[#FF0B53] peer-checked:border-[#FF0B53] transition-colors" />
                {/* SVG Check icon */}
                <svg className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-[11px] font-bold text-[#FF0B53] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2A2A35] hover:bg-[#32323E] text-gray-300 hover:text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
          >
            Sign In
          </button>
        </form>
      </motion.div>

      {/* Footer Utilities */}
      <div className="z-10 mt-10 flex items-center gap-8 text-[11px] font-bold text-gray-500">
        <button className="flex items-center gap-2 hover:text-gray-300 transition-colors uppercase tracking-wider">
          <Sun className="w-3.5 h-3.5" /> Switch Theme
        </button>
        <button className="flex items-center gap-2 hover:text-gray-300 transition-colors uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" /> Support
        </button>
      </div>
    </div>
  );
}
