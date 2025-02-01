const { Model, DataTypes, Sequelize } = require('sequelize');

const SESION_TABLE = 'sesions';

const SesionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  start: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'start',
    defaultValue: Sequelize.NOW
  },
  end: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'end'
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  device: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'device'
  },
  ip: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'ip'
  }
};

class Sesion extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SESION_TABLE,
      modelName: 'Sesion',
      timestamps: false
    };
  }
}

module.exports = { SESION_TABLE, SesionSchema, Sesion };
