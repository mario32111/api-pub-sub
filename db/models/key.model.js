const { Model, DataTypes, Sequelize } = require('sequelize');

const KEY_TABLE = 'keys';

const KeySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING
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
  keySystem_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'keySistems',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};

class Key extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: KEY_TABLE,
      modelName: 'Key',
      timestamps: false
    };
  }
}

module.exports = { KEY_TABLE, KeySchema, Key };
