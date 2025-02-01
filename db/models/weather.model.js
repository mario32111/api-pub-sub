const { Model, DataTypes, Sequelize } = require('sequelize');

const WEATHER_TABLE = 'weathers';

const WeatherSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
    defaultValue: Sequelize.NOW
  }
}

class Weather extends Model {
  static associate(models) {
    this.hasOne(models.suggestion, { as: 'suggestion', foreignKey: 'weather_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WEATHER,
      modelName: 'weather',
      timestamps: false
    }
  }
}

module.exports = { WEATHER_TABLE, WeatherSchema, Weather };
