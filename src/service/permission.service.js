const connection = require('../app/database')

class PermissionService {
  /**
   * @description 检查用户是否有权限访问该资源
   * @param {string} resourceName 资源名称(数据库表名)
   * @param {number} resourceId 资源ID
   * @param {number} userId 用户ID
   * @returns {Promise<boolean>} 是否有权限
   */
  async checkPermission(resourceName, resourceId, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [resourceId, userId])
    return !!result.length
  }
}

module.exports = new PermissionService()