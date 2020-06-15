const Order = require('../../models/order');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length !== 24) return res.sendStatus(400);

    const targetOrder = await Order.findOne({ _id: id }, err => {
      if (err) {
        console.log(`request failure with error '${err.message}'`);
        return res.send(err.message);
      }
    }).populate('dishes.dish userAdded lastUpdateBy');

    if (targetOrder) {
      res.send(targetOrder);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
