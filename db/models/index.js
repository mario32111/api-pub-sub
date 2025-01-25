const { Example, ExampleSchema } = require('./example.model');


function setupModels(sequelize) {
  Example.init(ExampleSchema, Example.config(sequelize));
  //tambien hay que correr las asociaciones y enviarle los modelos
  Example.associate(sequelize.models);
}

module.exports = setupModels;
