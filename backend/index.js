require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <--- 1. Importar Mongoose
const Product = require('./models/Product'); // <--- 2. Importar el Modelo
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 4000;
const resend = new Resend(process.env.RESEND_API_KEY);

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
    // Recibimos los datos del frontend
    const { name, email, phone, subject, message, productName } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.EMAIL_USER, 
            reply_to: email, // Esto permite que al dar "Responder", le escribas al cliente
            subject: `🔔 Nuevo Lead: ${productName ? productName : 'Consulta General'}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Arial', sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; }
                    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                    .header { background-color: #0f172a; padding: 20px; text-align: center; border-bottom: 4px solid #eab308; }
                    .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
                    .content { padding: 30px; color: #334155; }
                    .label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 4px; display: block; }
                    .value { font-size: 16px; color: #0f172a; margin-bottom: 20px; font-weight: 500; }
                    .message-box { background-color: #f8fafc; border-left: 4px solid #eab308; padding: 15px; margin-top: 10px; font-style: italic; }
                    .footer { background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8; }
                    .tag { display: inline-block; background-color: #eab308; color: #0f172a; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 14px; margin-bottom: 20px;}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Plataforma Industrial</h1>
                    </div>

                    <div class="content">
                        ${productName 
                            ? `<div style="text-align:center;"><span class="tag">Interesado en: ${productName}</span></div>` 
                            : ''
                        }

                        <div style="display: flex; justify-content: space-between;">
                            <div style="width: 48%;">
                                <span class="label">Nombre del Cliente</span>
                                <div class="value">${name}</div>
                            </div>
                            <div style="width: 48%;">
                                <span class="label">Teléfono</span>
                                <div class="value">${phone || 'No especificado'}</div>
                            </div>
                        </div>

                        <span class="label">Correo Electrónico</span>
                        <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>

                        <span class="label">Mensaje del Cliente</span>
                        <div class="message-box">
                            "${message}"
                        </div>
                    </div>

                    <div class="footer">
                        <p>Este correo fue enviado desde el formulario web.</p>
                        <p>Plataforma Industrial &copy; ${new Date().getFullYear()}</p>
                    </div>
                </div>
            </body>
            </html>
            `
        });

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});