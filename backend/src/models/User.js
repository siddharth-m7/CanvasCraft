const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true, 
        minlength: 6,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    profilePicture: {
        type: String,
        default: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png', // replace with your default image URL
    }},
    { timestamps:true});

module.exports = mongoose.model('User', userSchema);