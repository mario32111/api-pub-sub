const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class KeySistemService {
  constructor() {
  }

  async create(data) {
    const newKeySistem = await models.KeySistem.create({
      ...data,
    })
    return newKeySistem;
  }

  async find() {
    const rta = await models.KeySistem.findAll();
    return rta;
  }

  async findOne(id) {
    const keySistem = await models.KeySistem.findByPk(id);
    if (!keySistem) {
      throw boom.notFound('user not found');
    }
    return keySistem;
  }

  async update(id, changes) {
    const keySistem = await this.findOne(id);
    const rta = await keySistem.update(changes);
    return rta;

  }

  async delete(id) {
    const keySistem = await this.findOne(id);
    await keySistem.destroy();
    return { id };

  }
}

module.exports = KeySistemService;
