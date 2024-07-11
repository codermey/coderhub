const connection = require('../app/database')

class CommentService {
  /**
   * @description 发布评论
   * @param {number} userId 用户id
   * @param {number} dynamicId 动态id
   * @param {string} content 评论内容
   * @returns {Promise<any>}
   */
  async release(userId, dynamicId, content) {
    const statement = 'INSERT INTO `comment` (user_id, dynamic_id, content) VALUES (?, ?, ?);'
    const [result] = await connection.execute(statement, [userId, dynamicId, content])
    return result
  }

  /**
   * @description 回复评论
   * @param {number} userId 用户id
   * @param {number} dynamicId 动态id
   * @param {number} commentId 回复的评论id
   * @param {string} content 回复内容
   * @returns {Promise<*>}
   */
  async reply(userId, dynamicId, commentId, content) {
    const statement = 'INSERT INTO `comment` (user_id, dynamic_id, comment_id, content) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [userId, dynamicId, commentId, content])
    return result
  }

  /**
   * @description 删除某条评论
   * @param {number} commentId 评论id
   * @returns {Promise<any>}
   */
  async delete(commentId) {
    const statement = 'DELETE FROM `comment` WHERE id = ?;'
    const [result] = await connection.execute(statement, [commentId])
    return result
  }
}

module.exports = new CommentService()