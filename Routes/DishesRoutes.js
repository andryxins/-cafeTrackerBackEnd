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

    const targetDish = await Dish.findOne({ _id: id });

    if (targetDish) {
      return res.send(targetDish);
    } else {
      return res.sendStatus(404);
    }
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

      return res.sendStatus(201);
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

    const targetDish = await Dish.findOneAndUpdate({ _id: id }, { ...body });

    if (targetDish) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length < 24) return res.sendStatus(400);
    const targetDish = await Dish.findOneAndDelete({ _id: id });

    if (targetDish) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

module.exports = router;
