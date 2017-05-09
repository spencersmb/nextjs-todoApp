const express = require('express')
const next = require('next')
const fs = require('fs')
const bodyParser = require('body-parser') // turns the body into json object
const colors = require('colors')
// ENV SETUP
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const expressServer = express()


// Start APP
app.prepare()
  .then(() => {
    // allows us to send json to our express app
    expressServer.use(bodyParser.json())

    expressServer.get('/other', (req, res) => {
      // console.log(serverLock.getBaseUrl(req));
      

      req.query = {
        text: "spencer"
      }

      console.log(req.query)
      return app.render(req, res, '/other', req.query)
    })

    expressServer.get('/', (req, res) => {
      // console.log('SECURE'.red);
      // console.log(JSON.stringify(req.secure, null, 2));
      // console.log('headers'.red);
      // console.log(JSON.stringify(req.headers, null, 2));
      
      return app.render(req, res, '/', req.query)
    })

    expressServer.get('*', (req, res) => {
      return handle(req, res)
    })

    expressServer.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on: ' + port)
    })
  })