const { Router } = require('express');
const router = Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
  try {
    const allOrders = await Order.find();

    res.send(allOrders);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/add', async (req, res) => {
  try {
    const order = new Order({ ...req.body });

    await order.save(null, (err, content) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      console.log(`order with id : ${content._id} was added`);
    });

    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
