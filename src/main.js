const app = require('./app')
const { SERVER_PORT } = require('./config/service')

app.listen(SERVER_PORT, () => {
  console.log('Listening on port ' + SERVER_PORT)
})