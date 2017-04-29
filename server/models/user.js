const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    }
});

module.exports = {User};