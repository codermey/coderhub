const connection = require('../app/database')

class DynamicService {
  /**
   * 像数据库中插入一条动态数据
   * @param id 用户id
   * @param content 动态内容
   * @returns {Promise<any>}
   */
  async create(id, content) {
    const statement = 'INSERT INTO `dynamic` (user_id, content) VALUES (?,?);'
    const [result] = await connection.execute(statement, [id, content])
    return result
  }

  /**
   * 在数据库中获取动态列表
   * @param {number} limit 查询条数
   * @param {number} offset 偏移量
   * @returns {Promise<array>} 动态列表
   */
  async getDynamicList(limit = 10, offset = 0) {
    const statement = `
      SELECT 
      dynamic.id id, dynamic.content content, dynamic.createAt createAt, dynamic.updateAt updateAt,
      JSON_OBJECT('id', user.id, 'name', user.name, 'avatarUrl', user.avatar_url) AS user,
      (SELECT COUNT(*) FROM comment WHERE comment.dynamic_id = dynamic.id) commentCount,
      (SELECT COUNT(*) FROM dynamic_label WHERE dynamic.id = dynamic_label.dynamic_id) labelCount
      FROM dynamic
      LEFT JOIN user ON dynamic.user_id = user.id
      LIMIT ? OFFSET ?;`
    const [result] = await connection.execute(statement, [String(limit), String(offset)])
    return result
  }

  /**
   * @description 获取动态详情
   * @param {number} id 动态id
   * @returns {Promise<object>}
   */
  async getDynamicDetail(id) {
    const statement = `
      SELECT 
       dynamic.id id, dynamic.content content, dynamic.createAt createAt, dynamic.updateAt updateAt,
       JSON_OBJECT('id', user.id, 'name', user.name, 'avatarUrl', user.avatar_url) AS user,
     (SELECT 
       JSON_ARRAYAGG(JSON_OBJECT(
       'id', comment.id, 'commentId', comment.comment_id, 'content', comment.content, 'createAt', comment.createAt, 
       'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url)))
     FROM comment
     LEFT JOIN user cu ON cu.id = comment.user_id
     WHERE comment.dynamic_id = dynamic.id
     ) AS comments,
     (SELECT 
       JSON_ARRAYAGG(JSON_OBJECT('id', label.id, 'name', label.name))
     FROM label
     LEFT JOIN dynamic_label ON label.id = dynamic_label.label_id
     WHERE dynamic.id = dynamic_label.dynamic_id
     ) AS labels
     FROM dynamic
     LEFT JOIN user ON dynamic.user_id = user.id
     WHERE dynamic.id = ?
     GROUP BY dynamic.id;`

    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  /**
   * @description 更新动态内容
   * @param {number} id 动态id
   * @param {string} content 动态内容
   * @returns {Promise<any>}
   */
  async updateDynamic(id, content) {
    const statement = 'UPDATE `dynamic` SET content = ? WHERE id = ?;'
    const [result] = await connection.execute(statement, [content, id])
    return result
  }

  /**
   * @description 删除动态
   * @param {number} id 动态id
   * @returns {Promise<any>}
   */
  async deleteDynamic(id) {
    const statement = `DELETE FROM dynamic WHERE id = ?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }

  /**
   * @description 判断 dynamic_label 表中是否存在该记录（标签和动态是否存在对应关系）
   * @param {number} dynamicId 动态id
   * @param {number} labelId 标签id
   * @returns {Promise<boolean>}
   */
  async hasLabel(dynamicId, labelId) {
    const statement = `SELECT * FROM dynamic_label WHERE dynamic_id = ? AND label_id = ?;`
    const [result] = await connection.execute(statement, [dynamicId, labelId])
    return !!result.length
  }

  /**
   * @description 添加标签和动态对应关系
   * @param {number} dynamicId 动态id
   * @param {number} labelId 标签id
   * @returns {Promise<any>}
   */
  async addLabel(dynamicId, labelId) {
    const statement = `INSERT INTO dynamic_label (dynamic_id, label_id) VALUES (?, ?);`
    const [result] = await connection.execute(statement, [dynamicId, labelId])
    return result
  }
}

module.exports = new DynamicService()