"use client";

import React, { useState } from "react";
import { 
  Trophy, 
  Star, 
  Sprout, 
  MapPin, 
  ShieldCheck, 
  Crown,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  X,
  Calendar
} from "lucide-react";
import { useGame } from "@/context/GameContext";

export interface CommunityMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  district: string;
  rankTitle: string;
  rankTier: "maestro" | "protector" | "explorador" | "mentor";
  points: number;
  plantsVerified: number;
  badgesCount: number;
  bannerBg: string;
  avatarUrl: string;
  featuredSpecies: string;
  bio: string;
  joinedDate: string;
  isCurrentUser?: boolean;
}

const INITIAL_COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: "member-1",
    name: "Mateo Quispealaya",
    role: "Líder de Brigada Ecológica",
    institution: "Colegio Santa Isabel",
    district: "Huancayo Centro",
    rankTitle: "Maestro Guardián Wanka",
    rankTier: "maestro",
    points: 245,
    plantsVerified: 5,
    badgesCount: 4,
    bannerBg: "bg-gradient-to-br from-[#F8F2DC] via-[#FDE68A]/50 to-[#F3E5AB]",
    avatarUrl: "/assets/avatar-mateo.jpg",
    featuredSpecies: "Quinual (Polylepis)",
    bio: "Coordinador estudiantil de monitoreo de bosques altoandinos en Torre Torre y Ocopilla.",
    joinedDate: "Marzo 2026",
  },
  {
    id: "member-2",
    name: "Valeria Chamorro",
    role: "Investigadora Escolar",
    institution: "I.E. Nuestra Señora del Rosario",
    district: "El Tambo",
    rankTitle: "Maestro Guardián Wanka",
    rankTier: "maestro",
    points: 210,
    plantsVerified: 5,
    badgesCount: 4,
    bannerBg: "bg-gradient-to-br from-[#EDE8F8] via-[#DDD6FE]/60 to-[#E0E7FF]",
    avatarUrl: "/assets/member-valeria.svg",
    featuredSpecies: "Cantuta Sagrada",
    bio: "Especialista en registro fotográfico y catalogación de arbustos florales nativos del Mantaro.",
    joinedDate: "Marzo 2026",
  },
  {
    id: "member-3",
    name: "Prof. Carlos Huaylinos",
    role: "Docente Mentor Ambiental",
    institution: "Red de Docentes del Mantaro",
    district: "San Carlos · Huancayo",
    rankTitle: "Mentor Científico",
    rankTier: "mentor",
    points: 195,
    plantsVerified: 5,
    badgesCount: 4,
    bannerBg: "bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD]/50 to-[#DBEAFE]",
    avatarUrl: "/assets/member-carlos.svg",
    featuredSpecies: "Colli Protector",
    bio: "Biólogo y docente asesor en proyectos de ciencia ciudadana y conservación de cuencas en el río Shullcas.",
    joinedDate: "Febrero 2026",
  },
  {
    id: "member-4",
    name: "Sebastián Inga",
    role: "Monitor de Reforestación",
    institution: "Colegio Salesiano Santa Rosa",
    district: "El Tambo",
    rankTitle: "Protector de Bosques",
    rankTier: "protector",
    points: 165,
    plantsVerified: 4,
    badgesCount: 3,
    bannerBg: "bg-gradient-to-br from-[#DFF5E3] via-[#BBF7D0]/50 to-[#D1FAE5]",
    avatarUrl: "/assets/member-sebastian.svg",
    featuredSpecies: "Quishuar Andino",
    bio: "Guardián activo del Parque de la Identidad Wanka y promotor de viveros escolares.",
    joinedDate: "Abril 2026",
  },
  {
    id: "member-5",
    name: "Luciana Párraga",
    role: "Voluntaria de Campo",
    institution: "I.E. Politécnico Regional del Centro",
    district: "Chilca",
    rankTitle: "Protector de Bosques",
    rankTier: "protector",
    points: 135,
    plantsVerified: 3,
    badgesCount: 3,
    bannerBg: "bg-gradient-to-br from-[#FCE7F3] via-[#FBCFE8]/50 to-[#FFE4E6]",
    avatarUrl: "/assets/member-luciana.svg",
    featuredSpecies: "Muña Silvestre",
    bio: "Investigadora de plantas medicinales y aromáticas tradicionales del sur de Huancayo.",
    joinedDate: "Abril 2026",
  },
  {
    id: "member-6",
    name: "Diego Vilcapoma",
    role: "Explorador Botánico",
    institution: "Colegio Claretiano",
    district: "San Antonio",
    rankTitle: "Explorador Verde",
    rankTier: "explorador",
    points: 85,
    plantsVerified: 2,
    badgesCount: 2,
    bannerBg: "bg-gradient-to-br from-[#E0E7FF] via-[#C7D2FE]/50 to-[#EDE9FE]",
    avatarUrl: "/assets/member-diego.svg",
    featuredSpecies: "Cantuta Sagrada",
    bio: "Apasionado por la cartografía satelital y el mapeo de especies nativas en parques urbanos.",
    joinedDate: "Mayo 2026",
  },
];

interface CommunitySectionProps {
  variant?: "dashboard" | "landing";
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ variant = "dashboard" }) => {
  const { currentUser, stats } = useGame();
  const [selectedFilter, setSelectedFilter] = useState<"todos" | "maestro" | "protector" | "mentor">("todos");
  const [selectedMemberModal, setSelectedMemberModal] = useState<CommunityMember | null>(null);

  // Calculate current user unlocked badges
  const userBadgesCount = [
    stats.points >= 20,
    stats.points >= 50,
    stats.points >= 100,
    stats.points >= 200,
  ].filter(Boolean).length;

  const userRankTier: CommunityMember["rankTier"] =
    stats.points >= 200
      ? "maestro"
      : stats.points >= 120
      ? "protector"
      : "explorador";

  // Build dynamic member entry for logged-in user (Geraldine)
  const currentUserMember: CommunityMember = {
    id: "current-user-geraldine",
    name: currentUser?.name || "Geraldine Huamán",
    role: "Exploradora Activa (Tú)",
    institution: currentUser?.school || "Colegio Santa Isabel - Huancayo",
    district: "Huancayo Centro",
    rankTitle: stats.levelName,
    rankTier: userRankTier,
    points: stats.points,
    plantsVerified: stats.knownPlantsCount,
    badgesCount: userBadgesCount,
    bannerBg: "bg-gradient-to-br from-[#DFF5E3] via-[#A7F3D0]/60 to-[#E7F4E4]",
    avatarUrl: currentUser?.avatarUrl || "/assets/avatar-geraldine.png",
    featuredSpecies: stats.knownPlantsCount > 0 ? "Cantuta Verificada" : "En expedición activa",
    bio: "Estudiante exploradora de BioWanka verificando la biodiversidad nativa de Huancayo en tiempo real.",
    joinedDate: "Mayo 2026",
    isCurrentUser: true,
  };

  // Combine and sort by points descending (Top Rank Leaderboard)
  const allMembers = [...INITIAL_COMMUNITY_MEMBERS, currentUserMember].sort(
    (a, b) => b.points - a.points
  );

  const filteredMembers = allMembers.filter(
    (m) => selectedFilter === "todos" || m.rankTier === selectedFilter
  );

  const getRankBadgeStyle = (tier: CommunityMember["rankTier"]) => {
    switch (tier) {
      case "maestro":
        return "bg-[#F8F2DC] text-[#92400E] border-amber-300";
      case "protector":
        return "bg-[#DFF5E3] text-[#166534] border-emerald-300";
      case "mentor":
        return "bg-[#EDE8F8] text-[#5B21B6] border-purple-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <section
      id="comunidad-guardianes"
      className={
        variant === "landing"
          ? "w-full bg-[#FAFAFA] border-t border-slate-100 py-14 sm:py-20 px-4 sm:px-8 animate-in fade-in duration-300"
          : "w-full animate-in fade-in duration-300"
      }
    >
      <div className={variant === "landing" ? "max-w-6xl mx-auto" : "w-full"}>
        
        {/* Top Summary Banner + Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8F8] text-[#6D28D9] text-[10px] font-black uppercase tracking-widest mb-2.5">
              <Users className="w-3.5 h-3.5" />
              <span>Comunidad BioWanka · Top Rangos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#18181A] tracking-tight">
              Guardianes y Miembros Destacados
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Conoce a los estudiantes, voluntarios y docentes mentores que lideran la conservación botánica en el Valle del Mantaro.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "todos", label: "Todos" },
              { id: "maestro", label: "Top Maestros" },
              { id: "protector", label: "Protectores" },
              { id: "mentor", label: "Mentores" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-[#18181A] text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#18181A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* AVATAR-CENTRIC PROFILE CARDS GRID                            */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => {
            const rankPosition = allMembers.findIndex((m) => m.id === member.id) + 1;
            const isTopThree = rankPosition <= 3;

            return (
              <div
                key={member.id}
                onClick={() => setSelectedMemberModal(member)}
                className={`group relative rounded-[2.2rem] bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${
                  member.isCurrentUser
                    ? "border-2 border-[#1D5B34] shadow-[0_14px_35px_rgba(29,91,52,0.12)]"
                    : "border border-slate-200/90 hover:border-slate-300 shadow-[0_8px_28px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                }`}
              >
                {/* 1. Top Decorative Banner Header */}
                <div className={`relative h-28 w-full ${member.bannerBg} px-5 pt-4 flex items-start justify-between`}>
                  {/* Rank Position Pill (#1, #2, #3...) */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black font-heading shadow-xs ${
                      rankPosition === 1
                        ? "bg-[#18181A] text-[#F8F2DC]"
                        : rankPosition === 2
                        ? "bg-slate-800 text-white"
                        : rankPosition === 3
                        ? "bg-amber-900 text-amber-100"
                        : "bg-white/90 backdrop-blur-xs text-[#18181A]"
                    }`}
                  >
                    {isTopThree && <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                    <span>Top #{rankPosition}</span>
                  </div>

                  {/* Rank Category Badge */}
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${getRankBadgeStyle(
                      member.rankTier
                    )}`}
                  >
                    {member.rankTitle}
                  </span>
                </div>

                {/* 2. Prominent Centered Avatar Overlapping the Banner */}
                <div className="px-6 pb-6 flex-1 flex flex-col items-center text-center -mt-14 relative z-10">
                  <div className="relative mb-3">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-white p-1.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-[1.6rem] overflow-hidden bg-slate-100 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Verified Check Badge on Avatar Corner */}
                    <span
                      title="Guardián Verificado"
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#18181A] text-white flex items-center justify-center ring-3 ring-white shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                    </span>
                  </div>

                  {/* Member Name & Role */}
                  <h3 className="text-lg font-black font-heading text-[#18181A] group-hover:text-[#1D5B34] transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-extrabold text-[#1D5B34] mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 flex items-center justify-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate max-w-[210px]">{member.institution}</span>
                  </p>

                  {/* Short Bio */}
                  <p className="text-xs text-slate-500 leading-relaxed mt-3 line-clamp-2">
                    {member.bio}
                  </p>

                  {/* Featured Plant Pill */}
                  <div className="mt-3.5 inline-flex items-center gap-1.5 bg-slate-100/90 px-3 py-1 rounded-full text-[11px] font-bold text-slate-700">
                    <Sprout className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Planta insignia: {member.featuredSpecies}</span>
                  </div>

                  {/* 3. Bottom Metrics Bar (Points | Plants | Badges) */}
                  <div className="w-full grid grid-cols-3 gap-2 pt-4 mt-5 border-t border-slate-100">
                    <div className="flex flex-col items-center bg-[#FAFAFA] rounded-2xl py-2 px-1">
                      <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-heading text-[#18181A]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{member.points}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Puntos</span>
                    </div>

                    <div className="flex flex-col items-center bg-[#FAFAFA] rounded-2xl py-2 px-1">
                      <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-heading text-[#15803D]">
                        <Sprout className="w-3.5 h-3.5" />
                        <span>{member.plantsVerified}/5</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Flora</span>
                    </div>

                    <div className="flex flex-col items-center bg-[#FAFAFA] rounded-2xl py-2 px-1">
                      <div className="flex items-center gap-1 text-xs sm:text-sm font-black font-heading text-[#6D28D9]">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{member.badgesCount}/4</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Logros</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Member Detail Modal when clicking any card */}
        {selectedMemberModal && (
          <div className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] max-w-md w-full overflow-hidden border border-slate-200 shadow-2xl relative">
              <div className={`h-28 w-full ${selectedMemberModal.bannerBg} relative`}>
                <button
                  onClick={() => setSelectedMemberModal(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#18181A] flex items-center justify-center shadow-md transition-transform cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-6 pb-6 -mt-14 flex flex-col items-center text-center relative z-10">
                <div className="w-28 h-28 rounded-[2rem] bg-white p-1.5 shadow-xl mb-3">
                  <div className="w-full h-full rounded-[1.6rem] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedMemberModal.avatarUrl}
                      alt={selectedMemberModal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border mb-2 ${getRankBadgeStyle(
                    selectedMemberModal.rankTier
                  )}`}
                >
                  {selectedMemberModal.rankTitle}
                </span>

                <h3 className="text-xl font-black font-heading text-[#18181A]">
                  {selectedMemberModal.name}
                </h3>
                <p className="text-xs font-bold text-[#1D5B34]">{selectedMemberModal.role}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedMemberModal.institution} · {selectedMemberModal.district}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed my-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {selectedMemberModal.bio}
                </p>

                <div className="w-full flex items-center justify-between text-xs text-slate-500 px-2 mb-5">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Miembro desde {selectedMemberModal.joinedDate}
                  </span>
                  <span className="font-extrabold text-[#18181A]">
                    {selectedMemberModal.points} pts verificados
                  </span>
                </div>

                <button
                  onClick={() => setSelectedMemberModal(null)}
                  className="w-full py-3 rounded-full bg-[#18181A] hover:bg-zinc-800 text-white text-xs font-black font-heading transition-colors cursor-pointer"
                >
                  Cerrar perfil de guardián
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
