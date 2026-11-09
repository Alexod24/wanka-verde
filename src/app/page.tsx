import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MissionsSection } from "@/components/MissionsSection";
import { FooterBanner } from "@/components/FooterBanner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6EE]">
      {/* 1. Header / Navbar */}
      <Navbar activeRoute="inicio" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Retos & Misiones Section */}
        <MissionsSection />
      </main>

      {/* 4. Footer Banner */}
      <FooterBanner />
    </div>
  );
}
