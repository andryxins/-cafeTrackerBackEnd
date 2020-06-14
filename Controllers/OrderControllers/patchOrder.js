const Order = require('../../models/order');
const errorHandler = require('../../utils/errorHandler');
const getDataFromToken = require('../../utils/getDataFromToken');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const reqUser = getDataFromToken(req, res);

    await Order.findOneAndUpdate(
      { _id: id },
      { ...body, lastUpdateBy: reqUser.userId },
      { new: true, populate: 'dishes.dish userAdded lastUpdateBy' },
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
