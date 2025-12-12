import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plataforma Industrial",
  description: "Venta de equipos industriales de alto rendimiento",
};

// Definimos la interfaz para las "props"
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}