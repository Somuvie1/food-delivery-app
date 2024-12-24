const express = require('express');
const User = require("../models/User")
const generateToken = require('../utils/generateToken')

const router = express.Router();

//Register User
router.post("/register", async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "User already", error})
        
        const user = await User.create({name, email, password, role});
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch(error) {
        res.status(500).json({message: "Error creating user", error:error.message});
    }
})

//Login User
router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (user && (await user.matchPassword(password))) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(404).json({message: "Invalid email or password"}); 
        }
    } catch (error) {
        res.status(500).json({message: "Error logging in", error:error.message});
    }
});

module.exports = router;