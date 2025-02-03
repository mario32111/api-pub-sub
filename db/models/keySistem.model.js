const { Model, DataTypes, Sequelize } = require('sequelize');

const KEYSISTEM_TABLE = 'keySistems';

const KeySistemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  on: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
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
}

class KeySistem extends Model {
  static associate(models) {
    this.hasMany(models.Key, { as: 'key', foreignKey: 'keySystem_id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: KEYSISTEM_TABLE,
      modelName: 'KeySistem',
      timestamps: false
    }
  }
}

module.exports = { KEYSISTEM_TABLE, KeySistemSchema, KeySistem };
