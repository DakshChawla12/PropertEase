const express = require('express');
const Router = express.Router();
const isValidUser = require('../Middlewares/validUser');
const upload = require('../multerConfig');
const { createListing } = require('../Controllers/sellControllers');

Router.route('/')
    .post(isValidUser, upload.array('images', 5), createListing);

module.exports = Router;
