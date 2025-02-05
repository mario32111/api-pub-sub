const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class IrrigationService {
  constructor() {
  }

  async create(data) {
    const newIrrigation = await models.Irrigation.create({
      ...data,
    })
    return newIrrigation;
  }

  async find() {
    const rta = await models.Irrigation.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.Irrigation.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;

  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };

  }
}

module.exports = IrrigationService;
