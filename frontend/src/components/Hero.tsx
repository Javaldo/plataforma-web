"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
            alt="Fondo Industrial" 
            className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/40"></div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-yellow-500 font-bold tracking-widest mb-4 uppercase">Tecnología & Potencia</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Equipamiento Industrial <br/> de Alto Rendimiento
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Soluciones integrales para minería, construcción y manufactura.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition hover:scale-105 transform duration-200">
              Ver Catálogo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition">
              Nuestros Servicios
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}