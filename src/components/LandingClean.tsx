"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sprout, 
  MapPin, 
  ArrowRight, 
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Compass,
  BookOpen,
  Award,
  TreePine,
  Menu,
  X
} from "lucide-react";
import { useGame } from "@/context/GameContext";
import { CommunitySection } from "@/components/CommunitySection";
import { GamesSection } from "@/components/GamesSection";

interface FeatureCard {
  id: string;
  category: "valle" | "especies" | "comunidad";
  tag: string;
  title: string;
  subtitle: string;
  scientificName: string;
  points: string;
  image: string;
  linkText: string;
  href: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "quinual-ancestral",
    category: "especies",
    tag: "Árbol Sagrado",
    title: "El Bosque de Quinuales",
    scientificName: "Polylepis racemosa",
    points: "+35 pts",
    subtitle: "El árbol milenario que cosecha el agua de las nubes y regula los manantiales en las alturas del Huaytapallana.",
    image: "/assets/quinual.jpg",
    linkText: "Explorar en el mapa",
    href: "/explora",
  },
  {
    id: "cantuta-sagrada",
    category: "especies",
    tag: "Flor Imperial",
    title: "La Flor de la Cantuta",
    scientificName: "Cantua buxifolia",
    points: "+20 pts",
    subtitle: "Emblema del antiguo Perú y medicina ancestral. Identifica sus ejemplares floreciendo en el Cerrito de la Libertad.",
    image: "/assets/cantuta.jpg",
    linkText: "Iniciar misión botánica",
    href: "/explora",
  },
  {
    id: "quishuar-protector",
    category: "valle",
    tag: "Barrera Biológica",
    title: "Quishuar de los Andes",
    scientificName: "Buddleja coriacea",
    points: "+30 pts",
    subtitle: "Guardián de suelos contra la erosión andina, madera noble y refugio de colibríes en el Parque de la Identidad.",
    image: "/assets/quishuar.jpg",
    linkText: "Ver geolocalización",
    href: "/explora",
  },
  {
    id: "muna-andina",
    category: "especies",
    tag: "Aromática & Salud",
    title: "El Secreto de la Muña",
    scientificName: "Minthostachys mollis",
    points: "+15 pts",
    subtitle: "Planta silvestre con aceites esenciales únicos para aliviar el mal de altura y proteger los cultivos del Mantaro.",
    image: "/assets/muna.jpg",
    linkText: "Ver ficha botánica",
    href: "/explora",
  },
  {
    id: "colli-andino",
    category: "valle",
    tag: "Ecosistema Altoandino",
    title: "El Colli Protector",
    scientificName: "Buddleja incana",
    points: "+25 pts",
    subtitle: "Árbol resistente a las heladas y vientos de quebrada, fundamental para la reforestación ribereña del río Shullcas.",
    image: "/assets/colli.jpg",
    linkText: "Descubrir hábitat",
    href: "/explora",
  },
  {
    id: "ciencia-ciudadana",
    category: "comunidad",
    tag: "Ciencia Ciudadana",
    title: "Guardianes de Huancayo",
    scientificName: "Red Escolar Wanka",
    points: "+50 pts",
    subtitle: "Únete a estudiantes y docentes registrando avistamientos de flora nativa con coordenadas satelitales y validación QR.",
    image: "/assets/reto-flora.jpg",
    linkText: "Sumarme a la red",
    href: "/explora",
  },
];

export const LandingClean: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "especies" | "valle" | "comunidad">("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("inicio");
  const [landingView, setLandingView] = useState<"home" | "comunidad" | "juega">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, stats } = useGame();

  // Detect scroll for navbar floating transition and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);

      if (landingView === "comunidad") {
        setActiveNav("comunidad-guardianes");
        return;
      }
      if (landingView === "juega") {
        setActiveNav("seccion-juega");
        return;
      }

      const sections = ["resultados", "especies", "aprende"];
      let found = "inicio";
      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            found = secId;
            break;
          }
        }
      }
      setActiveNav(found);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [landingView]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveNav(id);

    if (id === "comunidad-guardianes") {
      setLandingView("comunidad");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "seccion-juega") {
      setLandingView("juega");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (landingView !== "home") {
      setLandingView("home");
      setTimeout(() => {
        if (id === "inicio") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -84;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 60);
      return;
    }

    if (id === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -84;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const filteredCards = FEATURE_CARDS.filter(
    (card) => activeTab === "all" || card.category === activeTab
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#18181A] selection:bg-[#1E4D2B] selection:text-white flex flex-col font-sans antialiased">
      
      {/* ============================================================ */}
      {/* 1. TOP MINIMALIST HEADER CON DESLIZAMIENTO FLUIDO (Sticky/Floating) */}
      {/* ============================================================ */}
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 px-4 sm:px-8 bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-b border-slate-200/70"
            : "py-5 px-5 sm:px-10 lg:px-16 bg-white/95 backdrop-blur-md border-b border-slate-100/80"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Clean Bold Wordmark Logo */}
          <a
            href="#inicio"
            onClick={(e) => scrollToSection(e, "inicio")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#18181A] flex items-center justify-center transition-transform group-hover:scale-105">
              <Sprout className="w-4 h-4 text-[#F4EFE0]" />
            </div>
            <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-[#18181A] group-hover:text-[#1D5B34] transition-colors">
              BioWanka
            </span>
          </a>

          {/* Center: Sliding Pill Navigation Links ("Learn · Results · Services" style) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "aprende", label: "Aprende" },
              { id: "especies", label: "Especies" },
              { id: "seccion-juega", label: "Juega" },
              { id: "comunidad-guardianes", label: "Comunidad" },
              { id: "resultados", label: "Impacto" },
            ].map((item) => {
              const active = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-[#18181A] text-white shadow-xs scale-[1.02]"
                      : "text-slate-500 hover:text-[#18181A] hover:bg-white/60"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <Link
              href="/explora"
              className="px-4 py-1.5 rounded-full text-xs font-extrabold text-[#1D5B34] hover:bg-[#DFF5E3]/70 transition-all duration-200"
            >
              Mapa Satelital
            </Link>
          </nav>

          {/* Right: Solid Black Pill Button + Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <Link
                href="/explora"
                className="inline-flex items-center gap-2 bg-[#18181A] hover:bg-zinc-800 text-white px-4 sm:px-5 py-2.5 rounded-full text-xs font-extrabold tracking-tight transition-all shadow-xs active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Dashboard ({stats.points} pts)</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-block text-xs font-bold text-slate-600 hover:text-[#18181A] px-3 py-2 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/explora"
                  className="inline-flex items-center justify-center bg-[#18181A] hover:bg-zinc-800 text-white px-4 sm:px-6 py-2.5 rounded-full text-xs font-extrabold tracking-tight transition-all shadow-xs active:scale-95"
                >
                  Comenzar ahora
                </Link>
              </>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú de navegación"
              className="md:hidden w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#18181A] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Sliding Drawer Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-80 opacity-100 pt-4 pb-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-3xl border border-slate-200/80">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "aprende", label: "Aprende · Metodología" },
              { id: "especies", label: "Especies Nativas" },
              { id: "seccion-juega", label: "Juega · Minijuegos" },
              { id: "comunidad-guardianes", label: "Comunidad & Top Rangos" },
              { id: "resultados", label: "Impacto · ODS 15" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-colors ${
                  activeNav === item.id
                    ? "bg-[#18181A] text-white"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="h-[1px] bg-slate-200 my-1" />
            <div className="flex items-center gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-full border border-slate-300 text-xs font-extrabold text-[#18181A]"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/explora"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-full bg-[#1D5B34] text-white text-xs font-extrabold"
              >
                Mapa Satelital
              </Link>
            </div>
          </div>
        </div>
      </header>

      {landingView === "comunidad" ? (
        <main className="flex-1 flex flex-col bg-[#FAFAFA] animate-in fade-in duration-300">
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 pt-6">
            <button
              onClick={() => {
                setLandingView("home");
                setActiveNav("inicio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-[#18181A] bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <span>← Volver a la portada principal</span>
            </button>
          </div>
          <CommunitySection variant="landing" />
        </main>
      ) : landingView === "juega" ? (
        <main className="flex-1 flex flex-col bg-[#FAFAFA] animate-in fade-in duration-300">
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 pt-6">
            <button
              onClick={() => {
                setLandingView("home");
                setActiveNav("inicio");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-[#18181A] bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <span>← Volver a la portada principal</span>
            </button>
          </div>
          <GamesSection variant="landing" />
        </main>
      ) : (
        <>
      {/* ============================================================ */}
      {/* 2. HERO SECTION ESTILO IACULUS (BOSQUE FLOTANTE EN BLANCO)   */}
      {/* ============================================================ */}
      <section className="relative w-full bg-white pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Main Forest Green Headline ("World-class venture studio building sustainable solutions") */}
          <h1 className="text-3xl sm:text-5xl md:text-[3.5rem] lg:text-[3.85rem] font-extrabold font-heading tracking-tight text-[#1D5B34] leading-[1.12] max-w-4xl mb-5">
            Plataforma de ciencia ciudadana protegiendo la flora nativa de Huancayo
          </h1>

          {/* Soft Gray Two-line Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-normal max-w-xl leading-relaxed mb-8">
            Conectamos a estudiantes y comunidades del Valle del Mantaro con soluciones interactivas para explorar, verificar y conservar nuestros bosques andinos.
          </p>

          {/* Dual Pill Buttons: Solid Black ("Get onboarded") + Outlined White ("Learn more") */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8 sm:mb-10 relative z-10">
            <Link
              href="/explora"
              className="bg-[#18181A] hover:bg-zinc-800 text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              Explorar el mapa
            </Link>
            <a
              href="#aprende"
              onClick={(e) => scrollToSection(e, "aprende")}
              className="bg-white hover:bg-slate-50 text-[#18181A] border border-slate-200 hover:border-slate-300 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all active:scale-95 cursor-pointer"
            >
              Conocer más
            </a>
          </div>

          {/* Floating Andean Forest Island Illustration on Pure White Background */}
          <div className="relative w-full max-w-4xl mx-auto -mt-2 sm:-mt-4 mb-6 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/floating-forest.jpg"
              alt="Ecosistema y bosque andino flotante de BioWanka"
              className="w-full h-auto max-h-[380px] sm:max-h-[470px] object-contain mx-auto pointer-events-none"
            />
          </div>

          {/* Trust Bar ("We've been trusted by founders from" style) */}
          <div className="w-full max-w-4xl mx-auto pt-4 flex flex-col items-center">
            <p className="text-xs font-medium text-slate-400 mb-5">
              Impulsando la educación ambiental e investigación escolar en
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12 text-slate-400/90 font-heading font-extrabold text-sm sm:text-base tracking-tight">
              <span className="hover:text-[#1D5B34] transition-colors">Valle del Mantaro</span>
              <span className="hover:text-[#1D5B34] transition-colors font-serif italic font-bold text-lg">Huancayo</span>
              <span className="hover:text-[#1D5B34] transition-colors">Colegio Santa Isabel</span>
              <span className="hover:text-[#1D5B34] transition-colors tracking-widest uppercase text-xs font-black">ODS 15 · ONU</span>
              <span className="hover:text-[#1D5B34] transition-colors">Bosques Polylepis</span>
              <span className="hover:text-[#1D5B34] transition-colors">Junín Verde</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CÓMO FUNCIONA BIOWANKA (3 Tarjetas Pastel como el Dashboard) */}
      {/* ============================================================ */}
      <section id="aprende" className="w-full bg-[#FAFAFA] border-y border-slate-100 py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#1D5B34] bg-[#DFF5E3] px-3.5 py-1.5 rounded-full">
              Metodología BioWanka
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#18181A] tracking-tight mt-4 mb-3">
              Ciencia ciudadana en tres pasos reales
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Todas las estadísticas inician en cero. Cada punto e insignia representa un hallazgo botánico verificado en el territorio de Huancayo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Soft Mint Green */}
            <div className="bg-[#DFF5E3] rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between min-h-[260px] transition-transform hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#18181A] mb-6">
                  <Compass className="w-6 h-6 text-[#1D5B34]" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#15803D]">
                  Paso 01 · Geolocalización
                </span>
                <h3 className="text-xl font-black font-heading text-[#18181A] mt-1 mb-2.5">
                  Explora el Mapa Satelital
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Ubica ejemplares reales de Quinual, Cantuta, Quishuar, Colli y Muña en el Cerrito de la Libertad, Torre Torre y Parque de la Identidad.
                </p>
              </div>
              <div className="pt-6 mt-auto flex items-center justify-between text-xs font-extrabold text-[#18181A]">
                <span>Coordenadas GPS reales</span>
                <span>Huancayo</span>
              </div>
            </div>

            {/* Step 2: Soft Lilac Purple */}
            <div className="bg-[#EDE8F8] rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between min-h-[260px] transition-transform hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#18181A] mb-6">
                  <QrCode className="w-6 h-6 text-[#6D28D9]" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#6D28D9]">
                  Paso 02 · Verificación en Campo
                </span>
                <h3 className="text-xl font-black font-heading text-[#18181A] mt-1 mb-2.5">
                  Valida tu Avistamiento
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Escanea el código QR de la placa botánica, ingresa el código oficial <code className="font-mono font-bold bg-white/80 px-1.5 py-0.5 rounded">BIOWANKA</code>, sube una foto o responde la trivia en sitio.
                </p>
              </div>
              <div className="pt-6 mt-auto flex items-center justify-between text-xs font-extrabold text-[#18181A]">
                <span>Validación multimodal</span>
                <span>100% Verificable</span>
              </div>
            </div>

            {/* Step 3: Soft Cream Yellow */}
            <div className="bg-[#F8F2DC] rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between min-h-[260px] transition-transform hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#18181A] mb-6">
                  <Award className="w-6 h-6 text-[#B45309]" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309]">
                  Paso 03 · Impacto & Mérito
                </span>
                <h3 className="text-xl font-black font-heading text-[#18181A] mt-1 mb-2.5">
                  Desbloquea Insignias
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Acumula puntos de conservación, sube de rango desde Explorador Novato hasta Maestro Guardián Wanka y registra nuevas plantas en tu barrio.
                </p>
              </div>
              <div className="pt-6 mt-auto flex items-center justify-between text-xs font-extrabold text-[#18181A]">
                <span>4 Insignias Botánicas</span>
                <span>ODS 15</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CATÁLOGO EDITORIAL DE ESPECIES NATIVAS                    */}
      {/* ============================================================ */}
      <section id="especies" className="w-full bg-white py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header + Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1D5B34]">
                Biodiversidad del Mantaro
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#18181A] tracking-tight mt-1">
                Especies nativas que protegemos
              </h2>
            </div>

            {/* Clean Pill Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "Todas" },
                { id: "especies", label: "Flora Emblemática" },
                { id: "valle", label: "Árboles Protectores" },
                { id: "comunidad", label: "Comunidad" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "all" | "especies" | "valle" | "comunidad")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#18181A] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-[#18181A]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="group bg-white rounded-[2rem] border border-slate-200/90 hover:border-slate-300 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-5 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-extrabold text-[#18181A] uppercase tracking-wider shadow-xs">
                      {card.tag}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#18181A] text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold">
                      {card.points}
                    </div>
                  </div>

                  {/* Species Name & Scientific Subtitle */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold italic text-[#1D5B34]">
                      {card.scientificName}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black font-heading text-[#18181A] tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-5">
                    {card.subtitle}
                  </p>
                </div>

                <Link
                  href={card.href}
                  className="inline-flex items-center justify-between pt-3.5 border-t border-slate-100 text-xs font-extrabold text-[#18181A] group-hover:text-[#1D5B34] transition-colors"
                >
                  <span>{card.linkText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BANNER DE IMPACTO & CTA FINAL (Estilo Dashboard Dark Card) */}
      {/* ============================================================ */}
      <section id="resultados" className="w-full px-4 sm:px-8 pt-6 pb-16 sm:pb-24 bg-white">
        <div className="max-w-6xl mx-auto bg-[#18181A] text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          
          {/* Subtle decorative geometric lines */}
          <div className="absolute -bottom-12 -right-10 w-64 h-64 pointer-events-none opacity-15">
            <div className="w-52 h-36 rounded-3xl border border-white transform rotate-[-15deg] translate-x-6 translate-y-8" />
            <div className="w-52 h-36 rounded-3xl border border-white transform rotate-[-5deg] translate-x-12 -translate-y-10" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-[#93C5FD] text-xs font-extrabold uppercase tracking-wider mb-4">
                ODS 15 · Vida de Ecosistemas Terrestres
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight mb-4">
                ¿Listo para registrar tu primera planta nativa en Huancayo?
              </h2>
              <p className="text-xs sm:text-base text-zinc-400 max-w-xl leading-relaxed">
                Accede con la cuenta de demostración escolar o explora directamente el mapa satelital para verificar ejemplares reales con el código <strong className="text-white font-mono">BIOWANKA</strong>.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/explora"
                className="bg-[#B9D5FD] hover:bg-[#93C5FD] text-[#18181A] px-7 py-4 rounded-full text-xs sm:text-sm font-black font-heading text-center transition-all shadow-md active:scale-95"
              >
                Abrir Mapa de Exploración →
              </Link>
              <button
                onClick={() => {
                  setLandingView("comunidad");
                  setActiveNav("comunidad-guardianes");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/15 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-center transition-all cursor-pointer"
              >
                Ver Comunidad & Top Rangos
              </button>
            </div>
          </div>

        </div>
      </section>
      </>
      )}

      {/* ============================================================ */}
      {/* 6. FOOTER MINIMALISTA EN BLANCO                              */}
      {/* ============================================================ */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-12 px-5 sm:px-10 lg:px-16 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#18181A] flex items-center justify-center">
                <Sprout className="w-4 h-4 text-[#F4EFE0]" />
              </div>
              <span className="font-heading font-black text-lg text-[#18181A]">
                BioWanka
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs text-center md:text-left">
              Plataforma de ciencia ciudadana y conservación de flora andina nativa para el Valle del Mantaro.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-500">
            <Link href="/" className="hover:text-[#18181A] transition-colors">
              Inicio
            </Link>
            <Link href="/explora" className="hover:text-[#18181A] transition-colors">
              Dashboard & Mapa
            </Link>
            <Link href="/login" className="hover:text-[#18181A] transition-colors">
              Acceso Escolar
            </Link>
            <a
              href="#especies"
              className="hover:text-[#18181A] transition-colors"
            >
              Catálogo Botánico
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 w-full sm:w-auto">
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-xs">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Tu correo institucional"
                className="bg-slate-100 border border-slate-200 focus:border-[#18181A] focus:bg-white rounded-full px-4 py-2 text-xs text-[#18181A] placeholder-slate-400 focus:outline-hidden flex-1"
              />
              <button
                type="submit"
                className="bg-[#18181A] hover:bg-zinc-800 text-white px-4 py-2 rounded-full text-xs font-extrabold transition-colors cursor-pointer"
              >
                Unirme
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-[#1D5B34] font-bold">
                ¡Gracias por sumarte a BioWanka!
              </span>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>© 2026 BioWanka · Huancayo, Junín, Perú</span>
          <span>Investigación e Innovación Escolar · ODS 15</span>
        </div>
      </footer>

    </div>
  );
};
