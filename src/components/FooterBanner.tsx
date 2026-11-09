"use client";

import React from "react";
import { Leaf } from "lucide-react";

export const FooterBanner: React.FC = () => {
  return (
    <footer className="w-full relative mt-auto overflow-hidden">
      {/* Curved organic green banner inspired by Andean hills */}
      <div className="relative bg-gradient-to-r from-[#20471b] via-[#2E6228] to-[#1c3f18] text-white pt-8 pb-10 px-4 md:px-8 shadow-inner">
        
        {/* Curva SVG superior ondulada */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none transform -translate-y-[98%]">
          <svg
            className="relative block w-full h-8 md:h-12 text-[#2E6228]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Decoraciones de hojas flotantes sutiles */}
        <div className="absolute left-6 bottom-4 text-white/15 pointer-events-none transform -rotate-12">
          <Leaf className="w-16 h-16" />
        </div>
        <div className="absolute right-6 top-4 text-white/15 pointer-events-none transform rotate-45">
          <Leaf className="w-20 h-20" />
        </div>

        {/* Contenido centrado */}
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-3 text-sm md:text-base lg:text-lg font-black font-heading tracking-wide">
            <span className="text-[#A7F3D0] text-xl">🌱</span>
            <p className="leading-snug">
              No solo aprendas sobre las plantas, ¡conviértete en parte del cambio!
            </p>
            <span className="text-[#A7F3D0] text-xl">🌱</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-emerald-200/80 pt-2 border-t border-emerald-700/40 w-full max-w-xl">
            <span>Valle del Mantaro · Huancayo, Perú</span>
            <span>•</span>
            <span>Colegios y Comunidad Wanka</span>
            <span>•</span>
            <span>Iniciativa de Biodiversidad Nativa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

