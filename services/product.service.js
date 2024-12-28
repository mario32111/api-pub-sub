const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

/* const pool = require('../libs/postgres.pool')
 */

/* const sequelize = require('../libs/sequelize')
 */
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
    /*     this.pool = pool;
        //aqui se manejan los errores de conexiones a la bd
        this.pool.on('error', (err) => console.error(err)); */
  };

  async generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: crypto.randomUUID(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  };

  async create(data) {
    /*     const newProduct = {
          id: crypto.randomUUID(),
          ...data
        }
        this.products.push(newProduct);
        return newProduct; */
    const newProduct = await models.Product.create(data);
    return newProduct;
  };

  async find() {
    /*     const query = 'SELECT * FROM task'
        const [data] = await sequelize.query(query);
        return data;
     */
    /*     const query = 'SELECT * FROM task'
        const rta = await this.pool.query(query);
        return rta.rows; */
    /*     return new Promise ((resolve, reject) => {
          setTimeout(() =>{
            resolve(this.products)
          }, 5000)
        }) */
    const rta = await models.Product.findAll({
      include: ['category']
    });
    return rta;
  };

  async findOne(id) {
    /*     const product = this.products.find(item => item.id === id);
        if (!product) {
          throw boom.notFound('product not found');
        }
        if (product.isBlock) {
          throw boom.conflict('product is block')
        }
        return product; */
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('customer not found');
    }
    return category;
  };

  async update(id, changes) {
    /*     const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
          throw boom.notFound('Product not found');
        }
        const product = this.products[index];
        this.products[index] = {
          ...product,
          ...changes
        }
        return this.products[index]; */
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  };

  async delete(id) {
    /*     const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
          throw boom.notFound('Product not found');
        }
        this.products.splice(index, 1);
        return { id }; */
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  };
};

module.exports = ProductsService;
