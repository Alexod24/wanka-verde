"use client";

import React, { useState } from "react";
import { Sprout, X, Info, CheckCircle2 } from "lucide-react";
import { NATIVE_PLANTS } from "@/data/mockData";
import { Plant } from "@/types";
import { VerificationModal } from "@/components/VerificationModal";
import { useGame } from "@/context/GameContext";

export const PlantCatalog: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [verifyingPlant, setVerifyingPlant] = useState<Plant | null>(null);
  const { stats, verifyAndCompleteObjective } = useGame();

  return (
    <div className="bg-white rounded-3xl border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 flex flex-col justify-between h-full">
      {/* Header Pill */}
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2 bg-[#2E6228] text-white px-3.5 py-1 rounded-full shadow-xs">
          <Sprout className="w-4 h-4 text-[#A7F3D0]" />
          <span className="text-xs font-black font-heading tracking-wide">
            Catálogo de Plantas
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#5C6856]">
          {stats.knownPlantsCount} de {NATIVE_PLANTS.length} descubiertas
        </span>
      </div>

      {/* Grid of 5 Native Plants */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {NATIVE_PLANTS.map((plant) => {
          const isDiscovered = stats.discoveredPlantIds.includes(plant.id);

          return (
            <div
              key={plant.id}
              onClick={() => setSelectedPlant(plant)}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              {/* Plant Image with rounded square border */}
              <div className={`w-full aspect-square rounded-2xl overflow-hidden border p-0.5 transition-all duration-200 group-hover:-translate-y-1 relative ${
                isDiscovered
                  ? "border-[#52A447] bg-[#E7F4E4]/40 ring-2 ring-[#52A447]/30 shadow-md"
                  : "border-[#E4E3D5] bg-[#FAF9F3] opacity-85 hover:opacity-100"
              }`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className={`w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                    !isDiscovered ? "grayscale-30" : ""
                  }`}
                />
                {isDiscovered && (
                  <div className="absolute top-1 right-1 bg-[#3E7E36] text-white rounded-full p-0.5 shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Plant Name */}
              <span className={`text-[11px] sm:text-xs font-black font-heading mt-1.5 text-center truncate w-full transition-colors ${
                isDiscovered ? "text-[#3E7E36]" : "text-[#202B1D] group-hover:text-[#3E7E36]"
              }`}>
                {plant.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Plant Details Modal - Z-INDEX MÁXIMO (z-99999) */}
      {selectedPlant && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E4E3D5] shadow-2xl relative">
            <button
              onClick={() => setSelectedPlant(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with image */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#E4E3D5] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPlant.imageUrl}
                  alt={selectedPlant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#52A447] bg-[#E7F4E4] px-2.5 py-0.5 rounded-full">
                  {selectedPlant.category}
                </span>
                <h3 className="text-xl font-black font-heading text-[#202B1D] mt-1">
                  {selectedPlant.name}
                </h3>
                <p className="text-xs italic text-[#5C6856]">
                  {selectedPlant.scientificName}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#5C6856] leading-relaxed mb-4">
              {selectedPlant.description}
            </p>

            {/* Location in Huancayo */}
            <div className="bg-[#FAF9F3] p-3 rounded-2xl border border-[#E4E3D5] mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-3.5 h-3.5 text-[#3E7E36]" />
                <span className="text-[11px] font-bold text-[#202B1D]">
                  ¿Dónde encontrarla en Huancayo?
                </span>
              </div>
              <p className="text-xs text-[#5C6856]">
                {selectedPlant.locationHuancayo}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[#E4E3D5]">
              <span className="text-xs font-black text-[#52A447]">
                +{selectedPlant.pointsReward} pts por avistamiento
              </span>

              <div className="flex gap-2">
                {!stats.discoveredPlantIds.includes(selectedPlant.id) && (
                  <button
                    onClick={() => {
                      setVerifyingPlant(selectedPlant);
                      setSelectedPlant(null);
                    }}
                    className="bg-[#3E7E36] hover:bg-[#2E6228] text-white px-4 py-2 rounded-full text-xs font-black font-heading shadow-xs active:scale-95 transition-transform"
                  >
                    Verificar Avistamiento
                  </button>
                )}
                <button
                  onClick={() => setSelectedPlant(null)}
                  className="bg-stone-100 hover:bg-stone-200 text-[#5C6856] px-4 py-2 rounded-full text-xs font-black font-heading active:scale-95"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Verificación si el usuario decide comprobar una planta del catálogo */}
      {verifyingPlant && (
        <VerificationModal
          isOpen={Boolean(verifyingPlant)}
          onClose={() => setVerifyingPlant(null)}
          objective={{
            id: `plant-cat-${verifyingPlant.id}`,
            title: `Avistamiento de ${verifyingPlant.name}`,
            description: verifyingPlant.description,
            points: verifyingPlant.pointsReward || 25,
            expectedCode: "WANKA-TUTA",
            plantId: verifyingPlant.id,
            question: {
              q: `¿Qué rol ecológico o característico tiene ${verifyingPlant.name} en el Valle del Mantaro?`,
              options: [
                "Flora adaptada al clima andino del valle",
                "Especie marina de agua salada",
                "Planta tropical de la selva baja",
              ],
              correct: 0,
            },
          }}
          onSuccess={(method) => {
            verifyAndCompleteObjective(
              `plant-cat-${verifyingPlant.id}`,
              verifyingPlant.name,
              verifyingPlant.pointsReward || 25,
              method,
              verifyingPlant.id
            );
          }}
        />
      )}
    </div>
  );
};
