const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVER_HOST, SERVER_PORT } = require('../config/service')

class FileController {
  async uploadAvatar(ctx, next) {
    const userId = ctx.user.id
    const { filename, mimetype, size } = ctx.request.file
    // 头像信息保存到数据库
    await fileService.createAvatar(filename, mimetype, size, userId)
    // 头像地址
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${userId}`
    // 更新用户头像
    await userService.updateUserAvatar(userId, avatarUrl)
    ctx.msg = '上传头像成功'
    ctx.data = {
      avatarUrl,
    }
    await next()
  }
}

module.exports = new FileController()