const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwt;
const errorHandler = require('./errorHandler');

module.exports = (req, res) => {
  try {
    const { authorization } = req.headers;

    return jwt.verify(authorization.slice(7), jwtKey);
  } catch (e) {
    errorHandler(res, e);
  }
};
