// src/routes/historial.routes.js

const express = require("express");
const router = express.Router();

const Historial = require("../mongodb/models/Historial");

// GET /api/historial → devuelve todas las acciones registradas
router.get("/", async (req, res) => {
  try {
    const historial = await Historial.find().sort({ fecha: -1 });
    res.json(historial);
  } catch (error) {
    console.error("❌ Error al obtener historial:", error);
    res.status(500).json({ error: "Error al obtener historial" });
  }
});

module.exports = router;
