const Dish = require('../../models/dish');
const User = require('../../models/user');
const errorHandler = require('../../utils/errorHandler');
const getDataFromToken = require('../../utils/getDataFromToken');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length < 24) return res.sendStatus(400);

    const reqUser = getDataFromToken(req, res);

    const user = await User.findOne({ _id: reqUser.userId }, err => {
      if (err) {
        return res.send(err.message);
      }
    });

    if (!user.isAdmin) {
      return res.status(403).json({
        message: 'does not have access rights to this action',
      });
    }

    await Dish.findOneAndDelete({ _id: id }, (err, content) => {
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
    errorHandler(res, e);
  }
};
