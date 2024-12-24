const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        restaurantId: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true},
        items: [
            {
                name: {type: String, required: true},
                quantity: {type: Number, required: true},
                price: {type: Number, required: true},
            },
        ],
        totalPrice: {type: Number, required: true},
        status: {type: String, enum:["pending", "delivered"], default: "pending"}
    },
    {timestamps: true}
);
module.exports = mongoose.model('Order', orderSchema);