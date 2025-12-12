"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    // Foto 1: Minería / Excavadora
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000",
    // Foto 2: Construcción / Grúa
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000",
    // Foto 3: Agrícola / Tractor
    "https://images.unsplash.com/photo-1592860956907-42d2337f2023?q=80&w=2000"
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    // Cambiar imagen cada 5 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.4, scale: 1 }} // Opacidad baja para que se lea el texto
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[index]})` }}
                />
            </AnimatePresence>
            {/* Capa oscura extra para asegurar legibilidad */}
            <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
    );
}