
// Model: Clase base para todos los modelos de Sequelize
const { Model, DataTypes } = require('sequelize');

// Se una función que recibe la conexión a la base de datos (sequelize) y devuelve la definición del modelo Cliente
module.exports = (sequelize) => {
  
  // Definimos la clase Cliente que hereda de Model
  class Cliente extends Model {
    static associate(models) {
      ;
    }
  }

  // Se el modelo con sus atributos y configuraciones
  Cliente.init(
    {
      // Definición de columnas de la tabla 'clientes'
      nombre: {
        type: DataTypes.STRING,  
        allowNull: false,       
        validate: {
          notEmpty: true        
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,           
        validate: {
          isEmail: true,       
          notEmpty: true     
        }
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true         
      },
      empresa: {
        type: DataTypes.STRING,
        allowNull: true        
      },
    },
    {
      // Configuración del modelo
      sequelize,                       
      modelName: 'Cliente',            
      tableName: 'clientes',          
      timestamps: true,                
      
    }
  );


  // Devolvemos el modelo configurado
  return Cliente;
};
