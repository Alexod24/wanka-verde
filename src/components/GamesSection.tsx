"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sprout, 
  Gamepad2, 
  Droplets, 
  Sun, 
  Shovel, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Star, 
  Trophy, 
  Sparkles,
  Leaf,
  AlertCircle,
  Play,
  Heart,
  Zap,
  MousePointerClick,
  Joystick,
  Shield,
  CloudRain,
  Snowflake,
  Bug
} from "lucide-react";
import { useGame } from "@/context/GameContext";

interface GamesSectionProps {
  variant?: "dashboard" | "landing";
}

// ============================================================================
// QUEST 1: "MI PRIMERA PLANTA" (SIMULADOR INTERACTIVO DE 5 PASOS - CLICKS)
// ============================================================================
interface PlantingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip: string;
  options: {
    id: string;
    label: string;
    detail: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const PLANTING_STEPS: PlantingStep[] = [
  {
    stepNumber: 1,
    title: "Paso 1: Cavar el hoyo en tierra andina",
    instruction: "Vamos a plantar un Quinual en Huancayo. ¿De qué profundidad debemos cavar el hoyo para proteger la raíz de las heladas?",
    tip: "En la sierra a 3,250 m s.n.m., las raíces necesitan espacio y abrigo térmico.",
    options: [
      {
        id: "opt-1a",
        label: "Solo 5 cm en la superficie",
        detail: "Rápido pero muy superficial",
        isCorrect: false,
        feedback: "¡Cuidado! A 5 cm el viento y la helada nocturna secarán la raíz en un día. Intenta con mayor profundidad.",
      },
      {
        id: "opt-1b",
        label: "Hoyo de 30 a 40 cm de profundidad",
        detail: "Profundidad ideal para raíces nativas",
        isCorrect: true,
        feedback: "¡Excelente! Un hoyo de 30-40 cm mantiene la humedad y protege la raíz del frío andino.",
      },
      {
        id: "opt-1c",
        label: "Sobre pavimento o piedras sueltas",
        detail: "Sin remover la tierra",
        isCorrect: false,
        feedback: "Las raíces no podrán anclarse al suelo. Necesitamos cavar en tierra firme.",
      },
    ],
  },
  {
    stepNumber: 2,
    title: "Paso 2: Preparar y nutrir el sustrato",
    instruction: "El suelo está listo. ¿Qué mezcla colocamos en el fondo para alimentar a nuestra primera planta?",
    tip: "Las plantas nativas prefieren abonos orgánicos naturales que retengan humedad.",
    options: [
      {
        id: "opt-2a",
        label: "Tierra negra mezclada con compost o humus",
        detail: "Rico en nutrientes orgánicos",
        isCorrect: true,
        feedback: "¡Perfecto! El compost y la tierra negra nutren el plantón de forma natural sin dañar el suelo.",
      },
      {
        id: "opt-2b",
        label: "Arena seca de construcción",
        detail: "Sin materia orgánica",
        isCorrect: false,
        feedback: "La arena sola no retiene el agua ni tiene nutrientes para que el plantón crezca.",
      },
      {
        id: "opt-2c",
        label: "Residuos plásticos y hojas secas sin descomponer",
        detail: "Basura mezclada",
        isCorrect: false,
        feedback: "Nunca coloques plásticos; impiden el paso del agua y contaminan el suelo.",
      },
    ],
  },
  {
    stepNumber: 3,
    title: "Paso 3: Colocar el plantón con cuidado",
    instruction: "Tienes el plantón en su bolsita de vivero. ¿Cómo lo trasplantamos al hoyo?",
    tip: "El 'pan de tierra' que rodea la raíz no debe romperse.",
    options: [
      {
        id: "opt-3a",
        label: "Plantarlo con todo y bolsa de plástico negra",
        detail: "Sin quitar el plástico",
        isCorrect: false,
        feedback: "¡Error común! Si dejas la bolsa plástica, las raíces se asfixiarán y el árbol nunca crecerá.",
      },
      {
        id: "opt-3b",
        label: "Jalar del tallo con fuerza sacudiendo la tierra",
        detail: "Dejando la raíz desnuda al sol",
        isCorrect: false,
        feedback: "¡No jales del tallo! Eso rompe los pelos absorbentes de la raíz.",
      },
      {
        id: "opt-3c",
        label: "Retirar la bolsa suavemente y centrar el pan de tierra",
        detail: "Cuello de la planta al nivel del suelo",
        isCorrect: true,
        feedback: "¡Muy bien hecho! Así las raíces quedan intactas y listas para expandirse en su nuevo hogar.",
      },
    ],
  },
  {
    stepNumber: 4,
    title: "Paso 4: Primer riego ('Riego de asiento')",
    instruction: "Ya cubrimos con tierra alrededor del tallo. ¿Cómo y cuándo hacemos el primer riego en Huancayo?",
    tip: "El sol del mediodía en el Valle del Mantaro evapora el agua rápidamente.",
    options: [
      {
        id: "opt-4a",
        label: "Riego lento en la base (poza) temprano o al atardecer",
        detail: "Elimina bolsas de aire en la raíz",
        isCorrect: true,
        feedback: "¡Exacto! El riego lento en la base asienta la tierra y al hacerlo temprano o al atardecer aprovecha cada gota.",
      },
      {
        id: "opt-4b",
        label: "Tirar un balde de golpe sobre las hojas al mediodía",
        detail: "Bajo el sol intenso de las 12:00 p.m.",
        isCorrect: false,
        feedback: "Al mediodía el sol quema las hojas mojadas (efecto lupa) y un chorro fuerte desentierra la raíz.",
      },
      {
        id: "opt-4c",
        label: "No regar hasta el próximo mes",
        detail: "Dejarla completamente seca",
        isCorrect: false,
        feedback: "Toda planta recién sembrada necesita su 'riego de asiento' inmediato para sobrevivir al trasplante.",
      },
    ],
  },
  {
    stepNumber: 5,
    title: "Paso 5: Protección contra heladas y viento",
    instruction: "Último paso: En las noches de junio y julio baja mucho la temperatura. ¿Cómo protegemos nuestra planta?",
    tip: "Los antiguos Wankas usaban elementos naturales para abrigar sus cultivos.",
    options: [
      {
        id: "opt-5a",
        label: "Colocar mulch (hojarasca/paja) en la base y piedras alrededor",
        detail: "Conserva calor y humedad del suelo",
        isCorrect: true,
        feedback: "¡Increíble! Las piedras absorben calor de día y el mulch protege la raíz de la helada nocturna. ¡Tu planta está lista para crecer!",
      },
      {
        id: "opt-5b",
        label: "Pisar con fuerza las hojas del plantón",
        detail: "Aplastar la planta",
        isCorrect: false,
        feedback: "Eso dañaría el tallo principal. Solo debemos compactar suavemente la tierra alrededor.",
      },
      {
        id: "opt-5c",
        label: "Cubrirla con pintura sintética",
        detail: "Tapar los poros de las hojas",
        isCorrect: false,
        feedback: "Las hojas necesitan respirar y hacer fotosíntesis.",
      },
    ],
  },
];

// ============================================================================
// QUEST 2: "DETECTIVE BOTÁNICO DEL MANTARO"
// ============================================================================
const DETECTIVE_QUESTIONS = [
  {
    clue: "Tengo flores acampanadas de colores rojo, rosado y amarillo. Fui la flor sagrada de los Incas y crezco en el Cerrito de la Libertad.",
    correctPlant: "Cantuta",
    image: "/assets/cantuta.jpg",
    options: ["Cantuta", "Muña", "Quishuar"],
    explanation: "¡Correcto! La Cantuta (Cantua buxifolia) es la Flor Nacional del Perú y emblema de Huancayo.",
  },
  {
    clue: "Mi tronco tiene una corteza rojiza que parece papel en capas. Vivo en las alturas cerca del Huaytapallana y atrapo el agua de la niebla.",
    correctPlant: "Quinual",
    image: "/assets/quinual.jpg",
    options: ["Colli", "Quinual", "Cantuta"],
    explanation: "¡Exacto! El Quinual (Polylepis racemosa) usa sus láminas rojizas como abrigo térmico contra el hielo.",
  },
  {
    clue: "Soy una planta pequeña de aroma delicioso a menta andina. Un mate con mis hojas alivia el dolor de estómago y el mal de altura (soroche).",
    correctPlant: "Muña",
    image: "/assets/muna.jpg",
    options: ["Quishuar", "Quinual", "Muña"],
    explanation: "¡Muy bien! La Muña (Minthostachys mollis) es la reina de las plantas medicinales de los Andes.",
  },
  {
    clue: "Mis hojas son verdes por arriba y plateadas/blanquecinas por debajo. Protejo las riberas del río Shullcas contra los derrumbes.",
    correctPlant: "Colli",
    image: "/assets/colli.jpg",
    options: ["Colli", "Cantuta", "Muña"],
    explanation: "¡Genial! El Colli (Buddleja incana) resiste vientos fuertes y protege los suelos de Huancayo.",
  },
];

// ============================================================================
// QUEST 3: "GUARDIÁN AL RESCATE (DECISIONES AMBIENTALES)"
// ============================================================================
const GUARDIAN_SCENARIOS = [
  {
    scenario: "Vas caminando por el Parque de la Identidad Wanka y ves a un niño a punto de arrancar todas las flores de una Cantuta para jugar.",
    question: "¿Qué hace un verdadero Guardián de BioWanka?",
    options: [
      {
        text: "Le explico amablemente que las flores alimentan a los colibríes y le invito a escanear la planta en BioWanka.",
        correct: true,
        reply: "¡Excelente actitud! Educar con empatía convierte a más niños en guardianes de nuestra flora.",
      },
      {
        text: "Arranco yo también otra rama para llevármela.",
        correct: false,
        reply: "Si arrancamos sus flores, la planta no podrá producir semillas ni alimentar a los polinizadores.",
      },
    ],
  },
  {
    scenario: "Tu salón de clases quiere hacer una jornada de reforestación en una ladera de Huancayo.",
    question: "¿Qué árboles deberían elegir para plantar?",
    options: [
      {
        text: "Árboles nativos como Quinual, Quishuar y Colli porque cuidan el agua del suelo.",
        correct: true,
        reply: "¡Decisión científica correcta! Las especies nativas están adaptadas a nuestro clima y conservan los manantiales.",
      },
      {
        text: "Solo plantas artificiales de plástico que no necesitan agua.",
        correct: false,
        reply: "Las plantas artificiales no producen oxígeno ni restauran el ecosistema.",
      },
    ],
  },
  {
    scenario: "Encuentras una planta nativa recién sembrada en tu barrio con la tierra muy seca a las 5:00 p.m.",
    question: "¿Cuál es la mejor acción?",
    options: [
      {
        text: "Regarla suavemente en la base de la raíz y registrarla en el mapa de BioWanka.",
        correct: true,
        reply: "¡Bravo! A las 5:00 p.m. el sol ya bajó y el agua penetrará directo a las raíces durante toda la noche.",
      },
      {
        text: "Echarle gaseosa o agua con detergente.",
        correct: false,
        reply: "Los azúcares y químicos dañan las raíces. Solo debemos usar agua limpia.",
      },
    ],
  },
];

// ============================================================================
// COMPONENTE INTERNO 2D #1: SIEMBRA FÍSICA 2D (CANVAS INTERACTIVO)
// ============================================================================
const PlantingCanvas2D: React.FC<{
  onComplete: () => void;
  onBack: () => void;
}> = ({ onComplete, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTool, setSelectedTool] = useState<"shovel" | "compost" | "seedling" | "water" | "mulch">("shovel");
  const [statusMsg, setStatusMsg] = useState("1. Selecciona la PALA y mantén presionado sobre la tierra central para cavar hasta 35 cm.");
  const [isDone, setIsDone] = useState(false);

  // Progress meters for UI display
  const [uiState, setUiState] = useState({
    digProgress: 0,
    compostProgress: 0,
    planted: false,
    waterProgress: 0,
    mulchProgress: 0,
  });

  // Mutable simulation state inside requestAnimationFrame
  const simRef = useRef({
    digProgress: 0,       // 0 to 100
    compostProgress: 0,   // 0 to 100
    planted: false,
    waterProgress: 0,     // 0 to 100
    mulchProgress: 0,     // 0 to 100
    treeGrowth: 0,        // 0 to 100 after completion
    pointerX: 350,
    pointerY: 200,
    isPointerDown: false,
    particles: [] as {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      life: number;
    }[],
    clouds: [
      { x: 80, y: 55, speed: 0.25 },
      { x: 320, y: 40, speed: 0.18 },
      { x: 540, y: 65, speed: 0.3 },
    ],
  });

  const activeToolRef = useRef(selectedTool);
  useEffect(() => {
    activeToolRef.current = selectedTool;
  }, [selectedTool]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frameCount = 0;

    const spawnParticles = (x: number, y: number, color: string, count: number, vyBase = -2) => {
      for (let i = 0; i < count; i++) {
        simRef.current.particles.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 3.5,
          vy: vyBase + (Math.random() - 0.5) * 2.5,
          color,
          size: 3 + Math.random() * 4,
          life: 25 + Math.random() * 20,
        });
      }
    };

    const render = () => {
      frameCount++;
      const s = simRef.current;
      const tool = activeToolRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const groundY = 235;
      const holeCenterX = W / 2;

      // 1. Apply active tool physics when pointer is held down near the center plot
      const nearHole = Math.abs(s.pointerX - holeCenterX) < 110;
      if (s.isPointerDown && nearHole) {
        if (tool === "shovel" && s.digProgress < 100) {
          s.digProgress = Math.min(100, s.digProgress + 1.1);
          if (frameCount % 2 === 0) {
            spawnParticles(s.pointerX, groundY + (s.digProgress * 0.7), "#78350F", 3, -3.5);
          }
          if (s.digProgress >= 100) {
            setSelectedTool("compost");
            setStatusMsg("¡Hoyo de 35 cm listo! 2. Ahora vierte el COMPOST ORGÁNICO manteniendo presionado sobre el hoyo.");
          }
        } else if (tool === "compost" && s.digProgress >= 100 && s.compostProgress < 100) {
          s.compostProgress = Math.min(100, s.compostProgress + 1.2);
          if (frameCount % 2 === 0) {
            spawnParticles(s.pointerX, s.pointerY, "#3F2305", 3, 2.5);
          }
          if (s.compostProgress >= 100) {
            setSelectedTool("seedling");
            setStatusMsg("¡Sustrato nutritivo listo! 3. Haz clic en el hoyo con el PLANTÓN DE QUINUAL para sembrarlo.");
          }
        } else if (tool === "seedling" && s.compostProgress >= 100 && !s.planted) {
          s.planted = true;
          spawnParticles(holeCenterX, groundY + 10, "#15803D", 18, -3);
          setSelectedTool("water");
          setStatusMsg("¡Quinual en tierra! 4. Usa la REGADERA manteniendo presionado para darle su riego de asiento.");
        } else if (tool === "water" && s.planted && s.waterProgress < 100) {
          s.waterProgress = Math.min(100, s.waterProgress + 1.1);
          if (frameCount % 2 === 0) {
            spawnParticles(s.pointerX, Math.min(s.pointerY, groundY - 40), "#38BDF8", 4, 3.5);
          }
          if (s.waterProgress >= 100) {
            setSelectedTool("mulch");
            setStatusMsg("¡Hidratación óptima! 5. Coloca el MULCH PROTECTOR (Ichu/Hojas) en la base contra la helada.");
          }
        } else if (tool === "mulch" && s.waterProgress >= 100 && s.mulchProgress < 100) {
          s.mulchProgress = Math.min(100, s.mulchProgress + 1.4);
          if (frameCount % 2 === 0) {
            spawnParticles(s.pointerX, groundY - 10, "#EAB308", 3, 1.8);
          }
          if (s.mulchProgress >= 100 && !isDone) {
            setStatusMsg("🎉 ¡Felicidades! Sembraste y protegiste tu árbol nativo en el Valle del Mantaro (+35 pts).");
            setIsDone(true);
            onComplete();
          }
        }
      }

      if (s.mulchProgress >= 100 && s.treeGrowth < 100) {
        s.treeGrowth = Math.min(100, s.treeGrowth + 0.8);
      }

      // Sync UI bars every 6 frames
      if (frameCount % 6 === 0) {
        setUiState({
          digProgress: Math.round(s.digProgress),
          compostProgress: Math.round(s.compostProgress),
          planted: s.planted,
          waterProgress: Math.round(s.waterProgress),
          mulchProgress: Math.round(s.mulchProgress),
        });
      }

      // 2. DRAW ANDEAN SKY & MOUNTAINS (Huaytapallana backdrop)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
      skyGrad.addColorStop(0, "#BAE6FD");
      skyGrad.addColorStop(1, "#F0F9FF");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, groundY);

      // Sun
      ctx.fillStyle = "#FDE047";
      ctx.beginPath();
      ctx.arc(W - 75, 55, 26, 0, Math.PI * 2);
      ctx.fill();

      // Distant Andean Mountains
      ctx.fillStyle = "#94A3B8";
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(120, 115);
      ctx.lineTo(250, 190);
      ctx.lineTo(420, 95);
      ctx.lineTo(590, 185);
      ctx.lineTo(W, 130);
      ctx.lineTo(W, groundY);
      ctx.closePath();
      ctx.fill();

      // Snow peak on Huaytapallana
      ctx.fillStyle = "#F8FAFC";
      ctx.beginPath();
      ctx.moveTo(420, 95);
      ctx.lineTo(385, 135);
      ctx.lineTo(405, 130);
      ctx.lineTo(420, 140);
      ctx.lineTo(435, 128);
      ctx.lineTo(453, 135);
      ctx.closePath();
      ctx.fill();

      // Moving Clouds
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      s.clouds.forEach((c) => {
        c.x = (c.x + c.speed) % (W + 80);
        ctx.beginPath();
        ctx.arc(c.x, c.y, 18, 0, Math.PI * 2);
        ctx.arc(c.x + 16, c.y - 5, 22, 0, Math.PI * 2);
        ctx.arc(c.x + 34, c.y, 16, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. DRAW SOIL CROSS-SECTION & GRASS
      ctx.fillStyle = "#4ADE80";
      ctx.fillRect(0, groundY - 8, W, 12);

      const soilGrad = ctx.createLinearGradient(0, groundY, 0, H);
      soilGrad.addColorStop(0, "#78350F");
      soilGrad.addColorStop(1, "#451A03");
      ctx.fillStyle = soilGrad;
      ctx.fillRect(0, groundY, W, H - groundY);

      // Target guide box for 35cm hole
      const maxHoleDepth = 95;
      const holeWidth = 130;
      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.strokeRect(holeCenterX - holeWidth / 2, groundY, holeWidth, maxHoleDepth);
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "bold 11px sans-serif";
      ctx.fillText("Meta: 35 cm prof.", holeCenterX + holeWidth / 2 + 10, groundY + maxHoleDepth - 5);

      // 4. DRAW DUG HOLE CAVITY
      const currentDepth = (s.digProgress / 100) * maxHoleDepth;
      if (currentDepth > 2) {
        ctx.fillStyle = "#271202";
        ctx.beginPath();
        ctx.roundRect(
          holeCenterX - holeWidth / 2,
          groundY - 4,
          holeWidth,
          currentDepth + 4,
          [0, 0, 24, 24]
        );
        ctx.fill();
      }

      // 5. DRAW COMPOST LAYER INSIDE HOLE
      if (s.compostProgress > 0) {
        const compH = (s.compostProgress / 100) * 34;
        ctx.fillStyle = "#1C1917";
        ctx.beginPath();
        ctx.roundRect(
          holeCenterX - holeWidth / 2 + 6,
          groundY + currentDepth - compH,
          holeWidth - 12,
          compH,
          12
        );
        ctx.fill();
      }

      // 6. DRAW MOISTURE GLOW WHEN WATERED
      if (s.waterProgress > 0) {
        ctx.fillStyle = `rgba(56, 189, 248, ${(s.waterProgress / 100) * 0.38})`;
        ctx.beginPath();
        ctx.roundRect(
          holeCenterX - holeWidth / 2 + 4,
          groundY + 10,
          holeWidth - 8,
          currentDepth - 10,
          16
        );
        ctx.fill();
      }

      // 7. DRAW PLANTED QUINUAL SEEDLING & DYNAMIC GROWTH
      if (s.planted) {
        const growthBoost = (s.treeGrowth / 100) * 45;
        const stemHeight = 75 + growthBoost;

        // Root ball in the hole
        ctx.fillStyle = "#573014";
        ctx.beginPath();
        ctx.arc(holeCenterX, groundY + 48, 26, 0, Math.PI * 2);
        ctx.fill();

        // Roots
        ctx.strokeStyle = "#A16207";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(holeCenterX, groundY + 45);
        ctx.lineTo(holeCenterX - 22, groundY + 72);
        ctx.moveTo(holeCenterX, groundY + 45);
        ctx.lineTo(holeCenterX + 22, groundY + 72);
        ctx.stroke();

        // Quinual reddish papery trunk
        ctx.strokeStyle = "#9A3412";
        ctx.lineWidth = 8 + (s.treeGrowth / 100) * 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(holeCenterX, groundY + 35);
        ctx.lineTo(holeCenterX, groundY - stemHeight);
        ctx.stroke();

        // Foliage canopy
        const radius = 28 + (s.treeGrowth / 100) * 20;
        ctx.fillStyle = "#15803D";
        ctx.beginPath();
        ctx.arc(holeCenterX, groundY - stemHeight, radius, 0, Math.PI * 2);
        ctx.arc(holeCenterX - 22, groundY - stemHeight + 14, radius * 0.8, 0, Math.PI * 2);
        ctx.arc(holeCenterX + 22, groundY - stemHeight + 14, radius * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#22C55E";
        ctx.beginPath();
        ctx.arc(holeCenterX - 6, groundY - stemHeight - 6, radius * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      // 8. DRAW MULCH (ICHU / DRY LEAVES + WARM STONES) AT BASE
      if (s.mulchProgress > 0) {
        const alpha = s.mulchProgress / 100;
        ctx.fillStyle = `rgba(234, 179, 8, ${alpha})`;
        ctx.beginPath();
        ctx.roundRect(holeCenterX - 65, groundY - 10, 130, 14, 8);
        ctx.fill();

        // Thermal Andean stones on both sides
        ctx.fillStyle = `rgba(100, 116, 139, ${alpha})`;
        ctx.beginPath();
        ctx.arc(holeCenterX - 58, groundY - 6, 11, 0, Math.PI * 2);
        ctx.arc(holeCenterX + 58, groundY - 6, 11, 0, Math.PI * 2);
        ctx.fill();
      }

      // 9. UPDATE & DRAW PARTICLES
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life -= 1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) {
          s.particles.splice(i, 1);
        }
      }

      // 10. DRAW FLOATING CURSOR TOOL INDICATOR
      ctx.save();
      ctx.translate(s.pointerX, s.pointerY);
      ctx.fillStyle = "rgba(24, 24, 26, 0.85)";
      ctx.beginPath();
      ctx.roundRect(-42, -38, 84, 24, 12);
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      const toolLabel =
        tool === "shovel"
          ? "🪏 Cavar"
          : tool === "compost"
          ? "🍂 Compost"
          : tool === "seedling"
          ? "🌱 Sembrar"
          : tool === "water"
          ? "💧 Regar"
          : "🌾 Abrigar";
      ctx.fillText(toolLabel, 0, -22);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isDone, onComplete]);

  const updatePointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    simRef.current.pointerX = (e.clientX - rect.left) * scaleX;
    simRef.current.pointerY = (e.clientY - rect.top) * scaleY;
  };

  const resetSim = () => {
    simRef.current.digProgress = 0;
    simRef.current.compostProgress = 0;
    simRef.current.planted = false;
    simRef.current.waterProgress = 0;
    simRef.current.mulchProgress = 0;
    simRef.current.treeGrowth = 0;
    simRef.current.particles = [];
    setSelectedTool("shovel");
    setIsDone(false);
    setStatusMsg("1. Selecciona la PALA y mantén presionado sobre la tierra central para cavar hasta 35 cm.");
  };

  const tools = [
    { id: "shovel", label: "1. Pala (35cm)", emoji: "🪏", done: uiState.digProgress >= 100, pct: `${uiState.digProgress}%` },
    { id: "compost", label: "2. Compost", emoji: "🍂", done: uiState.compostProgress >= 100, pct: `${uiState.compostProgress}%` },
    { id: "seedling", label: "3. Plantón", emoji: "🌱", done: uiState.planted, pct: uiState.planted ? "100%" : "0%" },
    { id: "water", label: "4. Regadera", emoji: "💧", done: uiState.waterProgress >= 100, pct: `${uiState.waterProgress}%` },
    { id: "mulch", label: "5. Mulch Ichu", emoji: "🌾", done: uiState.mulchProgress >= 100, pct: `${uiState.mulchProgress}%` },
  ] as const;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-5 sm:p-8 max-w-4xl mx-auto animate-in zoom-in-95 duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
        <button
          onClick={onBack}
          className="text-xs font-extrabold text-slate-600 hover:text-[#18181A] bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
        >
          ← Volver a la consola de juegos
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#15803D] bg-[#DFF5E3] px-3.5 py-1 rounded-full">
            🎮 Juego 2D Interactivo · Taller de Siembra
          </span>
          <button
            onClick={resetSim}
            className="text-xs font-bold text-slate-500 hover:text-[#18181A] bg-slate-100 p-2 rounded-full cursor-pointer"
            title="Reiniciar terreno"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Instruction Banner */}
      <div className="bg-[#18181A] text-white px-5 py-3.5 rounded-2xl mb-4 flex items-center justify-between gap-3">
        <p className="text-xs sm:text-sm font-bold leading-snug">{statusMsg}</p>
        {isDone && (
          <span className="shrink-0 bg-emerald-400 text-[#18181A] px-3 py-1 rounded-full text-xs font-black">
            +35 PTS
          </span>
        )}
      </div>

      {/* Tool Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
        {tools.map((t) => {
          const active = selectedTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTool(t.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                active
                  ? "bg-[#18181A] text-white border-[#18181A] shadow-md scale-[1.02]"
                  : t.done
                  ? "bg-[#DFF5E3]/70 border-emerald-300 text-emerald-950"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">{t.emoji}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  active ? "bg-white/20 text-white" : "bg-white text-slate-700"
                }`}>
                  {t.pct}
                </span>
              </div>
              <span className="text-xs font-extrabold tracking-tight">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive 2D Canvas */}
      <div className="relative rounded-[2rem] overflow-hidden border-2 border-slate-200 shadow-inner bg-sky-100 select-none touch-none">
        <canvas
          ref={canvasRef}
          width={700}
          height={360}
          onPointerDown={(e) => {
            simRef.current.isPointerDown = true;
            updatePointerPos(e);
          }}
          onPointerMove={updatePointerPos}
          onPointerUp={() => {
            simRef.current.isPointerDown = false;
          }}
          onPointerLeave={() => {
            simRef.current.isPointerDown = false;
          }}
          className="w-full h-auto block cursor-crosshair"
        />
      </div>
      <p className="text-[11px] text-slate-400 font-semibold text-center mt-2.5">
        💡 Mantén presionado el clic izquierdo (o tu dedo en pantalla táctil) sobre el hoyo central para usar cada herramienta física.
      </p>
    </div>
  );
};

// ============================================================================
// COMPONENTE INTERNO 2D #2: GUARDIÁN DE LA LLUVIA (ARCADE CON TECLADO/MOUSE)
// ============================================================================
const GuardianCatcher2D: React.FC<{
  onComplete: () => void;
  onBack: () => void;
}> = ({ onComplete, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hud, setHud] = useState({ score: 0, lives: 3, won: false, gameOver: false });

  const stateRef = useRef({
    playerX: 310,
    score: 0,
    lives: 3,
    won: false,
    gameOver: false,
    keys: { left: false, right: false },
    items: [] as {
      x: number;
      y: number;
      vy: number;
      type: "water" | "seed" | "compost" | "frost" | "trash";
    }[],
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") stateRef.current.keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") stateRef.current.keys.right = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") stateRef.current.keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") stateRef.current.keys.right = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const loop = () => {
      frame++;
      const s = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;

      if (!s.won && !s.gameOver) {
        // Keyboard movement
        if (s.keys.left) s.playerX = Math.max(45, s.playerX - 6.5);
        if (s.keys.right) s.playerX = Math.min(W - 45, s.playerX + 6.5);

        // Spawn falling items
        if (frame % 32 === 0) {
          const rand = Math.random();
          const type =
            rand < 0.38
              ? "water"
              : rand < 0.62
              ? "seed"
              : rand < 0.74
              ? "compost"
              : rand < 0.88
              ? "frost"
              : "trash";
          s.items.push({
            x: 40 + Math.random() * (W - 80),
            y: -20,
            vy: 2.4 + Math.random() * 1.8,
            type,
          });
        }

        // Update items & collisions
        for (let i = s.items.length - 1; i >= 0; i--) {
          const it = s.items[i];
          it.y += it.vy;

          // Check collision with Guardian basket (y around H - 65)
          const hitX = Math.abs(it.x - s.playerX) < 46;
          const hitY = it.y > H - 82 && it.y < H - 30;

          if (hitX && hitY) {
            if (it.type === "water" || it.type === "seed" || it.type === "compost") {
              s.score = Math.min(100, s.score + (it.type === "seed" ? 12 : 10));
              if (s.score >= 100 && !s.won) {
                s.won = true;
                onComplete();
              }
            } else {
              s.lives = Math.max(0, s.lives - 1);
              if (s.lives <= 0) {
                s.gameOver = true;
              }
            }
            s.items.splice(i, 1);
            setHud({ score: s.score, lives: s.lives, won: s.won, gameOver: s.gameOver });
            continue;
          }

          if (it.y > H + 20) {
            s.items.splice(i, 1);
          }
        }
      }

      // Draw Sky & Growing Forest Background
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#1E293B");
      sky.addColorStop(1, "#0F172A");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Draw growing native trees in the background proportional to score
      const treePositions = [110, 250, 450, 590];
      treePositions.forEach((tx) => {
        const h = 20 + (s.score / 100) * 85;
        ctx.strokeStyle = "#78350F";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(tx, H - 30);
        ctx.lineTo(tx, H - 30 - h);
        ctx.stroke();

        ctx.fillStyle = "rgba(34, 197, 94, 0.35)";
        ctx.beginPath();
        ctx.arc(tx, H - 30 - h, 18 + (s.score / 100) * 18, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ground
      ctx.fillStyle = "#15803D";
      ctx.fillRect(0, H - 32, W, 32);

      // Draw Player Basket / Pot
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.roundRect(s.playerX - 42, H - 68, 84, 36, [6, 6, 20, 20]);
      ctx.fill();

      // Sprout inside player pot
      ctx.fillStyle = "#4ADE80";
      ctx.beginPath();
      ctx.arc(s.playerX, H - 74, 12 + (s.score / 100) * 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GUARDIÁN", s.playerX, H - 46);

      // Draw Falling Items
      ctx.font = "22px sans-serif";
      s.items.forEach((it) => {
        const emoji =
          it.type === "water"
            ? "💧"
            : it.type === "seed"
            ? "🌱"
            : it.type === "compost"
            ? "☀️"
            : it.type === "frost"
            ? "❄️"
            : "🗑️";
        ctx.fillText(emoji, it.x, it.y);
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  const restartArcade = () => {
    stateRef.current = {
      playerX: 310,
      score: 0,
      lives: 3,
      won: false,
      gameOver: false,
      keys: { left: false, right: false },
      items: [],
    };
    setHud({ score: 0, lives: 3, won: false, gameOver: false });
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-5 sm:p-8 max-w-4xl mx-auto animate-in zoom-in-95 duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
        <button
          onClick={onBack}
          className="text-xs font-extrabold text-slate-600 hover:text-[#18181A] bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
        >
          ← Volver a la consola de juegos
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-black">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${i < hud.lives ? "fill-rose-500 text-rose-500" : "text-rose-200"}`}
              />
            ))}
          </div>
          <span className="text-xs font-black bg-[#EDE8F8] text-[#6D28D9] px-3.5 py-1 rounded-full">
            Reforestación: {hud.score}%
          </span>
        </div>
      </div>

      <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span>
          🎮 Usa las <strong>Flechas ⬅️ ➡️</strong>, teclas <strong>A / D</strong> o mueve el mouse/dedo para atrapar 💧 🌱 ☀️ y esquivar ❄️ 🗑️.
        </span>
        <button
          onClick={restartArcade}
          className="bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full font-bold cursor-pointer"
        >
          Reiniciar
        </button>
      </div>

      <div className="relative rounded-[2rem] overflow-hidden border-2 border-slate-800 shadow-lg select-none touch-none">
        <canvas
          ref={canvasRef}
          width={700}
          height={350}
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const scaleX = e.currentTarget.width / rect.width;
            stateRef.current.playerX = Math.max(
              45,
              Math.min(655, (e.clientX - rect.left) * scaleX)
            );
          }}
          className="w-full h-auto block cursor-ew-resize"
        />

        {/* Overlay Win or Game Over */}
        {(hud.won || hud.gameOver) && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-black font-heading mb-2">
              {hud.won ? "🎉 ¡Bosque Wanka Reforestado! (+30 pts)" : "❄️ ¡La helada detuvo la siembra!"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mb-5">
              {hud.won
                ? "Atrapaste suficiente agua de lluvia, semillas nativas y sol andino para hacer crecer los Quinuales."
                : "Esquiva los bloques de granizo (❄️) y residuos (🗑️) para mantener sana tu maceta."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={restartArcade}
                className="bg-[#B9D5FD] text-[#18181A] px-6 py-2.5 rounded-full text-xs font-black font-heading cursor-pointer"
              >
                Jugar de nuevo
              </button>
              <button
                onClick={onBack}
                className="bg-white/15 text-white px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer"
              >
                Salir al Lobby
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE INTERNO 2D #3: ESCUDO DEL VALLE (DEFENSA EN TIEMPO REAL)
// ============================================================================
const ValleyDefender2D: React.FC<{
  onComplete: () => void;
  onBack: () => void;
}> = ({ onComplete, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [timeLeft, setTimeLeft] = useState(25);
  const [treeHp, setTreeHp] = useState(100);
  const [bugsCleared, setBugsCleared] = useState(0);
  const [finished, setFinished] = useState<"playing" | "won" | "lost">("playing");

  const defRef = useRef({
    hp: 100,
    cleared: 0,
    status: "playing" as "playing" | "won" | "lost",
    threats: [] as {
      id: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      kind: "bug" | "frost";
    }[],
    popups: [] as { x: number; y: number; life: number }[],
  });

  // Countdown timer
  useEffect(() => {
    if (finished !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          defRef.current.status = "won";
          setFinished("won");
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const d = defRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const centerX = W / 2;
      const centerY = H / 2 + 20;

      if (d.status === "playing") {
        // Spawn threats from edges moving toward the sacred Cantuta tree
        if (frame % 42 === 0) {
          const side = Math.random() < 0.5 ? 0 : W;
          const startX = side === 0 ? -20 : W + 20;
          const startY = 50 + Math.random() * (H - 90);
          const angle = Math.atan2(centerY - startY, centerX - startX);
          const speed = 1.45 + Math.random() * 0.9;
          d.threats.push({
            id: Math.random(),
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            kind: Math.random() < 0.6 ? "bug" : "frost",
          });
        }

        // Move threats
        for (let i = d.threats.length - 1; i >= 0; i--) {
          const t = d.threats[i];
          t.x += t.vx;
          t.y += t.vy;

          const dist = Math.hypot(t.x - centerX, t.y - centerY);
          if (dist < 42) {
            d.hp = Math.max(0, d.hp - 15);
            setTreeHp(d.hp);
            d.threats.splice(i, 1);
            if (d.hp <= 0) {
              d.status = "lost";
              setFinished("lost");
            }
          }
        }
      }

      // Draw Meadow Background
      const bg = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 380);
      bg.addColorStop(0, "#DCFCE7");
      bg.addColorStop(1, "#86EFAC");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Draw Protective Circle
      ctx.strokeStyle = "rgba(21, 128, 61, 0.25)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 58, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Sacred Cantuta Tree in Center
      ctx.fillStyle = "#78350F";
      ctx.fillRect(centerX - 10, centerY - 5, 20, 48);

      ctx.fillStyle = "#15803D";
      ctx.beginPath();
      ctx.arc(centerX, centerY - 22, 38, 0, Math.PI * 2);
      ctx.fill();

      // Cantuta red/pink flowers
      ctx.fillStyle = "#F43F5E";
      ctx.beginPath();
      ctx.arc(centerX - 16, centerY - 28, 6, 0, Math.PI * 2);
      ctx.arc(centerX + 18, centerY - 20, 6, 0, Math.PI * 2);
      ctx.arc(centerX, centerY - 40, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw Threats
      ctx.font = "26px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      d.threats.forEach((t) => {
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.arc(t.x, t.y, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(t.kind === "bug" ? "🐛" : "❄️", t.x, t.y);
      });

      // Draw Hit Popups
      for (let i = d.popups.length - 1; i >= 0; i--) {
        const p = d.popups[i];
        p.life -= 1;
        ctx.fillStyle = "#15803D";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText("✨ ¡Defendido!", p.x, p.y - (20 - p.life));
        if (p.life <= 0) d.popups.splice(i, 1);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleCanvasClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const d = defRef.current;
    for (let i = d.threats.length - 1; i >= 0; i--) {
      const t = d.threats[i];
      if (Math.hypot(t.x - clickX, t.y - clickY) < 38) {
        d.threats.splice(i, 1);
        d.cleared += 1;
        setBugsCleared(d.cleared);
        d.popups.push({ x: clickX, y: clickY, life: 20 });
        break;
      }
    }
  };

  const resetDefender = () => {
    defRef.current = {
      hp: 100,
      cleared: 0,
      status: "playing",
      threats: [],
      popups: [],
    };
    setTreeHp(100);
    setBugsCleared(0);
    setTimeLeft(25);
    setFinished("playing");
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-5 sm:p-8 max-w-4xl mx-auto animate-in zoom-in-95 duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
        <button
          onClick={onBack}
          className="text-xs font-extrabold text-slate-600 hover:text-[#18181A] bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
        >
          ← Volver a la consola de juegos
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            Salud del Árbol: {treeHp}%
          </span>
          <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            ⏱️ {timeLeft}s
          </span>
          <span className="text-xs font-black bg-slate-100 text-[#18181A] px-3 py-1 rounded-full">
            Neutralizados: {bugsCleared}
          </span>
        </div>
      </div>

      <div className="bg-[#18181A] text-white px-5 py-3 rounded-2xl mb-4 text-xs font-bold">
        🛡️ ¡Haz clic rápido sobre las plagas (🐛) y heladas (❄️) antes de que lleguen al árbol de Cantuta en el centro! Aguanta 25 segundos.
      </div>

      <div className="relative rounded-[2rem] overflow-hidden border-2 border-emerald-300 shadow-lg select-none touch-none">
        <canvas
          ref={canvasRef}
          width={700}
          height={340}
          onPointerDown={handleCanvasClick}
          className="w-full h-auto block cursor-pointer"
        />

        {finished !== "playing" && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-black font-heading mb-2">
              {finished === "won"
                ? "🌺 ¡Protegiste la Cantuta Sagrada! (+25 pts)"
                : "¡Las plagas debilitaron el árbol!"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mb-5">
              {finished === "won"
                ? `Neutralizaste ${bugsCleared} amenazas climáticas y biológicas manteniendo vivo nuestro árbol nativo.`
                : "Inténtalo de nuevo haciendo clic sobre las amenazas apenas entren al prado."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={resetDefender}
                className="bg-[#B9D5FD] text-[#18181A] px-6 py-2.5 rounded-full text-xs font-black font-heading cursor-pointer"
              >
                Jugar otra vez
              </button>
              <button
                onClick={onBack}
                className="bg-white/15 text-white px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer"
              >
                Volver al Lobby
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL: GAMES SECTION (CON JUEGOS 2D + QUESTS DE CLIC)
// ============================================================================
export const GamesSection: React.FC<GamesSectionProps> = ({ variant = "dashboard" }) => {
  const { verifyAndCompleteObjective, isObjectiveCompleted } = useGame();

  // Category switcher in Lobby: "all" | "arcade2d" | "quests"
  const [modeFilter, setModeFilter] = useState<"all" | "arcade2d" | "quests">("all");

  // Active game view
  const [activeGame, setActiveGame] = useState<
    | "lobby"
    | "2d-planting"
    | "2d-catcher"
    | "2d-defender"
    | "quest-plant"
    | "quest-detective"
    | "quest-guardian"
  >("lobby");

  // --- State for Quest 1: Mi Primera Planta (Clicks) ---
  const [plantStepIdx, setPlantStepIdx] = useState(0);
  const [plantFeedback, setPlantFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [plantFinished, setPlantFinished] = useState(false);

  // --- State for Quest 2: Detective Botánico (Clicks) ---
  const [detectiveIdx, setDetectiveIdx] = useState(0);
  const [detectiveFeedback, setDetectiveFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [detectiveFinished, setDetectiveFinished] = useState(false);

  // --- State for Quest 3: Guardián al Rescate (Clicks) ---
  const [guardianIdx, setGuardianIdx] = useState(0);
  const [guardianFeedback, setGuardianFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [guardianFinished, setGuardianFinished] = useState(false);

  // Completion statuses
  const is2DPlantDone = isObjectiveCompleted("arcade-2d-planting");
  const is2DCatcherDone = isObjectiveCompleted("arcade-2d-catcher");
  const is2DDefenderDone = isObjectiveCompleted("arcade-2d-defender");
  const isQuest1Completed = isObjectiveCompleted("minigame-first-plant");
  const isQuest2Completed = isObjectiveCompleted("minigame-detective");
  const isQuest3Completed = isObjectiveCompleted("minigame-guardian");

  // Handlers for Quest 1
  const handleSelectPlantOption = (opt: PlantingStep["options"][0]) => {
    setPlantFeedback({ text: opt.feedback, isCorrect: opt.isCorrect });
  };

  const handleNextPlantStep = () => {
    setPlantFeedback(null);
    if (plantStepIdx + 1 < PLANTING_STEPS.length) {
      setPlantStepIdx(plantStepIdx + 1);
    } else {
      setPlantFinished(true);
      verifyAndCompleteObjective(
        "minigame-first-plant",
        "Quest: Guía Mi Primera Planta",
        30,
        "quiz",
        "quinual"
      );
    }
  };

  const resetQuest1 = () => {
    setPlantStepIdx(0);
    setPlantFeedback(null);
    setPlantFinished(false);
  };

  // Handlers for Quest 2
  const handleSelectDetective = (choice: string) => {
    const current = DETECTIVE_QUESTIONS[detectiveIdx];
    if (choice === current.correctPlant) {
      setDetectiveFeedback({ text: current.explanation, isCorrect: true });
    } else {
      setDetectiveFeedback({
        text: `No es ${choice}. Lee bien la pista sobre sus flores, aroma o corteza e intenta de nuevo.`,
        isCorrect: false,
      });
    }
  };

  const handleNextDetective = () => {
    setDetectiveFeedback(null);
    if (detectiveIdx + 1 < DETECTIVE_QUESTIONS.length) {
      setDetectiveIdx(detectiveIdx + 1);
    } else {
      setDetectiveFinished(true);
      verifyAndCompleteObjective(
        "minigame-detective",
        "Quest: Detective Botánico",
        20,
        "quiz"
      );
    }
  };

  const resetQuest2 = () => {
    setDetectiveIdx(0);
    setDetectiveFeedback(null);
    setDetectiveFinished(false);
  };

  // Handlers for Quest 3
  const handleSelectGuardian = (opt: { text: string; correct: boolean; reply: string }) => {
    setGuardianFeedback({ text: opt.reply, isCorrect: opt.correct });
  };

  const handleNextGuardian = () => {
    setGuardianFeedback(null);
    if (guardianIdx + 1 < GUARDIAN_SCENARIOS.length) {
      setGuardianIdx(guardianIdx + 1);
    } else {
      setGuardianFinished(true);
      verifyAndCompleteObjective(
        "minigame-guardian",
        "Quest: Guardián al Rescate",
        20,
        "quiz"
      );
    }
  };

  const resetQuest3 = () => {
    setGuardianIdx(0);
    setGuardianFeedback(null);
    setGuardianFinished(false);
  };

  return (
    <section
      id="seccion-juega"
      className={
        variant === "landing"
          ? "w-full bg-[#FAFAFA] border-t border-slate-100 py-14 sm:py-20 px-4 sm:px-8 animate-in fade-in duration-300"
          : "w-full animate-in fade-in duration-300"
      }
    >
      <div className={variant === "landing" ? "max-w-6xl mx-auto" : "w-full"}>
        
        {/* ============================================================ */}
        {/* VISTA LOBBY DE JUEGOS (2D ARCADE + QUESTS DE CLIC)           */}
        {/* ============================================================ */}
        {activeGame === "lobby" && (
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFF5E3] text-[#15803D] text-[10px] font-black uppercase tracking-widest mb-2.5">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Juegos 2D en Tiempo Real + Quests Interactivas</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-[#18181A] tracking-tight">
                  Zona Juega y Aprende BioWanka
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  Elige cómo quieres aprender hoy: juega en nuestros <strong>simuladores 2D con físicas y teclado</strong> o resuelve las <strong>Quests guiadas por clics</strong> a tu propio ritmo.
                </p>
              </div>

              {/* Filter Switcher Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "Todos (6)" },
                  { id: "arcade2d", label: "🕹️ Juegos 2D Interactivos (3)" },
                  { id: "quests", label: "🎯 Quests por Clics (3)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setModeFilter(tab.id as "all" | "arcade2d" | "quests")}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                      modeFilter === tab.id
                        ? "bg-[#18181A] text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:text-[#18181A]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* BLOQUE 1: JUEGOS 2D CON FÍSICAS Y MOVIMIENTO (CANVAS)    */}
            {/* ======================================================== */}
            {(modeFilter === "all" || modeFilter === "arcade2d") && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Joystick className="w-5 h-5 text-[#15803D]" />
                  <h3 className="text-lg font-black font-heading text-[#18181A]">
                    Juegos 2D en Tiempo Real (Canvas & Físicas)
                  </h3>
                  <span className="text-[11px] font-extrabold bg-[#18181A] text-white px-2.5 py-0.5 rounded-full">
                    60 FPS
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* 2D GAME 1: TALLER DE SIEMBRA FÍSICA */}
                  <div className="bg-[#18181A] text-white rounded-[2.2rem] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-[#DFF5E3] text-[#15803D] flex items-center justify-center shadow-sm">
                          <Shovel className="w-6 h-6 stroke-[2.3]" />
                        </div>
                        <span className="bg-[#B9D5FD] text-[#18181A] px-3.5 py-1 rounded-full text-xs font-black font-heading flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#18181A]" />
                          <span>+35 pts</span>
                        </span>
                      </div>

                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A7F3D0]">
                        Simulador 2D Físico · Mouse / Táctil
                      </span>
                      <h4 className="text-xl font-black font-heading text-white mt-1 mb-2">
                        Siembra tu Planta en 2D
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                        Usa la pala física para excavar la tierra hasta 35 cm, vierte partículas de compost, planta el Quinual y riégalo con lluvia interactiva en tiempo real.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-emerald-300">
                        {is2DPlantDone ? "✓ Superado (+35 pts)" : "5 herramientas 2D"}
                      </span>
                      <button
                        onClick={() => setActiveGame("2d-planting")}
                        className="inline-flex items-center gap-2 bg-[#DFF5E3] hover:bg-emerald-200 text-[#18181A] px-5 py-2.5 rounded-full text-xs font-black font-heading transition-transform active:scale-95 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#18181A]" />
                        <span>Jugar en 2D</span>
                      </button>
                    </div>
                  </div>

                  {/* 2D GAME 2: GUARDIÁN DE LA LLUVIA (ARCADE TECLADO) */}
                  <div className="bg-[#18181A] text-white rounded-[2.2rem] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-[#EDE8F8] text-[#6D28D9] flex items-center justify-center shadow-sm">
                          <CloudRain className="w-6 h-6 stroke-[2.3]" />
                        </div>
                        <span className="bg-[#B9D5FD] text-[#18181A] px-3.5 py-1 rounded-full text-xs font-black font-heading flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#18181A]" />
                          <span>+30 pts</span>
                        </span>
                      </div>

                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-300">
                        Arcade 2D · Teclado (⬅️ ➡️) o Mouse
                      </span>
                      <h4 className="text-xl font-black font-heading text-white mt-1 mb-2">
                        Atrapa la Lluvia Andina
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                        Muévete de izquierda a derecha por el Valle del Mantaro atrapando gotas de lluvia, semillas y sol mientras esquivas la helada y la basura.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-purple-300">
                        {is2DCatcherDone ? "✓ Superado (+30 pts)" : "Acción Arcade"}
                      </span>
                      <button
                        onClick={() => setActiveGame("2d-catcher")}
                        className="inline-flex items-center gap-2 bg-[#EDE8F8] hover:bg-purple-200 text-[#18181A] px-5 py-2.5 rounded-full text-xs font-black font-heading transition-transform active:scale-95 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#18181A]" />
                        <span>Jugar en 2D</span>
                      </button>
                    </div>
                  </div>

                  {/* 2D GAME 3: ESCUDO DEL VALLE (DEFENSA REFLEJOS) */}
                  <div className="bg-[#18181A] text-white rounded-[2.2rem] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-[#F8F2DC] text-[#B45309] flex items-center justify-center shadow-sm">
                          <Shield className="w-6 h-6 stroke-[2.3]" />
                        </div>
                        <span className="bg-[#B9D5FD] text-[#18181A] px-3.5 py-1 rounded-full text-xs font-black font-heading flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#18181A]" />
                          <span>+25 pts</span>
                        </span>
                      </div>

                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                        Defensa 2D · Reflejos Rápidos
                      </span>
                      <h4 className="text-xl font-black font-heading text-white mt-1 mb-2">
                        Defensor de la Cantuta
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                        Protege el árbol sagrado en el centro del prado neutralizando plagas y bloques de granizo en movimiento durante 25 segundos.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-amber-300">
                        {is2DDefenderDone ? "✓ Superado (+25 pts)" : "Reto de 25 seg"}
                      </span>
                      <button
                        onClick={() => setActiveGame("2d-defender")}
                        className="inline-flex items-center gap-2 bg-[#F8F2DC] hover:bg-amber-200 text-[#18181A] px-5 py-2.5 rounded-full text-xs font-black font-heading transition-transform active:scale-95 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#18181A]" />
                        <span>Jugar en 2D</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* BLOQUE 2: QUESTS EDUCATIVAS POR CLICS (PASO A PASO)      */}
            {/* ======================================================== */}
            {(modeFilter === "all" || modeFilter === "quests") && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MousePointerClick className="w-5 h-5 text-[#6D28D9]" />
                  <h3 className="text-lg font-black font-heading text-[#18181A]">
                    Quests Guiadas por Clics (Trivias & Decisiones)
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* QUEST 1 CARD: MI PRIMERA PLANTA (Mint Green) */}
                  <div className="bg-[#DFF5E3] rounded-[2.2rem] p-6 sm:p-7 flex flex-col justify-between border border-emerald-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#15803D]">
                          <Sprout className="w-6 h-6 stroke-[2.3]" />
                        </div>
                        <span className="bg-[#18181A] text-white px-3.5 py-1 rounded-full text-xs font-black font-heading flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>+30 pts</span>
                        </span>
                      </div>

                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D]">
                        Quest 01 · Guía Paso a Paso
                      </span>
                      <h3 className="text-xl font-black font-heading text-[#18181A] mt-1 mb-2">
                        Quest: Plantar por Primera Vez
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                        Resuelve a tu propio ritmo las 5 decisiones clave para sembrar un árbol nativo sin errores comunes.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-emerald-900/10 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-emerald-950/70">
                        {isQuest1Completed ? "✓ Completado (+30 pts)" : "5 etapas por clics"}
                      </span>
                      <button
                        onClick={() => {
                          resetQuest1();
                          setActiveGame("quest-plant");
                        }}
                        className="inline-flex items-center gap-2 bg-[#18181A] hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-xs font-black font-heading shadow-md transition-transform active:scale-95 cursor-pointer"
                      >
                        <span>Resolver Quest</span>
                      </button>
                    </div>
                  </div>

                  {/* QUEST 2 CARD: DETECTIVE BOTÁNICO (Soft Lilac) */}
                  <div className="bg-[#EDE8F8] rounded-[2.2rem] p-6 sm:p-7 flex flex-col justify-between border border-purple-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#6D28D9]">
                          <Leaf className="w-6 h-6 stroke-[2.3]" />
                        </div>
                        <span className="bg-[#18181A] text-white px-3.5 py-1 rounded-full text-xs font-black font-heading flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>+20 pts</span>
                        </span>
                      </div>

                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6D28D9]">
                        Quest 02 · Identificación Visual
                      </span>
                      <h3 className="text-xl font-black font-heading text-[#18181A] mt-1 mb-2">
                        Quest: Detective Botánico
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                        Analiza fotografías reales y pistas ancestrales para identificar la Cantuta, el Quinual, la Muña y el Colli.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-purple-900/10 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-purple-950/70">
                        {isQuest2Completed ? "✓ Completado (+20 pts)" : "4 retos visuales"}
                      </span>
                      <button
                        onClick={() => {
                          resetQuest2();
                          setActiveGame("quest-detective");
                        }}
                        className="inline-flex items-center gap-2 bg-[#18181A] hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-xs font-black font-heading shadow-md transition-transform active:scale-95 cursor-pointer"
                      >
                        <span>Resolver Quest</span>
                      </button>
                    </div>
                  </div>

                  {/* QUEST 3 CARD: GUARDIÁN AL RESCATE (Soft Cream Yellow) */}
                  <div className="bg-[#F8F2DC] rounded-[2.2rem] p-6 sm:p-7 flex flex-col justify-between border border-amber-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#B45309]">
                          <Trophy className="w-6 h-6 stroke-[2.3]" />
                        </div>
                        <span className="bg-[#18181A] text-white px-3.5 py-1 rounded-full text-xs font-black font-heading flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>+20 pts</span>
                        </span>
                      </div>

                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#B45309]">
                        Quest 03 · Casos en Huancayo
                      </span>
                      <h3 className="text-xl font-black font-heading text-[#18181A] mt-1 mb-2">
                        Quest: Guardián al Rescate
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
                        Toma la mejor decisión ciudadana ante situaciones reales en parques y colegios del Valle del Mantaro.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-amber-950/70">
                        {isQuest3Completed ? "✓ Completado (+20 pts)" : "3 misiones por clic"}
                      </span>
                      <button
                        onClick={() => {
                          resetQuest3();
                          setActiveGame("quest-guardian");
                        }}
                        className="inline-flex items-center gap-2 bg-[#18181A] hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-xs font-black font-heading shadow-md transition-transform active:scale-95 cursor-pointer"
                      >
                        <span>Resolver Quest</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </>
        )}

        {/* ============================================================ */}
        {/* ACTIVE 2D GAMES                                              */}
        {/* ============================================================ */}
        {activeGame === "2d-planting" && (
          <PlantingCanvas2D
            onBack={() => setActiveGame("lobby")}
            onComplete={() => {
              verifyAndCompleteObjective(
                "arcade-2d-planting",
                "Juego 2D: Taller de Siembra",
                35,
                "quiz",
                "quinual"
              );
            }}
          />
        )}

        {activeGame === "2d-catcher" && (
          <GuardianCatcher2D
            onBack={() => setActiveGame("lobby")}
            onComplete={() => {
              verifyAndCompleteObjective(
                "arcade-2d-catcher",
                "Juego 2D: Atrapa la Lluvia Andina",
                30,
                "quiz"
              );
            }}
          />
        )}

        {activeGame === "2d-defender" && (
          <ValleyDefender2D
            onBack={() => setActiveGame("lobby")}
            onComplete={() => {
              verifyAndCompleteObjective(
                "arcade-2d-defender",
                "Juego 2D: Defensor de la Cantuta",
                25,
                "quiz",
                "cantuta"
              );
            }}
          />
        )}

        {/* ============================================================ */}
        {/* ACTIVE CLICK QUEST 1 ("PLANTAR POR PRIMERA VEZ")             */}
        {/* ============================================================ */}
        {activeGame === "quest-plant" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-6 sm:p-10 max-w-4xl mx-auto animate-in zoom-in-95 duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
              <button
                onClick={() => setActiveGame("lobby")}
                className="text-xs font-extrabold text-slate-500 hover:text-[#18181A] bg-slate-100 px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                ← Volver a la consola de juegos
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#15803D] bg-[#DFF5E3] px-3.5 py-1 rounded-full">
                  Quest por Clics: Mi Primera Planta
                </span>
                <span className="text-xs font-black text-[#18181A] bg-slate-100 px-3 py-1 rounded-full">
                  Paso {plantStepIdx + 1} de {PLANTING_STEPS.length}
                </span>
              </div>
            </div>

            {!plantFinished ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-[#E0F2FE] via-[#DFF5E3] to-[#D97706]/25 rounded-[2rem] p-6 min-h-[280px] border border-emerald-200 relative overflow-hidden">
                  <div className="w-full flex items-center gap-1.5 mb-6">
                    {PLANTING_STEPS.map((s, idx) => (
                      <div
                        key={s.stepNumber}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          idx <= plantStepIdx ? "bg-[#15803D]" : "bg-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="my-auto flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full bg-white/90 shadow-lg flex items-center justify-center mb-3 border-4 border-[#15803D]/30 transition-transform duration-500 scale-105">
                      {plantStepIdx === 0 && <Shovel className="w-12 h-12 text-amber-700 animate-bounce" />}
                      {plantStepIdx === 1 && <Sparkles className="w-12 h-12 text-emerald-600 animate-pulse" />}
                      {plantStepIdx === 2 && <Sprout className="w-14 h-14 text-[#15803D]" />}
                      {plantStepIdx === 3 && <Droplets className="w-12 h-12 text-sky-500 animate-bounce" />}
                      {plantStepIdx === 4 && <Sun className="w-14 h-14 text-amber-500 animate-spin" style={{ animationDuration: "8s" }} />}
                    </div>

                    <span className="text-xs font-black uppercase tracking-wider text-[#18181A] bg-white/80 px-3 py-1 rounded-full">
                      {plantStepIdx === 0 && "1. Preparando el terreno"}
                      {plantStepIdx === 1 && "2. Abonando con compost"}
                      {plantStepIdx === 2 && "3. Sembrando el Quinual"}
                      {plantStepIdx === 3 && "4. Riego de asiento"}
                      {plantStepIdx === 4 && "5. Abrigo contra heladas"}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold text-emerald-950/80 text-center mt-4 bg-white/75 p-2.5 rounded-xl">
                    💡 <strong>Consejo Wanka:</strong> {PLANTING_STEPS[plantStepIdx].tip}
                  </p>
                </div>

                <div className="lg:col-span-7 flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-black font-heading text-[#18181A] mb-2">
                    {PLANTING_STEPS[plantStepIdx].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                    {PLANTING_STEPS[plantStepIdx].instruction}
                  </p>

                  <div className="flex flex-col gap-3">
                    {PLANTING_STEPS[plantStepIdx].options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectPlantOption(opt)}
                        className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-[#18181A] bg-[#FAFAFA] hover:bg-white transition-all flex items-center justify-between gap-3 group cursor-pointer"
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-black font-heading text-[#18181A] group-hover:text-[#15803D]">
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                            {opt.detail}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#18181A] shrink-0" />
                      </button>
                    ))}
                  </div>

                  {plantFeedback && (
                    <div
                      className={`mt-5 p-4 rounded-2xl border flex flex-col gap-3 animate-in fade-in ${
                        plantFeedback.isCorrect
                          ? "bg-[#DFF5E3] border-emerald-300 text-emerald-950"
                          : "bg-rose-50 border-rose-200 text-rose-900"
                      }`}
                    >
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm font-bold">
                        {plantFeedback.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <span>{plantFeedback.text}</span>
                      </div>

                      {plantFeedback.isCorrect && (
                        <button
                          onClick={handleNextPlantStep}
                          className="self-end bg-[#18181A] hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full text-xs font-black font-heading flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>
                            {plantStepIdx + 1 < PLANTING_STEPS.length
                              ? "Siguiente paso →"
                              : "¡Terminar Quest!"}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 max-w-lg mx-auto flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#DFF5E3] border-4 border-[#15803D] flex items-center justify-center mb-4 text-[#15803D] shadow-lg">
                  <Sprout className="w-12 h-12" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#15803D] bg-[#DFF5E3] px-3.5 py-1 rounded-full mb-2">
                  ¡Quest Completada!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#18181A] mb-2">
                  ¡Dominaste la teoría de siembra andina!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  También puedes probar el <strong>Simulador 2D Físico</strong> en el lobby para excavar y regar en tiempo real.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveGame("lobby")}
                    className="bg-[#18181A] hover:bg-zinc-800 text-white px-6 py-3 rounded-full text-xs font-black font-heading cursor-pointer"
                  >
                    Volver al Lobby (+30 pts)
                  </button>
                  <button
                    onClick={() => setActiveGame("2d-planting")}
                    className="bg-[#DFF5E3] text-[#15803D] px-5 py-3 rounded-full text-xs font-black font-heading cursor-pointer"
                  >
                    Ir a la versión 2D Física →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* ACTIVE CLICK QUEST 2 ("DETECTIVE BOTÁNICO")                  */}
        {/* ============================================================ */}
        {activeGame === "quest-detective" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-6 sm:p-10 max-w-3xl mx-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <button
                onClick={() => setActiveGame("lobby")}
                className="text-xs font-extrabold text-slate-500 hover:text-[#18181A] bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
              >
                ← Volver a la consola de juegos
              </button>
              <span className="text-xs font-black text-[#6D28D9] bg-[#EDE8F8] px-3.5 py-1 rounded-full">
                Pista {detectiveIdx + 1} de {DETECTIVE_QUESTIONS.length}
              </span>
            </div>

            {!detectiveFinished ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-purple-200 shadow-md mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={DETECTIVE_QUESTIONS[detectiveIdx].image}
                    alt="Planta misteriosa"
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6D28D9] mb-1">
                  ¿Qué especie nativa soy?
                </span>
                <p className="text-base sm:text-lg font-black font-heading text-[#18181A] max-w-xl mb-6 leading-snug bg-[#EDE8F8]/50 p-5 rounded-3xl border border-purple-200/60">
                  “{DETECTIVE_QUESTIONS[detectiveIdx].clue}”
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
                  {DETECTIVE_QUESTIONS[detectiveIdx].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectDetective(opt)}
                      className="py-3.5 px-4 rounded-2xl border border-slate-200 hover:border-[#18181A] bg-[#FAFAFA] hover:bg-white font-black font-heading text-sm text-[#18181A] transition-all cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {detectiveFeedback && (
                  <div
                    className={`mt-6 w-full max-w-lg p-4 rounded-2xl border text-left flex flex-col gap-3 ${
                      detectiveFeedback.isCorrect
                        ? "bg-[#DFF5E3] border-emerald-300 text-emerald-950"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold">{detectiveFeedback.text}</p>
                    {detectiveFeedback.isCorrect && (
                      <button
                        onClick={handleNextDetective}
                        className="self-end bg-[#18181A] text-white px-5 py-2 rounded-full text-xs font-black font-heading cursor-pointer"
                      >
                        Siguiente pista →
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-[#EDE8F8] text-[#6D28D9] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black font-heading text-[#18181A] mb-2">
                  ¡Ya eres un Detective Botánico del Mantaro!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-md mx-auto">
                  Reconociste las especies clave de Huancayo. Ahora podrás identificarlas fácilmente en el mapa satelital.
                </p>
                <button
                  onClick={() => setActiveGame("lobby")}
                  className="bg-[#18181A] text-white px-6 py-3 rounded-full text-xs font-black font-heading cursor-pointer"
                >
                  Volver al Lobby (+20 pts)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* ACTIVE CLICK QUEST 3 ("GUARDIÁN AL RESCATE")                 */}
        {/* ============================================================ */}
        {activeGame === "quest-guardian" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-6 sm:p-10 max-w-3xl mx-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <button
                onClick={() => setActiveGame("lobby")}
                className="text-xs font-extrabold text-slate-500 hover:text-[#18181A] bg-slate-100 px-4 py-2 rounded-full cursor-pointer"
              >
                ← Volver a la consola de juegos
              </button>
              <span className="text-xs font-black text-[#B45309] bg-[#F8F2DC] px-3.5 py-1 rounded-full">
                Situación {guardianIdx + 1} de {GUARDIAN_SCENARIOS.length}
              </span>
            </div>

            {!guardianFinished ? (
              <div className="flex flex-col">
                <div className="bg-[#F8F2DC]/60 border border-amber-200 p-5 rounded-3xl mb-5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] block mb-1">
                    Situación en Huancayo:
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-[#18181A] leading-relaxed">
                    {GUARDIAN_SCENARIOS[guardianIdx].scenario}
                  </p>
                </div>

                <h4 className="text-sm sm:text-base font-black font-heading text-[#18181A] mb-3">
                  {GUARDIAN_SCENARIOS[guardianIdx].question}
                </h4>

                <div className="flex flex-col gap-3">
                  {GUARDIAN_SCENARIOS[guardianIdx].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectGuardian(opt)}
                      className="text-left p-4 rounded-2xl border border-slate-200 hover:border-[#18181A] bg-[#FAFAFA] hover:bg-white text-xs sm:text-sm font-bold text-[#18181A] transition-all cursor-pointer"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {guardianFeedback && (
                  <div
                    className={`mt-5 p-4 rounded-2xl border flex flex-col gap-3 ${
                      guardianFeedback.isCorrect
                        ? "bg-[#DFF5E3] border-emerald-300 text-emerald-950"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold">{guardianFeedback.text}</p>
                    {guardianFeedback.isCorrect && (
                      <button
                        onClick={handleNextGuardian}
                        className="self-end bg-[#18181A] text-white px-5 py-2 rounded-full text-xs font-black font-heading cursor-pointer"
                      >
                        Continuar →
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-20 h-20 rounded-full bg-[#F8F2DC] text-[#B45309] flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black font-heading text-[#18181A] mb-2">
                  ¡Decisiones de Verdadero Guardián Wanka!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-md mx-auto">
                  Completaste los casos de ética y cuidado ambiental comunitario en el Valle del Mantaro.
                </p>
                <button
                  onClick={() => setActiveGame("lobby")}
                  className="bg-[#18181A] text-white px-6 py-3 rounded-full text-xs font-black font-heading cursor-pointer"
                >
                  Volver al Lobby (+20 pts)
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
