const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');
const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

//esta estrategia ya te entrega el payload del token
const JwtStrategy = new Strategy(options, async (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
