const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config');
const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

//esto es una validacion de usuario y contraseña en local
const jwtStrategy = new Strategy({

});

module.exports = jwtStrategy;
