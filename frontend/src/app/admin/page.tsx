"use client";
import { useState } from 'react';
import { Plus, Trash, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';

export default function AdminPage() {
    const [isLoading, setIsLoading] = useState(false);
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        image: '',
    });

    // Estado para las especificaciones dinámicas
    const [specs, setSpecs] = useState([{ label: '', value: '' }]);

    // Manejar cambios en inputs normales
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar cambios en las especificaciones
    const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };

    // Agregar una nueva fila de especificación
    const addSpec = () => {
        setSpecs([...specs, { label: '', value: '' }]);
    };

    // Eliminar una fila de especificación
    const removeSpec = (index: number) => {
        const newSpecs = specs.filter((_, i) => i !== index);
        setSpecs(newSpecs);
    };

    // ENVIAR AL BACKEND
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const productToSave = {
            ...formData,
            specs: specs.filter(s => s.label && s.value) // Limpiar vacíos
        };

        try {
            const res = await fetch('http://localhost:4000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSave)
            });

            if (res.ok) {
                alert("✅ ¡Producto creado exitosamente!");
                // Resetear formulario
                setFormData({ name: '', category: '', image: '' });
                setSpecs([{ label: '', value: '' }]);
            } else {
                alert("❌ Error al guardar el producto");
            }
        } catch (error) {
            console.error(error);
            alert("❌ Error de conexión");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />
            <div className="h-24 bg-slate-900"></div> {/* Espaciador */}

            <div className="container mx-auto px-6 py-10 max-w-3xl">
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Panel de Administración</h1>
                    <Link href="/" className="text-slate-500 hover:text-slate-900 flex items-center gap-2">
                        <ArrowLeft size={20} /> Ir al Catálogo
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">Agregar Nuevo Equipo</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 1. Datos Básicos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre del Equipo</label>
                                <input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange}
                                    placeholder="Ej: Tractor D5" 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
                                <input 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange}
                                    placeholder="Ej: Minería" 
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">URL de la Imagen</label>
                            <input 
                                name="image" 
                                value={formData.image} 
                                onChange={handleChange}
                                placeholder="https://..." 
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" 
                                required 
                            />
                            <p className="text-xs text-slate-500 mt-1">Copia la dirección de imagen de Unsplash o Google.</p>
                        </div>

                        {/* 2. Especificaciones Dinámicas */}
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-slate-700 mb-3">Especificaciones Técnicas</label>
                            
                            {specs.map((spec, index) => (
                                <div key={index} className="flex gap-4 mb-3">
                                    <input 
                                        placeholder="Etiqueta (Ej: Motor)" 
                                        value={spec.label}
                                        onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                                    />
                                    <input 
                                        placeholder="Valor (Ej: V8 Diesel)" 
                                        value={spec.value}
                                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => removeSpec(index)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            ))}

                            <button 
                                type="button" 
                                onClick={addSpec}
                                className="mt-2 text-sm text-yellow-600 font-bold flex items-center gap-1 hover:text-yellow-700"
                            >
                                <Plus size={16} /> Agregar otra especificación
                            </button>
                        </div>

                        {/* Botón Guardar */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Guardando...' : <><Save size={20} /> Publicar Producto</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}