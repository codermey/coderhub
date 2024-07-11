const crypto = require('crypto')

const md5Password = (password) => {
  const hash = crypto.createHash('md5')
  return hash.update(password).digest('hex')
}

module.exports = md5Password