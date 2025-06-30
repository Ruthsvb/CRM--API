

// Importamos la librería de Mongoose para trabajar con MongoDB
const mongoose = require("mongoose");

// Definimos la URL de conexión a la base de datos MongoDB (se usa la libreria por defecto)

const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/crm_history";

// Función que se encarga de conectar con la base de datos MongoDB
const connectMongo = async () => {
  try {
    // Intentamos conectarnos a la base de datos
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,     
    });
  
  
    console.log("Conectado a MongoDB correctamente");
  } catch (error) {
    // Si hay un error, lo mostramos en la consola
    console.error(" Error al conectar a MongoDB:", error.message);
    
   
    process.exit(1);
  }
};

// Exportamos la función para poder usarla en server.js
module.exports = connectMongo;
