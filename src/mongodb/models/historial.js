// src/mongodb/models/Historial.js

const mongoose = require("mongoose");

// Definimos el esquema del historial de acciones
const historialSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ["CREAR", "EDITAR", "ELIMINAR"], 
  },
  descripcion: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    default: "sistema", // En este proyecto no tenemos auth por usuario real aún
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

// Exportamos el modelo para usarlo donde lo necesitemos
module.exports = mongoose.model("Historial", historialSchema);
