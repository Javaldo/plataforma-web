// src/types/index.ts

export interface Product {
    _id: string;
    name: string;
    category: string;
    image: string;
    price?: string; // Opcional, por si es "Cotizar"
    specs: {
        label: string;
        value: string;
    }[];
}