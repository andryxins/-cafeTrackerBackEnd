const Dish = require('../../models/dish');
const User = require('../../models/user');
const errorHandler = require('../../utils/errorHandler');
const getDataFromToken = require('../../utils/getDataFromToken');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
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

    await Dish.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
      (err, content) => {
        if (err) {
          return res.send(err);
        }

        if (content) {
          return res.send(content);
        } else {
          return res.sendStatus(404);
        }
      },
    );
  } catch (e) {
    errorHandler(res, e);
  }
};
