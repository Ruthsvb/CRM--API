const mongoose = require("mongoose");

// Se define el esquema del historial de acciones
const historialSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    enum: ["CREAR", "EDITAR", "ELIMINAR"]
  },
  descripcion: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    default: "sistema"
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

// Se verifica si el modelo ya existe antes de crearlo
const Historial = mongoose.models.Historial || mongoose.model("Historial", historialSchema, 'historials');

// Se exporta el modelo
module.exports = Historial;