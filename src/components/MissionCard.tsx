"use client";

import React, { useState } from "react";
import { ClipboardList, Play, Star, ChevronRight, CheckCircle2 } from "lucide-react";
import { CURRENT_MISSION } from "@/data/mockData";
import { VerificationModal } from "@/components/VerificationModal";
import { useGame } from "@/context/GameContext";

export const MissionCard: React.FC = () => {
  const { isObjectiveCompleted, verifyAndCompleteObjective } = useGame();
  const [showVerification, setShowVerification] = useState(false);

  const isCompleted = isObjectiveCompleted(CURRENT_MISSION.id);

  const handleStartMission = () => {
    setShowVerification(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 flex flex-col justify-between h-full">
      {/* Header Pill */}
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2 bg-[#2E6228] text-white px-3.5 py-1 rounded-full shadow-xs">
          <ClipboardList className="w-4 h-4 text-[#A7F3D0]" />
          <span className="text-xs font-black font-heading tracking-wide">
            Misiones Disponibles
          </span>
        </div>
        <button
          onClick={handleStartMission}
          className="text-[11px] font-bold text-[#5C6856] hover:text-[#3E7E36] flex items-center gap-0.5"
        >
          <span>Ver detalles</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Mission Content Horizontal Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Flower Picture (Cantuta) */}
        <div className="sm:col-span-4 rounded-2xl overflow-hidden border border-[#E4E3D5] shadow-xs group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CURRENT_MISSION.imageUrl || "/assets/cantuta-mission.jpg"}
            alt="Flor de Cantuta"
            className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Description */}
        <div className="sm:col-span-5 flex flex-col justify-center">
          <h4 className="text-sm font-black font-heading text-[#202B1D] leading-tight mb-1">
            {CURRENT_MISSION.title}
          </h4>
          <p className="text-xs text-[#5C6856] leading-snug mb-2">
            {CURRENT_MISSION.description}
          </p>

          <div className="flex items-center gap-1.5 text-xs font-black text-[#202B1D] font-heading">
            <Star className="w-4 h-4 fill-[#E6A728] text-[#E6A728]" />
            <span>+{CURRENT_MISSION.points} pts</span>
            {isCompleted && (
              <span className="text-[10px] font-bold text-[#3E7E36] ml-2 flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" /> ¡Completado y verificado!
              </span>
            )}
          </div>
        </div>

        {/* Action Button: Iniciar ▶ */}
        <div className="sm:col-span-3 flex sm:justify-end items-center">
          <button
            onClick={handleStartMission}
            disabled={isCompleted}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-black font-heading shadow-md transition-all active:scale-95 ${isCompleted
                ? "bg-[#E7F4E4] text-[#3E7E36] cursor-default"
                : "bg-[#2E6228] hover:bg-[#20471b] text-white hover:shadow-lg"
              }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verificada</span>
              </>
            ) : (
              <>
                <span>Iniciar</span>
                <Play className="w-3 h-3 fill-white text-white ml-0.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal de Verificación con Z-INDEX MÁXIMO (z-99999) */}
      {showVerification && (
        <VerificationModal
          isOpen={showVerification}
          onClose={() => setShowVerification(false)}
          objective={{
            id: CURRENT_MISSION.id,
            title: CURRENT_MISSION.title,
            description: CURRENT_MISSION.description,
            points: CURRENT_MISSION.points,
            expectedCode: "WANKA-CANTUTA-01",
            plantId: "cantuta",
            question: {
              q: "¿En qué lugar de Huancayo es más común observar la Cantuta sagrada?",
              options: [
                "En el Cerrito de la Libertad y Parque de la Identidad",
                "En el fondo del río Mantaro",
                "En las dunas de arena",
              ],
              correct: 0,
            },
          }}
          onSuccess={(method) => {
            verifyAndCompleteObjective(
              CURRENT_MISSION.id,
              CURRENT_MISSION.title,
              CURRENT_MISSION.points,
              method,
              "cantuta"
            );
          }}
        />
      )}
    </div>
  );
};
