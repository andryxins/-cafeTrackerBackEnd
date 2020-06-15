const { Router } = require('express');
const router = Router();
const passport = require('passport');
const getAllDishes = require('../Controllers/DishesControllers/getAllDishes');
const getDishWithId = require('../Controllers/DishesControllers/getDishWithId');
const postNewDish = require('../Controllers/DishesControllers/postNewDish');
const patchDish = require('../Controllers/DishesControllers/patchDish');
const deleteDish = require('../Controllers/DishesControllers/deleteDish');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => getAllDishes(req, res),
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => getDishWithId(req, res),
);

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => postNewDish(req, res),
);

router.patch(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => patchDish(req, res),
);

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => deleteDish(req, res),
);

module.exports = router;
