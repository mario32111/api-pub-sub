const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  User.init(ProductSchema, Product.config(sequelize));

}

module.exports = setupModels;
