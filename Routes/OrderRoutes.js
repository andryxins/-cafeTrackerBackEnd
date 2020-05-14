const { Router } = require('express');
const router = Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
  try {
    const allOrders = await Order.find().populate('dishes.dish');

    return res.send(allOrders);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length < 24) return res.sendStatus(400);

    const targetOrder = await Order.findOne({ _id: id }).populate(
      'dishes.dish',
    );

    if (targetOrder) {
      res.send(targetOrder);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { body } = req;
    const order = new Order({ ...body });

    await order.save(null, (err, content) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      return res.sendStatus(201);
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

router.patch('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const targetOrder = await Order.findOneAndUpdate({ _id: id }, { ...body });

    if (targetOrder) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length < 24) return res.sendStatus(400);
    const targetOrder = await Order.findOneAndDelete({ _id: id });

    if (targetOrder) {
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
