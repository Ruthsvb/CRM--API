// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const clienteRoutes = require('./src/routes/cliente.routes');
const historialRoutes = require('./src/routes/historial.routes'); // 👈 aquí
app.use('/api', clienteRoutes);
app.use('/api/historial', historialRoutes); // 👈 aquí

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡API CRM funcionando!');
});

const authRoutes = require('./src/routes/auth.routes');
app.use('/api', authRoutes);

module.exports = app;
