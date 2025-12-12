// backend/seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

// --- PEGA AQUÍ TU CONNECTION STRING DE NUEVO ---
const MONGO_URI = "mongodb+srv://javiergamarracarrasco:Alianzalima1815@cluster0.ebby0ro.mongodb.net/?appName=Cluster0"; 

const products = [
    {
        name: "Excavadora Hidráulica X200",
        category: "Maquinaria Pesada",
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80", 
        specs: [
            { label: "Potencia", value: "150 HP" },
            { label: "Peso Op.", value: "22 Toneladas" }
        ]
    },
    {
        name: "Brazo Robótico K-Series",
        category: "Automatización",
        image: "https://images.unsplash.com/photo-1565514020128-4033ccdf5ce4?auto=format&fit=crop&w=800&q=80", 
        specs: [
            { label: "Carga", value: "50 kg" },
            { label: "Alcance", value: "2.5 metros" }
        ]
    },
    {
        name: "Generador Industrial 500kVA",
        category: "Energía",
        image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=80", 
        specs: [
            { label: "Salida", value: "400 kW" },
            { label: "Motor", value: "Diesel Turbo" }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🌱 Conectado a MongoDB");

        await Product.deleteMany({}); // Borra lo anterior para no duplicar
        console.log("🧹 Base de datos limpiada");

        await Product.insertMany(products); // Inserta los nuevos
        console.log("✅ Productos insertados correctamente");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error);
    }
};

seedDB();