import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { GameProvider } from "@/context/GameContext";

export const metadata: Metadata = {
  title: "Wanka-Tuta | Educación Ambiental - Huancayo",
  description: "Educación ambiental gamificada y conservación de flora nativa para la ciudad de Huancayo, Valle del Mantaro, Perú.",
  icons: {
    icon: "/assets/mascot.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen flex flex-col bg-[#F6F6EE] text-[#202B1D]">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
