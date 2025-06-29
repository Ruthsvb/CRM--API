'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero eliminamos todos los datos existentes
    await queryInterface.bulkDelete('clientes', null, {}); 

    // Luego insertamos los nuevos datos
    await queryInterface.bulkInsert('clientes', [
      {
        nombre: 'Ana López',
        email: 'ana@gmail.com',
        telefono: '123456789',
        empresa: 'Acid Labs',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Carlos Perez',
        email: 'carlos@gmail.com',
        telefono: '987654321',
        empresa: 'Isoft',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Borra los datos insertados
    await queryInterface.bulkDelete('clientes', null, {});
  }
};

