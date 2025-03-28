const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./src/routes/productRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para registrar solicitudes
app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});

// Ruta de prueba para verificar que el servidor está corriendo
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Conexión a MongoDB con manejo de errores
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            console.error('Error: MONGODB_URI no está definida en el archivo .env');
            process.exit(1);
        }

        console.log('Intentando conectar a MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('✅ Conexión a MongoDB establecida exitosamente');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

// Llamar a la función de conexión
connectDB();

// Rutas API
app.use('/api/productos', productRoutes);
app.use('/api/chat', chatRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});
