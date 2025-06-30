// Este es el archivo principal del servidor


// Importamos la aplicación Express (app.js tiene todas las rutas)
const app = require('./app');

// Importamos la función para conectar a MongoDB
const connectMongo = require('./src/mongodb/mongo');

// Definimos el puerto donde correrá el servidor
// Usa el puerto de la variable de entorno o el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Conectamos a la base de datos MongoDB
connectMongo()
  .then(() => console.log(' Conectado a MongoDB'))
  .catch(err => console.error('Error con MongoDB:', err));

// Iniciamos el servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});

// Si hay un error inesperado, lo mostramos
process.on('unhandledRejection', (err) => {
  console.error('Error inesperado:', err);
  server.close(() => process.exit(1));
});
