"use client";
import { useState } from 'react';
import { Phone, FileText } from 'lucide-react';
import QuoteModal from './QuoteModal';

interface ProductActionsProps {
    productName: string;
}

export default function ProductActions({ productName }: ProductActionsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 bg-slate-900 text-white py-4 px-6 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
                >
                    <Phone size={20} />
                    Cotizar Ahora
                </button>
                
                <button className="flex-1 border-2 border-slate-200 text-slate-700 py-4 px-6 rounded-lg font-bold hover:border-slate-900 hover:text-slate-900 transition flex items-center justify-center gap-2">
                    <FileText size={20} />
                    Ficha Técnica PDF
                </button>
            </div>

            <QuoteModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                productName={productName} 
            />
        </>
    );
}