// src/mongodb/mongo.js

const mongoose = require("mongoose");

// URI de conexión a MongoDB (usa variable de entorno o valor por defecto)
const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/crm_history";

// Función para conectar a Mongo
const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
  }
};

module.exports = connectMongo;
