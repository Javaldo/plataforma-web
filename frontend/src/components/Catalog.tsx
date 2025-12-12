"use client";
import { useState } from 'react';
import { Product } from '@/src/types';
import ProductCard from './ProductCard';
import { Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CatalogProps {
    initialProducts: Product[];
}

export default function Catalog({ initialProducts }: CatalogProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    // 1. Obtener categorías únicas de los productos para el filtro
    const categories = ["Todas", ...new Set(initialProducts.map(p => p.category))];

    // 2. Lógica de filtrado
    const filteredProducts = initialProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Todas" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8">
            {/* --- BARRA DE CONTROL (BUSCADOR Y FILTROS) --- */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    
                    {/* Buscador */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Buscar maquinaria..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Filtros de Categoría (Botones) */}
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                    selectedCategory === cat 
                                    ? 'bg-slate-900 text-white shadow-lg' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- LISTA DE RESULTADOS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <motion.div
                                key={product._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                                <Search size={40} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">No encontramos resultados</h3>
                            <p className="text-slate-500">Intenta con otro término o categoría.</p>
                            <button 
                                onClick={() => { setSearchTerm(""); setSelectedCategory("Todas"); }}
                                className="mt-4 text-yellow-600 font-bold hover:underline"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}