const { Model, DataTypes, Sequelize } = require('sequelize');

const SUGGESTION_TABLE = 'suggestions';

const SuggestionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
      model: 'irrigations',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  weather_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'weather',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};

class Suggestion extends Model {
  static associate(models) {
    this.belongsTo(models.Weather, { as: 'weather', foreignKey: 'weather_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUGGESTION_TABLE,
      modelName: 'Suggestion',
      timestamps: false
    };
  }
}

module.exports = { SUGGESTION_TABLE, SuggestionSchema, Suggestion };
