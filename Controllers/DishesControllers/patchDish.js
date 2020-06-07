const Dish = require('../../models/dish');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length < 24) return res.sendStatus(400);

    const { body } = req;

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
