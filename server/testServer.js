const express = require('express')
const bodyParser = require('body-parser') // turns the body into json object
const routes = require('./routes')
const todoActions = require('./todosCRUD/todos')
const app = express()

app.use(bodyParser.json())

routes.init(app)

module.exports = {app}