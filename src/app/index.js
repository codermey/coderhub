const Koa = require('koa')
const { bodyParser } = require('@koa/bodyparser')
const { successResponse } = require('../middleware/response.middleware')
const handleError = require('../utils/handle-error')
const registerRouter = require('../router')

const app = new Koa()

app.use(bodyParser())
// 注册路由
registerRouter(app)
app.use(successResponse)
// 统一错误处理
app.on('error', handleError)

module.exports = app