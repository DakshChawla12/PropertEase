const express = require('express');
const Router = express.Router();  // Use express.Router() instead of just express()
const { login, signUp } = require('../Controllers/authControllers');
const { signUpValidation, loginValidation } = require('../Middlewares/AuthValidation');

// Correctly apply the validation middlewares to the POST routes
Router.post('/login', loginValidation, login);
Router.post('/signup', signUpValidation, signUp);

module.exports = Router;
