const labelService = require('../service/label.service')


const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body

  const newLabels = []

  for (const label of labels) {
    const labelItem = { name: label }
    const result = await labelService.findLabelByName(label)
    if (!result) {
      const { insertId } = await labelService.create(label)
      labelItem.id = insertId
    } else {
      labelItem.id = result.id
    }
    newLabels.push(labelItem)
  }
  ctx.labels = newLabels

  await next()
}


module.exports = {
  verifyLabelExists
}