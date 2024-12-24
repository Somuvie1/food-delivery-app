const express = require("express");
const {protect, authorize} = require("../middleware/authMiddleware");

const router = express.Router();

//Restaurant Dashboard (Restaurant Role Only)
router.get("/dashboard", protect, authorize("restaurant"), (req, res) => {
    res.status(201).json({message: "Welcome to the restaurant dashboard"})
});

//Add Menu Item (Restaurant Role Only) 
router.post("/menu", protect, authorize("restaurant"), (req, res) => {
    res.status(201).json({message: "Menu item added successfully"})
})
module.exports = router;