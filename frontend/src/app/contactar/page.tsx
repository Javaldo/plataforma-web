"use client";

import Navbar from "@/src/components/Navbar";
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // URL de la API (usa tu variable de entorno)
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

        try {
            const res = await fetch(`${API_URL}/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset(); // Limpiar form
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            
            <div className="bg-slate-900 py-16 text-center">
                <h1 className="text-4xl font-bold text-white">Contáctanos</h1>
            </div>

            <div className="container mx-auto px-6 -mt-10 mb-20">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-200">
                    
                    {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
                    <div className="bg-slate-900 text-white p-10 lg:w-1/3">
                        <h3 className="text-2xl font-bold mb-6">Información</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-yellow-500 mt-1" />
                                <p>Av. Industrial 1234, Zona Franca,<br/>Santiago, Chile.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="text-yellow-500" />
                                <p>+56 9 1234 5678</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-yellow-500" />
                                <p>contacto@plataforma.com</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="text-yellow-500 mt-1" />
                                <p>Lun - Vie: 9:00 - 18:00<br/>Sáb: 9:00 - 13:00</p>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: FORMULARIO */}
                    {/* COLUMNA DERECHA: FORMULARIO ACTIVO */}
                    <div className="p-10 lg:w-2/3">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Envíanos un mensaje</h3>
                        <p className="text-slate-500 mb-8">Te responderemos en menos de 24 horas.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                                    <input name="name" required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input name="email" required type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="correo@ejemplo.com" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono (Opcional)</label>
                                <input name="phone" type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="+56 9..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Asunto</label>
                                <select name="subject" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none bg-white">
                                    <option value="Cotización">Cotización de Equipo</option>
                                    <option value="Servicio">Servicio Técnico</option>
                                    <option value="Otro">Información General</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                                <textarea name="message" required rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>

                            <button type="submit" disabled={status === 'loading'} className="bg-yellow-500 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition w-full md:w-auto flex items-center justify-center gap-2">
                                {status === 'loading' ? 'Enviando...' : <><Send size={18}/> Enviar Mensaje</>}
                            </button>

                            {status === 'success' && <p className="text-green-600 font-bold bg-green-100 p-3 rounded">✅ ¡Mensaje enviado! Te contactaremos pronto.</p>}
                            {status === 'error' && <p className="text-red-600 font-bold bg-red-100 p-3 rounded">❌ Hubo un error. Intenta por WhatsApp.</p>}
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}