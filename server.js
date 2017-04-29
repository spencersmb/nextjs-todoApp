const express = require('express')
const next = require('next')
const fs = require('fs');
const bodyParser = require('body-parser'); // turns the body into json object

// DB SETUP
const {mongoose} = require('./server/db/mongoose'); // mongoose config
const {Todo} = require('./server/models/todos');
const {User} = require('./server/models/user');

// ENV SETUP
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000;


//Start APP
app.prepare()
.then(() => {
  const server = express()

  // allows us to send json to our express app
  server.use(bodyParser.json());

  server.post('/todos', (req, res) => {

    const todo = new Todo({
      text: req.body.text
    });

    todo.save().then((response) => {

      res.status(400).send(response);

    }, (e) => {

      res.send(e);

    });
    
  })

  server.get('/other', (req, res) => {
    console.log('other route');
    return app.render(req, res, '/other', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on: ' + port)
  })
})