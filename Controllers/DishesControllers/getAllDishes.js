const Dish = require('../../models/dish');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
    const dishes = await Dish.find();

    return res.send(dishes);
  } catch (e) {
    errorHandler(res, e);
  }
};
