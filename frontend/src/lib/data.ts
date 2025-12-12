// src/lib/data.ts
import { Product } from '@/src/types';

const MOCK_DB: Product[] = [
    {
        id: 1,
        name: "Excavadora Hidráulica X200",
        category: "Maquinaria Pesada",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182",
        price: "Consultar Precio",
        specs: [
            { label: "Potencia", value: "150 HP" },
            { label: "Peso Operativo", value: "22,500 kg" },
            { label: "Capacidad de Cuchara", value: "1.2 m³" },
            { label: "Profundidad Máx. Excavación", value: "6.5 m" }
        ]
    },
    {
        id: 2,
        name: "Brazo Robótico K-Series",
        category: "Automatización",
        image: "https://images.unsplash.com/photo-1565514020128-4033ccdf5ce4",
        price: "US$ 25,000",
        specs: [
            { label: "Carga Útil", value: "50 kg" },
            { label: "Alcance Máximo", value: "2.5 metros" },
            { label: "Repetibilidad", value: "±0.05 mm" },
            { label: "Grados de Libertad", value: "6 Ejes" }
        ]
    },
    {
        id: 3,
        name: "Generador Industrial 500kVA",
        category: "Energía",
        image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
        price: "Consultar Precio",
        specs: [
            { label: "Potencia Standby", value: "550 kVA" },
            { label: "Potencia Prime", value: "500 kVA" },
            { label: "Motor", value: "Diesel Turbo V8" },
            { label: "Consumo", value: "45 L/h" }
        ]
    }
];

// Función para simular una búsqueda en DB
export function getProductById(id: string): Product | undefined {
    return MOCK_DB.find(p => p.id === parseInt(id));
}