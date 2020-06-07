const Order = require('../../models/order');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    await Order.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true, populate: 'dishes.dish' },
      (err, content) => {
        if (err) return res.send(err.message);

        if (content) {
          res.send(content);
        } else {
          res.sendStatus(404);
        }
      },
    );
  } catch (e) {
    errorHandler(res, e);
  }
};
