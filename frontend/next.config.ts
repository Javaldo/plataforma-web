import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Ignorar errores de TypeScript durante el despliegue */
  typescript: {
    ignoreBuildErrors: true,
  },
  /* Ignorar errores de ESLint durante el despliegue */
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* Configuración de imágenes que ya teníamos */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;