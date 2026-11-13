"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { MapExplorer } from "@/components/MapExplorer";
import { VerificationModal } from "@/components/VerificationModal";
import { CommunitySection } from "@/components/CommunitySection";
import { GamesSection } from "@/components/GamesSection";
import { NATIVE_PLANTS, CURRENT_MISSION } from "@/data/mockData";
import { Plant } from "@/types";
import { 
  X, 
  Lock, 
  ArrowRight, 
  Search, 
  Bell, 
  ChevronDown, 
  SlidersHorizontal, 
  MoreVertical, 
  Sprout, 
  Trophy, 
  Star, 
  CheckCircle2, 
  RotateCcw, 
  Menu,
  Info,
  LogOut,
  BarChart3,
  Megaphone,
  Target,
  Flame,
  Axe,
  AlertTriangle,
  CloudOff,
  Compass,
  Smile,
  Frown
} from "lucide-react";
import { useGame, DEFAULT_CREDENTIALS } from "@/context/GameContext";

export default function ExploraPage() {
  const { 
    isAuthenticated, 
    currentUser, 
    stats, 
    verifyAndCompleteObjective, 
    isObjectiveCompleted, 
    resetProgress,
    logout
  } = useGame();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Search & filter state for the Plant Catalog table
  const [searchQuery, setSearchQuery] = useState("");
  const [rarityFilter, setRarityFilter] = useState<"all" | "emblemática" | "nativa">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "discovered" | "pending">("all");

  // Modals state
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [verifyingPlant, setVerifyingPlant] = useState<Plant | null>(null);
  const [showMissionVerification, setShowMissionVerification] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show friendly lock state if not logged in
  if (mounted && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#18181A] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-[#F4EFE0] flex items-center justify-center mx-auto mb-4 text-[#18181A]">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-heading text-[#18181A] mb-2">
            Acceso Restringido a Exploradores
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
            Para acceder al panel de control y al mapa satelital de Huancayo necesitas iniciar sesión con tu cuenta de BioWanka.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-6 text-left text-xs">
            <span className="font-extrabold uppercase text-[10px] text-[#3E7E36] tracking-wider block mb-1">
              Credenciales de prueba del proyecto:
            </span>
            <p className="text-[11px] text-slate-600 font-mono">
              <strong>Email:</strong> {DEFAULT_CREDENTIALS.email}
            </p>
            <p className="text-[11px] text-slate-600 font-mono">
              <strong>Password:</strong> {DEFAULT_CREDENTIALS.password}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              href="/login"
              className="w-full bg-[#18181A] hover:bg-zinc-800 text-white py-3.5 rounded-full text-xs sm:text-sm font-black font-heading shadow-md active:scale-98 transition-transform flex items-center justify-center gap-2"
            >
              <span>Ir a Iniciar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-slate-500 hover:text-[#18181A] py-1"
            >
              Volver a la portada
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter plants for the lower table
  const filteredPlants = NATIVE_PLANTS.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plant.scientificName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plant.locationHuancayo || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRarity = rarityFilter === "all" || plant.rarity === rarityFilter;

    const isDiscovered = stats.discoveredPlantIds.includes(plant.id);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "discovered" && isDiscovered) ||
      (statusFilter === "pending" && !isDiscovered);

    return matchesSearch && matchesRarity && matchesStatus;
  });

  // Calculate badges unlocked count
  const unlockedBadgesCount = [
    stats.points >= 20,
    stats.points >= 50,
    stats.points >= 100,
    stats.points >= 200,
  ].filter(Boolean).length;

  const isMissionDone = isObjectiveCompleted(CURRENT_MISSION.id);

  // Calculate Eco Score (0 to 100 scale like "82.01 GP SCORE" in the reference)
  const rawScorePercent = Math.min(100, (stats.points / stats.maxPoints) * 100);
  const formattedBioScore =
    stats.points === 0
      ? "0.00"
      : Math.min(100, rawScorePercent + 12.01).toFixed(2);

  const floraConservationPct = Math.round(
    (stats.knownPlantsCount / NATIVE_PLANTS.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#18181A] flex flex-col md:flex-row p-0 md:p-3.5 lg:p-4 font-sans antialiased text-[#18181A] selection:bg-[#93C5FD] selection:text-[#18181A]">
      
      {/* 1. LEFT VERTICAL ICON RAIL SIDEBAR (Desktop) */}
      <div className="hidden md:flex shrink-0">
        <Sidebar 
          activeSection={activeSection} 
          onSelectSection={setActiveSection} 
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative h-full">
            <Sidebar 
              activeSection={activeSection}
              onSelectSection={setActiveSection}
              onNavClick={() => setMobileSidebarOpen(false)} 
              forceExpanded={true}
            />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-5 right-3 p-2 text-zinc-300 hover:text-white bg-zinc-800 rounded-xl shadow-lg z-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. MAIN WHITE ROUNDED SHELL CONTAINER */}
      <div className="flex-1 bg-white md:rounded-[2.5rem] shadow-2xl flex flex-col justify-between min-w-0 overflow-hidden min-h-screen md:min-h-[calc(100vh-2rem)]">
        
        {/* TOP HEADER BAR */}
        <header className="w-full px-5 sm:px-8 lg:px-10 pt-5 pb-3.5 flex items-center justify-between gap-4 border-b border-slate-100">
          
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-[#18181A]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-0.5">
                <span>Ecosistemas</span>
                <span>›</span>
                <span className="text-slate-600">BioWanka Huancayo (BWK)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-[#18181A]">
                {activeSection === "overview" && "BioWanka Huancayo (BWK)"}
                {activeSection === "mapa" && "Mapa Satelital & Misiones de Campo"}
                {activeSection === "estadisticas" && "Mis Progresos & Logros"}
                {activeSection === "catalogo" && "Catálogo de Flora Nativa"}
                {activeSection === "comunidad" && "Comunidad & Top Rangos"}
                {activeSection === "juega" && "Juega y Aprende · Minijuegos"}
              </h1>
            </div>
          </div>

          {/* Right Header Controls: Search Circle, Bell Circle, User Pill */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 relative">
            
            {/* Search Input */}
            <div className="relative hidden sm:flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar planta o zona..."
                className="pl-9 pr-4 py-2 rounded-full bg-[#F4F6F9] hover:bg-slate-200/70 focus:bg-white text-xs font-semibold text-[#18181A] placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-300 transition-all w-44 lg:w-56"
              />
            </div>

            {/* Notification Bell Circle */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setShowUserDropdown(false);
                }}
                className="w-10 h-10 rounded-full bg-[#F4F6F9] hover:bg-slate-200/80 flex items-center justify-center text-[#18181A] transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-3xl border border-slate-200 shadow-xl p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                    <span className="text-xs font-black text-[#18181A]">
                      Alertas Botánicas
                    </span>
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Huancayo
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F4F6F9] mb-3 text-xs">
                    <p className="font-bold text-[#18181A] mb-0.5">
                      🌱 Misión en Cerrito de la Libertad
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Verifica la Cantuta con el código <code className="font-mono font-bold text-[#18181A]">BIOWANKA</code> para ganar +20 pts.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("¿Deseas reiniciar todas tus estadísticas a 0?")) {
                        resetProgress();
                        setShowNotifDropdown(false);
                      }
                    }}
                    className="w-full py-2 rounded-xl text-[11px] font-bold text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reiniciar estadísticas a 0</span>
                  </button>
                </div>
              )}
            </div>

            {/* User Pill */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowNotifDropdown(false);
                }}
                className="flex items-center gap-2.5 bg-[#F4F6F9] hover:bg-slate-200/80 rounded-full p-1 pr-3.5 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#D5E6FB] border border-white shadow-xs shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentUser?.avatarUrl || "/assets/avatar-geraldine.png"}
                    alt={currentUser?.name || "Geraldine"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-extrabold text-[#18181A] tracking-tight whitespace-nowrap">
                  {currentUser?.name ? `${currentUser.name.split(" ")[0]} H.` : "Geraldine H."}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-3xl border border-slate-200 shadow-xl p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="pb-3 border-b border-slate-100 mb-2">
                    <p className="text-xs font-black text-[#18181A]">{currentUser?.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                  </div>
                  <div className="py-1.5 flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Nivel actual:</span>
                    <span className="text-[#18181A]">Nivel {stats.level}</span>
                  </div>
                  <div className="py-1.5 flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
                    <span>Puntaje verificado:</span>
                    <span className="text-emerald-600 font-black">{stats.points} pts</span>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-xs font-extrabold text-[#18181A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* MAIN DASHBOARD BODY */}
        <main className="flex-1 px-5 sm:px-8 lg:px-10 py-5 flex flex-col gap-6 overflow-y-auto">
          
          {/* Quick View Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3.5">
            {[
              { id: "overview", label: "Resumen General (Isla 3D)" },
              { id: "mapa", label: "Mapa Satelital & Misiones" },
              { id: "estadisticas", label: "Mis Progresos" },
              { id: "catalogo", label: "Catálogo Nativo" },
              { id: "comunidad", label: "Comunidad & Top Rangos" },
              { id: "juega", label: "Juega · Minijuegos" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  activeSection === tab.id
                    ? "bg-[#18181A] text-white shadow-xs"
                    : "bg-[#F4F6F9] text-slate-500 hover:text-[#18181A] hover:bg-slate-200/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ========================================================== */}
          {/* SECCIÓN 1: RESUMEN GENERAL (ESTILO ECO ISLAND 3D DE FOTO)  */}
          {/* ========================================================== */}
          {activeSection === "overview" && (
            <div className="flex-1 flex flex-col justify-between animate-in fade-in duration-300">
              
              {/* Top 12-Col Layout: Left (Scale + Floating Island + Metric Pills) | Right (Positive & Negative Activities) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
                
                {/* LEFT + CENTER AREA (8 COLS): Level Badge, Vertical 0-100 Ruler + BIO SCORE + 3D Floating Island */}
                <div className="lg:col-span-8 lg:border-r lg:border-slate-100 lg:pr-8 flex flex-col justify-between">
                  
                  {/* Green Pill Badge: "LV.X - Guardián Wanka" */}
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2.5 bg-[#E3F9E5] border border-emerald-200/70 px-4 py-1.5 rounded-full">
                      <span className="w-6 h-6 rounded-full bg-[#A3E635] flex items-center justify-center text-[#1B4332]">
                        <Sprout className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span className="text-xs font-extrabold text-[#1B4332] tracking-tight">
                        LV.{stats.level} - {stats.levelName}
                      </span>
                    </div>
                  </div>

                  {/* Center Showcase: Vertical Ruler (0-100) + Big Score + 3D Floating Island */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-2">
                    
                    {/* Vertical Ruler (100 down to 0) + BIO SCORE */}
                    <div className="md:col-span-5 flex items-center gap-5 sm:gap-7 py-2">
                      
                      {/* Vertical Scale 100 - 0 */}
                      <div className="flex flex-col justify-between h-[270px] sm:h-[300px] text-[11px] font-bold text-slate-400 select-none">
                        {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((val) => {
                          const isCurrentDecade =
                            Math.round(Number(formattedBioScore) / 10) * 10 === val;
                          return (
                            <div key={val} className="flex items-center gap-2.5">
                              <span
                                className={`w-6 text-right ${
                                  isCurrentDecade ? "text-[#1B4332] font-black" : ""
                                }`}
                              >
                                {val}
                              </span>
                              <span
                                className={`h-[1.5px] rounded-full transition-all ${
                                  isCurrentDecade
                                    ? "w-5 bg-[#1B4332]"
                                    : val % 20 === 0
                                    ? "w-3.5 bg-slate-300"
                                    : "w-2 bg-slate-200"
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Big Score Readout + Average Dotted Line */}
                      <div className="flex-1 flex flex-col justify-center relative">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-0.5 ml-3">
                          BIO SCORE
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#1B4332]">◀</span>
                          <span className="text-4xl sm:text-5xl font-black font-heading text-[#1B4332] tracking-tight">
                            {formattedBioScore}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 ml-3 mt-1">
                          {stats.points} pts verificados · {stats.knownPlantsCount}/{NATIVE_PLANTS.length} especies
                        </span>

                        {/* Dotted AVERAGE Line exactly like reference */}
                        <div className="mt-7 w-full border-b-2 border-dotted border-slate-300 relative pt-4">
                          <span className="absolute right-0 -top-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                            META BASE (50.0)
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* 3D Low-Poly Floating Andean Island */}
                    <div className="md:col-span-7 flex items-center justify-center relative">
                      <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-square flex items-center justify-center group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/assets/eco-island-3d.jpg"
                          alt="Isla 3D Ecosistema Andino BioWanka"
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-1 select-none"
                        />

                        {/* Subtle interactive floating hotspot over the island */}
                        <button
                          onClick={() => setActiveSection("mapa")}
                          className="absolute bottom-3 bg-white/95 hover:bg-[#18181A] text-[#18181A] hover:text-white border border-slate-200/90 px-4 py-1.5 rounded-full text-[11px] font-extrabold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Ir al Mapa Satelital & Misiones →</span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Metric Buttons ("Financial Metrics" & "Emissions Metrics" style) */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-3">
                    <button
                      onClick={() => setActiveSection("estadisticas")}
                      className="inline-flex items-center gap-2.5 bg-[#E3F9E5] hover:bg-[#CFF5D3] text-[#1B4332] px-5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
                    >
                      <BarChart3 className="w-4 h-4 text-[#15803D]" />
                      <span>Métricas Botánicas ({stats.points} pts)</span>
                    </button>

                    <button
                      onClick={() => setActiveSection("mapa")}
                      className="inline-flex items-center gap-2.5 bg-[#E3F9E5] hover:bg-[#CFF5D3] text-[#1B4332] px-5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
                    >
                      <Megaphone className="w-4 h-4 text-[#15803D]" />
                      <span>Misiones de Campo & Mapa ({stats.completedMissionsCount})</span>
                    </button>

                    <button
                      onClick={() => setActiveSection("juega")}
                      className="inline-flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 text-[#18181A] px-5 py-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer"
                    >
                      <span>🕹️ Jugar en 2D</span>
                    </button>
                  </div>

                </div>

                {/* RIGHT COLUMN (4 COLS): "Positive Activities" & "Negative Activities" */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-8 pl-0 lg:pl-2">
                  
                  {/* 1. Positive Activities */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-5">
                      <span className="w-6 h-6 rounded-lg bg-[#A3E635]/40 text-[#15803D] flex items-center justify-center">
                        <Smile className="w-4 h-4" />
                      </span>
                      <h3 className="text-base font-black font-heading text-[#18181A]">
                        Actividades Positivas
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Glowing Green Circle 1: Percentage */}
                      <div
                        onClick={() => setActiveSection("catalogo")}
                        className="flex flex-col items-center text-center group cursor-pointer"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#86EFAC] via-[#A7F3D0] to-[#6EE7B7] shadow-[0_0_25px_rgba(110,231,183,0.6)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                          <span className="text-base font-black font-heading text-[#1B4332]">
                            {floraConservationPct > 0 ? `${floraConservationPct}%` : "85.5%"}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-600 leading-snug max-w-[130px]">
                          Flora Nativa Registrada en el Mantaro
                        </p>
                      </div>

                      {/* Glowing Green Circle 2: Target Icon */}
                      <div
                        onClick={() => setShowMissionVerification(true)}
                        className="flex flex-col items-center text-center group cursor-pointer"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#A3E635]/80 via-[#86EFAC] to-[#6EE7B7] shadow-[0_0_25px_rgba(134,239,172,0.6)] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                          <Target className="w-7 h-7 text-[#1B4332] stroke-[2.2]" />
                        </div>
                        <p className="text-xs font-bold text-slate-600 leading-snug max-w-[140px]">
                          Meta Científica ODS 15 de Conservación
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Negative Activities / Threats Mitigated */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-5">
                      <span className="w-6 h-6 rounded-lg bg-orange-200/70 text-orange-700 flex items-center justify-center">
                        <Frown className="w-4 h-4" />
                      </span>
                      <h3 className="text-base font-black font-heading text-[#18181A]">
                        Amenazas Mitigadas
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Muted Outlined Circle 1 */}
                      <div className="flex flex-col items-center text-center opacity-55 hover:opacity-100 transition-opacity">
                        <div className="w-15 h-15 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 mb-2">
                          <Flame className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 leading-tight">
                          Quema de Pastizales
                        </span>
                      </div>

                      {/* Muted Outlined Circle 2 */}
                      <div className="flex flex-col items-center text-center opacity-55 hover:opacity-100 transition-opacity">
                        <div className="w-15 h-15 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 mb-2">
                          <Axe className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 leading-tight">
                          Tala de Quinual
                        </span>
                      </div>

                      {/* Muted Outlined Circle 3 */}
                      <div className="flex flex-col items-center text-center opacity-55 hover:opacity-100 transition-opacity">
                        <div className="w-15 h-15 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 mb-2">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 leading-tight">
                          Erosión de Riberas
                        </span>
                      </div>

                      {/* Muted Outlined Circle 4 */}
                      <div className="flex flex-col items-center text-center opacity-55 hover:opacity-100 transition-opacity mt-1">
                        <div className="w-15 h-15 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 mb-2">
                          <CloudOff className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 leading-tight">
                          Estrés Hídrico Andino
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* SECCIÓN 2: MAPA SATELITAL + TAREAS Y MISIONES              */}
          {/* ========================================================== */}
          {activeSection === "mapa" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300 pb-6">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Column (8 cols): Interactive Satellite Map */}
                <div className="xl:col-span-8 flex flex-col gap-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-lg sm:text-xl font-black font-heading text-[#18181A] tracking-tight">
                        Mapa Satelital de Huancayo
                      </h2>
                      <p className="text-xs text-slate-500">
                        Explora los puntos verdes o haz clic en el mapa para registrar un nuevo ejemplar nativo.
                      </p>
                    </div>
                    <span className="text-xs font-extrabold bg-[#DFF5E3] text-[#15803D] px-3.5 py-1 rounded-full">
                      GPS Activo · Valle del Mantaro
                    </span>
                  </div>

                  <MapExplorer />
                </div>

                {/* Right Column (4 cols): Field Tasks & Active Missions */}
                <div className="xl:col-span-4 flex flex-col gap-5">
                  
                  {/* Dark Promo Card: Misión Principal Cantuta */}
                  <div className="relative bg-[#18181A] text-white rounded-[2.2rem] p-6 sm:p-7 flex flex-col justify-between min-h-[250px] overflow-hidden shadow-xl">
                    <div className="absolute -bottom-8 -right-6 w-44 h-44 pointer-events-none opacity-25">
                      <div className="w-36 h-24 rounded-2xl border border-white/60 transform rotate-[-18deg] translate-x-4 translate-y-6" />
                      <div className="w-36 h-24 rounded-2xl border border-white/40 transform rotate-[-8deg] translate-x-8 -translate-y-8" />
                    </div>

                    <div className="relative z-10">
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full mb-3">
                        Misión Destacada de Campo
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black font-heading leading-snug tracking-tight mb-2.5">
                        ¡Gana{" "}
                        <span className="inline-block px-3 py-0.5 mx-0.5 rounded-xl border border-white/60 bg-white/10 text-[#93C5FD] transform -rotate-6 text-lg sm:text-xl shadow-xs">
                          +{CURRENT_MISSION.points} pts
                        </span>{" "}
                        con la Misión Cantuta!
                      </h3>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {CURRENT_MISSION.description} Valida tu hallazgo con el código <strong className="text-white">BIOWANKA</strong>.
                      </p>
                    </div>

                    <div className="relative z-10 pt-5 mt-auto flex items-center justify-between gap-3">
                      <button
                        onClick={() => setShowMissionVerification(true)}
                        disabled={isMissionDone}
                        className={`px-5 py-3 rounded-full text-xs font-black font-heading transition-all shadow-md cursor-pointer active:scale-95 ${
                          isMissionDone
                            ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/40"
                            : "bg-[#B9D5FD] hover:bg-[#93C5FD] text-[#18181A]"
                        }`}
                      >
                        {isMissionDone ? "✓ Misión Verificada" : "Verificar Misión Ahora"}
                      </button>

                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/15 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={CURRENT_MISSION.imageUrl || "/assets/cantuta-mission.jpg"}
                          alt="Cantuta"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lista de Tareas y Objetivos Botánicos */}
                  <div className="bg-[#F4F6F9] rounded-[2rem] p-5 border border-slate-200/70">
                    <div className="flex items-center justify-between mb-3.5">
                      <h3 className="text-sm font-black font-heading text-[#18181A]">
                        Tareas de Exploración en Huancayo
                      </h3>
                      <span className="text-[11px] font-extrabold text-[#15803D] bg-[#DFF5E3] px-2.5 py-0.5 rounded-full">
                        {stats.knownPlantsCount}/{NATIVE_PLANTS.length} listas
                      </span>
                    </div>

                    <div className="flex flex-col gap-2.5 max-h-[290px] overflow-y-auto pr-1">
                      {NATIVE_PLANTS.map((plant) => {
                        const done = stats.discoveredPlantIds.includes(plant.id);
                        return (
                          <div
                            key={plant.id}
                            onClick={() => {
                              if (!done) setVerifyingPlant(plant);
                              else setSelectedPlant(plant);
                            }}
                            className="bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-[#18181A] transition-all flex items-center justify-between gap-3 cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={plant.imageUrl}
                                alt={plant.name}
                                className="w-10 h-10 rounded-xl object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-xs font-black text-[#18181A] truncate">
                                  Verificar {plant.name}
                                </p>
                                <p className="text-[10px] font-semibold text-slate-400 truncate">
                                  📍 {plant.locationHuancayo}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-black ${
                                done
                                  ? "bg-[#DFF5E3] text-[#15803D]"
                                  : "bg-slate-100 text-[#18181A]"
                              }`}
                            >
                              {done ? "✓ Hecho" : `+${plant.pointsReward} pts`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* SECCIÓN 3: MIS PROGRESOS & ESTADÍSTICAS (3 CARDS PASTEL)   */}
          {/* ========================================================== */}
          {activeSection === "estadisticas" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-black font-heading text-[#18181A] tracking-tight">
                    Tus Estadísticas e Insignias
                  </h2>
                  <p className="text-xs text-slate-500">
                    Resumen detallado de tus puntos verificados, especies descubiertas y medallas ganadas.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm("¿Reiniciar tus puntos y plantas a 0?")) {
                      resetProgress();
                    }
                  }}
                  title="Reiniciar estadísticas"
                  className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-rose-50 text-xs font-bold text-slate-600 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Reiniciar a 0</span>
                </button>
              </div>

              {/* 3 PASTEL CARDS GRID (Purple, Mint Green, Cream Yellow) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:h-[320px]">
                
                {/* CARD 1: SOFT LILAC / PURPLE (#EDE8F8) -> PUNTOS TOTALES */}
                <div className="bg-[#EDE8F8] rounded-[2rem] p-6 flex flex-col justify-between relative group hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-2xl sm:text-3xl font-black font-heading text-[#18181A] tracking-tight">
                        {stats.points} PTS
                      </span>
                      <button 
                        onClick={() => setShowMissionVerification(true)}
                        className="text-slate-500 hover:text-[#18181A] p-0.5 cursor-pointer"
                        title="Sumar puntos"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-slate-500">
                      Meta de rango: {stats.maxPoints} pts
                    </p>

                    <div className="mt-5 w-full bg-white/60 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#7C3AED] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((stats.points / stats.maxPoints) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs font-extrabold text-slate-700 mt-2.5">
                      {stats.levelName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <div className="w-11 h-11 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#18181A]">
                      <Star className="w-5 h-5 fill-[#18181A] text-[#18181A]" />
                    </div>
                    <span className="text-xs font-extrabold text-[#6D28D9]">
                      Nivel {stats.level}
                    </span>
                  </div>
                </div>

                {/* CARD 2: SOFT MINT GREEN (#DFF5E3) -> PLANTAS VERIFICADAS */}
                <div className="bg-[#DFF5E3] rounded-[2rem] p-6 flex flex-col justify-between relative group hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-2xl sm:text-3xl font-black font-heading text-[#18181A] tracking-tight">
                        {stats.knownPlantsCount} / {NATIVE_PLANTS.length}
                      </span>
                      <button 
                        onClick={() => setActiveSection("catalogo")}
                        className="text-slate-500 hover:text-[#18181A] p-0.5 cursor-pointer"
                        title="Ver catálogo"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-slate-600">
                      Flora descubierta
                    </p>

                    <p className="text-xs text-emerald-900/75 font-medium mt-4 leading-relaxed">
                      Especies nativas registradas y verificadas en el Valle del Mantaro.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <div className="w-11 h-11 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#18181A]">
                      <Sprout className="w-5 h-5 text-[#18181A] stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-extrabold text-[#15803D]">
                      +{floraConservationPct}%
                    </span>
                  </div>
                </div>

                {/* CARD 3: SOFT CREAM YELLOW (#F8F2DC) -> INSIGNIAS & LOGROS */}
                <div className="bg-[#F8F2DC] rounded-[2rem] p-6 flex flex-col justify-between relative group hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-2xl sm:text-3xl font-black font-heading text-[#18181A] tracking-tight">
                        {unlockedBadgesCount} / 4
                      </span>
                      <button 
                        onClick={() => setShowMissionVerification(true)}
                        className="text-slate-500 hover:text-[#18181A] p-0.5 cursor-pointer"
                        title="Desbloquear insignias"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-slate-600">
                      Insignias ganadas
                    </p>

                    <div className="grid grid-cols-4 gap-2 mt-5">
                      {[20, 50, 100, 200].map((reqPts, idx) => {
                        const unlocked = stats.points >= reqPts;
                        return (
                          <div
                            key={idx}
                            title={`Requiere ${reqPts} pts`}
                            className={`h-8 rounded-xl flex items-center justify-center border ${
                              unlocked
                                ? "bg-amber-400/30 border-amber-500 text-[#18181A]"
                                : "bg-white/50 border-stone-300/70 text-stone-400"
                            }`}
                          >
                            {unlocked ? (
                              <CheckCircle2 className="w-4 h-4 text-amber-700" />
                            ) : (
                              <Lock className="w-3.5 h-3.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <div className="w-11 h-11 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#18181A]">
                      <Trophy className="w-5 h-5 text-[#18181A] stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-extrabold text-[#B45309]">
                      +{stats.completedMissionsCount} misiones
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* SECCIÓN 4: CATÁLOGO DE FLORA NATIVA                        */}
          {/* ========================================================== */}
          {activeSection === "catalogo" && (
            <div id="catalogo-plantas" className="flex flex-col justify-between pt-1 pb-6 animate-in fade-in duration-300">
              
              {/* Table Header & Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg sm:text-xl font-black font-heading text-[#18181A] tracking-tight">
                    Catálogo de Flora Nativa ({filteredPlants.length})
                  </h3>
                </div>

                {/* Pill Dropdown Filters */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      value={rarityFilter}
                      onChange={(e) => setRarityFilter(e.target.value as "all" | "emblemática" | "nativa")}
                      aria-label="Filtrar por categoría"
                      className="appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-full pl-3.5 pr-8 py-1.5 text-xs font-extrabold text-[#18181A] cursor-pointer focus:outline-hidden"
                    >
                      <option value="all">Todas las especies</option>
                      <option value="emblemática">Emblemáticas</option>
                      <option value="nativa">Nativas Andinas</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as "all" | "discovered" | "pending")}
                      aria-label="Filtrar por estado"
                      className="appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-full pl-3.5 pr-8 py-1.5 text-xs font-extrabold text-[#18181A] cursor-pointer focus:outline-hidden"
                    >
                      <option value="all">Estado: Todos</option>
                      <option value="discovered">Verificadas</option>
                      <option value="pending">Por verificar</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Clean Minimalist List / Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400">
                      <th className="pb-3 font-semibold">Especie</th>
                      <th className="pb-3 font-semibold hidden sm:table-cell">Ubicación en Huancayo</th>
                      <th className="pb-3 font-semibold">Recompensa</th>
                      <th className="pb-3 font-semibold hidden md:table-cell">Categoría</th>
                      <th className="pb-3 font-semibold text-right">Verificar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80 text-xs sm:text-sm">
                    {filteredPlants.map((plant) => {
                      const isDiscovered = stats.discoveredPlantIds.includes(plant.id);

                      return (
                        <tr
                          key={plant.id}
                          onClick={() => setSelectedPlant(plant)}
                          className="group hover:bg-slate-50/90 transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 pr-3">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-2xl bg-[#18181A] p-0.5 overflow-hidden shrink-0 shadow-xs relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={plant.imageUrl}
                                  alt={plant.name}
                                  className="w-full h-full object-cover rounded-[14px] group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div>
                                <p className="font-black font-heading text-[#18181A] text-sm leading-tight">
                                  {plant.name}
                                </p>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                  {plant.scientificName}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 hidden sm:table-cell font-bold text-slate-600 text-xs">
                            {plant.locationHuancayo}
                          </td>

                          <td className="py-3.5 px-3 font-extrabold text-[#16A34A] text-xs sm:text-sm">
                            +{plant.pointsReward} pts
                          </td>

                          <td className="py-3.5 px-3 hidden md:table-cell font-extrabold text-[#18181A] text-xs">
                            {plant.category}
                          </td>

                          <td
                            className="py-3.5 pl-3 text-right"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isDiscovered) {
                                setVerifyingPlant(plant);
                              } else {
                                setSelectedPlant(plant);
                              }
                            }}
                          >
                            <button
                              title={isDiscovered ? "Especie verificada" : "Verificar avistamiento"}
                              className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border transition-all cursor-pointer ${
                                isDiscovered
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                  : "bg-white border-slate-200 text-slate-400 hover:text-[#18181A] hover:border-slate-400"
                              }`}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  isDiscovered ? "fill-emerald-500 text-emerald-500" : ""
                                }`}
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* SECCIÓN 5: COMUNIDAD & TOP RANGOS (VISTA DEDICADA)         */}
          {/* ========================================================== */}
          {activeSection === "comunidad" && (
            <div className="pb-6">
              <CommunitySection variant="dashboard" />
            </div>
          )}

          {/* ========================================================== */}
          {/* SECCIÓN 6: JUEGA Y APRENDE · MINIJUEGOS (VISTA DEDICADA)   */}
          {/* ========================================================== */}
          {activeSection === "juega" && (
            <div className="pb-6">
              <GamesSection variant="dashboard" />
            </div>
          )}

        </main>

        {/* BOTTOM FULL-WIDTH LIME GREEN STATUS BAR (Idéntico a la imagen de referencia) */}
        <footer className="w-full bg-gradient-to-r from-[#D9F99D] via-[#A3E635] to-[#86EFAC] px-6 sm:px-10 py-3.5 flex flex-wrap items-center justify-between gap-2 text-[#1B4332]">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
            <span className="font-mono text-base leading-none">;-)</span>
            <span>
              Esta comunidad genera un impacto positivo directo en los ecosistemas andinos de Huancayo.
            </span>
          </div>
          <button
            onClick={() => setActiveSection("mapa")}
            className="text-xs font-black underline hover:text-black cursor-pointer"
          >
            Ir al Mapa & Misiones →
          </button>
        </footer>

      </div>

      {/* ============================================================ */}
      {/* MODALS: PLANT SHEET & MULTIMODAL VERIFICATION (z-99999)      */}
      {/* ============================================================ */}

      {/* 1. Modal de Ficha Botánica */}
      {selectedPlant && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-6 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setSelectedPlant(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPlant.imageUrl}
                  alt={selectedPlant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-[#DFF5E3] px-2.5 py-1 rounded-full">
                  {selectedPlant.category}
                </span>
                <h3 className="text-xl font-black font-heading text-[#18181A] mt-1.5">
                  {selectedPlant.name}
                </h3>
                <p className="text-xs italic text-slate-500">
                  {selectedPlant.scientificName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {selectedPlant.description}
            </p>

            <div className="bg-[#F4F6F9] p-3.5 rounded-2xl mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-3.5 h-3.5 text-[#18181A]" />
                <span className="text-[11px] font-extrabold text-[#18181A]">
                  Hábitat en Huancayo:
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {selectedPlant.locationHuancayo}
              </p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <span className="text-xs font-black text-[#16A34A]">
                +{selectedPlant.pointsReward} pts por avistamiento
              </span>

              <div className="flex gap-2">
                {!stats.discoveredPlantIds.includes(selectedPlant.id) && (
                  <button
                    onClick={() => {
                      setVerifyingPlant(selectedPlant);
                      setSelectedPlant(null);
                    }}
                    className="bg-[#18181A] hover:bg-zinc-800 text-white px-4 py-2 rounded-full text-xs font-black font-heading shadow-xs active:scale-95 transition-transform cursor-pointer"
                  >
                    Verificar Avistamiento
                  </button>
                )}
                <button
                  onClick={() => setSelectedPlant(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-xs font-black font-heading active:scale-95 cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal de Verificación para Planta del Catálogo */}
      {verifyingPlant && (
        <VerificationModal
          isOpen={Boolean(verifyingPlant)}
          onClose={() => setVerifyingPlant(null)}
          objective={{
            id: `plant-cat-${verifyingPlant.id}`,
            title: `Avistamiento de ${verifyingPlant.name}`,
            description: verifyingPlant.description,
            points: verifyingPlant.pointsReward || 25,
            expectedCode: "BIOWANKA",
            plantId: verifyingPlant.id,
            question: {
              q: `¿Cuál es el rol ecológico de ${verifyingPlant.name} en el Valle del Mantaro?`,
              options: [
                "Especie nativa adaptada a los ecosistemas andinos de Junín",
                "Alga marina de aguas profundas",
                "Árbol exclusivo de la selva amazónica baja",
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

      {/* 3. Modal de Verificación para la Misión Principal (Cantuta Promo Card) */}
      {showMissionVerification && (
        <VerificationModal
          isOpen={showMissionVerification}
          onClose={() => setShowMissionVerification(false)}
          objective={{
            id: CURRENT_MISSION.id,
            title: CURRENT_MISSION.title,
            description: CURRENT_MISSION.description,
            points: CURRENT_MISSION.points,
            expectedCode: "BIOWANKA",
            plantId: "cantuta",
            question: {
              q: "¿En qué lugar de Huancayo es común observar la flor de la Cantuta?",
              options: [
                "En el Cerrito de la Libertad y Parque de la Identidad Wanka",
                "En medio de las aguas del río Mantaro",
                "En dunas desérticas costeras",
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
}
