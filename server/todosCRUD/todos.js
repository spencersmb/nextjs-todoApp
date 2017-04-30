const mongoose = require('mongoose')
let {Todo} = require('../models/todos');
// let {User} = require('./models/user');

exports.addTodo = function(req, res){

    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })

}

// USE TRY CATCH IF USING MOCHA AND DO NOT IMPORT/REQUIRE THE MODEL
// let Todo

// Try catch to use with Mocha testing
// try {
//   Todo = mongoose.model('Todo')
// } catch (error) {
//   Todo = require('../models/todos')
// }