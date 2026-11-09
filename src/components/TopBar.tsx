"use client";

import React, { useState } from "react";
import { Sprout, Bell, ChevronDown, Award, User, Star, RotateCcw } from "lucide-react";
import { useGame } from "@/context/GameContext";

interface TopBarProps {
  onOpenMobileMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobileMenu }) => {
  const [hasNotif, setHasNotif] = useState(true);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const { stats, resetProgress } = useGame();

  return (
    <header className="w-full bg-[#FAF9F3] border-b border-[#E4E3D5] px-4 md:px-6 py-2.5 flex items-center justify-between sticky top-0 z-40">
      {/* Mobile button to toggle sidebar */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-xl bg-white border border-[#E4E3D5] text-[#202B1D] font-bold text-xs flex items-center gap-1.5"
        >
          <Sprout className="w-4 h-4 text-[#3E7E36]" />
          <span>Menú</span>
        </button>
      </div>

      {/* Central Green Message */}
      <div className="hidden sm:flex items-center justify-center gap-2 mx-auto">
        {/* <span className="text-[#3E7E36] text-lg select-none">🌱</span> */}
        <h2 className="text-sm md:text-base font-extrabold text-[#202B1D] font-heading tracking-wide">
          Aprende, explora y descubre la naturaleza
        </h2>
        {/* <span className="text-[#3E7E36] text-lg select-none">🌱</span> */}
      </div>

      {/* Right User Pill */}
      <div className="flex items-center gap-3 relative ml-auto sm:ml-0">

        {/* User Pill Button */}
        <div className="flex items-center gap-2 bg-white rounded-full p-1 pr-3 border border-[#E4E3D5] shadow-xs hover:border-[#52A447]/60 transition-colors">
          {/* Avatar de Geraldine */}
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#E7F4E4] border border-[#52A447]/30 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/avatar-geraldine.png"
              alt="Geraldine"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <User className="w-4 h-4 text-[#3E7E36]" />
          </div>

          {/* Nombre y Nivel */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="text-xs font-black text-[#202B1D] font-heading leading-tight">
                Geraldine
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#5C6856] leading-none">
              <span>Nivel {stats.level}</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Badge Puntos dinámicos */}
          <div
            className="ml-1 bg-[#E7F4E4] text-[#3E7E36] px-2.5 py-1 rounded-full text-xs font-black font-heading flex items-center gap-1"
            title="Puntos de guardián ambiental"
          >
            <Star className="w-3 h-3 fill-[#E6A728] text-[#E6A728]" />
            <span>{stats.points} pts</span>
          </div>
        </div>

        {/* Campana de Notificaciones */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotificationPopup(!showNotificationPopup);
              setHasNotif(false);
            }}
            className="w-8 h-8 rounded-full bg-white border border-[#E4E3D5] flex items-center justify-center text-[#5C6856] hover:text-[#202B1D] hover:bg-[#FAF9F3] shadow-xs relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {hasNotif && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E6A728] ring-2 ring-white"></span>
            )}
          </button>

          {/* Popover Notificación */}
          {showNotificationPopup && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-[#E4E3D5] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E3D5]/60 mb-2">
                <span className="text-xs font-black uppercase text-[#202B1D] font-heading">
                  Notificaciones de Huancayo
                </span>
                <span className="text-[10px] text-[#52A447] font-bold">Objetivo activo</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#FAF9F3] hover:bg-[#E7F4E4]/40 transition-colors mb-2">
                <Award className="w-4 h-4 text-[#865DFF] shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs font-bold text-[#202B1D] leading-tight">
                    Misión botánica en Cerrito de la Libertad
                  </p>
                  <p className="text-[10px] text-[#5C6856] mt-0.5">
                    Acércate y verifica un arbusto de Cantuta para sumar tus primeros +20 pts.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm("¿Deseas reiniciar todas tus estadísticas a 0?")) {
                    resetProgress();
                    setShowNotificationPopup(false);
                  }
                }}
                className="w-full text-[11px] text-stone-500 hover:text-red-600 font-bold py-1.5 flex items-center justify-center gap-1 border-t border-[#E4E3D5] pt-2"
              >
                <RotateCcw className="w-3 h-3" />
                Reiniciar progreso a 0 pts
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
