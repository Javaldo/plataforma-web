import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/src/lib/api'; // <--- CAMBIO IMPORTANTE: Importar desde api
import { Check, ArrowLeft, Phone, FileText, Activity } from 'lucide-react';
import Navbar from '@/src/components/Navbar';
import ProductActions from '@/src/components/ProductActions'; // <--- IMPORTAR

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    
    // Llamada a la API real
    const product = await getProductById(id);

    // Si la API dice null, mostramos 404
    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <Navbar />
            <div className="h-24 bg-slate-900"></div>

            <div className="container mx-auto px-6 py-10">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-yellow-600 mb-8 transition-colors font-medium">
                    <ArrowLeft size={20} className="mr-2" /> Volver al Catálogo
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    
                    {/* IMAGEN */}
                    <div className="relative h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden bg-slate-100">
                        {/* Mantenemos Image de Next.js, si falla usamos img normal */}
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-yellow-500 text-slate-900 px-4 py-1 rounded-full font-bold text-sm shadow-md">
                                {product.category}
                            </span>
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            {product.name}
                        </h1>
                        
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            Equipo industrial de alto rendimiento. Solicitado directamente desde nuestra base de datos en tiempo real.
                        </p>

                        <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4 border-b pb-2 border-slate-200">
                                Especificaciones Técnicas
                            </h3>
                            <ul className="space-y-3">
                                {product.specs.map((spec, idx) => (
                                    <li key={idx} className="flex justify-between items-center text-sm md:text-base">
                                        <span className="text-slate-500 font-medium flex items-center gap-2">
                                            <Activity size={16} className="text-yellow-500"/>
                                            {spec.label}
                                        </span>
                                        <span className="text-slate-900 font-bold">{spec.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <ProductActions productName={product.name} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}