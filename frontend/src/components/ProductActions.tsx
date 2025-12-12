"use client";
import { useState } from 'react';
import { Phone, FileText } from 'lucide-react';
import QuoteModal from './QuoteModal';
import { Mail, X } from 'lucide-react';

interface ProductActionsProps {
    productName: string;
}

export default function ProductActions({ productName }: ProductActionsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        // Agregamos el nombre del producto automáticamente
        const payload = { ...data, subject: `Interés en: ${productName}`, productName };

        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

        try {
            await fetch(`${API_URL}/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            setStatus('success');
            setTimeout(() => { setIsModalOpen(false); setStatus('idle'); }, 2000);
        } catch (err) { alert("Error al enviar"); setStatus('idle'); }
    };

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
                <Mail size={20} /> Cotizar por Correo
            </button>

            {/* MODAL (VENTANA EMERGENTE) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"><X /></button>
                        
                        <h3 className="text-xl font-bold mb-1">Cotizar Equipo</h3>
                        <p className="text-yellow-600 font-bold mb-4">{productName}</p>

                        {status === 'success' ? (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-2">✅</div>
                                <p className="font-bold text-slate-800">¡Solicitud Enviada!</p>
                                <p className="text-slate-500 text-sm">Revisaremos disponibilidad y te escribiremos.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSend} className="space-y-4">
                                <input name="name" required placeholder="Tu Nombre" className="w-full p-3 border rounded-lg outline-none focus:border-yellow-500" />
                                <input name="email" required type="email" placeholder="Tu Email" className="w-full p-3 border rounded-lg outline-none focus:border-yellow-500" />
                                <input name="phone" placeholder="Tu Teléfono" className="w-full p-3 border rounded-lg outline-none focus:border-yellow-500" />
                                <textarea name="message" rows={3} placeholder="Hola, me interesa saber el precio y disponibilidad..." className="w-full p-3 border rounded-lg outline-none focus:border-yellow-500"></textarea>
                                
                                <button type="submit" disabled={status === 'loading'} className="w-full bg-yellow-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-yellow-400">
                                    {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}