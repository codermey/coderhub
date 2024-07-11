const fs = require('fs')
const path = require('path')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file-path')


class UserController {
  // 创建用户
  async create(ctx, next) {
    const user = ctx.request.body
    await userService.create(user)
    ctx.msg = '用户创建成功'
    ctx.data = null
    await next()
  }

  // 查看用户头像
  async viewAvatar(ctx, next) {
    const { userId } = ctx.params

    const { filename, mimetype } = await fileService.findAvatarByUserId(userId)
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${filename}`)
  }
}

module.exports = new UserController()