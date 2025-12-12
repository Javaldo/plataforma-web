import { getProducts } from '@/src/lib/api';
import ProductCard from './ProductCard';
import { MotionDiv, fadeInVariants } from './MotionDiv'; // <--- Importamos la animación

export default async function FeaturedProducts() {
    const products = await getProducts();

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                
                <div className="text-center mb-16">
                    <span className="text-yellow-500 font-bold tracking-wider uppercase text-sm">Catálogo Premium</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                        Equipos Más Solicitados
                    </h2>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            // Envolvemos la tarjeta con MotionDiv
                            <MotionDiv
                                key={product._id}
                                variants={fadeInVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }} // Se anima cuando entra al 20% de la pantalla
                                custom={index} // Pasamos el índice para el efecto cascada
                            >
                                <ProductCard product={product} />
                            </MotionDiv>
                        ))
                    ) : (
                        <p className="text-center col-span-3 text-slate-500">
                            Cargando catálogo o servidor no disponible...
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}