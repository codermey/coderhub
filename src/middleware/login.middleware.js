const jwt = require('jsonwebtoken')
const md5Password = require('../utils/md5-password')
const { findUserByName } = require('../service/user.service')
const { PUBLIC_KEY } = require('../config/secret')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_NOT_EXISTS,
  PASSWORD_ERROR, UN_AUTHORIZATION
} = require('../constants/error-types')

// 验证登录信息
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 验证用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 验证用户是否存在，如果不存在则返回错误
  const user = await findUserByName(name)
  if (!user) {
    return ctx.app.emit('error', USER_NOT_EXISTS, ctx)
  }

  // 验证密码是否正确
  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_ERROR, ctx)
  }

  // 将用户信息挂载到ctx上
  ctx.user = user

  await next()
}

// 验证token(是否登录)
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UN_AUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    ctx.user = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
    await next()
  } catch (err) {
    return ctx.app.emit('error', UN_AUTHORIZATION, ctx)
  }

}


module.exports = {
  verifyLogin,
  verifyAuth
}