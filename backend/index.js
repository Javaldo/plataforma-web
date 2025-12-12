require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <--- 1. Importar Mongoose
const nodemailer = require('nodemailer');
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

// --- NUEVA RUTA: ENVIAR CORREO ---
app.post('/api/send-email', async (req, res) => {
    const { name, email, phone, subject, message, productName } = req.body;

    // Configuración del transporte (Tu cuenta de Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Tu correo
            pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación (No la normal)
        }
    });

    // Diseño del correo que te llegará a ti
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Te lo envías a ti mismo
        subject: `🔔 Nuevo Lead: ${subject || 'Consulta General'}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                <h2 style="color: #ca8a04;">Nuevo Mensaje de la Web</h2>
                ${productName ? `<p><strong>Interesado en:</strong> ${productName}</p>` : ''}
                <p><strong>Cliente:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone || 'No especificado'}</p>
                <hr/>
                <p><strong>Mensaje:</strong></p>
                <p style="background: #f9f9f9; padding: 10px;">${message}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error enviando el correo' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});