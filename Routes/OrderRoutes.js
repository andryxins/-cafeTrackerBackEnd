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

    if (id.length !== 24) return res.sendStatus(400);

    const targetOrder = await Order.findOne({ _id: id }, err => {
      if (err) {
        console.log(`request failure with error '${err.message}'`);
        return res.send(err.message);
      }
    }).populate('dishes.dish');

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

    await order.save(null, async (err, content) => {
      if (err) {
        console.log(`request failure with error '${err.message}'`);
        return res.send(err.message);
      }

      await Order.findOne({ _id: content._id }, err => {
        if (err) {
          console.log(`request failure with error '${err.message}'`);
          return res.send(err.message);
        }
      })
        .populate('dishes.dish')
        .then(populatedOrder => res.send(populatedOrder))
        .catch(err => res.send(err));
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

    await Order.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true, populate: 'dishes.dish' },
      (err, content) => {
        if (err) return res.send(err.message);

        if (content) {
          res.send(content);
        } else {
          res.sendStatus(404);
        }
      },
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24) return res.sendStatus(400);
    await Order.findOneAndDelete({ _id: id }, (err, content) => {
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
