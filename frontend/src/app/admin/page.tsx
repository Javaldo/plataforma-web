"use client";
import { useState, useEffect } from 'react';
import { Plus, Trash, Save, ArrowLeft, Lock, LogIn, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import { Product } from '@/src/types'; // Asegúrate de tener este tipo o usa any temporalmente

export default function AdminPage() {
    // --- SEGURIDAD ---
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [authError, setAuthError] = useState(false);

    // --- DATOS ---
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // --- FORMULARIO ---
    const [formData, setFormData] = useState({ name: '', category: '', image: '' });
    const [specs, setSpecs] = useState([{ label: '', value: '' }]);

    // URL de la API
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

    // 1. VERIFICAR SESIÓN Y CARGAR PRODUCTOS
    useEffect(() => {
        const savedAuth = localStorage.getItem("adminAuth");
        if (savedAuth === "true") {
            setIsAuthorized(true);
            fetchProducts();
        }
    }, []);

    // Función para traer los productos
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/products`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    // 2. LOGICA DE LOGIN
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setIsAuthorized(true);
            setAuthError(false);
            localStorage.setItem("adminAuth", "true");
            fetchProducts(); // Cargar productos al entrar
        } else {
            setAuthError(true);
            setPasswordInput("");
        }
    };

    const handleLogout = () => {
        setIsAuthorized(false);
        localStorage.removeItem("adminAuth");
    };

    // 3. LOGICA DE ELIMINAR (NUEVO)
    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este equipo?")) return;

        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // Actualizar la lista visualmente sin recargar
                setProducts(products.filter(p => p._id !== id));
                alert("🗑️ Producto eliminado");
            } else {
                alert("Error al eliminar");
            }
        } catch (error) {
            alert("Error de conexión");
        }
    };

    // 4. LOGICA DE CREAR (YA LA TENÍAS)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const productToSave = { ...formData, specs: specs.filter(s => s.label && s.value) };

        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSave)
            });

            if (res.ok) {
                alert("✅ Producto creado");
                setFormData({ name: '', category: '', image: '' });
                setSpecs([{ label: '', value: '' }]);
                fetchProducts(); // Recargar la lista
            }
        } catch (error) { console.error(error); } 
        finally { setIsLoading(false); }
    };

    // ... (Helpers del formulario: handleChange, addSpec, etc. igual que antes)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };
    const addSpec = () => setSpecs([...specs, { label: '', value: '' }]);
    const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));

    // --- RENDERIZADO LOGIN ---
    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-yellow-600" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Área Restringida</h2>
                    <form onSubmit={handleLogin} className="space-y-4 mt-6">
                        <input type="password" placeholder="Contraseña..." value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full px-4 py-3 border rounded-lg text-center" autoFocus />
                        {authError && <p className="text-red-500 font-bold">❌ Incorrecta</p>}
                        <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800">Entrar</button>
                    </form>
                </div>
            </div>
        );
    }

    // --- RENDERIZADO PANEL ---
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />
            <div className="h-24 bg-slate-900"></div> 

            <div className="container mx-auto px-6 py-10 max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Panel de Control</h1>
                    <div className="flex gap-4">
                        <button onClick={handleLogout} className="text-red-500 font-bold text-sm">Salir</button>
                        <Link href="/" className="text-slate-500 hover:text-slate-900 flex items-center gap-2"><ArrowLeft size={20} /> Ir al Catálogo</Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* COLUMNA IZQUIERDA: CREAR */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 h-fit">
                        <h2 className="text-xl font-bold mb-6 border-b pb-4">Nuevo Equipo</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className="w-full px-4 py-2 border rounded-lg" required />
                            <input name="category" value={formData.category} onChange={handleChange} placeholder="Categoría" className="w-full px-4 py-2 border rounded-lg" required />
                            <input name="image" value={formData.image} onChange={handleChange} placeholder="URL Imagen" className="w-full px-4 py-2 border rounded-lg" required />
                            
                            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                                <label className="text-sm font-bold text-slate-500">Specs</label>
                                {specs.map((spec, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input placeholder="Label" value={spec.label} onChange={(e) => handleSpecChange(index, 'label', e.target.value)} className="w-1/3 px-2 py-1 border rounded text-sm" />
                                        <input placeholder="Valor" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} className="w-1/3 px-2 py-1 border rounded text-sm" />
                                        <button type="button" onClick={() => removeSpec(index)} className="text-red-500"><Trash size={16} /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={addSpec} className="text-xs text-yellow-600 font-bold flex items-center gap-1"><Plus size={14} /> Agregar Spec</button>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold">{isLoading ? '...' : 'Guardar'}</button>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: LISTA PARA BORRAR */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h2 className="text-xl font-bold">Inventario Actual</h2>
                            <button onClick={fetchProducts} className="text-slate-400 hover:text-slate-900"><RefreshCcw size={18}/></button>
                        </div>
                        
                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                            {products.length === 0 && <p className="text-slate-400 text-center py-10">No hay productos aún.</p>}
                            
                            {products.map((product) => (
                                <div key={product._id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-slate-50 transition">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover bg-slate-200" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm">{product.name}</h4>
                                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{product.category}</span>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(product._id)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                                        title="Eliminar permanentemente"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}