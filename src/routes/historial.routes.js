// Importar las dependencias necesarias
const express = require("express");
const router = express.Router();

// Importar el modelo de Historial de MongoDB
const Historial = require("../mongodb/models/historial");

// Importar el middleware de autenticación
const authMiddleware = require('../middlewares/auth');

// Aplicar el middleware de autenticación a todas las rutas de este router
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    // Obtener parámetros de paginación con valores por defecto
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // Realizar consultas en paralelo para obtener los datos y el total de registros
    const [historial, total] = await Promise.all([
      // Obtener registros de historial ordenados por fecha descendente
      Historial.find()
        .sort({ fecha: -1 })
        .skip(skip)
        .limit(limit),
      
      // Obtener el conteo total de registros
      Historial.countDocuments()
    ]);
    
    // Enviar respuesta con los datos y metadatos de paginación
    res.json({
      data: historial,
      paginacion: {
        total,
        paginas: Math.ceil(total / limit),
        paginaActual: page,
        porPagina: limit
      }
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener el historial:", error);
    
    // Enviar respuesta de error con detalles en entorno de desarrollo
    res.status(500).json({ 
      error: "Error al obtener el historial de acciones",
      detalle: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Exportar el router para ser utilizado en la aplicación principal
module.exports = router;
