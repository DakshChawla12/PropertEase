const userModel = require('../Models/userModel');
const listingModel = require('../Models/listingModel');
const mongoose = require('mongoose');

async function getAllListings(req, res) {
    try {
        const listings = await listingModel.find();
        res.status(200).json({ success: true, listings });
    } catch (error) {
        console.error('Error fetching all listings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


async function handleFilters(req, res) {
    try {
        const { price, location, area } = req.body;
        console.log('Received filters:', req.body);
        let filter = {};
        
        if (price) {
            filter.price = { $lte: parseInt(price) };
        }

        if (location) {
            filter.location = { $regex: new RegExp(location, 'i') };
        }

        if (area) {
            filter.area = { $lte: parseInt(area) };
        }

        console.log('Constructed filter:', filter);

        const filteredListings = await listingModel.find(filter);

        res.status(200).json({ success: true, message: "Listings filtered successfully", filteredListings });
    } catch (error) {
        console.error('Error fetching listings:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}



async function updateListing(req, res) {
    try {
        const { id } = req.params; 
        const { url, location, bedrooms, bathrooms, price, area } = req.body; 
        
        // Check if all required fields are provided
        if (!url || !location || bedrooms === undefined || bathrooms === undefined || price === undefined || area === undefined) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const updatedListing = await listingModel.findByIdAndUpdate(
            id, 
            { url, location, bedrooms, bathrooms, price, area },
            { new: true, runValidators: true }
        );

        if (!updatedListing) {
            return res.status(404).json({ success: false, message: "Please enter a valid ID" });
        }

        return res.status(200).json({
            success: true,
            message: `Listing with id ${id} modified`,
            updated_listing: updatedListing,
        });
    } catch (error) {
        console.error('Error updating listing:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function getListingById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, message: "Invalid ID" });

        const listing = await listingModel.findById(id).populate('createdBy');
        if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

        const user = await userModel.findById(listing.createdBy);

        return res.status(200).json({ success: true, listing });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function deleteListing(req, res) {
    try {
        const { email } = req.body;
        const id = req.params.id;

        if (!id || !email) {
            return res.status(400).json({ success: false, message: "Invalid details" });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the listing is in the user's listings
        if (!user.listings.includes(id)) {
            return res.status(404).json({ success: false, message: "Listing not found in user's listings" });
        }

        // Delete the listing from the listings collection
        await listingModel.deleteOne({ _id: id });

        // Update the user's listings by removing the listing
        const updatedListings = user.listings.filter(listingId => listingId.toString() !== id);
        user.listings = updatedListings;
        await user.save();

        // Fetch the full details of all remaining listings
        const fullUpdatedListings = await listingModel.find({ _id: { $in: updatedListings } });

        return res.status(200).json({ success: true, updatedListings: fullUpdatedListings });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}


module.exports = {getAllListings,handleFilters,updateListing,getListingById,deleteListing};