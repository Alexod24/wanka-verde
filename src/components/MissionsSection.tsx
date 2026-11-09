"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sprout, 
  Search, 
  ClipboardList, 
  Camera, 
  ArrowRight, 
  TrendingUp, 
  Lock, 
  Trophy, 
  CheckCircle2,
  X
} from "lucide-react";
import { INTERACTIVE_MISSIONS } from "@/data/mockData";
import { TriviaModal } from "@/components/TriviaModal";
import { VerificationModal } from "@/components/VerificationModal";
import { useGame } from "@/context/GameContext";

export const MissionsSection: React.FC = () => {
  const { stats, verifyAndCompleteObjective, isObjectiveCompleted } = useGame();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showTriviaModal, setShowTriviaModal] = useState(false);
  const [verifyingMission, setVerifyingMission] = useState<typeof INTERACTIVE_MISSIONS[0] | null>(null);

  // Trigger gamified mission action with mandatory verification
  const handleMissionClick = (mission: typeof INTERACTIVE_MISSIONS[0]) => {
    if (isObjectiveCompleted(mission.id)) {
      return;
    }

    if (mission.id === "m-2") {
      setShowTriviaModal(true);
      return;
    }

    // Opens Verification Modal
    setVerifyingMission(mission);
  };

  const getMissionIcon = (iconName: string) => {
    switch (iconName) {
      case "search":
        return <Search className="w-8 h-8 text-[#3E7E36]" />;
      case "clipboard-list":
        return <ClipboardList className="w-8 h-8 text-[#3D84F6]" />;
      case "sprout":
        return <Sprout className="w-8 h-8 text-[#52A447]" />;
      case "camera":
        return <Camera className="w-8 h-8 text-[#865DFF]" />;
      default:
        return <Sprout className="w-8 h-8 text-[#52A447]" />;
    }
  };

  return (
    <section className="w-full pb-12 pt-2 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid de 3 Columnas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CARD 1: ¿Cuál es nuestro reto? (Huancayo) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 flex flex-col justify-between relative overflow-hidden group hover:border-[#52A447]/50 transition-all duration-300">
            {/* Header pill con icono de brote */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#2E6228] text-white px-4 py-1.5 rounded-full shadow-xs mb-4">
                <Sprout className="w-4 h-4 text-[#A7F3D0]" />
                <span className="text-sm font-extrabold font-heading tracking-wide">
                  ¿Cuál es nuestro reto?
                </span>
              </div>

              {/* Explicación textual */}
              <p className="text-[#5C6856] text-sm md:text-base font-semibold leading-relaxed mb-5">
                La pérdida de plantas nativas en Huancayo amenaza nuestra biodiversidad. ¡Aprendamos a conocerlas y cuidarlas!
              </p>
            </div>

            {/* Foto real flora andina & CTA */}
            <div className="mt-auto">
              <div className="relative rounded-2xl overflow-hidden mb-4 border border-[#E4E3D5] shadow-xs group-hover:shadow-md transition-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/reto-flora.jpg"
                  alt="Flora nativa de Huancayo"
                  className="w-full h-36 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-bold drop-shadow-md">
                    Especies vulnerables del Valle del Mantaro
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowInfoModal(true)}
                className="inline-flex items-center gap-2 bg-[#2E6228] hover:bg-[#20471b] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-extrabold font-heading shadow-xs hover:shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <span>Conoce más</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 2: Explora nuestras misiones (Grid 2x2 microtarjetas) */}
          <div className="lg:col-span-4 bg-[#FAF9F3] rounded-3xl border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 flex flex-col justify-between">
            {/* Header pill */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 bg-[#2E6228] text-white px-5 py-1.5 rounded-full shadow-xs">
                <span className="text-sm font-extrabold font-heading tracking-wide">
                  Explora nuestras misiones
                </span>
              </div>
            </div>

            {/* Microtarjetas 2x2 interactivas */}
            <div className="grid grid-cols-2 gap-3 my-auto">
              {INTERACTIVE_MISSIONS.map((mission) => {
                const isDone = isObjectiveCompleted(mission.id);

                return (
                  <div
                    key={mission.id}
                    onClick={() => handleMissionClick(mission)}
                    className={`relative bg-white rounded-2xl p-3 border transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer min-h-[145px] group ${
                      isDone
                        ? "border-[#52A447] ring-2 ring-[#52A447]/20 bg-[#F2F8F0]"
                        : "border-[#E4E3D5] hover:border-[#52A447] hover:shadow-md hover:-translate-y-1"
                    }`}
                  >
                    {/* Badge de completado si ya se verificó */}
                    {isDone && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3E7E36]" />
                      </div>
                    )}

                    {/* Icono central de la misión */}
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F3] flex items-center justify-center p-2 mb-2 group-hover:scale-110 transition-transform">
                      {getMissionIcon(mission.iconName)}
                    </div>

                    {/* Título de la microtarjeta */}
                    <p className="text-xs font-black text-[#202B1D] font-heading leading-tight mb-2">
                      {mission.title}
                    </p>

                    {/* Badge de puntos o estado */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold shadow-xs ${
                      isDone ? "bg-[#3E7E36] text-white" : "bg-[#52A447] text-white"
                    }`}>
                      {isDone ? "Completada" : `+${mission.points} pts`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Texto de ayuda interactivo */}
            <p className="text-center text-[11px] font-semibold text-[#5C6856] mt-4">
              Haz clic en una misión para verificar tu logro y sumar puntos.
            </p>
          </div>

          {/* CARD 3: Tu progreso en tiempo real */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 flex flex-col justify-between">
            <div>
              {/* Header pill con gráfica de barras */}
              <div className="inline-flex items-center gap-2 bg-[#2E6228] text-white px-4 py-1.5 rounded-full shadow-xs mb-5">
                <TrendingUp className="w-4 h-4 text-[#E6A728]" />
                <span className="text-sm font-extrabold font-heading tracking-wide">
                  Tu progreso
                </span>
              </div>

              {/* Nivel y Barra de Progreso */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm md:text-base font-extrabold text-[#202B1D] font-heading">
                    Nivel: <span className="text-[#3E7E36]">{stats.levelName}</span>
                  </span>
                  <span className="text-xs font-black text-[#5C6856]">
                    {stats.points} / {stats.maxPoints} pts
                  </span>
                </div>

                {/* Barra de progreso verde con brillo */}
                <div className="w-full h-3.5 bg-[#E4E3D5]/80 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-[#52A447] to-[#3E7E36] rounded-full transition-all duration-700 ease-out shadow-xs"
                    style={{ width: `${Math.min((stats.points / stats.maxPoints) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Fila de Insignias dinámicas */}
              <div className="mb-6">
                <div className="flex items-center justify-between gap-2">
                  
                  {/* Insignia 1: Desbloqueada si points >= 20 */}
                  <div className="flex flex-col items-center group cursor-pointer" title="Guardián de Hojas (requiere 20 pts)">
                    <div className={`w-12 h-12 rounded-2xl p-1 shadow-sm transform group-hover:scale-110 transition-transform flex items-center justify-center ${
                      stats.points >= 20
                        ? "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-2 border-[#E6A728]"
                        : "bg-[#E2E8F0] border border-[#CBD5E1] opacity-60"
                    }`}>
                      <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                        stats.points >= 20 ? "bg-[#E7F4E4] border border-[#52A447]" : "bg-[#F1F5F9]"
                      }`}>
                        {stats.points >= 20 ? (
                          <Sprout className="w-5 h-5 text-[#3E7E36]" />
                        ) : (
                          <Lock className="w-4 h-4 text-[#94A3B8]" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Insignia 2: Requiere 50 pts */}
                  <div className="flex flex-col items-center group" title="Protector de Bosques (requiere 50 pts)">
                    <div className={`w-12 h-12 rounded-2xl p-1 shadow-xs flex items-center justify-center ${
                      stats.points >= 50
                        ? "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-2 border-[#E6A728]"
                        : "bg-[#E2E8F0] border border-[#CBD5E1] opacity-60"
                    }`}>
                      <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                        stats.points >= 50 ? "bg-[#52A447] text-white text-xs font-bold" : "bg-[#F1F5F9]"
                      }`}>
                        {stats.points >= 50 ? "🌲" : <Lock className="w-4 h-4 text-[#94A3B8]" />}
                      </div>
                    </div>
                  </div>

                  {/* Insignia 3: Requiere 120 pts */}
                  <div className="flex flex-col items-center group" title="Flor Sagrada Inca (requiere 120 pts)">
                    <div className={`w-12 h-12 rounded-2xl p-1 shadow-xs flex items-center justify-center ${
                      stats.points >= 120
                        ? "bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-[#865DFF]"
                        : "bg-[#E2E8F0] border border-[#CBD5E1] opacity-60"
                    }`}>
                      <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                        stats.points >= 120 ? "bg-[#865DFF] text-white text-xs" : "bg-[#F1F5F9]"
                      }`}>
                        {stats.points >= 120 ? "🌸" : <Lock className="w-4 h-4 text-[#94A3B8]" />}
                      </div>
                    </div>
                  </div>

                  {/* Insignia 4: Requiere 200 pts */}
                  <div className="flex flex-col items-center group" title="Maestro Botánico Wanka (requiere 200 pts)">
                    <div className={`w-12 h-12 rounded-2xl p-1 shadow-xs flex items-center justify-center ${
                      stats.points >= 200
                        ? "bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-[#E6A728]"
                        : "bg-[#E2E8F0] border border-[#CBD5E1] opacity-60"
                    }`}>
                      <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                        stats.points >= 200 ? "bg-[#E6A728] text-white text-xs" : "bg-[#F1F5F9]"
                      }`}>
                        {stats.points >= 200 ? "🏆" : <Lock className="w-4 h-4 text-[#94A3B8]" />}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Banner Inferior de la Card */}
            <Link
              href="/explora"
              className="mt-2 bg-[#2E6228] hover:bg-[#20471b] text-white p-3 rounded-2xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all group"
            >
              <Trophy className="w-6 h-6 text-[#E6A728] shrink-0 group-hover:rotate-12 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-black font-heading leading-tight">
                  Ver mapa y misiones
                </span>
                <span className="text-xs font-extrabold text-[#FEF08A] font-heading leading-tight">
                  ¡Suma puntos verificados en Huancayo!
                </span>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Modal de Información de Reto */}
      {showInfoModal && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E4E3D5] shadow-2xl relative">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-[#E7F4E4] rounded-xl">
                <Sprout className="w-6 h-6 text-[#3E7E36]" />
              </div>
              <h3 className="text-xl font-extrabold font-heading text-[#202B1D]">
                Biodiversidad del Valle del Mantaro
              </h3>
            </div>

            <p className="text-sm text-[#5C6856] leading-relaxed mb-4">
              En Huancayo y sus distritos, especies nativas como el <strong>Quinual (Polylepis)</strong>, el <strong>Quishuar</strong> y la <strong>Cantuta</strong> están siendo desplazadas por especies introducidas como el eucalipto.
            </p>

            <div className="bg-[#FAF9F3] p-3.5 rounded-2xl border border-[#E4E3D5] mb-5">
              <h4 className="text-xs font-black uppercase text-[#3E7E36] mb-1 font-heading">
                Objetivos de los Exploradores:
              </h4>
              <ul className="text-xs text-[#5C6856] space-y-1 list-disc list-inside">
                <li>Ubicar los ejemplares nativos en los parques y cerros de Huancayo.</li>
                <li>Verificar los códigos botánicos físicos o evidencias fotográficas.</li>
                <li>Conocer el valor hídrico y cultural de cada árbol y arbusto andino.</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#5C6856] hover:bg-stone-100"
              >
                Cerrar
              </button>
              <Link
                href="/explora"
                className="px-5 py-2 rounded-xl text-xs font-black font-heading text-white bg-[#3E7E36] hover:bg-[#2E6228]"
              >
                Ir al Mapa →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Trivia */}
      <TriviaModal
        isOpen={showTriviaModal}
        onClose={() => setShowTriviaModal(false)}
        onEarnPoints={(pts) => {
          verifyAndCompleteObjective("m-2", "Cuestionario de Flora Andina", pts, "quiz");
        }}
      />

      {/* Modal de Verificación General */}
      {verifyingMission && (
        <VerificationModal
          isOpen={Boolean(verifyingMission)}
          onClose={() => setVerifyingMission(null)}
          objective={{
            id: verifyingMission.id,
            title: verifyingMission.title,
            description: verifyingMission.description,
            points: verifyingMission.points,
            expectedCode: "HUANCAYO-VERDE",
          }}
          onSuccess={(method) => {
            verifyAndCompleteObjective(
              verifyingMission.id,
              verifyingMission.title,
              verifyingMission.points,
              method
            );
          }}
        />
      )}
    </section>
  );
};
