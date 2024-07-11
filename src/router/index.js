const fs = require('fs')

// 注册 router 目录下的所有路由
const registerRoutes = (app) => {
  const files = fs.readdirSync(__dirname)
  for (const file of files) {
    if (!file.endsWith('.router.js')) continue
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRoutes