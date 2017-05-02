var express = require('express')
var bodyParser = require('body-parser') // turns the body into json object
var routes = require('./routes')
// var {Todo} = require('../server/models/todos');
var todoActions = require('./todosCRUD/todos')
var app = express()

app.use(bodyParser.json())

routes.init(app)
 // ADD TODO TO DB
//   app.post('/todos', (req, res) => {
//       todoActions.addTodo(req, res)
//   })

module.exports = {app}