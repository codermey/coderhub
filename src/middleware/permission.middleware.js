const permissionService = require('../service/permission.service')
const { OPERATE_IS_NOT_PERMISSION } = require('../constants/error-types')

// 验证权限(当前操作的资源是否是自己发布的)
const verifyPermission = async (ctx, next) => {
  const userId = ctx.user.id
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')
  const isPermission = await permissionService.checkPermission(resourceName, resourceId, userId)
  if (!isPermission) {
    return ctx.app.emit('error', OPERATE_IS_NOT_PERMISSION, ctx)
  }
  await next()
}

module.exports = {
  verifyPermission,
}