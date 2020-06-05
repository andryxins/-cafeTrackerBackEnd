const { Router } = require('express');
const router = Router();
const LoginController = require('../Controllers/AuthControllers/login');
const RegistrationController = require('../Controllers/AuthControllers/registration');

router.post('/login', (req, res) => LoginController(req, res));

router.post('/registration', (req, res) => RegistrationController(req, res));

module.exports = router;
