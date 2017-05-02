const express = require('express')
const next = require('next')
const fs = require('fs')
const bodyParser = require('body-parser') // turns the body into json object

// ENV SETUP
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const expressServer = express()

//Start APP
app.prepare()
  .then(() => {

    // allows us to send json to our express app
    expressServer.use(bodyParser.json())

    expressServer.get('/other', (req, res) => {
      console.log('other route');
      return app.render(req, res, '/other', req.query)
    })

    expressServer.get('*', (req, res) => {
        return handle(req, res)
    })

    expressServer.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on: ' + port)
    })

  })
