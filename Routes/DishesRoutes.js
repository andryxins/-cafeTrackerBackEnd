const { Router } = require('express');
const router = Router();
const Dish = require('../models/dish');

router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();

    return res.send(dishes);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
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
    console.log(e);
    return res.sendStatus(500);
  }
});

router.post('/add', async (req, res) => {
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
    console.log(e);
    res.sendStatus(500);
  }
});

router.patch('/edit/:id', async (req, res) => {
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
    console.log(e);
    return res.sendStatus(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length < 24) return res.sendStatus(400);
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
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = router;
