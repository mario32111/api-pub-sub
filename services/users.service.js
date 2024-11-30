const { faker } = require('@faker-js/faker');

const getConnection = require ('../libs/postgres');

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
    const newUser = {
      id: crypto.randomUUID(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
/*     return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 5000);
    }); */
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM task');
    return rta.rows;
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
