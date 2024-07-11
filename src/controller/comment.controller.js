const commentService = require('../service/comment.service')

class CommentController {
  // 发布评论
  async release(ctx, next) {
    const userId = ctx.user.id
    const { dynamicId, content } = ctx.request.body
    await commentService.release(userId, dynamicId, content)
    ctx.data = null
    await next()
  }

  // 回复评论
  async reply(ctx, next) {
    const userId = ctx.user.id
    const { dynamicId, content, commentId } = ctx.request.body
    await commentService.reply(userId, dynamicId, commentId, content)
    ctx.data = null
    await next()
  }

  // 删除评论
  async delete(ctx, next) {
    const { commentId } = ctx.params
    await commentService.delete(commentId)
    ctx.data = null
    await next()
  }
}

module.exports = new CommentController()