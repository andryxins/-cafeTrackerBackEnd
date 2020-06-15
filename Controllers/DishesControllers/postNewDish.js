const Dish = require('../../models/dish');
const User = require('../../models/user');
const errorHandler = require('../../utils/errorHandler');
const getDataFromToken = require('../../utils/getDataFromToken');

module.exports = async (req, res) => {
  try {
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

    const { body } = req;
    const dish = new Dish({ ...body });

    await dish.save(null, (err, content) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      return res.send(content);
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
