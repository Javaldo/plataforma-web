import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/src/components/WhatsAppButton"; // <--- 1. IMPORTAR

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plataforma Industrial",
  description: "Venta y alquiler de maquinaria pesada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        
        {/* <--- 2. AGREGAR EL BOTÓN AQUÍ AL FINAL */}
        <WhatsAppButton /> 
        
      </body>
    </html>
  );
}