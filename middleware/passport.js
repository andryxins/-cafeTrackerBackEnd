const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const jwtKey = require('../config/keys').jwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey,
};
const errorHandler = require('../utils/errorHandler');

module.exports = passport =>
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = User.findOne({ _id: payload.userId }).select('login id');

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (e) {
        errorHandler(res, e);
      }
    }),
  );
