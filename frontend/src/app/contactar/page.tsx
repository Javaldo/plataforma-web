import Navbar from "@/src/components/Navbar";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
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
                    <div className="p-10 lg:w-2/3">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Envíanos un mensaje</h3>
                        <p className="text-slate-500 mb-8">Te responderemos en menos de 24 horas.</p>
                        
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="correo@ejemplo.com" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Asunto</label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none bg-white">
                                    <option>Cotización de Equipo</option>
                                    <option>Servicio Técnico</option>
                                    <option>Información General</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                                <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>

                            <button type="submit" className="bg-yellow-500 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition w-full md:w-auto">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
}