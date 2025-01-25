const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

/* const getConnection = require ('../libs/postgres');
 */

const { models } = require('./../libs/sequelize');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: crypto.randomUUID(),
        name: faker.person.fullName(), // Cambié de faker.name.findName() a faker.person.fullName()
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
      });
    }
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash,
    })
    delete newUser.dataValues.password;
    return newUser;
    /*     const newUser = {
          id: crypto.randomUUID(),
          ...data,
        };
        this.users.push(newUser);
        return newUser; */
  }

  async find() {
    /*     return new Promise((resolve) => {
          setTimeout(() => {
            resolve(this.users);
          }, 5000);
        }); */
    /*     const client = await getConnection();
        const rta = await client.query('SELECT * FROM task');
        return rta.rows; */
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['customer']
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
    /*     const user = this.users.find((item) => item.id === id);
        if (!user) {
          throw boom.notFound('user not found');
        }
        if (user.isBlock) {
          throw boom.conflict('user is block')
        }
        return user; */
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
    /*     const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
          throw boom.notFound('User not found');
        }
        const user = this.users[index];
        this.users[index] = {
          ...user,
          ...changes,
        };
        return this.users[index]; */
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
    /*     const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
          throw boom.notFound('User not found');
        }
        this.users.splice(index, 1);
        return { id }; */
  }
}

module.exports = UsersService;
