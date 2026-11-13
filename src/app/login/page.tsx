"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sprout, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";
import { useGame, DEFAULT_CREDENTIALS } from "@/context/GameContext";
import confetti from "canvas-confetti";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useGame();

  const [email, setEmail] = useState(DEFAULT_CREDENTIALS.email);
  const [password, setPassword] = useState(DEFAULT_CREDENTIALS.password);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);

      if (res.success) {
        setLoginSuccess(true);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#3E7E36", "#52A447", "#E6A728"],
        });
        setTimeout(() => {
          router.push("/explora");
        }, 900);
      } else {
        setErrorMessage(res.error || "Credenciales incorrectas");
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail(DEFAULT_CREDENTIALS.email);
    setPassword(DEFAULT_CREDENTIALS.password);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#F6F6EE] flex flex-col justify-between text-[#202B1D] font-sans antialiased relative overflow-hidden">
      
      {/* Decorative Andean organic circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E7F4E4]/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#FFF4D6]/50 blur-3xl pointer-events-none" />

      {/* Top Simple Header */}
      <header className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
          <div className="w-10 h-10 rounded-2xl bg-[#E7F4E4] flex items-center justify-center border border-[#52A447]/30 shadow-xs group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-[#3E7E36]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#202B1D] font-heading leading-tight">
              Bio<span className="text-[#3E7E36]">Wanka</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#5C6856]">
              Huancayo · Educación Ambiental
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-bold text-[#5C6856] hover:text-[#3E7E36] transition-colors"
        >
          ← Volver al inicio
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 relative z-10">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E4E3D5] shadow-[0_12px_40px_rgb(0,0,0,0.06)] p-6 sm:p-8 relative">
          
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E7F4E4] border border-[#52A447]/30 flex items-center justify-center mx-auto mb-3 text-[#3E7E36]">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black font-heading text-[#202B1D]">
              Ingreso de Explorador
            </h1>
            <p className="text-xs text-[#5C6856] mt-1">
              Accede a tu cuenta institucional para explorar el mapa botánico del Valle del Mantaro.
            </p>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="bg-[#FAF9F3] border border-[#E4E3D5] rounded-2xl p-3.5 mb-5 text-left text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold uppercase text-[10px] text-[#3E7E36] tracking-wider flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5" /> Cuenta de Demostración
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[10px] font-bold text-[#3E7E36] hover:underline"
              >
                Autocompletar
              </button>
            </div>
            <div className="text-[11px] text-[#5C6856] space-y-0.5 font-mono">
              <p><strong>Usuario:</strong> geraldine@biowanka.edu.pe</p>
              <p><strong>Contraseña:</strong> wanka</p>
            </div>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {loginSuccess && (
            <div className="mb-4 p-3 bg-[#E7F4E4] border border-[#52A447] text-[#2E6228] rounded-xl text-xs font-bold flex items-center gap-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#3E7E36]" />
              <span>¡Credenciales válidas! Ingresando al mapa...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-[#202B1D] mb-1.5">
                Correo Electrónico Escolar:
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="estudiante@biowanka.edu.pe"
                  className="w-full text-xs pl-10 pr-3.5 py-3 rounded-2xl border border-[#E4E3D5] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#3E7E36] transition-all"
                />
                <Mail className="w-4 h-4 text-[#5C6856] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202B1D] mb-1.5">
                Contraseña de Acceso:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-10 pr-10 py-3 rounded-2xl border border-[#E4E3D5] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#3E7E36] transition-all font-mono"
                />
                <Lock className="w-4 h-4 text-[#5C6856] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                  aria-label="Ver contraseña"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || loginSuccess}
              className="mt-2 w-full bg-[#3E7E36] hover:bg-[#2E6228] disabled:opacity-60 text-white py-3.5 rounded-full text-sm font-black font-heading shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {isLoading ? (
                <span>Verificando credenciales...</span>
              ) : (
                <>
                  <span>Ingresar al Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Explanation note */}
          <div className="mt-6 pt-4 border-t border-[#E4E3D5] text-center">
            <p className="text-[11px] text-[#5C6856] leading-relaxed">
              En la versión final, cada estudiante de Huancayo tendrá una cuenta personal vinculada a su colegio para registrar árboles y misiones de campo.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs font-semibold text-[#5C6856]">
        BioWanka · Sistema de Biodiversidad y Educación Ambiental Andina
      </footer>

    </div>
  );
}

