const bodyParser = require('body-parser') // turns the body into json object
const todoActions = require('./todosCRUD/todos')

const init = (server, handle = null, app = null) => {

  // allows us to send json to our express app
  server.use(bodyParser.json())

  // ADD TODO TO DB
  server.post('/todos', (req, res) => {
      todoActions.addTodo(req, res)
  })

  if(app){
    server.get('/other', (req, res) => {
      console.log('other route');
      return app.render(req, res, '/other', req.query)
    })
  }

  if(handle){
    server.get('*', (req, res) => {
        return handle(req, res)
    })
  }

}

module.exports = {
    init
}