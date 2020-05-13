const { Router } = require('express');
const router = Router();
const Dish = require('../models/dish');

router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();

    res.send(dishes);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/add', async (req, res) => {
  try {
    const dish = new Dish({ ...req.body });

    await dish.save(null, (err, content) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      console.log(`dish with id : ${content._id} was added`);
    });

    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
