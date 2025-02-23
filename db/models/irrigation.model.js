const { Model, DataTypes, Sequelize } = require('sequelize');

const IRRIGATION_TABLE = 'irrigations';

const IrrigationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  weather_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'weathers',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  hectares_number: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  location: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  nocturnal_irrigation: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
    allowNull: true,
    type: DataTypes.DATE,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Irrigation extends Model {
  static associate(models) {
    this.hasMany(models.KeySistem, {
      as: 'keySistem',
      foreignKey: 'irrigation_id'
    });
    this.hasMany(models.Suggestion, {
      as: 'suggestion',
      foreignKey: 'irrigation_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: IRRIGATION_TABLE,
      modelName: 'Irrigation',
      timestamps: false
    }
  }
}

module.exports = { IRRIGATION_TABLE, IrrigationSchema, Irrigation };
