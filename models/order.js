const { Schema, model } = require('mongoose');

const order = new Schema({
  comment: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  dishes: [
    {
      count: {
        type: Number,
        required: true,
        default: 1,
      },
      dish: {
        type: Schema.Types.ObjectId,
        ref: 'dish',
        required: true,
      },
    },
  ],
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

// cart: {
//   addedItems: [
//     {
//       count: {
// type: Number,
// required: true,
// default: 1,
//       },
// itemId: {
//   type: Schema.Types.ObjectId,
//   ref: 'Course',
//   required: true,
// },
//     },
//   ],
// },

module.exports = model('Order', order);
