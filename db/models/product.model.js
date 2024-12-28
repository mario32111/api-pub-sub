const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2) // Maneja hasta 10 dígitos, 2 para decimales
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },

  //tambien esto es parte de la reclacion
  //EN ESTE CASO SE QUITA EL UNIQUE POR QUE ES UNA RELACION 1:N
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    //AQUI SE RELACIONA EL CAMPO USER ID CON EL ID DE LA TABLA USUARIO
    references: {
      model: CATEGORY_TABLE,
      key: 'id'//HACIA DONDE DE LA OTRA TABLA VA A ESTAR REFERIDA
    },
    onUpdate: 'CASCADE',//QUE QUIERO QUE HAGA CUANDO SE ACTUALICE EL ID
    onDelete: 'SET NULL'//QUE QUIERO QUE HAGA CUANDO SE ELIMINE
  }
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
