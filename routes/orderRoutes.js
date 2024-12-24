const express = require('express');
const Order = require('../models/Order');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

//Create Order(Protected)
router.post('/', protect, async(req, res) => {
    const {restaurantID, items, totalPrice} = req.body;
    
    try {
        const order = await Order.create({
            userID: req.user._id, 
            restaurantID,
            items, 
            totalPrice,
        })
        res.status(201).json(order);
    } catch(error) {
        res.status(500).json({message: "Error creating order", error})
    }
});

router.get('/', async(req, res) => {
    try {
        const orders = await Order.find().populate('userID').populate('restaurantID');
        res.status(200).json(orders);
    } catch(error) {
        res.status(500).json({message: "Error fetching orders", error})
    }
})

module.exports = router