const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const commentController = require('../controller/comment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')


const commentRouter = new KoaRouter({ prefix: '/comment' })

// 发布评论
commentRouter.post('/', verifyAuth, commentController.release)
// 回复评论
commentRouter.post('/reply', verifyAuth, commentController.reply)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, commentController.delete)

module.exports = commentRouter