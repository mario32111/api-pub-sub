'use strict';

const { ORDER_TABLE } = require('./../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Elimina el campo `total` de la tabla `orders`
    await queryInterface.removeColumn(ORDER_TABLE, 'total');
  },

  async down(queryInterface, Sequelize) {
    // Agrega nuevamente el campo `total` en caso de revertir
    await queryInterface.addColumn(ORDER_TABLE, 'total', {
      allowNull: false,
      type: Sequelize.FLOAT
    });
  }
};
