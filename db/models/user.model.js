const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  gender: {  // Cambié 'gener' a 'gender'
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  zip_code: { // Corrigí el nombre
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
  hectares_to_irrigate: { // Cambié el nombre a algo más claro
    allowNull: false,
    type: DataTypes.STRING,
  },
  birthdate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', // Corrección del nombre
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate(models) {
    this.hasMany(models.Riego, {
      as: 'irrigations',
      foreignKey: 'user_id'
    });
    this.hasMany(models.Sesion, {
      as: 'sesions',
      foreignKey: 'user_id'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}


module.exports = { USER_TABLE, UserSchema, User };
