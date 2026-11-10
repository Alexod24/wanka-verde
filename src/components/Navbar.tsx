"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sprout, 
  Compass, 
  Gamepad2, 
  TreePine, 
  GraduationCap, 
  User, 
  ChevronDown,
  Menu,
  X,
  Award,
  RotateCcw
} from "lucide-react";
import { useGame } from "@/context/GameContext";

interface NavbarProps {
  activeRoute?: "inicio" | "explora" | "juega" | "jardin" | "docentes";
}

export const Navbar: React.FC<NavbarProps> = ({ activeRoute = "inicio" }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { stats, resetProgress } = useGame();

  return (
    <header className="w-full bg-[#FAF9F3]/95 backdrop-blur-md border-b border-[#E4E3D5] sticky top-0 z-50 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
          <div className="w-10 h-10 rounded-2xl bg-[#E7F4E4] flex items-center justify-center border border-[#52A447]/30 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sprout className="w-6 h-6 text-[#3E7E36]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-[#202B1D] font-heading leading-tight group-hover:text-[#3E7E36] transition-colors">
              Wanka-<span className="text-[#3E7E36]">Tuta</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#5C6856]">
              Huancayo · Educación Ambiental
            </span>
          </div>
        </Link>

        {/* Navigation Pill (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#FFFFFF] px-3 py-1.5 rounded-full border border-[#E4E3D5] shadow-xs">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              activeRoute === "inicio"
                ? "bg-[#2E6228] text-white shadow-xs"
                : "text-[#5C6856] hover:text-[#202B1D] hover:bg-[#F6F6EE]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white/80 inline-block md:hidden"></span>
            <span className="font-heading">Inicio</span>
          </Link>

          <Link
            href="/explora"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              activeRoute === "explora"
                ? "bg-[#2E6228] text-white shadow-xs"
                : "text-[#5C6856] hover:text-[#202B1D] hover:bg-[#F6F6EE]"
            }`}
          >
            <Compass className="w-4 h-4 text-[#52A447]" />
            <span className="font-heading">Explora</span>
          </Link>

          <Link
            href="/explora#juega"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-[#5C6856] hover:text-[#202B1D] hover:bg-[#F6F6EE] transition-all duration-200"
          >
            <Gamepad2 className="w-4 h-4 text-[#865DFF]" />
            <span className="font-heading">Juega</span>
          </Link>

          <Link
            href="/explora#jardin"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-[#5C6856] hover:text-[#202B1D] hover:bg-[#F6F6EE] transition-all duration-200"
          >
            <TreePine className="w-4 h-4 text-[#3E7E36]" />
            <span className="font-heading">Mi Jardín</span>
          </Link>

          <Link
            href="#docentes"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-[#5C6856] hover:text-[#202B1D] hover:bg-[#F6F6EE] transition-all duration-200"
          >
            <GraduationCap className="w-4 h-4 text-[#9B6D43]" />
            <span className="font-heading">Docentes</span>
          </Link>
        </nav>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 bg-[#FFFFFF] hover:bg-[#FAF9F3] border border-[#E4E3D5] rounded-full p-1.5 pr-3 shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3E7E36]/30"
          >
            <div className="w-9 h-9 rounded-full bg-[#E7F4E4] border border-[#52A447]/40 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/avatar-geraldine.png"
                alt="Geraldine"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <User className="w-5 h-5 text-[#3E7E36]" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-extrabold text-[#202B1D] leading-tight">Geraldine</span>
              <span className="text-[10px] font-semibold text-[#52A447]">
                Nivel {stats.level} · {stats.points} pts
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#5C6856] transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-[#E4E3D5] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-[#E4E3D5]/60 mb-1">
                <p className="text-sm font-bold text-[#202B1D]">Geraldine Huamán</p>
                <p className="text-xs text-[#5C6856]">{stats.levelName}</p>
                <p className="text-[11px] font-black text-[#3E7E36] mt-0.5">
                  {stats.points} pts acumulados · {stats.knownPlantsCount} plantas
                </p>
              </div>

              <Link
                href="/explora"
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#202B1D] hover:bg-[#E7F4E4] rounded-xl transition-colors"
                onClick={() => setUserMenuOpen(false)}
              >
                <Compass className="w-4 h-4 text-[#3E7E36]" />
                Ver Mapa de Exploración
              </Link>
              <Link
                href="/explora"
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[#202B1D] hover:bg-[#E7F4E4] rounded-xl transition-colors"
                onClick={() => setUserMenuOpen(false)}
              >
                <Award className="w-4 h-4 text-[#E6A728]" />
                Misiones Logradas ({stats.completedMissionsCount})
              </Link>
              <div className="h-[1px] bg-[#E4E3D5]/60 my-1" />
              <button
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                onClick={() => {
                  if (confirm("¿Deseas reiniciar todas tus estadísticas a 0?")) {
                    resetProgress();
                    setUserMenuOpen(false);
                  }
                }}
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar estadísticas a 0
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#202B1D] hover:bg-white border border-[#E4E3D5] active:scale-95 transition-transform"
          aria-label="Menú principal"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[#E4E3D5] flex flex-col gap-2 animate-in slide-in-from-top-2 duration-150">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold font-heading text-sm ${
              activeRoute === "inicio" ? "bg-[#2E6228] text-white" : "text-[#202B1D] hover:bg-[#E7F4E4]"
            }`}
          >
            <Sprout className="w-4 h-4" /> Inicio
          </Link>
          <Link
            href="/explora"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold font-heading text-sm ${
              activeRoute === "explora" ? "bg-[#2E6228] text-white" : "text-[#202B1D] hover:bg-[#E7F4E4]"
            }`}
          >
            <Compass className="w-4 h-4 text-[#52A447]" /> Explora el Valle
          </Link>
          <Link
            href="/explora#juega"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#202B1D] hover:bg-[#E7F4E4] font-bold font-heading text-sm"
          >
            <Gamepad2 className="w-4 h-4 text-[#865DFF]" /> Juega y Aprende
          </Link>
          <Link
            href="/explora#jardin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#202B1D] hover:bg-[#E7F4E4] font-bold font-heading text-sm"
          >
            <TreePine className="w-4 h-4 text-[#3E7E36]" /> Mi Jardín
          </Link>
          <Link
            href="#docentes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#202B1D] hover:bg-[#E7F4E4] font-bold font-heading text-sm"
          >
            <GraduationCap className="w-4 h-4 text-[#9B6D43]" /> Portal Docentes
          </Link>
        </div>
      )}
    </header>
  );
};
