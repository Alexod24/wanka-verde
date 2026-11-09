"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  RotateCcw,
  Trophy
} from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  question: string;
  plantName: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "¿Qué árbol nativo del Valle del Mantaro tiene corteza rojiza laminada y es vital para 'cosechar agua' en las alturas?",
    plantName: "Quinual (Polylepis)",
    options: ["Eucalipto", "Quinual", "Pino radiata", "Ciprés"],
    correctAnswer: 1,
    explanation: "El Quinual retiene la niebla andina y nutre los manantiales de Huancayo. Los árboles introducidos como el eucalipto consumen demasiada agua del suelo.",
    points: 15,
  },
  {
    id: 2,
    question: "¿Cuál es la flor nacional del Perú y símbolo sagrado de los incas que crece en quebradas de Huancayo?",
    plantName: "Cantuta",
    options: ["Orquídea wanka", "Cantuta", "Girasol silvestre", "Flor de papa"],
    correctAnswer: 1,
    explanation: "La Cantuta (Cantua buxifolia) era considerada la flor consagrada al dios Sol (Inti) y decora los valles interandinos del Mantaro.",
    points: 15,
  },
];

export const TriviaModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  onEarnPoints?: (pts: number) => void;
}> = ({
  isOpen,
  onClose,
  onEarnPoints,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalPointsEarned, setTotalPointsEarned] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setTotalPointsEarned((prev) => prev + currentQ.points);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#3E7E36", "#52A447", "#E6A728"],
      });
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      if (onEarnPoints) {
        onEarnPoints(totalPointsEarned + (selectedOpt === currentQ.correctAnswer ? 0 : 0));
      }
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setTotalPointsEarned(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E4E3D5] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500"
        >
          <X className="w-5 h-5" />
        </button>

        {!quizFinished ? (
          <div>
            {/* Header del Cuestionario */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E3D5] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#E7F4E4] flex items-center justify-center text-[#3E7E36]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black font-heading text-[#202B1D]">
                    Cuestionario de Flora Andina
                  </h3>
                  <span className="text-[11px] font-bold text-[#5C6856]">
                    Pregunta {currentIdx + 1} de {QUESTIONS.length}
                  </span>
                </div>
              </div>
              <span className="text-xs font-black text-[#52A447] bg-[#E7F4E4] px-2.5 py-1 rounded-full">
                +{currentQ.points} pts
              </span>
            </div>

            {/* Pregunta */}
            <h4 className="text-base font-extrabold text-[#202B1D] font-heading leading-snug mb-4">
              {currentQ.question}
            </h4>

            {/* Opciones */}
            <div className="flex flex-col gap-2.5 mb-4">
              {currentQ.options.map((opt, idx) => {
                const isCorrect = idx === currentQ.correctAnswer;
                const isSelected = selectedOpt === idx;

                let btnStyles = "border-[#E4E3D5] bg-[#FAF9F3] hover:border-[#52A447] text-[#202B1D]";

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyles = "border-[#52A447] bg-[#E7F4E4] text-[#2E6228] font-black";
                  } else if (isSelected) {
                    btnStyles = "border-red-400 bg-red-50 text-red-700";
                  } else {
                    btnStyles = "border-[#E4E3D5] opacity-50 bg-[#FAF9F3]";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-3.5 rounded-2xl border text-xs font-bold text-left transition-all flex items-center justify-between ${btnStyles}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-[#3E7E36]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explicación didáctica */}
            {isAnswered && (
              <div className="bg-[#FAF9F3] p-3 rounded-2xl border border-[#E4E3D5] mb-4 animate-in fade-in">
                <span className="text-[10px] font-black uppercase text-[#3E7E36] block mb-1">
                  Dato de conservación:
                </span>
                <p className="text-xs text-[#5C6856] leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Botón Siguiente */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-[#3E7E36] hover:bg-[#2E6228] text-white px-5 py-2.5 rounded-full text-xs font-black font-heading flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                >
                  <span>{currentIdx + 1 === QUESTIONS.length ? "Finalizar y sumar puntos" : "Siguiente"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Pantalla de Resultados Finales */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF4D6] flex items-center justify-center mx-auto mb-3 border-2 border-[#E6A728]">
              <Trophy className="w-8 h-8 text-[#E6A728]" />
            </div>

            <h3 className="text-xl font-black font-heading text-[#202B1D] mb-1">
              ¡Cuestionario Completado!
            </h3>
            <p className="text-xs text-[#5C6856] mb-5">
              Tus respuestas han sido verificadas en el sistema.
            </p>

            <div className="bg-[#E7F4E4] rounded-2xl p-4 border border-[#52A447]/30 max-w-xs mx-auto mb-6">
              <span className="text-[11px] font-bold text-[#3E7E36] block mb-1">Puntos acumulados</span>
              <span className="text-3xl font-black font-heading text-[#2E6228]">
                +{totalPointsEarned} pts
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-full border border-[#E4E3D5] text-xs font-bold text-[#5C6856] hover:bg-stone-100 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#3E7E36] hover:bg-[#2E6228] text-white text-xs font-black font-heading shadow-md active:scale-95 transition-transform"
              >
                Cerrar y Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
