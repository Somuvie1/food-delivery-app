const express = require('express');
const {protect, isAdmin} = require("../middleware/authMiddleware");

const router = express.Router();

//Admin dashboard
router.get('/dashboard', protect, isAdmin, (req, res) => {
    res.status(200).json({message:"Welcome to the admin dashboard"})
});



