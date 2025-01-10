const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');

const service = new AuthService();

//esto es una validacion de usuario y contraseña en local
const LocalStrategy = new Strategy({
  //estos son los alias de los campos que se van a validar
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await service.getUser(email,password);
    //si todo esta bien
    done(null, user);

  } catch (error) {
    //si hay un error
    done(error, false);
  }

});

module.exports = LocalStrategy;
