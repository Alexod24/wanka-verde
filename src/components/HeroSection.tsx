"use client";

import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden pt-2 pb-8 sm:pt-4 sm:pb-10 md:pt-6 md:pb-14">
      {/* Background panoramic landscape with subtle overlay */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-between p-5 sm:p-8 md:p-10 bg-gradient-to-b from-[#F2F8F0] via-[#FAF9F3] to-[#F0EFE6]">
          {/* Panoramic Huancayo & Mantaro Valley background */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-right md:bg-center opacity-85 pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage: "url('/assets/header.jpg')",
              backgroundPosition: "center 28%",
              backgroundSize: "cover",
            }}
          />

          {/* Soft tint gradient overlay to ensure text contrast while keeping illustration vibrant */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FAF9F3]/95 via-[#FAF9F3]/80 md:via-[#FAF9F3]/60 to-transparent pointer-events-none" />

          {/* Hero Content Container */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center h-full">

            {/* Lado Izquierdo: Título, Subtítulo y CTA */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start gap-3 sm:gap-4">
              {/* Badge decorativo superior */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F4E4]/90 border border-[#52A447]/40 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#3E7E36] animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-[#3E7E36]">
                  Valle del Mantaro · Huancayo
                </span>
              </div>

              {/* Título Principal Impactante */}
              <div className="relative">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#202B1D] font-heading tracking-tight leading-[1.08]">
                  ¡Wanka-<br className="hidden sm:inline" />
                  <span className="text-[#3E7E36] relative inline-block">
                    Tuta!
                    <svg
                      className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#E6A728]"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                      fill="currentColor"
                    >
                      <path d="M0,15 Q50,0 100,15 Q50,10 0,15 Z" />
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Subtítulo */}
              <p className="text-sm sm:text-lg md:text-xl font-bold text-[#5C6856] font-heading max-w-md mt-0.5 sm:mt-1 leading-snug">
                Aprende, explora y descubre la naturaleza jugando
              </p>

              {/* Botón CTA con efecto hover gamificado */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/explora"
                  className="group relative inline-flex items-center justify-center gap-3 bg-[#3E7E36] hover:bg-[#2E6228] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-extrabold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border-b-4 border-[#254f20]"
                >
                  <span>Comenzar mi aventura</span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white ml-0.5" />
                  </div>
                </Link>
              </div>

              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#5C6856] mt-0.5 sm:mt-1">
                <span className="w-2 h-2 rounded-full bg-[#52A447]"></span>
                <span>Exploración satelital interactiva de Huancayo activa</span>
              </div>
            </div>

            {/* Centro: Mascota Brote Kawaii con cartel de madera */}
            {/* <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
              <div className="relative group">

                <div className="absolute inset-0 bg-[#52A447]/20 rounded-full blur-2xl transform scale-90 group-hover:scale-105 transition-transform duration-500"></div>


                <img
                  src="/assets/mascot.png"
                  alt="Mascota Brote Verde Huancayo"
                  className="relative z-10 w-64 sm:w-72 lg:w-80 h-auto object-contain drop-shadow-[0_12px_24px_rgba(46,98,40,0.3)] transition-transform duration-300 hover:-translate-y-2 select-none"
                />


                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-full border border-[#E4E3D5] shadow-md flex items-center gap-2 whitespace-nowrap animate-bounce">
                  <span className="text-xs font-extrabold text-[#3E7E36]">🌱 ¡Hola, soy Wankita!</span>
                </div>
              </div>
            </div> */}

            {/* Lado Derecho: Tarjeta Flotante de Impacto (3 Métricas) */}
            {/* <div className="lg:col-span-3 flex justify-end">
              <div className="w-full sm:max-w-xs bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E4E3D5]/80">
                  <div className="w-7 h-7 rounded-xl bg-[#E7F4E4] flex items-center justify-center">
                    <Sprout className="w-4 h-4 text-[#3E7E36]" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#202B1D] font-heading">
                    Nuestro impacto
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">

                  <div className="flex flex-col items-center p-2 rounded-2xl bg-[#FAF9F3] border border-[#E4E3D5]/60 hover:bg-[#E7F4E4]/40 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#E7F4E4] flex items-center justify-center mb-1">
                      <Sprout className="w-4 h-4 text-[#3E7E36]" />
                    </div>
                    <span className="text-lg font-black text-[#202B1D] font-heading leading-tight">
                      1,250
                    </span>
                    <span className="text-[11px] font-bold text-[#5C6856] leading-tight">
                      Estudiantes
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-2 rounded-2xl bg-[#FAF9F3] border border-[#E4E3D5]/60 hover:bg-[#E7F4E4]/40 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#E7F4E4] flex items-center justify-center mb-1">
                      <div className="w-4 h-4 rounded-full bg-[#3E7E36] flex items-center justify-center text-white text-[10px] font-bold">
                        🌲
                      </div>
                    </div>
                    <span className="text-lg font-black text-[#202B1D] font-heading leading-tight">
                      850
                    </span>
                    <span className="text-[11px] font-bold text-[#5C6856] leading-tight">
                      Plantas conocidas
                    </span>
                  </div>


                  <div className="flex flex-col items-center p-2 rounded-2xl bg-[#FAF9F3] border border-[#E4E3D5]/60 hover:bg-[#E7F4E4]/40 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#FFF4D6] flex items-center justify-center mb-1">
                      <Trophy className="w-4 h-4 text-[#E6A728]" />
                    </div>
                    <span className="text-lg font-black text-[#202B1D] font-heading leading-tight">
                      50
                    </span>
                    <span className="text-[11px] font-bold text-[#5C6856] leading-tight">
                      Retos completados
                    </span>
                  </div>
                </div>

                <div className="mt-1 bg-[#F2F8F0] p-2.5 rounded-2xl border border-[#52A447]/20 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#3E7E36] shrink-0" />
                  <p className="text-[11px] font-semibold text-[#3E7E36] leading-tight">
                    Colegios de Huancayo, El Tambo y Chilca unidos por la flora nativa.
                  </p>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </section>
  );
};

