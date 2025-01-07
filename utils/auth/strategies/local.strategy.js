const { Strategy } = require('passport-local');
const UsersService = require('../../../services/users.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UsersService();

//esto es una validacion de usuario y contraseña en local
const LocalStrategy = new Strategy({
  //estos son los alias de los campos que se van a validar
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    //si no existe el usuario
    if (!user) {
      return done(boom.unauthorized, false);
    }

    //si la contraseña no es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(boom.unauthorized, false);
    }
    delete user.dataValues.password;
    //si todo esta bien
    done(null, user);

  } catch (error) {
    //si hay un error
    done(error, false);
  }

});

module.exports = LocalStrategy;
