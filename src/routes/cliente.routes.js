
//cliente.routes.js - Rutas para el manejo de clientes en la API
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const {
  crearCliente,
  obtenerClientes,
  actualizarCliente,
  eliminarCliente
} = require('../postgres/controllers/cliente.controller');


 //Aplicamos el middleware de autenticación a TODAS las rutas de clientes.
 
router.use(authMiddleware);

// Rutas de la API
router.post('/', crearCliente);
router.get('/', obtenerClientes);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router;
