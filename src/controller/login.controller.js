const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/secret')

class LoginController {
  // 生成用户token
  async sign(ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
          expiresIn: '15days',
          algorithm: 'RS256'
        },
    )
    ctx.msg = '登录成功'
    ctx.data = {
      token,
      user: { id, name }
    }
    await next()
  }
}

module.exports = new LoginController()