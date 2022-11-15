const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  //jwrFromRequest is function that accepts a request as the only parameter and returns either the JWT as a string or null.
  //Define how the JWT will be extracted from the request
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
});


module.exports = JwtStrategy;
