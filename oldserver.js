const express = require('express')
const next = require('next')
const fs = require('fs')
const bodyParser = require('body-parser') // turns the body into json object
const colors = require('colors')
const request = require('superagent')
//"dev": "npm-run-all --parallel server",
// ENV SETUP
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const expressServer = express()

//Auth
const serverLock = require('./utils/server-lock')
const authUtils = require('./utils/server-auth')


const secretAuth = {
    AUTH0_CLIENT_ID: "HfHVZS2aB0TLT8Z6Bny5kawCTrcuoWOt",
    AUTH0_CLIENT_DOMAIN: "smbtodos.auth0.com"
}

//Start APP
app.prepare()
  .then(() => {

    // allows us to send json to our express app
    expressServer.use(bodyParser.json())

    expressServer.get('/other', (req, res) => {
      
      // console.log(serverLock.getBaseUrl(req));
      return app.render(req, res, '/other', req.query)
    })

    expressServer.get('/', (req, res) => {
      // console.log('SECURE'.red);
      // console.log(JSON.stringify(req.secure, null, 2));
      // console.log('headers'.red);
      // console.log(JSON.stringify(req.headers, null, 2));
      return app.render(req, res, '/', req.query)
    })

    // expressServer.get('/celeb-jokes', (req, res) => {
    //   // const userToken = authUtils.getUserFromCookie(req);
    //   // console.log(userToken)

    //   // request
    //   //   .get('http://localhost:3001/api/jokes/celebrity')
    //   //   .set('Authorization', 'Bearer ' + req.userToken)
    //   //   .end(function(err, data) {
    //   //     // if(data.status == 403){
    //   //     //   res.send(403, '403 Forbidden');
    //   //     // } else {
    //   //     //   var movies = data.body;
    //   //     //   res.render('movies', { movies: movies} );
    //   //     // }
    //   //     console.log('node fetch');
    //   //     console.log(data.body)
    //   //     // res.send({jokes: data.body})
    //   //     console.log('node fetch error')
    //   //     console.log(err)
    //   //   })


    //   // return app.render(req, res, '/celeb-jokes', req.query, { nodeJokes: data.body })
    //   return app.render(req, res, '/celeb-jokes', req.query)

    // })

    expressServer.get('/auth/sign-in', (req, res) => {
      // when we hit this route
      // get req.route.path
      // console.log(serverLock.getBaseUrl(req));

      return app.render(req, res, '/auth/sign-in', req.query)
    })

    // expressServer.get('/auth/signed-in', (req, res) => {
    //   //set server cookie

    //   // redirect with data request

    //   return app.render(req, res, '/auth/sign-in', req.query)
    // })

    expressServer.get('/auth/sign-out', (req, res) => {
      // get req.route.path
      // when we hit this route
      // console.log(serverLock.getBaseUrl(req));

      return app.render(req, res, '/auth/sign-out', req.query)
    })

    expressServer.get('*', (req, res) => {
        return handle(req, res)
    })

    expressServer.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on: ' + port)
    })

  })
