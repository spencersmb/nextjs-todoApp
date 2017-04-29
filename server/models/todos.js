const mongoose = require('mongoose');

// Data Model
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    }
});

module.exports = {Todo};