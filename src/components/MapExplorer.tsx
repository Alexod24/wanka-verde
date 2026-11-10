"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Plus,
  Minus,
  MapPin as MapPinIcon,
  Navigation,
  X,
  Leaf,
  CheckCircle2,
  FileCheck2
} from "lucide-react";
import type { Map as LeafletMap, LayerGroup } from "leaflet";
import { VerificationModal } from "@/components/VerificationModal";
import { useGame } from "@/context/GameContext";

interface PlantMarkerData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  type: "player" | "plant" | "challenge" | "mystery";
  points: number;
  imageUrl: string;
  plantId?: string;
  expectedCode?: string;
  question?: {
    q: string;
    options: string[];
    correct: number;
  };
}

const MARKERS_DATA: PlantMarkerData[] = [
  {
    id: "geraldine-player",
    name: "Geraldine (Tú)",
    scientificName: "Exploradora Activa · Nivel 1",
    category: "Jugador",
    description: "¡Estás ubicada en el centro histórico de Huancayo lista para iniciar tus misiones!",
    location: "Calle Real / Huancayo Centro",
    lat: -12.0651,
    lng: -75.2049,
    type: "player",
    points: 0,
    imageUrl: "/assets/avatar-geraldine.png",
  },
  {
    id: "cantuta-cerrito",
    name: "Cantuta Flor Sagrada",
    scientificName: "Cantua buxifolia",
    category: "Flor Nacional",
    description: "Crece en las laderas rocosas y miradores del Cerrito de la Libertad con flores acampanadas rojizas y púrpuras.",
    location: "Cerrito de la Libertad, Huancayo",
    lat: -12.0618,
    lng: -75.2005,
    type: "plant",
    points: 20,
    imageUrl: "/assets/cantuta.jpg",
    plantId: "cantuta",
    expectedCode: "WANKA-CANTUTA-01",
    question: {
      q: "¿De qué forma son las flores características de la Cantuta en el Cerrito de la Libertad?",
      options: [
        "Campanas tubulares colgantes de color rojizo/morado",
        "Pequeñas espinas secas",
        "Margaritas amarillas gigantes",
      ],
      correct: 0,
    },
  },
  {
    id: "quinual-torre",
    name: "Quinual Centenario",
    scientificName: "Polylepis racemosa",
    category: "Árbol Nativo",
    description: "Árbol de corteza milenaria en láminas de color rojizo. Atrapa la niebla andina y nutre los manantiales de agua.",
    location: "Torre Torre - Formaciones geológicas",
    lat: -12.0535,
    lng: -75.1902,
    type: "plant",
    points: 35,
    imageUrl: "/assets/quinual.jpg",
    plantId: "quinual",
    expectedCode: "WANKA-QUINUAL-02",
    question: {
      q: "¿Por qué se desprenden láminas del tronco del Quinual?",
      options: [
        "Aislamiento térmico natural contra heladas nocturnas",
        "Por plagas de insectos",
        "Por falta de abono químico",
      ],
      correct: 0,
    },
  },
  {
    id: "quishuar-identidad",
    name: "Quishuar Sagrado",
    scientificName: "Buddleja coriacea",
    category: "Árbol Andino",
    description: "Ejemplares protegidos en el Parque de la Identidad Wanka. Madera legendaria incorruptible de tiempos incaicos.",
    location: "Parque de la Identidad Wanka, San Antonio",
    lat: -12.0548,
    lng: -75.2065,
    type: "plant",
    points: 30,
    imageUrl: "/assets/quishuar.jpg",
    plantId: "quishuar",
    expectedCode: "WANKA-QUISHUAR-03",
    question: {
      q: "¿Qué animal andino visita constantemente las flores del Quishuar?",
      options: [
        "Colibríes andinos",
        "Pelícanos",
        "Monos capuchinos",
      ],
      correct: 0,
    },
  },
  {
    id: "colli-palian",
    name: "Colli Protector",
    scientificName: "Buddleja incana",
    category: "Árbol Protector",
    description: "Resistente a heladas y vientos fuertes, con follaje cenizo y plateado por el envés de las hojas.",
    location: "Quebrada de Palián / Río Shullcas",
    lat: -12.0465,
    lng: -75.1830,
    type: "plant",
    points: 25,
    imageUrl: "/assets/colli.jpg",
    plantId: "colli",
    expectedCode: "WANKA-COLLI-04",
    question: {
      q: "¿De qué color es el envés de las hojas del Colli?",
      options: [
        "Blanquecino / plateado afelpado",
        "Negro brillante",
        "Azul metálico",
      ],
      correct: 0,
    },
  },
  {
    id: "muna-san-carlos",
    name: "Muña Silvestre",
    scientificName: "Minthostachys mollis",
    category: "Hierba Aromática",
    description: "Hierba silvestre de aroma mentolado fresco que crece espontáneamente en colinas andinas y bordes de chacras.",
    location: "Colinas de San Carlos y Chorrillos",
    lat: -12.0592,
    lng: -75.2140,
    type: "plant",
    points: 15,
    imageUrl: "/assets/muna.jpg",
    plantId: "muna",
    expectedCode: "WANKA-MUNA-05",
    question: {
      q: "¿Para qué se utiliza tradicionalmente la infusión de Muña en Huancayo?",
      options: [
        "Alivio estomacal y mal de altura (soroche)",
        "Para teñir lana de negro",
        "Como combustible de lámpara",
      ],
      correct: 0,
    },
  },
  {
    id: "challenge-constitucion",
    name: "Gran Reto de Reforestación Juvenil",
    scientificName: "Desafío Semanal de Escuelas Wanka",
    category: "Reto Especial",
    description: "Participa con tu brigada escolar en la jornada ambiental en la Plaza de la Constitución.",
    location: "Plaza Constitución, Huancayo",
    lat: -12.0682,
    lng: -75.2100,
    type: "challenge",
    points: 50,
    imageUrl: "/assets/reto-flora.jpg",
    expectedCode: "WANKA-RETO-2026",
    question: {
      q: "¿Cuál es el beneficio de plantar especies nativas en plazas urbanas?",
      options: [
        "Ahorro de agua y refugio para aves autóctonas",
        "Ninguno, se desgastan rápido",
        "Aumentar el calor urbano",
      ],
      correct: 0,
    },
  },
  {
    id: "mystery-shullcas",
    name: "Especie Oculta del Río Shullcas",
    scientificName: "Flora Nativa de Ribera",
    category: "Misterio Andino",
    description: "Un arbusto silvestre florece junto a la ribera del río. ¡Verifícalo para reclamar puntos misteriosos!",
    location: "Ribera del Río Shullcas, El Tambo",
    lat: -12.0498,
    lng: -75.2195,
    type: "mystery",
    points: 40,
    imageUrl: "/assets/mascot.png",
    expectedCode: "HUANCAYO-VERDE",
    question: {
      q: "¿Por qué es crucial mantener vegetación en las riberas del Río Shullcas?",
      options: [
        "Evitar la erosión de laderas y huaycos",
        "Para bloquear el curso de agua",
        "Para construir fábricas encima",
      ],
      correct: 0,
    },
  },
];

export const MapExplorer: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<LayerGroup | null>(null);
  const { isObjectiveCompleted, verifyAndCompleteObjective } = useGame();

  const [selectedMarker, setSelectedMarker] = useState<PlantMarkerData | null>(null);
  const [verifyingMarker, setVerifyingMarker] = useState<PlantMarkerData | null>(null);
  const [mapType, setMapType] = useState<"google_hybrid" | "google_sat" | "google_streets" | "osm">("google_hybrid");
  const [userCreatedPins, setUserCreatedPins] = useState<PlantMarkerData[]>([]);
  const [tempPinCoord, setTempPinCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [newPinName, setNewPinName] = useState("");
  const [newPinDesc, setNewPinDesc] = useState("");

  const tileLayerRef = useRef<unknown>(null);

  const getTileUrl = (type: string) => {
    switch (type) {
      case "google_hybrid":
        return "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";
      case "google_sat":
        return "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
      case "google_streets":
        return "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      case "osm":
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  const renderAllMarkers = useCallback(
    (
      L: typeof import("leaflet"),
      markersGroup: LayerGroup
    ) => {
      markersGroup.clearLayers();

      const allData = [...MARKERS_DATA, ...userCreatedPins];

      allData.forEach((item) => {
        const isPlayer = item.type === "player";
        const isChallenge = item.type === "challenge";
        const isMystery = item.type === "mystery";
        const isVisited = isObjectiveCompleted(item.id);

        let pinHtml = "";

        if (isPlayer) {
          pinHtml = `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
              <div style="position: absolute; top: -38px; white-space: nowrap; background: rgba(255,255,255,0.96); color: #202B1D; font-weight: 800; font-size: 11px; padding: 3px 10px; border-radius: 9999px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); border: 1px solid #E4E3D5;">
                ¡Misiones en el mapa! <span style="color:#3E7E36;">&gt;</span>
              </div>
              <div style="width: 44px; height: 44px; border-radius: 9999px; background: #52A447; border: 3px solid #FFFFFF; box-shadow: 0 4px 14px rgba(62,126,54,0.45); overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <img src="${item.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            </div>
          `;
        } else if (isChallenge) {
          pinHtml = `
            <div style="cursor: pointer; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25)); transition: transform 0.2s;">
              <div style="background: ${isVisited ? '#3E7E36' : '#865DFF'}; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF;">
                <span style="transform: rotate(45deg); font-size: 16px;">🏆</span>
              </div>
            </div>
          `;
        } else if (isMystery) {
          pinHtml = `
            <div style="cursor: pointer; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25)); transition: transform 0.2s;">
              <div style="background: ${isVisited ? '#3E7E36' : '#E6A728'}; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF;">
                <span style="transform: rotate(45deg); font-size: 15px; font-weight: 900; color: #FFFFFF;">?</span>
              </div>
            </div>
          `;
        } else {
          // Native Plant Pin: Turns dark green with check once completed
          const pinColor = isVisited ? "#20471b" : "#52A447";
          pinHtml = `
            <div style="cursor: pointer; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25)); transition: transform 0.2s;">
              <div style="background: ${pinColor}; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF;">
                <span style="transform: rotate(45deg); font-size: 15px;">${isVisited ? '✓' : '🌿'}</span>
              </div>
            </div>
          `;
        }

        const customIcon = L.divIcon({
          className: "custom-leaflet-pin",
          html: pinHtml,
          iconSize: isPlayer ? [44, 44] : [34, 34],
          iconAnchor: isPlayer ? [22, 22] : [17, 34],
        });

        const marker = L.marker([item.lat, item.lng], { icon: customIcon });
        marker.on("click", () => {
          setSelectedMarker(item);
        });

        markersGroup.addLayer(marker);
      });
    },
    [isObjectiveCompleted, userCreatedPins]
  );

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;

      const map = L.map(mapContainerRef.current, {
        center: [-12.0651, -75.2049],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      const baseTile = L.tileLayer(getTileUrl(mapType), {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }).addTo(map);

      tileLayerRef.current = baseTile;

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;

      map.on("click", (e) => {
        if (!isMounted) return;
        setTempPinCoord({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      renderAllMarkers(L, markersGroup);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function updateTiles() {
      if (!mapInstanceRef.current || !tileLayerRef.current) return;
      const L = (await import("leaflet")).default;

      mapInstanceRef.current.removeLayer(tileLayerRef.current as import("leaflet").Layer);
      const newLayer = L.tileLayer(getTileUrl(mapType), {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }).addTo(mapInstanceRef.current);

      tileLayerRef.current = newLayer;
    }
    updateTiles();
  }, [mapType]);

  useEffect(() => {
    async function updateMarkers() {
      if (!mapInstanceRef.current || !markersLayerRef.current) return;
      const L = (await import("leaflet")).default;
      renderAllMarkers(L, markersLayerRef.current);
    }
    updateMarkers();
  }, [renderAllMarkers]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleCenterHuancayo = () => {
    mapInstanceRef.current?.setView([-12.0651, -75.2049], 14, { animate: true });
    setSelectedMarker(MARKERS_DATA[0]);
  };

  // Launch verification modal for this marker
  const handleStartVerification = (marker: PlantMarkerData) => {
    setVerifyingMarker(marker);
    setSelectedMarker(null);
  };

  const handleSaveCustomPin = () => {
    if (!tempPinCoord || !newPinName.trim()) return;

    const newMarker: PlantMarkerData = {
      id: `custom-${Date.now()}`,
      name: newPinName.trim(),
      scientificName: "Especie registrada por la comunidad",
      category: "Planta Registrada",
      description: newPinDesc.trim() || "Observación botánica verificada en Huancayo.",
      location: `Lat: ${tempPinCoord.lat.toFixed(4)}, Lng: ${tempPinCoord.lng.toFixed(4)}`,
      lat: tempPinCoord.lat,
      lng: tempPinCoord.lng,
      type: "plant",
      points: 25,
      imageUrl: "/assets/cantuta-mission.jpg",
      expectedCode: "HUANCAYO-VERDE",
    };

    setUserCreatedPins((prev) => [...prev, newMarker]);
    setTempPinCoord(null);
    setNewPinName("");
    setNewPinDesc("");

    // Prompt user to verify this new pin immediately
    setVerifyingMarker(newMarker);
  };

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4E3D5] shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-[#1c271b] z-0">

      {/* Contenedor del Mapa Leaflet */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* TOP-LEFT PILL: "Mapa de Exploración" */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 sm:gap-2.5 bg-[#2E6228]/95 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-[#52A447]/40 shadow-lg select-none">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#52A447]/40 flex items-center justify-center">
          <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A7F3D0]" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold font-heading text-[11px] sm:text-xs md:text-sm tracking-wide leading-tight">
            Mapa de Exploración
          </span>
          <span className="text-[9px] sm:text-[10px] text-emerald-200 font-semibold leading-tight hidden xs:inline">
            Huancayo · Google Satelital
          </span>
        </div>
      </div>

      {/* TOP-RIGHT CONTROLS: Capas & Brújula */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
        <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-[#E4E3D5] shadow-lg p-0.5 sm:p-1 flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => setMapType("google_hybrid")}
            className={`px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black font-heading transition-all ${
              mapType === "google_hybrid"
                ? "bg-[#3E7E36] text-white shadow-xs"
                : "text-[#5C6856] hover:text-[#202B1D] hover:bg-[#FAF9F3]"
            }`}
          >
            Híbrido
          </button>
          <button
            onClick={() => setMapType("google_sat")}
            className={`px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black font-heading transition-all ${
              mapType === "google_sat"
                ? "bg-[#3E7E36] text-white shadow-xs"
                : "text-[#5C6856] hover:text-[#202B1D] hover:bg-[#FAF9F3]"
            }`}
          >
            Satélite
          </button>
          <button
            onClick={() => setMapType("google_streets")}
            className={`hidden sm:inline-block px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black font-heading transition-all ${
              mapType === "google_streets"
                ? "bg-[#3E7E36] text-white shadow-xs"
                : "text-[#5C6856] hover:text-[#202B1D] hover:bg-[#FAF9F3]"
            }`}
          >
            Calles
          </button>
        </div>

        <button
          onClick={handleCenterHuancayo}
          title="Centrar en Huancayo"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md hover:bg-white text-[#202B1D] flex items-center justify-center shadow-lg border border-[#E4E3D5] transition-transform active:rotate-45"
        >
          <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-[#3E7E36] transform -rotate-45" />
        </button>
      </div>

      {/* LEFT CONTROLS: Zoom */}
      <div className="absolute top-16 sm:top-20 left-3 sm:left-4 z-20 flex flex-col gap-2">
        <div className="flex flex-col gap-0.5 sm:gap-1 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-[#E4E3D5] shadow-lg p-0.5 sm:p-1">
          <button
            onClick={handleZoomIn}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl hover:bg-[#FAF9F3] text-[#202B1D] font-black flex items-center justify-center text-base sm:text-lg active:scale-90 transition-transform"
            aria-label="Acercar mapa"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <div className="h-[1px] bg-[#E4E3D5] mx-1" />
          <button
            onClick={handleZoomOut}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl hover:bg-[#FAF9F3] text-[#202B1D] font-black flex items-center justify-center text-base sm:text-lg active:scale-90 transition-transform"
            aria-label="Alejar mapa"
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* BANNER INFERIOR */}
      <div className="absolute bottom-2.5 left-3 sm:bottom-3 sm:left-4 z-20 bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2 pointer-events-none select-none max-w-[85%] truncate">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#52A447] shrink-0" />
        <span className="truncate">{MARKERS_DATA.length + userCreatedPins.length} objetivos botánicos</span>
      </div>

      {/* FORMULARIO: REGISTRAR PLANTA */}
      {tempPinCoord && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white/98 backdrop-blur-md rounded-3xl border border-[#E4E3D5] shadow-2xl p-5 max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#E4E3D5] mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#E7F4E4] rounded-xl text-[#3E7E36]">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-black font-heading text-[#202B1D]">
                Nuevo Objetivo en Huancayo
              </h4>
            </div>
            <button
              onClick={() => setTempPinCoord(null)}
              className="text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#5C6856] mb-3">
            Coordenadas: <strong>{tempPinCoord.lat.toFixed(4)}, {tempPinCoord.lng.toFixed(4)}</strong>
          </p>

          <div className="flex flex-col gap-2.5 mb-4">
            <div>
              <label className="text-[11px] font-bold text-[#202B1D] block mb-1">
                Nombre de la planta o reto:
              </label>
              <input
                type="text"
                placeholder="Ej. Cantuta, Sauco, Reto de siembra..."
                value={newPinName}
                onChange={(e) => setNewPinName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E4E3D5] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#3E7E36]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#202B1D] block mb-1">
                Detalles de la ubicación:
              </label>
              <input
                type="text"
                placeholder="Ej. Frente al colegio, parque o ribera..."
                value={newPinDesc}
                onChange={(e) => setNewPinDesc(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#E4E3D5] bg-[#FAF9F3] focus:outline-none focus:ring-2 focus:ring-[#3E7E36]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setTempPinCoord(null)}
              className="px-3 py-2 text-xs font-bold text-[#5C6856] hover:bg-stone-100 rounded-xl"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveCustomPin}
              disabled={!newPinName.trim()}
              className="px-4 py-2 text-xs font-black font-heading text-white bg-[#3E7E36] hover:bg-[#2E6228] disabled:opacity-50 rounded-xl shadow-xs active:scale-95 transition-transform"
            >
              Plantar y Verificar (+25 pts)
            </button>
          </div>
        </div>
      )}

      {/* POPUP INFORMATIVO DEL PIN SELECCIONADO */}
      {selectedMarker && (
        <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-88 z-30 bg-white/98 backdrop-blur-md rounded-3xl border border-[#E4E3D5] shadow-2xl p-4 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#E4E3D5] shrink-0 bg-[#FAF9F3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedMarker.imageUrl}
                  alt={selectedMarker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-[#52A447] tracking-wider">
                  {selectedMarker.category}
                </span>
                <h4 className="text-sm font-black font-heading text-[#202B1D] leading-tight">
                  {selectedMarker.name}
                </h4>
                <span className="text-[10px] italic text-[#5C6856]">
                  {selectedMarker.scientificName}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedMarker(null)}
              className="text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#5C6856] leading-relaxed my-2">
            {selectedMarker.description}
          </p>

          <div className="bg-[#FAF9F3] p-2.5 rounded-2xl border border-[#E4E3D5] mb-3 flex items-center gap-2">
            <MapPinIcon className="w-3.5 h-3.5 text-[#3E7E36] shrink-0" />
            <span className="text-[11px] font-bold text-[#202B1D] truncate">
              {selectedMarker.location}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#E4E3D5]/70">
            {selectedMarker.points > 0 ? (
              <span className="text-xs font-black text-[#52A447]">
                +{selectedMarker.points} pts verificables
              </span>
            ) : (
              <span className="text-xs font-bold text-[#5C6856]">
                Tu posición en Huancayo
              </span>
            )}

            {selectedMarker.points > 0 && (
              <button
                onClick={() => handleStartVerification(selectedMarker)}
                className={`px-4 py-2 rounded-xl text-xs font-black font-heading shadow-xs flex items-center gap-1.5 transition-all active:scale-95 ${isObjectiveCompleted(selectedMarker.id)
                    ? "bg-[#E7F4E4] text-[#3E7E36] cursor-default"
                    : "bg-[#3E7E36] hover:bg-[#2E6228] text-white"
                  }`}
              >
                {isObjectiveCompleted(selectedMarker.id) ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verificado (+{selectedMarker.points} pts)</span>
                  </>
                ) : (
                  <>
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Verificar Misión</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* MODAL GLOBAL DE VERIFICACIÓN (Z-INDEX 99999) */}
      {verifyingMarker && (
        <VerificationModal
          isOpen={Boolean(verifyingMarker)}
          onClose={() => setVerifyingMarker(null)}
          objective={{
            id: verifyingMarker.id,
            title: verifyingMarker.name,
            description: verifyingMarker.description,
            points: verifyingMarker.points,
            expectedCode: verifyingMarker.expectedCode || "WANKA-CANTUTA-01",
            plantId: verifyingMarker.plantId,
            question: verifyingMarker.question,
          }}
          onSuccess={(method) => {
            verifyAndCompleteObjective(
              verifyingMarker.id,
              verifyingMarker.name,
              verifyingMarker.points,
              method,
              verifyingMarker.plantId
            );
          }}
        />
      )}

    </div>
  );
};
