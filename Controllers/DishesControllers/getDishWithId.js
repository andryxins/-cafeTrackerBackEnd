const Dish = require('../../models/dish');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length < 24) return res.sendStatus(400);

    await Dish.findOne({ _id: id }, (err, content) => {
      if (err) {
        console.log(`request failure with error '${err.message}'`);
        return res.send(err.message);
      }

      if (content) {
        res.send(content);
      } else {
        res.sendStatus(404);
      }
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
