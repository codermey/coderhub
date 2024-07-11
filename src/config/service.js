const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  SERVER_HOST,
  SERVER_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env