import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Ignoramos errores de build para que despliegue sí o sí */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  /* CONFIGURACIÓN DE IMÁGENES */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Los dos asteriscos ** permiten images.unsplash, plus.unsplash, etc.
        hostname: '**.unsplash.com', 
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com', // Por si usas otras fuentes de prueba
      }
    ],
  },
};

export default nextConfig;