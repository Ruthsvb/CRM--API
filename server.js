// server.js

// Importamos la app de Express que contiene rutas y middlewares
const app = require('./app');

// Importamos la función de conexión a MongoDB
const connectMongo = require('./src/mongodb/mongo');

// Puerto desde variable de entorno o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Conectamos a MongoDB al iniciar el servidor
connectMongo();

// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
