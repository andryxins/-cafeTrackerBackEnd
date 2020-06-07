const Order = require('../../models/order');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
    console.log(req.user);
    const allOrders = await Order.find().populate('dishes.dish');

    return res.send(allOrders);
  } catch (e) {
    errorHandler(res, error);
  }
};
