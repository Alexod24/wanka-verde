"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MapExplorer } from "@/components/MapExplorer";
import { ProgressPanel } from "@/components/ProgressPanel";
import { MissionCard } from "@/components/MissionCard";
import { PlantCatalog } from "@/components/PlantCatalog";
import { X } from "lucide-react";

export default function ExploraPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0EFE6] flex text-[#202B1D] font-sans antialiased overflow-x-hidden">
      
      {/* 1. SIDEBAR IZQUIERDA FIJA (Desktop) */}
      <div className="hidden md:block shrink-0">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-64 h-full">
            <Sidebar onNavClick={() => setMobileSidebarOpen(false)} />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-white bg-black/40 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ÁREA PRINCIPAL DERECHA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP BAR */}
        <TopBar onOpenMobileMenu={() => setMobileSidebarOpen(true)} />

        {/* CONTENIDO INTERNO DASHBOARD */}
        <main className="flex-1 p-4 md:p-6 lg:p-7 max-w-7xl mx-auto w-full flex flex-col gap-6">
          
          {/* GRID PRINCIPAL: ÁREA CENTRAL (MAPA) & PANEL LATERAL DERECHO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ÁREA CENTRAL: MAPA INTERACTIVO */}
            <div className="lg:col-span-8 flex flex-col">
              <MapExplorer />
            </div>

            {/* PANEL LATERAL DERECHO: CARD PROGRESO & CARD INSIGNIAS */}
            <div className="lg:col-span-4 flex flex-col">
              <ProgressPanel />
            </div>

          </div>

          {/* FILA INFERIOR: WIDGETS (MISIONES DISPONIBLES & CATÁLOGO DE PLANTAS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Widget 1: Misiones Disponibles (Cantuta) */}
            <div className="lg:col-span-6 flex flex-col">
              <MissionCard />
            </div>

            {/* Widget 2: Catálogo de Plantas (Quinual, Quishuar, Cantuta, Colli, Muña) */}
            <div className="lg:col-span-6 flex flex-col">
              <PlantCatalog />
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

