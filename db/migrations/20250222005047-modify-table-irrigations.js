'use strict';

const { IRRIGATION_TABLE } = require('../models/irrigation.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(IRRIGATION_TABLE, 'location', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn(IRRIGATION_TABLE, 'last_irrigation_cycle', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(IRRIGATION_TABLE, 'location', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn(IRRIGATION_TABLE, 'last_irrigation_cycle', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
