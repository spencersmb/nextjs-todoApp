/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const request = require('supertest')
const expect = require('expect')
const mongoose = require('mongoose')
const utils = require('../server/utils/utils')
const {app} = require('../server/testServer')
const port = process.env.PORT || 3000
const colors = require('colors')
let server

// beforeAll((done) => {

//     server = app.listen(port, () => {
//         console.log('App running on port 3000')
//     })

//     mongoose.Promise = global.Promise

//     // Connect to db first
//     mongoose.connect('mongodb://localhost:27017/NodeTodos')

//     done();

// })

// afterAll( () => {
//     // utils.cleanup(server, mongoose)
//     cleanup(server, mongoose)
// })

describe('POST /todos', () => {
    // https://mochajs.org/
    // USE FOR MOCHA TESTING
    // DONT FORGET TO ADD TRY CATCH FOR MODELS IF USING MOCHA
  before((done) => {
    server = app.listen(port, () => {
      console.log(' ')
      console.log(`App running on port ${port}`.green)
      console.log(' ')
    })

    mongoose.Promise = global.Promise

        // Connect to db first
    mongoose.connect('mongodb://localhost:27017/NodeTodos')

    done() // must have done in here to work correctly apparently
  })

  after(function () {
        // runs after all tests in this block
    utils.cleanup(server, mongoose)
  })

  it('Should create a new todo update', (done) => {
    var text = 'worked again again'

    request(server)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
              expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
              if (err) {
                return done(err)
              }

              return done()
            })
            // End Request Test
  })
})
