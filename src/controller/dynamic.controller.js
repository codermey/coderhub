const dynamicService = require('../service/dynamic.service')
const ctx = require('@koa/router')

class DynamicController {

  // 发布动态
  async release(ctx, next) {
    const userId = ctx.user.id
    const { content } = ctx.request.body
    await dynamicService.create(userId, content)
    ctx.msg = '发布成功'
    ctx.data = null
    await next()
  }

  // 获取动态列表
  async list(ctx, next) {
    const { limit = 10, offset = 0 } = ctx.request.query
    ctx.data = await dynamicService.getDynamicList(limit, offset)
    await next()
  }

  // 获取动态详情
  async detail(ctx, next) {
    const { dynamicId } = ctx.params
    const result = await dynamicService.getDynamicDetail(dynamicId)
    ctx.data = result ?? null
    await next()
  }

  // 修改动态
  async update(ctx, next) {
    const { dynamicId } = ctx.params
    const { content } = ctx.request.body
    await dynamicService.updateDynamic(dynamicId, content)
    ctx.msg = '修改成功'
    ctx.data = null
    await next()
  }

  // 删除动态
  async delete(ctx, next) {
    const { dynamicId } = ctx.params
    await dynamicService.deleteDynamic(dynamicId)
    ctx.msg = '删除成功'
    ctx.data = null
    await next()
  }

  // 给动态添加标签
  async addLabels(ctx, next) {
    const { dynamicId } = ctx.params
    const labels = ctx.labels

    for (const label of labels) {
      // 先判断标签和动态是否存在对应关系
      const isExists = await dynamicService.hasLabel(dynamicId, label.id)
      // 不存在对应关系，则创建对应关系
      if (!isExists) {
        await dynamicService.addLabel(dynamicId, label.id)
      }
    }
    
    ctx.msg = '添加标签成功'
    ctx.data = null
    await next()
  }
}

module.exports = new DynamicController()