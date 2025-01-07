const { Model, DataTypes, Sequelize } = require('sequelize');
const ORDER_TABLE = 'orders';
const { CUSTOMER_TABLE } = require('./customer.model');

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
/*   total: {
    allowNull: false,
    type: DataTypes.FLOAT
  }, */
  //virtual para calcular el total de la orden
  totalOrder: {
    type: DataTypes.VIRTUAL,
    get() {
      // Valida si items está definido y es un array
      if (this.items && Array.isArray(this.items) && this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0; // Retorna 0 si items no está definido o está vacío
    }
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
      foreignKey: 'customerId'
    });
    //se le envia la tabla con la que tiene relacion y el nombre de la tabla intermedia
    this.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'orderId',
      as: 'items',
      otherKey: 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
