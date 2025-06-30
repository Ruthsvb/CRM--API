// Importar el módulo Sequelize para la conexión a la base de datos
const Sequelize = require('sequelize');

// Importar las configuraciones de la base de datos
const allConfigs = require('../../../config/config.js');
const env = process.env.NODE_ENV || 'development';

// Obtener la configuración específica para el entorno actual
const config = allConfigs[env];

const ClienteModel = require('./cliente');

// Crear una nueva instancia de Sequelize con la configuración
const sequelize = new Sequelize(
  config.database,  
  config.username, 
  config.password, 
  {
    host: config.host,     
    dialect: config.dialect, 
  }
);

// Inicializar el modelo Cliente pasando la instancia de Sequelize

const Cliente = ClienteModel(sequelize, Sequelize.DataTypes);

// Exportar la instancia de Sequelize y los modelos

module.exports = {
  sequelize,
  Cliente,
};
