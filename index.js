const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./src/routes/productRoutes');
const chatRoutes = require('./src/routes/chatRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});


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


connectDB();


app.use('/api/productos', productRoutes);
app.use('/api/chat', chatRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});
