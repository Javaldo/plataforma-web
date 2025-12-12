import Image from 'next/image';
import { Product } from '@/src/types'; 
import { ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            
            {/* IMAGEN (Con efecto zoom al pasar el mouse) */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized={true}
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {product.category}
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    {product.name}
                </h3>

                {/* Especificaciones Clave */}
                <div className="space-y-2 mb-6">
                    {product.specs.slice(0, 2).map((spec, index) => (
                        <div key={index} className="flex items-center text-sm text-slate-500">
                            <Activity size={16} className="text-yellow-500 mr-2" />
                            <span className="font-medium mr-1">{spec.label}:</span> {spec.value}
                        </div>
                    ))}
                </div>

                {/* Botón */}
                <Link 
                    href={`/productos/${product._id}`} 
                    className="w-full py-3 flex items-center justify-center gap-2 border border-slate-200 rounded-lg text-slate-700 font-bold group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all"
                >
                    Ver Detalles <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}