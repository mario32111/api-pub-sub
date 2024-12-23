const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize)); // Usa Product.init aquí
  Customer.init(CustomerSchema, Customer.config(sequelize)); // Usa Product.init aquí

  //tambien hay que correr las asociaciones y enviarle los modelos
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
