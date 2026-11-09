# Adopta una Planta 🌱 (Wanka Verde - Huancayo)

Plataforma web de educación ambiental gamificada y conservación de flora nativa para la ciudad de Huancayo y el Valle del Mantaro, Perú.

Desarrollada con **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** y **Leaflet** con capas de **Google Maps Satelital**.

---

## 🌟 Características Principales

### 1. Landing Page (`/`)
- **Navbar Institucional:** Navegación modular con brote verde, menú de usuario con avatar, nivel y puntos.
- **Hero Section:** Imagen panorámica del Valle del Mantaro, titular de alto impacto y llamado a la acción (`Comenzar mi aventura ▶`).
- **Retos y Misiones:**
  - Card 1: Contexto sobre la pérdida de especies nativas en Huancayo y foto botánica.
  - Card 2: Microtarjetas interactivas de misiones (Encuentra plantas, Cuestionarios, Siembra y Escaneo QR) con confeti gamificado.
  - Card 3: Progreso de nivel (`Explorador Verde`), barra de puntuación e insignias de guardián ambiental.
- **Footer Orgánico:** Banner curvo con mensaje de compromiso comunitario.

### 2. Dashboard & Mapa de Exploración (`/explora`)
- **Sidebar Fijo:** Enlaces activos a `Inicio`, `Explora`, `Juega`, `Mis Logros`, `Mi Jardín` y `Docentes`.
- **Top Bar:** Notificaciones de eventos botánicos en Huancayo y pill de progreso de usuario.
- **Mapa Satelital con Google Maps:**
  - Vista aérea satelital real centrada en Huancayo (`lat: -12.0651, lng: -75.2049`).
  - Capas intercambiables: **Híbrido**, **Satélite** y **Calles**.
  - Puntos geolocalizados de especies nativas (Cerrito de la Libertad, Torre Torre, Parque de la Identidad Wanka, Quebrada de Palián, San Carlos y Plaza Constitución).
  - **Función "+ Registrar Planta":** Permite al usuario hacer clic en cualquier punto del mapa para plantar un nuevo marcador y registrar observaciones de campo.
  - Modales flotantes con ficha botánica detallada de cada especie.
- **Panel de Progresos:** Anillo circular SVG animado (`Nivel 2`), contador de plantas conocidas y cuadrícula de insignias desbloqueadas.
- **Widgets Inferiores:**
  - Misión activa de la flor *Cantuta* con simulador de escáner QR.
  - Catálogo interactivo de 5 especies nativas del Valle del Mantaro (*Quinual*, *Quishuar*, *Cantuta*, *Colli*, *Muña*).

---

## 🚀 Inicio Rápido

Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
pnpm install
pnpm dev
```

Abre en tu navegador:
- **Landing Page:** [http://localhost:3000](http://localhost:3000)
- **Mapa de Exploración:** [http://localhost:3000/explora](http://localhost:3000/explora)

---

## 🛠️ Tecnologías

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Mapas:** Leaflet con Tiles de Google Maps (Híbrido/Satelital)
- **Iconografía:** Lucide React
- **Microinteracciones:** Canvas Confetti
