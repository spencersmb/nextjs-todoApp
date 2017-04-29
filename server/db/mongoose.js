const mongoose = require('mongoose');

// Tell Mongoose to use a promise instead of callbacks
mongoose.Promise = global.Promise;

// Connect to db first
mongoose.connect('mongodb://localhost:27017/NodeTodos');

module.exports = {
    mongoose
}