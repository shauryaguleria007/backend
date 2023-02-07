const { AsyncErrorHandler } = require('../utils')
const { User } = require('../modal')
module.exports.createUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password, name } = req.body
  const user = await User.create({ email, password, name })
  res.json({ email: user.email, name: user.name })
})

module.exports.getUser = AsyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-_id')
  // throw error a when if not user
  res.json({ user })
})
