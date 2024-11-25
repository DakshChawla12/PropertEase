const express = require('express');
const Router = express.Router();
const { getMyListings, getFavorites, addToFavorites, deleteFromFavorites, getUserData, setProfilePhoto } = require('../Controllers/userControllers');
const upload = require('../multerConfig');

// Route to get user data
Router.route('/')
        .get(getUserData);

// Route to set profile photo with middleware for file upload
Router.route('/setPhoto')
        .post(upload.single('image'), setProfilePhoto);

// Route to get user's listings
Router.route('/listings')
        .get(getMyListings);

// Route for favorites
Router.route('/favorites')
        .get(getFavorites)
        .post(addToFavorites)
        .delete(deleteFromFavorites);

module.exports = Router;
