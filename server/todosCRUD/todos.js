const mongoose = require('mongoose')
// let {Todo} = require('../models/todos');
// let {User} = require('./models/user');
const TodoModel = require('../models/todos');
let Todo = TodoModel.getTodoModel();



exports.addTodo = function(req, res){

    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    })

}