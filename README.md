# Wanka-Tuta 🌱

Plataforma web de educación ambiental gamificada, ciencia ciudadana y conservación de flora andina nativa para Huancayo y el Valle del Mantaro, Perú.

Desarrollada con **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** y **Leaflet** con capas de **Google Maps Satelital/Híbrido**.

---

## 🔐 Credenciales de Acceso (Modo Demostración)

La aplicación incluye un sistema de autenticación en `/login` para proteger el panel interactivo y permitir explicar la arquitectura de cuentas personales:

| Campo | Valor Demo |
|---|---|
| **Correo Electrónico** | `geraldine@wankatuta.edu.pe` |
| **Contraseña** | `wanka` |
| **Código de Verificación Botánica** | `WANKA-TUTA` |

> En la pantalla de inicio de sesión dispones de un botón rápido **"Usar credenciales de prueba"** para autocompletar con un solo clic.

---

## 🌟 Características Principales

### 1. Sistema de Autenticación y Cuentas (`/login`)
- Protección de rutas: El acceso a `/explora` requiere sesión activa, redirigiendo al login si el usuario no ha ingresado.
- Perfil personalizado de exploradora ambiental con nivel, puntuación e insignias guardadas en sesión.
- Opción de cerrar sesión y reiniciar progresos desde el menú de usuario.

### 2. Landing Page Institucional (`/`)
- **Identidad Wanka-Tuta:** Diseño editorial y orgánico inspirado en la flora altoandina (Quinual, Cantuta, Muña).
- **Hero Section:** Presentación del reto de conservación en Huancayo y CTA directo a la exploración.
- **Misiones y Retos:** Módulos de aprendizaje sobre pérdida de cobertura vegetal y dinámicas de conservación comunitaria.

### 3. Dashboard & Mapa Interactivo (`/explora`)
- **Puntuación y Estadísticas desde Cero (0):** El usuario inicia en Nivel 1 con 0 puntos; debe verificar sus actividades para sumar puntaje real.
- **Mapa Satelital con Google Maps:**
  - Vista satelital e híbrida de alta resolución centrada en Huancayo (`lat: -12.0651, lng: -75.2049`).
  - Capas intercambiables: **Híbrido**, **Satélite** y **Calles**.
  - Puntos geolocalizados de especies nativas (Cerrito de la Libertad, Torre Torre, Parque de la Identidad Wanka, Quebrada de Palián, San Carlos y Plaza Constitución).
  - Marcador y botón **"+ Registrar Planta"** para ciencia ciudadana comunitaria.
- **Sistema de Verificación Multimodal (Z-Index corregido):**
  - Validación con código botánico oficial: `WANKA-TUTA`.
  - Simulador de lector QR botánico en campo.
  - Cuestionario de validación botánica en sitio.
  - Carga simulada de fotografía de evidencia.
- **Catálogo de Especies Nativas:**
  - 5 especies representativas: *Quinual*, *Quishuar*, *Cantuta*, *Colli* y *Muña*.
  - Fichas científicas completas con nombres quechuas, usos medicinales y ecológicos.
- **Diseño 100% Responsivo:** Adaptado para teléfonos móviles, tablets y pantallas de escritorio.

---

## 🚀 Inicio Rápido

Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
pnpm install
pnpm dev
```

Abre en tu navegador:
- **Landing Page:** [http://localhost:3000](http://localhost:3000)
- **Login:** [http://localhost:3000/login](http://localhost:3000/login)
- **Explorador:** [http://localhost:3000/explora](http://localhost:3000/explora)

Para compilar para producción:

```bash
pnpm run build
```

---

## 🛠️ Tecnologías

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS con PostCSS
- **Mapas:** Leaflet con Tiles de Google Maps (Híbrido/Satelital)
- **Iconografía:** Lucide React
- **Microinteracciones:** Canvas Confetti
