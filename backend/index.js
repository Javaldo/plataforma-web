require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <--- 1. Importar Mongoose
const Product = require('./models/Product'); // <--- 2. Importar el Modelo

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// --- 3. CONEXIÓN A MONGODB ---
// Reemplaza esto con TU ruta de MongoDB Atlas que copiaste
// OJO: Donde dice <password> pon tu contraseña real sin los símbolos <>
const MONGO_URI = "mongodb+srv://javiergamarracarrasco:Alianzalima1815@cluster0.ebby0ro.mongodb.net/?appName=Cluster0"; 

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch((err) => console.error("❌ Error de conexión:", err));


// --- 4. RUTAS ACTUALIZADAS (Ahora usan la BD real) ---

// Obtener todos los productos
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); // Busca en la BD
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un producto por ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error buscando producto" });
    }
});

// CREAR un producto (Para usarlo desde el Admin Panel luego)
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save(); // Guarda en la nube
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cotizaciones (Mantenemos igual)
app.post('/api/quotes', (req, res) => {
    // ... (Tu código de cotizaciones sigue igual) ...
    console.log("Cotización recibida:", req.body);
    res.json({ success: true });
});

// --- NUEVA RUTA: ELIMINAR PRODUCTO ---
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});