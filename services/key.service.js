const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class KeyService {
  constructor() {
  }

  async create(data) {
    const newKey = await models.Key.create({
      ...data,
    })
    return newKey;
  }

  async find() {
    const rta = await models.Key.findAll();
    return rta;
  }

  async findOne(id) {
    const key = await models.Key.findByPk(id);
    if (!key) {
      throw boom.notFound('user not found');
    }
    return key;
  }

  async update(id, changes) {
    const key = await this.findOne(id);
    const rta = await key.update(changes);
    return rta;

  }

  async delete(id) {
    const key = await this.findOne(id);
    await key.destroy();
    return { id };

  }
}

module.exports = KeyService;
