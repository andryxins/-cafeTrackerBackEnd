const Order = require('../../models/order');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24) return res.sendStatus(400);
    await Order.findOneAndDelete({ _id: id }, (err, content) => {
      if (err) {
        res.send(err.message);
      }

      if (content) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
