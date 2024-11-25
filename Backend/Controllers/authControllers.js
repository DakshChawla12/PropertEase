const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel');
const generateToken = require('../utils');

async function signUp(req, res) {
    try {
        const { username, email, password, contactNumber } = req.body;

        if (!username || !email || !password || !contactNumber) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Include the URL field when creating the new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            contactNumber,
            URL: '' // Initialize URL field here
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                contactNumber: newUser.contactNumber,
                URL: newUser.URL // Include the URL in the response
            }
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const jwtToken = await generateToken(user.email,user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            jwtToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                contactNumber: user.contactNumber,
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {login,signUp};
