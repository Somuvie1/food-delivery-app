const express = require("express");
const {protect, authorize} = require("../middleware/authMiddleware");

const router = express.Router();

//View Assigned Orders(Delivery Role Only)
router.get("assigned-orders", protect, authorize("delivery"), (req, res) => {
    res.status(200).json({message: "Here are your assigned orders"})
});

module.exports = routers;