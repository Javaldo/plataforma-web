import Navbar from "@/src/components/Navbar";
import { Wrench, Truck, ShieldCheck, PenTool, HardHat, Clock } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        { icon: <Truck size={40} />, title: "Renta de Maquinaria", desc: "Flota moderna disponible por día, semana o mes." },
        { icon: <Wrench size={40} />, title: "Mantenimiento", desc: "Servicio técnico especializado preventivo y correctivo." },
        { icon: <ShieldCheck size={40} />, title: "Garantía Extendida", desc: "Compra con confianza, respaldamos nuestros equipos." },
        { icon: <PenTool size={40} />, title: "Repuestos Originales", desc: "Stock permanente de piezas para todas las marcas." },
        { icon: <HardHat size={40} />, title: "Capacitación", desc: "Entrenamos a tus operadores para mayor eficiencia." },
        { icon: <Clock size={40} />, title: "Soporte 24/7", desc: "Asistencia técnica en campo cuando más lo necesitas." },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            
            {/* ENCABEZADO */}
            <div className="bg-slate-900 py-20 px-6 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Nuestros Servicios</h1>
                <p className="text-slate-300 max-w-2xl mx-auto">
                    Más que máquinas, ofrecemos soluciones integrales para potenciar tu proyecto industrial.
                </p>
            </div>

            {/* GRILLA DE SERVICIOS */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition hover:-translate-y-1">
                            <div className="text-yellow-500 mb-6">{service.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}