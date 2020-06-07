const Dish = require('../../models/dish');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
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
