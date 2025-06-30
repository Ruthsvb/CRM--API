// app.js - Configuración principal de la aplicación

// Importamos las librerías necesarias
const express = require('express');  
const cors = require('cors');       
require('dotenv').config();

// Creamos la aplicación Express
const app = express();

// Configuraciones básicas
app.use(cors());            
app.use(express.json());

// Rutas de autenticación (login, registro, etc.)
const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);

// Rutas para manejar clientes
const ClienteRoutes = require('./src/routes/cliente.routes');
app.use('/api/clientes', ClienteRoutes);

// Rutas para el historial de actividades
const historialRoutes = require('./src/routes/historial.routes');
app.use('/api/historial', historialRoutes);

// Ruta de prueba para ver si el servidor está funcionando
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Exportamos la aplicación para usarla en server.js
module.exports = app;
