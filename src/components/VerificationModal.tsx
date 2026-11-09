"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  X, 
  QrCode, 
  Upload, 
  KeyRound, 
  HelpCircle,
  AlertCircle,
  FileCheck2
} from "lucide-react";

export interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  objective: {
    id: string;
    title: string;
    description: string;
    points: number;
    expectedCode?: string;
    question?: {
      q: string;
      options: string[];
      correct: number;
    };
    plantId?: string;
  };
  onSuccess: (method: "code" | "photo" | "quiz" | "qr") => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  objective,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<"qr" | "code" | "photo" | "quiz">("qr");
  
  // Code verification
  const [inputCode, setInputCode] = useState("");
  const [codeError, setCodeError] = useState("");

  // Photo verification
  const [photoSelected, setPhotoSelected] = useState<string | null>(null);
  const [photoNotes, setPhotoNotes] = useState("");

  // Quiz verification
  const [selectedQuizOpt, setSelectedQuizOpt] = useState<number | null>(null);
  const [quizError, setQuizError] = useState(false);

  // Status
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  if (!isOpen) return null;

  // 1. QR Verification
  const handleVerifyQR = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      setTimeout(() => {
        onSuccess("qr");
        onClose();
      }, 1000);
    }, 1200);
  };

  // 2. Code Verification (Placa botánica)
  const handleVerifyCode = () => {
    const validCodes = [
      "WANKA-TUTA",
      "WANKA-CANTUTA-01",
      "WANKA-QUINUAL-02",
      "WANKA-QUISHUAR-03",
      "WANKA-COLLI-04",
      "WANKA-MUNA-05",
      "WANKA-RETO-2026",
      "HUANCAYO-VERDE",
      objective.expectedCode?.toUpperCase() || "WANKA-TUTA",
    ];

    if (!inputCode.trim()) {
      setCodeError("Ingresa el código impreso en la placa botánica.");
      return;
    }

    if (validCodes.includes(inputCode.trim().toUpperCase())) {
      setCodeError("");
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setVerificationSuccess(true);
        setTimeout(() => {
          onSuccess("code");
          onClose();
        }, 1000);
      }, 900);
    } else {
      setCodeError("Código inválido. Revisa la placa física o prueba 'WANKA-TUTA'.");
    }
  };

  // 3. Photo Evidence Verification
  const handleVerifyPhoto = () => {
    if (!photoSelected) {
      alert("Por favor sube o toma una foto como evidencia.");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      setTimeout(() => {
        onSuccess("photo");
        onClose();
      }, 1000);
    }, 1200);
  };

  // 4. Quiz Verification
  const handleVerifyQuiz = () => {
    if (selectedQuizOpt === null) return;

    const correct = objective.question?.correct ?? 1;

    if (selectedQuizOpt === correct) {
      setQuizError(false);
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setVerificationSuccess(true);
        setTimeout(() => {
          onSuccess("quiz");
          onClose();
        }, 1000);
      }, 900);
    } else {
      setQuizError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E4E3D5] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E4E3D5] mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#E7F4E4] flex items-center justify-center text-[#3E7E36] border border-[#52A447]/30">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-[#52A447] tracking-wider">
              Verificación Obligatoria
            </span>
            <h3 className="text-sm font-black font-heading text-[#202B1D] leading-tight">
              {objective.title}
            </h3>
          </div>
        </div>

        {verificationSuccess ? (
          <div className="text-center py-8 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#E7F4E4] text-[#3E7E36] flex items-center justify-center mx-auto mb-3 border-2 border-[#52A447]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-black font-heading text-[#202B1D] mb-1">
              ¡Misión Verificada con Éxito!
            </h4>
            <p className="text-xs text-[#5C6856] mb-2">
              Se han sumado tus puntos al perfil de explorador.
            </p>
            <span className="inline-block bg-[#3E7E36] text-white px-4 py-1.5 rounded-full text-xs font-black">
              +{objective.points} pts
            </span>
          </div>
        ) : (
          <div>
            <p className="text-xs text-[#5C6856] mb-4">
              Para validar que estuviste en la ubicación y sumar <strong>+{objective.points} pts</strong>, elige un método de comprobación:
            </p>

            {/* Verification Method Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#FAF9F3] rounded-2xl border border-[#E4E3D5] mb-4 text-xs font-bold font-heading">
              <button
                onClick={() => setActiveTab("qr")}
                className={`py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  activeTab === "qr"
                    ? "bg-[#3E7E36] text-white shadow-xs"
                    : "text-[#5C6856] hover:text-[#202B1D]"
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span className="text-[10px]">Escanear</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  activeTab === "code"
                    ? "bg-[#3E7E36] text-white shadow-xs"
                    : "text-[#5C6856] hover:text-[#202B1D]"
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span className="text-[10px]">Código</span>
              </button>
              <button
                onClick={() => setActiveTab("photo")}
                className={`py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  activeTab === "photo"
                    ? "bg-[#3E7E36] text-white shadow-xs"
                    : "text-[#5C6856] hover:text-[#202B1D]"
                }`}
              >
                <Upload className="w-4 h-4" />
                <span className="text-[10px]">Evidencia</span>
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  activeTab === "quiz"
                    ? "bg-[#3E7E36] text-white shadow-xs"
                    : "text-[#5C6856] hover:text-[#202B1D]"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="text-[10px]">Pregunta</span>
              </button>
            </div>

            {/* TAB 1: QR Scanner */}
            {activeTab === "qr" && (
              <div className="flex flex-col items-center text-center">
                <div className="relative w-40 h-40 bg-stone-900 rounded-2xl overflow-hidden border-2 border-dashed border-[#52A447] flex items-center justify-center mb-3">
                  <QrCode className="w-20 h-20 text-white/40" />
                  <div className="absolute inset-x-3 h-0.5 bg-[#52A447] shadow-[0_0_8px_#52A447] animate-pulse"></div>
                </div>
                <p className="text-[11px] text-[#5C6856] mb-4">
                  Apunta tu cámara al código QR impreso en el letrero botánico o presiona el botón para verificar.
                </p>
                <button
                  onClick={handleVerifyQR}
                  disabled={isVerifying}
                  className="w-full bg-[#3E7E36] hover:bg-[#2E6228] text-white py-2.5 rounded-full text-xs font-black font-heading shadow-md active:scale-95 transition-transform"
                >
                  {isVerifying ? "Verificando QR en Huancayo..." : "Comprobar Escaneo de QR"}
                </button>
              </div>
            )}

            {/* TAB 2: Código de placa botánica */}
            {activeTab === "code" && (
              <div className="flex flex-col">
                <label className="text-xs font-bold text-[#202B1D] mb-1.5">
                  Código de Placa Física:
                </label>
                <input
                  type="text"
                  placeholder="Ej. WANKA-TUTA"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full uppercase tracking-wider text-xs px-3.5 py-2.5 rounded-xl border border-[#E4E3D5] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#3E7E36] font-mono mb-2"
                />
                <p className="text-[10px] text-[#5C6856] mb-3">
                  (Código de prueba: <code>WANKA-TUTA</code>).
                </p>

                {codeError && (
                  <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-1.5 mb-3 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{codeError}</span>
                  </div>
                )}

                <button
                  onClick={handleVerifyCode}
                  disabled={isVerifying}
                  className="w-full bg-[#3E7E36] hover:bg-[#2E6228] text-white py-2.5 rounded-full text-xs font-black font-heading shadow-md active:scale-95 transition-transform mt-2"
                >
                  {isVerifying ? "Validando código..." : "Validar Código"}
                </button>
              </div>
            )}

            {/* TAB 3: Evidencia Fotográfica */}
            {activeTab === "photo" && (
              <div className="flex flex-col text-center">
                <div 
                  onClick={() => setPhotoSelected("/assets/cantuta-mission.jpg")}
                  className={`w-full h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors mb-3 ${
                    photoSelected
                      ? "border-[#52A447] bg-[#E7F4E4]/30"
                      : "border-[#E4E3D5] hover:border-[#52A447] bg-[#FAF9F3]"
                  }`}
                >
                  {photoSelected ? (
                    <div className="flex flex-col items-center gap-1">
                      <CheckCircle2 className="w-6 h-6 text-[#3E7E36]" />
                      <span className="text-xs font-bold text-[#3E7E36]">Foto adjuntada con éxito</span>
                      <span className="text-[10px] text-[#5C6856]">Haz clic para cambiar</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-[#5C6856]">
                      <Upload className="w-6 h-6 text-[#3E7E36]" />
                      <span className="text-xs font-bold">Haz clic para tomar o subir foto</span>
                      <span className="text-[10px]">JPG o PNG del ejemplar en Huancayo</span>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Nota breve (ej: Vista en el mirador del Cerrito)"
                  value={photoNotes}
                  onChange={(e) => setPhotoNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-[#E4E3D5] bg-[#FAF9F3] mb-4"
                />

                <button
                  onClick={handleVerifyPhoto}
                  disabled={isVerifying || !photoSelected}
                  className="w-full bg-[#3E7E36] hover:bg-[#2E6228] disabled:opacity-50 text-white py-2.5 rounded-full text-xs font-black font-heading shadow-md active:scale-95 transition-transform"
                >
                  {isVerifying ? "Verificando fotografía..." : "Enviar Evidencia y Validar"}
                </button>
              </div>
            )}

            {/* TAB 4: Pregunta Botánica In Situ */}
            {activeTab === "quiz" && (
              <div className="flex flex-col">
                <p className="text-xs font-extrabold text-[#202B1D] font-heading mb-3">
                  {objective.question?.q || "¿Qué característica física identifica a este ejemplar en Huancayo?"}
                </p>

                <div className="flex flex-col gap-2 mb-3">
                  {(
                    objective.question?.options || [
                      "Hojas en forma de aguja y olor a pino",
                      "Corteza rojiza laminada o flores acampanadas",
                      "Hojas carnosas de cactus costero",
                    ]
                  ).map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedQuizOpt(i);
                        setQuizError(false);
                      }}
                      className={`text-xs p-3 rounded-xl border text-left font-bold transition-all ${
                        selectedQuizOpt === i
                          ? "border-[#52A447] bg-[#E7F4E4] text-[#2E6228]"
                          : "border-[#E4E3D5] bg-[#FAF9F3] text-[#202B1D] hover:border-[#52A447]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {quizError && (
                  <p className="text-xs text-red-600 mb-2 font-bold">
                    Opción incorrecta. Observa bien el árbol/planta y vuelve a intentarlo.
                  </p>
                )}

                <button
                  onClick={handleVerifyQuiz}
                  disabled={selectedQuizOpt === null || isVerifying}
                  className="w-full bg-[#3E7E36] hover:bg-[#2E6228] disabled:opacity-50 text-white py-2.5 rounded-full text-xs font-black font-heading shadow-md active:scale-95 transition-transform"
                >
                  {isVerifying ? "Validando respuesta..." : "Comprobar Respuesta"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

