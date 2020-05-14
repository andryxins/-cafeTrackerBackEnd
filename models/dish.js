const { Schema, model } = require('mongoose');

const dish = new Schema({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingridients: {
    type: Object,
    required: true,
  },
});

module.exports = model('dish', dish);
