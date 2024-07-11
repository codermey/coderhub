const labelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    await labelService.create(name)
    ctx.data = null
    await next()
  }
}

module.exports = new LabelController()