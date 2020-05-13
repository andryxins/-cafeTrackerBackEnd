const { Schema, model } = require('mongoose');

const order = new Schema({
  comment: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  dishes: {
    type: Array,
  },
  guests: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  selectedDates: {
    type: Array,
  },
  tel: {
    type: String,
    required: true,
  },
});

module.exports = model('Order', order);
