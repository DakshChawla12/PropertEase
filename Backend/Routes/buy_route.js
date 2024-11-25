const express = require('express');
const Router = express.Router();
const { getAllListings, handleFilters, deleteListing, updateListing, getListingById } = require('../Controllers/buy_controllers');

Router.route('/')
        .get(getAllListings)
        .post(handleFilters);

Router.route('/:id')  // Use /:id for listing-specific actions
        .get(getListingById)
        .put(updateListing)
        .delete(deleteListing);  // Map delete to this route

module.exports = Router;
