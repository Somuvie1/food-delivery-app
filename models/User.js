const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["customer", "delivery", "restaurant"], default: "customer"}
    },
    {timestamps: true}
);

//Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//Method to check password
userSchema.methods.matchPassword = async function (encteredPaswword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

module.exports = mongoose.model("User", userSchema);