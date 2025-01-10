const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
class OrderService {

  constructor() {
  }
  async findByUser(userId) {
    const orders = await models.Order.findAll({
      //esto hace consulas a las tablas relacionadas (asociaciones)
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user']
      },
      ],
    });
    return orders;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const rta = await models.Order.findAll();
    return rta;
  }

  async findOne(id) {
    //esto es una resolucion anidada,muestra el usuario,el cliente y a orden
    const user = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      },
        'items'],
    });
    if (!user) {
      throw boom.notFound('order not found');
    }
    return user;
  }

  async update(id, changes) {
    const rta = await models.Order.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await models.Order.findOne(id);
    await model.destroy();
    return { rta: true };
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
}

module.exports = OrderService;
