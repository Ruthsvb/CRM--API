// Importamos el modelo de historial desde MongoDB
const Historial = require("../models/Historial");

// Función para registrar una acción en la base de datos MongoDB
const registrarAccion = async ({ tipo, descripcion, usuario = "sistema" }) => {
  try {
    // Creamos una nueva instancia del modelo con los datos entregados
    const nuevaAccion = new Historial({ tipo, descripcion, usuario });

    // Guardamos la acción en MongoDB
    await nuevaAccion.save();

    console.log("Acción registrada en MongoDB");
  } catch (error) {
    // Mostramos error en caso de fallo
    console.error("Error al guardar historial:", error);
  }
};

// Exportamos la función para que pueda ser utilizada desde otros controladores
module.exports = { registrarAccion };
