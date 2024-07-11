const KoaRouter = require('@koa/router')
const { verifyUser, encryptPassword } = require('../middleware/user.middleware')
const userController = require('../controller/user.controller')

const userRouter = new KoaRouter({ prefix: '/user' })

// 用户注册
userRouter.post('/', encryptPassword, verifyUser, userController.create)
// 查看用户头像
userRouter.get('/avatar/:userId', userController.viewAvatar)


module.exports = userRouter