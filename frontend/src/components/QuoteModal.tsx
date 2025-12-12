"use client";
import { X, Send } from 'lucide-react';
import { useState } from 'react';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export default function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        
        // 1. Recolectamos los datos del formulario
        const formData = {
            productName, // Viene de las props
            clientName: (e.target as any)[0].value, // Input 1: Nombre
            email: (e.target as any)[1].value,      // Input 2: Email
            phone: (e.target as any)[2].value       // Input 3: Teléfono
        };

        try {
            // 2. Enviamos los datos al Backend
            const res = await fetch('http://localhost:4000/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                // 3. Si el servidor dice "OK", mostramos éxito
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                }, 2000);
            } else {
                alert("Hubo un error al enviar la cotización");
                setStatus('idle');
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor");
            setStatus('idle');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all scale-100">
                
                {/* Cabecera del Modal */}
                <div className="bg-slate-900 p-6 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Cotizar Equipo</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Cuerpo del Formulario */}
                <div className="p-6">
                    {status === 'success' ? (
                        <div className="text-center py-10">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">¡Solicitud Enviada!</h4>
                            <p className="text-slate-500 mt-2">Un asesor te contactará pronto.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-sm text-yellow-800 font-medium">
                                Interesado en: <span className="font-bold">{productName}</span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre / Empresa</label>
                                <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition" placeholder="Tu nombre o empresa" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                                <input type="email" required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition" placeholder="ejemplo@empresa.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                                <input type="tel" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition" placeholder="+51 999 999 999" />
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'sending'}
                                className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {status === 'sending' ? 'Enviando...' : 'Enviar Solicitud'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}