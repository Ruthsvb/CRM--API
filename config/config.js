

//Este archivo exporta la configuración de conexión a la base de datos PostgreSQL

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  
}