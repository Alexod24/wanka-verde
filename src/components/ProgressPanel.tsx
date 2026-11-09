"use client";

import React from "react";
import { Trophy, Star, Sprout, Lock } from "lucide-react";
import { useGame } from "@/context/GameContext";

export const ProgressPanel: React.FC = () => {
  const { stats } = useGame();
  const { points, maxPoints, knownPlantsCount, level, levelName } = stats;

  // Percentage calculation for circular SVG ring
  const percentage = Math.min(Math.round((points / maxPoints) * 100), 100);
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col gap-4">
      {/* 1. CARD: TUS PROGRESOS */}
      <div className="bg-white rounded-3xl border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5">
        {/* Header Pill */}
        <div className="inline-flex items-center gap-2 bg-[#2E6228] text-white px-4 py-1.5 rounded-full shadow-xs mb-4">
          <Trophy className="w-4 h-4 text-[#E6A728]" />
          <span className="text-xs font-black font-heading tracking-wide">
            Tus Progresos
          </span>
        </div>

        {/* Circular Level Ring and Stats Layout */}
        <div className="flex items-center justify-between gap-4 mb-4">
          
          {/* Anillo Circular SVG con Nivel y brote verde central */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-[#E7F4E4]"
                strokeWidth="9"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress animated circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-[#52A447]"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Content of Ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="w-6 h-6 rounded-full bg-[#E7F4E4] flex items-center justify-center mb-0.5">
                <Sprout className="w-4 h-4 text-[#3E7E36]" />
              </div>
              <span className="text-[11px] font-black font-heading text-[#202B1D] leading-none">
                Nivel {level}
              </span>
            </div>
          </div>

          {/* Stats on the right */}
          <div className="flex flex-col gap-2.5 flex-1 pl-2 border-l border-[#E4E3D5]/60">
            {/* Puntos acumulados en tiempo real */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#FFF4D6] flex items-center justify-center">
                <Star className="w-3.5 h-3.5 fill-[#E6A728] text-[#E6A728]" />
              </div>
              <span className="text-xs font-black font-heading text-[#202B1D]">
                {points} / {maxPoints} pts
              </span>
            </div>

            {/* Plantas conocidas */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#E7F4E4] flex items-center justify-center">
                <Sprout className="w-3.5 h-3.5 text-[#3E7E36]" />
              </div>
              <span className="text-xs font-extrabold text-[#5C6856]">
                <strong className="text-[#202B1D]">{knownPlantsCount}</strong> plantas verificadas
              </span>
            </div>
          </div>
        </div>

        {/* Estado actual del explorador */}
        <div className="bg-[#FAF9F3] p-2.5 rounded-2xl border border-[#E4E3D5] text-center">
          <p className="text-xs font-bold text-[#202B1D]">
            Rango: <span className="text-[#3E7E36]">{levelName}</span>
          </p>
          <p className="text-[10px] text-[#5C6856] mt-0.5">
            {points === 0
              ? "Inicia tu primera misión en el mapa para ganar puntos."
              : `Has completado ${stats.completedMissionsCount} misiones con verificación.`}
          </p>
        </div>
      </div>

      {/* 2. CARD: TUS INSIGNIAS */}
      <div className="bg-white rounded-3xl border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 bg-[#2E6228] text-white px-4 py-1.5 rounded-full shadow-xs">
            <span className="text-xs font-black font-heading tracking-wide">
              Tus Insignias
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#5C6856]">
            Desbloqueo por mérito
          </span>
        </div>

        {/* Cuadrícula de insignias según puntos conseguidos */}
        <div className="grid grid-cols-4 gap-2">
          
          {/* Insignia 1: Hoja (Verde / Dorado) - Requiere 20 pts */}
          <div 
            className="flex flex-col items-center group cursor-pointer"
            title="Guardián de Hojas (requiere 20 pts)"
          >
            <div className={`w-11 h-11 rounded-2xl p-1 shadow-sm transform group-hover:scale-110 transition-transform flex items-center justify-center ${
              points >= 20
                ? "bg-gradient-to-br from-[#E7F4E4] to-[#c7eac0] border-2 border-[#52A447]"
                : "bg-[#E2E8F0] border border-[#CBD5E1] opacity-60"
            }`}>
              <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                points >= 20 ? "bg-[#3E7E36] text-white" : "bg-[#F1F5F9] text-stone-400"
              }`}>
                {points >= 20 ? <Sprout className="w-4 h-4 text-white" /> : <Lock className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>

          {/* Insignia 2: Árbol (Quinual) - Requiere 50 pts */}
          <div 
            className="flex flex-col items-center group cursor-pointer"
            title="Protector de Bosques (requiere 50 pts)"
          >
            <div className={`w-11 h-11 rounded-2xl p-1 shadow-sm transform group-hover:scale-110 transition-transform flex items-center justify-center ${
              points >= 50
                ? "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-2 border-[#E6A728]"
                : "bg-[#E2E8F0] border border-[#CBD5E1] opacity-60"
            }`}>
              <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                points >= 50 ? "bg-[#52A447] text-white text-xs" : "bg-[#F1F5F9] text-stone-400"
              }`}>
                {points >= 50 ? "🌲" : <Lock className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>

          {/* Insignia 3: Flor (Cantuta) - Requiere 120 pts */}
          <div 
            className="flex flex-col items-center group cursor-pointer"
            title="Flor Sagrada Inca (requiere 120 pts)"
          >
            <div className={`w-11 h-11 rounded-2xl p-1 shadow-sm transform group-hover:scale-110 transition-transform flex items-center justify-center ${
              points >= 120
                ? "bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-[#865DFF]"
                : "bg-[#E2E8F0] border border-[#CBD5E1] opacity-60"
            }`}>
              <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                points >= 120 ? "bg-[#865DFF] text-white text-xs" : "bg-[#F1F5F9] text-stone-400"
              }`}>
                {points >= 120 ? "🌸" : <Lock className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>

          {/* Insignia 4: Candado Gris / Maestro - Requiere 200 pts */}
          <div 
            className="flex flex-col items-center group cursor-pointer"
            title="Maestro Botánico Wanka (requiere 200 pts)"
          >
            <div className={`w-11 h-11 rounded-2xl p-1 shadow-xs flex items-center justify-center ${
              points >= 200
                ? "bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-[#E6A728]"
                : "bg-[#E2E8F0] border border-[#CBD5E1] opacity-60"
            }`}>
              <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                points >= 200 ? "bg-[#E6A728] text-white text-xs" : "bg-[#F1F5F9] text-stone-400"
              }`}>
                {points >= 200 ? "🏆" : <Lock className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
