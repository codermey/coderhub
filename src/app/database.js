const mysql = require('mysql2')
const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT
} = require('../config/service')

const connectionPool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  connectionLimit: 10
})

connectionPool.getConnection((err, connection) => {
  // 连接失败
  if (err) {
    return console.error('Error connecting to database: ', err)
  }
  // 连接成功
  connection.connect(err => {
    if (err) {
      console.error('和数据库交互失败: ', err)
    } else {
      console.log('和数据库交互成功')
    }
  })
})

const connection = connectionPool.promise()

module.exports = connection
