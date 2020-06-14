const Order = require('../../models/order');
const errorHandler = require('../../utils/errorHandler');
const getDataFromToken = require('../../utils/getDataFromToken');

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const reqUser = getDataFromToken(req, res);
    const order = new Order({ ...body, userAdded: reqUser.userId });

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
        .populate('dishes.dish userAdded')
        .then(populatedOrder => res.status(201).send(populatedOrder))
        .catch(err => res.status(500).send(err));
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
