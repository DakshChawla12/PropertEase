const mongoose = require('mongoose');
const listingModel = require('../Models/listingModel');
const userModel = require('../Models/userModel'); // Assuming you have a User model

const createListing = async (req, res) => {
    const { location, bedrooms, bathrooms, area, price, user_email } = req.body;

    // Check if required fields are provided
    if (!location || !bedrooms || !bathrooms || !area || !price || !user_email) {
        return res.json({ success: false, message: "Incomplete details" });
    }

    try {
        // Find the user by email
        const user = await userModel.findOne({ email: user_email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Ensure req.files exists and has uploaded images
        if (!req.files || req.files.length === 0) {
            return res.json({ success: false, message: "No images uploaded" });
        }

        // Extract image URLs from req.files
        const imageUrls = req.files.map(file => file.path); // Assuming each file has a 'path' property for the Cloudinary URL

        // Create a new listing
        const newListing = new listingModel({
            location,
            bedrooms,
            bathrooms,
            area,
            price,
            images: imageUrls, // Store all image URLs in the images array
            createdBy: user._id // Use the user's ObjectId
        });

        await newListing.save();
        user.listings.push(newListing._id); // Add the new listing ID to the user's listings
        await user.save();

        const updatedListings = await listingModel.find({});

        return res.json({ success: true, message: "Listing added successfully", updatedListings });
    } catch (err) {
        return res.json({ success: false, message: "Listing not added" });
    }
};

module.exports = { createListing };
