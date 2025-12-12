import Navbar from "@/src/components/Navbar";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            
            {/* --- CORRECCIÓN: FONDO OSCURO PARA EL NAVBAR --- */}
            <div className="bg-slate-900 pb-12">
                <Navbar />
                <div className="container mx-auto px-6 text-center pt-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Sobre Nosotros</h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* IMAGEN */}
                    <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1000" 
                            alt="Equipo de trabajo" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* TEXTO */}
                    <div>
                        <span className="text-yellow-600 font-bold tracking-widest uppercase text-sm">Nuestra Historia</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">Líderes en Maquinaria desde 1995</h2>
                        
                        <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                            Fundada con la visión de transformar la industria de la construcción, Plataforma Industrial ha crecido hasta convertirse en el referente nacional de maquinaria pesada.
                        </p>
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                            Nuestro compromiso no es solo entregar una máquina, sino entregar confiabilidad. Cada equipo es revisado minuciosamente por expertos certificados para asegurar que tu obra nunca se detenga.
                        </p>

                        {/* ESTADÍSTICAS */}
                        <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900">25+</h3>
                                <p className="text-slate-500 text-sm">Años exp.</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900">500+</h3>
                                <p className="text-slate-500 text-sm">Equipos</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900">1k+</h3>
                                <p className="text-slate-500 text-sm">Clientes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}