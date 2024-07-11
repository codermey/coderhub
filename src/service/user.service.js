const connection = require('../app/database')

class UserService {
  /**
   * @description 创建用户
   * @param user {object} 用户信息
   * @returns {Promise<any>}
   */
  async create(user) {
    const { name, password } = user
    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [name, password])
    return result
  }

  /**
   * @description 根据用户名查找用户
   * @param {string} name 用户名
   * @returns {Promise<any>} 用户信息
   */
  async findUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE name = ?;'
    const [[user]] = await connection.execute(statement, [name])
    return user
  }

  /**
   * @description 更新用户头像
   * @param {number} userId 用户id
   * @param {string} avatarUrl 头像url
   * @returns {Promise<any>}
   */
  async updateUserAvatar(userId, avatarUrl) {
    const statement = 'UPDATE user SET avatar_url = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()