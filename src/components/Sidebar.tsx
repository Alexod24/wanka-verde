"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sprout, 
  Home, 
  Compass, 
  Gamepad2, 
  Trophy, 
  TreePine, 
  GraduationCap 
} from "lucide-react";

interface SidebarProps {
  onNavClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavClick }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Inicio",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      title: "Explora",
      href: "/explora",
      icon: Compass,
      isActive: pathname === "/explora",
    },
    {
      title: "Juega",
      href: "/explora#juega",
      icon: Gamepad2,
      isActive: false,
    },
    {
      title: "Mis Logros",
      href: "/explora#logros",
      icon: Trophy,
      isActive: false,
    },
    {
      title: "Mi Jardín",
      href: "/explora#jardin",
      icon: TreePine,
      isActive: false,
    },
    {
      title: "Docentes",
      href: "/explora#docentes",
      icon: GraduationCap,
      isActive: false,
    },
  ];

  return (
    <aside className="w-56 shrink-0 bg-[#254523] text-white min-h-screen p-4 flex flex-col justify-between select-none">
      <div>
        {/* Logo Wanka-Tuta */}
        <Link 
          href="/" 
          className="flex flex-col items-center justify-center pt-2 pb-6 group cursor-pointer text-center"
          onClick={onNavClick}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2 border border-white/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-8 h-8 text-[#A7F3D0]" />
          </div>
          <span className="text-xl font-black font-heading tracking-tight leading-tight">
            Wanka-
          </span>
          <span className="text-xl font-black font-heading text-[#A7F3D0] tracking-tight leading-tight">
            Tuta
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onNavClick}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-black font-heading transition-all duration-200 ${
                  active
                    ? "bg-[#3E7E36] text-white shadow-md translate-x-1"
                    : "text-emerald-100/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-white" : "text-emerald-300"}`} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Sidebar */}
      <div className="pt-6 border-t border-white/10 text-center">
        <div className="bg-black/20 rounded-2xl p-2.5">
          <p className="text-[11px] font-bold text-emerald-200/90 leading-tight">
            Huancayo Verde 🌱
          </p>
          <p className="text-[10px] text-emerald-300/70 mt-0.5">
            Colegios del Mantaro
          </p>
        </div>
      </div>
    </aside>
  );
};

