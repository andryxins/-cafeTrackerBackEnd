const { Router } = require('express');
const router = Router();
const getAllOrders = require('../Controllers/OrderControllers/getAllOrders');
const getOrderWithId = require('../Controllers/OrderControllers/getOrderWithId');
const postNewOrder = require('../Controllers/OrderControllers/postNewOrder');
const patchOrder = require('../Controllers/OrderControllers/patchOrder');
const deleteOrder = require('../Controllers/OrderControllers/deleteOrder');

router.get('/', async (req, res) => getAllOrders(req, res));

router.get('/:id', async (req, res) => getOrderWithId(req, res));

router.post('/add', async (req, res) => postNewOrder(req, res));

router.patch('/edit/:id', async (req, res) => patchOrder(req, res));

router.delete('/delete/:id', async (req, res) => deleteOrder(req, res));

module.exports = router;
