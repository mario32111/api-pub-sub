const { User, UserSchema } = require('./user.model');
const { Irrigation, IrrigationSchema } = require('./irrigation.model');
const { Weather, WeatherSchema } = require('./weather.model');
const { Suggestion, SuggestionSchema } = require('./suggestion.model');
const { KeySistem, KeySistemSchema } = require('./keySistem.model');
const { Key, KeySchema } = require('./key.model');
const { Sesion, SesionSchema } = require('./session.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Irrigation.init(IrrigationSchema, Irrigation.config(sequelize));
  Weather.init(WeatherSchema, Weather.config(sequelize));
  Suggestion.init(SuggestionSchema, Suggestion.config(sequelize));
  KeySistem.init(KeySistemSchema, KeySistem.config(sequelize));
  Key.init(KeySchema, Key.config(sequelize));
  Sesion.init(SesionSchema, Sesion.config(sequelize));
  //tambien hay que correr las asociaciones y enviarle los modelos
  User.associate(sequelize.models);
  Irrigation.associate(sequelize.models);
  Weather.associate(sequelize.models);
  Suggestion.associate(sequelize.models);
  KeySistem.associate(sequelize.models);
  Key.associate(sequelize.models);
  Sesion.associate(sequelize.models);

}

module.exports = setupModels;
