import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/src/components/WhatsAppButton"; // <--- 1. IMPORTAR

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Plataforma Industrial',
    default: 'Plataforma Industrial | Venta y Alquiler de Maquinaria',
  },
  description: 'Catálogo líder en maquinaria pesada. Encuentra excavadoras, tractores y equipos industriales al mejor precio. Contacto directo y cotizaciones rápidas.',
  keywords: ['maquinaria pesada', 'industrial', 'venta de tractores', 'alquiler maquinaria', 'construcción', 'minería'],
  authors: [{ name: 'Javaldo S.A.C' }],
  icons: {
    icon: '/icon.png', // Esto buscará tu logo en la carpeta pública
  },
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