// frontend/src/lib/api.ts
import { Product } from '@/src/types';

// La URL de tu backend (asegúrate que el puerto coincida)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function getProducts(): Promise<Product[]> {
    try {
        // 'no-store' asegura que siempre traiga datos frescos, ideal para desarrollo
        const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
        
        if (!res.ok) {
            throw new Error('Error al cargar productos');
        }
        
        return res.json();
    } catch (error) {
        console.error(error);
        return []; // Retorna array vacío si falla para no romper la web
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
        
        if (!res.ok) {
            return null;
        }
        
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}