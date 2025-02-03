'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');
const { IRRIGATION_TABLE } = require('./../models/irrigation.model');
const { WEATHER_TABLE } = require('./../models/weather.model');
const { SUGGESTION_TABLE } = require('./../models/suggestion.model');
const { KEYSISTEM_TABLE } = require('./../models/keySistem.model');
const { KEY_TABLE } = require('./../models/key.model');
const { SESION_TABLE } = require('./../models/session.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear USER_TABLE primero
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      names: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastNames: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      zip_code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
      },
      hectares_to_irrigate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      birthdate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'user'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });

    // Crear WEATHER_TABLE segundo
    await queryInterface.createTable(WEATHER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      temperature: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      humidity: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      wind_speed: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      wind_direction: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      rain: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });

    // Crear IRRIGATION_TABLE tercero
    await queryInterface.createTable(IRRIGATION_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      weather_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: WEATHER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      hectares_number: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nocturnal_irrigation: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      crop_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      icon: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      irrigation_frequency: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      irrigation_cycle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      last_irrigation_cycle: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });

    // Crear SUGGESTION_TABLE cuarto
    await queryInterface.createTable(SUGGESTION_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      irrigation_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: IRRIGATION_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      weather_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: WEATHER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });

    // Crear KEYSISTEM_TABLE quinto
    await queryInterface.createTable(KEYSISTEM_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      on: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      irrigation_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: IRRIGATION_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });

    // Crear KEY_TABLE sexto
    await queryInterface.createTable(KEY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      on: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      keySystem_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: KEYSISTEM_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });

    // Crear SESION_TABLE séptimo
    await queryInterface.createTable(SESION_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      start: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'start',
        defaultValue: Sequelize.NOW,
      },
      end: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'end',
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      device: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'device',
      },
      ip: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'ip',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(SESION_TABLE);
    await queryInterface.dropTable(KEY_TABLE);
    await queryInterface.dropTable(KEYSISTEM_TABLE);
    await queryInterface.dropTable(SUGGESTION_TABLE);
    await queryInterface.dropTable(IRRIGATION_TABLE);
    await queryInterface.dropTable(WEATHER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};
