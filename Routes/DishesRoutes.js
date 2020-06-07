const { Router } = require('express');
const router = Router();
const getAllDishes = require('../Controllers/DishesControllers/getAllDishes');
const getDishWithId = require('../Controllers/DishesControllers/getDishWithId');
const postNewDish = require('../Controllers/DishesControllers/postNewDish');
const patchDish = require('../Controllers/DishesControllers/patchDish');
const deleteDish = require('../Controllers/DishesControllers/deleteDish');

router.get('/', async (req, res) => getAllDishes(req, res));

router.get('/:id', async (req, res) => getDishWithId(req, res));

router.post('/add', async (req, res) => postNewDish(req, res));

router.patch('/edit/:id', async (req, res) => patchDish(req, res));

router.delete('/delete/:id', async (req, res) => deleteDish(req, res));

module.exports = router;
