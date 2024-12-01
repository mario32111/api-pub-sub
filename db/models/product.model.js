const {   Model, DataTypes, Sequelize } = require('sequelize');
const { defaultValueSchemable } = require('sequelize/lib/utils');

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
  }
};

class Product extends Model {
  static associate(models) {
    // Aquí defines las asociaciones con otras tablas si las hay.
    // Por ejemplo:
    // this.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' });
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
