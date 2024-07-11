const KoaRouter = require('@koa/router')
const { verifyLogin } = require('../middleware/login.middleware')
const loginController = require('../controller/login.controller')


const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, loginController.sign)

module.exports = loginRouter

