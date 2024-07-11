const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')
const dynamicController = require('../controller/dynamic.controller')
const { verifyLabelExists } = require('../middleware/label.middleware')

const dynamicRouter = new KoaRouter({ prefix: '/dynamic' })


// 发布动态
dynamicRouter.post('/', verifyAuth, dynamicController.release)
// 动态列表
dynamicRouter.get('/', dynamicController.list)
// 动态详情
dynamicRouter.get('/:dynamicId', dynamicController.detail)
// 修改动态
dynamicRouter.patch('/:dynamicId', verifyAuth, verifyPermission, dynamicController.update)
// 删除动态
dynamicRouter.delete('/:dynamicId', verifyAuth, verifyPermission, dynamicController.delete)
// 给动态添加标签
dynamicRouter.post('/:dynamicId/labels', verifyAuth, verifyPermission, verifyLabelExists, dynamicController.addLabels)


module.exports = dynamicRouter