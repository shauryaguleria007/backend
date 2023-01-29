const { initialize } = require('passport')
const LocalStrategy = require('passport-local')
const { User } = require('../../modal')
module.exports = (passport) => {
  const authenticateUser = async (email, password, result) => {
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      // return result(new Error('dsfsadfasdfs'))
      return result(null, false, { message: 'user not found' })
    }
    if (user.password !== password) {
      // return result(new Error('this'))

      return result(null, false, { message: 'incorrect password' })
    }
    return result(null, user, { message: 'here' })
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
}
