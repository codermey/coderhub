const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_NOT_EXISTS,
  PASSWORD_ERROR,
  UN_AUTHORIZATION,
  OPERATE_IS_NOT_PERMISSION, LABEL_IS_EXISTS
} = require('../constants/error-types')

const handleError = (error, ctx) => {
  let code, msg
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      msg = '用户名或密码不能为空'
      break
    case USER_ALREADY_EXISTS:
      code = -1002
      msg = '用户已存在'
      break
    case USER_NOT_EXISTS:
      code = -1003
      msg = '用户不存在'
      break
    case PASSWORD_ERROR:
      code = -1004
      msg = '密码错误'
      break
    case UN_AUTHORIZATION:
      code = -1005
      msg = 'token过期或者无效'
      break
    case OPERATE_IS_NOT_PERMISSION:
      code = -2001
      msg = '没有操作权限'
      break
      // case LABEL_IS_EXISTS:
      //   code =
  }

  ctx.body = {
    code,
    msg,
    data: null
  }
}

module.exports = handleError

