const connection = require('../app/database')

class LabelService {
  /**
   * @description 创建标签
   * @param {string} label 标签名称
   * @returns {Promise<any>}
   */
  async create(label) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [result] = await connection.execute(statement, [label])
    return result
  }

  /**
   * @description 根据标签名称查找标签
   * @param {string} label 标签名称
   * @returns {Promise<any>}
   */
  async findLabelByName(label) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [result] = await connection.execute(statement, [label])
    return result[0]
  }
}

module.exports = new LabelService()