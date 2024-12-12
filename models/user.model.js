const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [2, "Name must be at least 2 characters long"], // Corrected message
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [13, "Email must be at least 13 characters long"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"], // Corrected message
        trim: true,
    },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
