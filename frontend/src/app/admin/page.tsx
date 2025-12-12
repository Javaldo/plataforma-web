"use client";
import { useState, useEffect } from 'react';
import { Plus, Trash, Save, ArrowLeft, Lock, LogIn } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';

export default function AdminPage() {
    // --- ESTADO DE SEGURIDAD ---
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [authError, setAuthError] = useState(false);

    // --- ESTADO DEL FORMULARIO (Lo que ya tenías) ---
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        image: '',
    });
    const [specs, setSpecs] = useState([{ label: '', value: '' }]);

    // Verificar si ya inició sesión antes (persistencia básica)
    useEffect(() => {
        const savedAuth = localStorage.getItem("adminAuth");
        if (savedAuth === "true") {
            setIsAuthorized(true);
        }
    }, []);

    // FUNCIÓN PARA LOGIN
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Compara con la variable de entorno
        if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setIsAuthorized(true);
            setAuthError(false);
            localStorage.setItem("adminAuth", "true"); // Guardar sesión
        } else {
            setAuthError(true);
            setPasswordInput(""); // Limpiar campo
        }
    };

    // FUNCIÓN PARA CERRAR SESIÓN
    const handleLogout = () => {
        setIsAuthorized(false);
        localStorage.removeItem("adminAuth");
    };

    // ... (Tus funciones de formulario anteriores: handleChange, etc.)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };

    const addSpec = () => {
        setSpecs([...specs, { label: '', value: '' }]);
    };

    const removeSpec = (index: number) => {
        const newSpecs = specs.filter((_, i) => i !== index);
        setSpecs(newSpecs);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Usamos la variable de entorno para la URL de la API también
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

        const productToSave = {
            ...formData,
            specs: specs.filter(s => s.label && s.value)
        };

        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSave)
            });

            if (res.ok) {
                alert("✅ ¡Producto creado exitosamente!");
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

    // --- RENDERIZADO CONDICIONAL ---

    // 1. SI NO ESTÁ AUTORIZADO, MOSTRAMOS PANTALLA DE LOGIN
    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-yellow-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Área Restringida</h2>
                    <p className="text-slate-500 mb-6">Introduce la clave maestra para acceder al panel.</p>
                    
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input 
                            type="password" 
                            placeholder="Contraseña..." 
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-center text-lg tracking-widest"
                            autoFocus
                        />
                        {authError && <p className="text-red-500 text-sm font-bold">❌ Contraseña incorrecta</p>}
                        
                        <button 
                            type="submit" 
                            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2"
                        >
                            <LogIn size={20} /> Entrar al Panel
                        </button>
                    </form>
                    
                    <Link href="/" className="block mt-6 text-slate-400 hover:text-slate-600 text-sm">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    // 2. SI ESTÁ AUTORIZADO, MOSTRAMOS EL PANEL (Tu código anterior)
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />
            <div className="h-24 bg-slate-900"></div> 

            <div className="container mx-auto px-6 py-10 max-w-3xl">
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Panel de Administración</h1>
                    <div className="flex gap-4">
                        <button onClick={handleLogout} className="text-red-500 font-bold hover:text-red-700 text-sm">
                            Cerrar Sesión
                        </button>
                        <Link href="/" className="text-slate-500 hover:text-slate-900 flex items-center gap-2">
                            <ArrowLeft size={20} /> Ir al Catálogo
                        </Link>
                    </div>
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
                        </div>

                        {/* 2. Especificaciones Dinámicas */}
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-slate-700 mb-3">Especificaciones Técnicas</label>
                            
                            {specs.map((spec, index) => (
                                <div key={index} className="flex gap-4 mb-3">
                                    <input 
                                        placeholder="Etiqueta" 
                                        value={spec.label}
                                        onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                                    />
                                    <input 
                                        placeholder="Valor" 
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