const GoogleStrategy = require('passport-google-oidc')
const { User } = require('../../modal')

module.exports = (passport) => {
  const authenticateUser = async (issuer, profile, result) => {
    let user = await User.findOne({ email: profile?.emails[0].value })
    if (!user)
      user = await User.create({
        email: profile?.emails[0].value,
        name: profile.name.givenName,
        password: 123,
      })
    return result(null, user, { message: 'here' })
  }
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CID,
        clientSecret: process.env.CSEC,
        callbackURL: '/api/v1/auth/oauth2/redirect/google',
        scope: ['profile', 'email'],
      },
      authenticateUser
    )
  )
}
