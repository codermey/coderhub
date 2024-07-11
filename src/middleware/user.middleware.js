const userService = require('../service/user.service')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS
} = require('../constants/error-types')
const md5Password = require('../utils/md5-password')

// 用户验证
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 验证用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 验证用户名是否存在，如果存在则返回错误
  const user = await userService.findUserByName(name)
  if (user) {
    return ctx.app.emit('error', USER_ALREADY_EXISTS, ctx)
  }

  await next()
}

// 加密密码
const encryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = {
  verifyUser,
  encryptPassword
}