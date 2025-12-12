import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    // ⚠️ REEMPLAZA ESTO CON TU NÚMERO REAL
    // Formato internacional: CódigoPais + Numero (Sin el +)
    // Ejemplo Perú: 51999999999
    const phoneNumber = "51933351280"; 
    
    const message = "Hola, estoy viendo la web de la empresa y me gustaría más información sobre los productos.";
    
    // Creamos el enlace oficial de WhatsApp API
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            aria-label="Contactar por WhatsApp"
        >
            {/* Icono */}
            <MessageCircle size={32} fill="white" className="text-white" />
            
            {/* Tooltip (Texto que aparece al pasar el mouse) */}
            <span className="absolute right-full mr-4 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                ¡Hablemos ahora!
            </span>
            
            {/* Efecto de onda (Ping) para llamar la atención */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
        </a>
    );
}