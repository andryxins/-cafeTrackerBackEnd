const Order = require('../../models/order');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length !== 24) return res.sendStatus(400);

    const targetOrder = await Order.findOne({ _id: id }, err => {
      if (err) {
        console.log(`request failure with error '${err.message}'`);
        return res.send(err.message);
      }
    }).populate('dishes.dish');

    if (targetOrder) {
      res.send(targetOrder);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
