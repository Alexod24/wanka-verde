"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Sprout, 
  LayoutGrid, 
  Compass, 
  BarChart3, 
  Box, 
  LogOut,
  Home,
  ChevronRight,
  ChevronLeft,
  Users,
  Gamepad2
} from "lucide-react";
import { useGame } from "@/context/GameContext";

interface SidebarProps {
  onNavClick?: () => void;
  activeSection?: string;
  onSelectSection?: (sec: string) => void;
  forceExpanded?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onNavClick, 
  activeSection = "overview",
  onSelectSection,
  forceExpanded = false
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useGame();

  // Allows both hover expansion and manual pin/toggle
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const isExpanded = forceExpanded || isHovered || isPinned;

  const navItems = [
    {
      id: "overview",
      label: "Resumen General",
      icon: LayoutGrid,
      isExternal: false,
    },
    {
      id: "mapa",
      label: "Mapa & Misiones",
      icon: Compass,
      isExternal: false,
    },
    {
      id: "estadisticas",
      label: "Mis Progresos",
      icon: BarChart3,
      isExternal: false,
    },
    {
      id: "catalogo",
      label: "Catálogo Nativo",
      icon: Box,
      isExternal: false,
    },
    {
      id: "comunidad",
      label: "Comunidad & Rangos",
      icon: Users,
      isExternal: false,
    },
    {
      id: "juega",
      label: "Juega y Aprende",
      icon: Gamepad2,
      isExternal: false,
    },
    {
      id: "perfil",
      label: "Inicio / Portada",
      icon: Home,
      isExternal: true,
      href: "/",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-[#18181A] text-white h-full flex flex-col justify-between py-6 px-3 select-none shrink-0 transition-all duration-300 ease-in-out z-30 ${
        isExpanded ? "w-60" : "w-20"
      }`}
    >
      {/* Toggle Pin Button on the right edge (Desktop) */}
      {!forceExpanded && (
        <button
          onClick={() => setIsPinned(!isPinned)}
          title={isPinned ? "Contraer barra lateral" : "Fijar barra lateral abierta"}
          className="hidden md:flex absolute -right-3 top-9 w-6 h-6 rounded-full bg-[#27272A] hover:bg-[#F4EFE0] text-zinc-300 hover:text-[#18181A] border border-zinc-700 items-center justify-center shadow-md transition-all cursor-pointer z-40"
        >
          {isExpanded ? (
            <ChevronLeft className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </button>
      )}

      {/* Top: Cream rounded square logo icon + Sliding Brand Name */}
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center px-1">
          <Link
            href="/"
            onClick={onNavClick}
            title="BioWanka · Inicio"
            className="flex items-center gap-3.5 group overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F4EFE0] text-[#18181A] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Sprout className="w-6 h-6 text-[#202B1D] stroke-[2.4]" />
            </div>

            <div
              className={`flex flex-col whitespace-nowrap transition-all duration-300 ${
                isExpanded
                  ? "opacity-100 translate-x-0 w-auto"
                  : "opacity-0 -translate-x-3 w-0 pointer-events-none"
              }`}
            >
              <span className="text-lg font-black font-heading tracking-tight text-white leading-tight">
                Bio<span className="text-[#A7F3D0]">Wanka</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Huancayo · Perú
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation Items */}
        <nav className="flex flex-col gap-2.5 w-full mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeSection === item.id ||
              (item.id === "overview" && pathname === "/explora" && !activeSection);

            const itemClasses = `relative h-11 rounded-2xl flex items-center transition-all duration-200 group overflow-hidden px-3 ${
              isActive
                ? "bg-white/14 text-white shadow-xs"
                : "text-zinc-400 hover:text-white hover:bg-white/6"
            }`;

            const content = (
              <>
                {isActive && (
                  <span className="absolute left-0 w-1 h-5 bg-[#F4EFE0] rounded-r-full" />
                )}
                <div className="w-5 h-5 flex items-center justify-center shrink-0 ml-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-3.5 text-xs font-extrabold font-heading tracking-wide whitespace-nowrap transition-all duration-300 ${
                    isExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 pointer-events-none"
                  }`}
                >
                  {item.label}
                </span>
              </>
            );

            if (!item.isExternal) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectSection?.(item.id);
                    onNavClick?.();
                  }}
                  title={!isExpanded ? item.label : undefined}
                  className={`${itemClasses} w-full text-left cursor-pointer`}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href || "/"}
                onClick={onNavClick}
                title={!isExpanded ? item.label : undefined}
                className={itemClasses}
              >
                {content}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Logout Button */}
      <div className="flex flex-col w-full pt-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          title={!isExpanded ? "Cerrar sesión" : undefined}
          className="h-11 rounded-2xl flex items-center px-3 text-zinc-400 hover:text-rose-400 hover:bg-white/6 transition-colors cursor-pointer overflow-hidden w-full"
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0 ml-0.5">
            <LogOut className="w-5 h-5" />
          </div>
          <span
            className={`ml-3.5 text-xs font-extrabold font-heading tracking-wide whitespace-nowrap transition-all duration-300 ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none"
            }`}
          >
            Cerrar sesión
          </span>
        </button>
      </div>
    </aside>
  );
};
