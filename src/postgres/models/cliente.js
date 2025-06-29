'use strict';

// Importamos las clases necesarias desde Sequelize
const { Model, DataTypes } = require('sequelize');

// Exportamos una función que define el modelo
module.exports = (sequelize) => {
  
  // Creamos la clase Cliente que extiende del modelo base de Sequelize
  class Cliente extends Model {
    // Método estático para definir asociaciones (si se usaran otras tablas relacionadas)
    static associate(models) {
      // Aquí podrías definir relaciones como hasMany, belongsTo, etc.
    }
  }

  // Definimos el modelo con sus columnas y tipos de datos
  Cliente.init(
    {
      // Atributos que tendrá la tabla
      nombre: DataTypes.STRING,
      email: DataTypes.STRING,
      telefono: DataTypes.STRING,
      empresa: DataTypes.STRING
    },
    {
      // Configuración de Sequelize
      sequelize,                // Conexión a la base de datos
      modelName: 'Cliente',     // Nombre del modelo en el código
      tableName: 'clientes',    // Nombre real de la tabla en la base de datos
      timestamps: true          // ✅ Esto agrega automáticamente createdAt y updatedAt
    }
  );

  // Retornamos el modelo para que pueda usarse en el resto del proyecto
  return Cliente;
};
