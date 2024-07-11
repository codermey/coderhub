const multer = require('@koa/multer')
const { AVATAR_PATH } = require('../constants/file-path')

const uploadAvatar = multer({ dest: AVATAR_PATH })

const handleAvatar = uploadAvatar.single('avatar')

module.exports = {
  handleAvatar
}