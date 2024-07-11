const connection = require('../app/database')

class FileService {
  /**
   * @description 上传头像
   * @param {string} filename 文件名
   * @param {string} mimetype 类型
   * @param {number} size 文件大小
   * @param {number} user_id 用户id
   * @returns {Promise<any>}
   */
  async createAvatar(filename, mimetype, size, user_id) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [filename, mimetype, size, user_id])
    return result
  }

  /**
   * @description 根据用户id查找头像
   * @param {number} userId 用户id
   * @returns {Promise<object>} 头像信息
   */
  async findAvatarByUserId(userId) {
    const statement = 'SELECT * FROM `avatar` WHERE user_id = ?;'
    const [result] = await connection.execute(statement, [userId])
    return result.at(-1)
  }
}

module.exports = new FileService()