import Navbar from "@/src/components/Navbar";
import { getProducts } from "@/src/lib/api"; // Asegúrate de importar desde tu api
import Catalog from "@/src/components/Catalog"; // 
import HeroCarousel from "@/src/components/HeroCarousel";

// Revalidar datos cada 10 segundos para que si agregas un producto, aparezca rápido
export const revalidate = 10; 

export default async function Home() {
  // 1. Obtenemos los productos en el servidor
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* HERO SECTION */}
      <div className="relative bg-slate-900 h-[400px] flex items-center justify-center overflow-hidden">
          
          <HeroCarousel />

          {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000')] bg-cover bg-center opacity-40"></div>*/}
          
          <div className="relative z-10 text-center px-6 mt-16">
              <span className="text-yellow-500 font-bold tracking-widest uppercase mb-4 block">Maquinaria Industrial</span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                  POTENCIA PARA TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">PROYECTO</span>
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                  Catálogo actualizado de maquinaria pesada disponible para venta y alquiler inmediato.
              </p>
          </div>
      </div>

      {/* SECCIÓN DEL CATÁLOGO INTERACTIVO */}
      <div className="container mx-auto px-6 py-16 -mt-20 relative z-20">
          {/* Aquí usamos el componente cliente que creamos */}
          <Catalog initialProducts={products} />
      </div>

      {/* FOOTER SIMPLE */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
          <p>© 2024 Plataforma Industrial. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}