// Importamos el modelo de historial desde MongoDB
const mongoose = require('mongoose');
const Historial = require("../models/historial");

// Función para registrar una acción en la base de datos MongoDB
const registrarAccion = async ({ tipo, descripcion, usuario = "sistema" }) => {
  try {
    console.log(`Intentando registrar acción: ${tipo} - ${descripcion}`);
    
    // Verificar si la conexión a MongoDB está activa
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠️  MongoDB no está conectado, reconectando...");
      try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log("Conectado a MongoDB exitosamente");
      } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        return false;
      }
    }

    try {
      // Obtener la instancia de la base de datos
      const db = mongoose.connection.db;
      console.log("Base de datos conectada:", db.databaseName);
      
      // Listar todas las colecciones para depuración
      const collections = await db.listCollections().toArray();
      console.log("Colecciones disponibles:", collections.map(c => c.name));

      // Usar la colección 'historials' (con 's' al final)
      const collection = db.collection('historials');
      
      // Crear el documento a insertar
      const doc = {
        tipo,
        descripcion,
        usuario,
        fecha: new Date()
      };
      
      console.log("📝 Insertando documento:", doc);
      
      // Insertar documento directamente
      const result = await collection.insertOne(doc);
      
      console.log("✅ Acción registrada en el historial de MongoDB. ID:", result.insertedId);
      return true;
    } catch (error) {
      console.error("Error al insertar en la colección:", error);
      return false;
    }
  } catch (error) {
    console.error("Error al guardar en el historial:", error.message);
    return false;
  }
};

// Exportamos la función para que otros archivos puedan usarla
module.exports = { registrarAccion };
