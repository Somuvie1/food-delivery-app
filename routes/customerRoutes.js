const express = require("express");
const {protect, authorize} = require("../middleware/authMiddleware");

const router = express.Router();

//View Orders (Customer Role Only)
router.get("/orders", protect, authorize("customer"), (req, res) => {
    res.status(200).json({message: "Here are your orders"});
});

module.exports = router;
