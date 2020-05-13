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

// {
//     "id": 1,
//     "img": "https://i.obozrevatel.com/food/recipemain/2018/11/15/screenshot81.webp?size=600x400",
//     "ingridients": {
//       "Маслини": 20,
//       "Огірки свіжі": 35,
//       "Олія рафінована": 5,
//       "Перець свіжий": 20,
//       "Помідори": 40,
//       "Сир бринза": 30
//     },
//     "mount": 4,
//     "name": "Грецький",
//     "price": 55
//   },
