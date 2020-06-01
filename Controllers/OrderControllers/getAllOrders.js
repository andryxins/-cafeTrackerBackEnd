const Order = require('../../models/order');

module.exports = async (req, res) => {
  try {
    const allOrders = await Order.find().populate('dishes.dish');

    return res.send(allOrders);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
