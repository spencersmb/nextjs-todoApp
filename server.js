const express = require('express')
const next = require('next')
const fs = require('fs')
const routes = require('./server/routes');
const bodyParser = require('body-parser') // turns the body into json object

// DB SETUP
const {mongoose} = require('./server/db/mongoose') // mongoose config

// ENV SETUP
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const expressServer = express()

//Start APP
app.prepare()
  .then(() => {

    // Build Routes and add them to the express server
    // pass in ExpressServer, requestHandlers, nextApp
    routes.init(expressServer, handle, app)

    expressServer.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on: ' + port)
    })

  })
