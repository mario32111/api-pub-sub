'use strict';

const { IRRIGATION_TABLE } = require("../models/irrigation.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(IRRIGATION_TABLE, 'weather_id', {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true, // Permitir valores nulos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(IRRIGATION_TABLE, 'weather_id', {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: false, // Revertir para que no acepte nulos
    });
  },
};
