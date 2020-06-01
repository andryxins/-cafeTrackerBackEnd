const Order = require('../../models/order');

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const order = new Order({ ...body });

    await order.save(null, async (err, content) => {
      if (err) {
        console.log(`request failure with error '${err.message}'`);
        return res.send(err.message);
      }

      await Order.findOne({ _id: content._id }, err => {
        if (err) {
          console.log(`request failure with error '${err.message}'`);
          return res.status(500).send(err.message);
        }
      })
        .populate('dishes.dish')
        .then(populatedOrder => res.status(201).send(populatedOrder))
        .catch(err => res.status(500).send(err));
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
