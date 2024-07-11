const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const labelController = require('../controller/label.controller')

const labelRouter = new KoaRouter({ prefix: '/label' })

labelRouter.post('/', verifyAuth, labelController.create)

module.exports = labelRouter