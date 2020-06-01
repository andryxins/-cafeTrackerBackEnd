const { Schema, model } = require('mongoose');

const user = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    reqired: true,
  },
});

module.exports = model('user', user);
