const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model')

const CUSTOMER_TABLE = 'customers';

const CustomerSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    //esto es el  nombre real en la bd
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  //tambien esto es parte de la reclacion
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true, 
    //AQUI SE RELACIONA EL CAMPO USER ID CON EL ID DE LA TABLA USUARIO
    references: {
      model: USER_TABLE,
      key: 'id'//HACIA DONDE DE LA OTRA TABLA VA A ESTAR REFERIDA
    },
    onUpdate: 'CASCADE',//QUE QUIERO QUE HAGA CUANDO SE ACTUALICE EL ID
    onDelete: 'SET NULL'//QUE QUIERO QUE HAGA CUANDO SE ELIMINE
  }
}

class Customer extends Model {
  //aqui se hacen las relaciones
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
