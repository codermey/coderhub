/**
 * @description 成功响应
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const successResponse = async (ctx, next) => {
  if (ctx.data !== undefined) {
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: ctx.msg || 'success',
      data: ctx.data
    }
    await next()
  }
}

/**
 * @description 错误响应
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
// const errorResponse = async (ctx, next) => {
//   try {
//     await next()
//     console.log('test')
//   } catch (err) {
//     console.log('errorResponse', err)
//   }
// }


module.exports = {
  successResponse,
  // errorResponse
}