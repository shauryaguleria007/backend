module.exports = (passport) => {
  passport.serializeUser((user, cb) =>
    cb(null, { id: user.id, username: user.username })
  )
  passport.deserializeUser((user, cb) => cb(null, user))
}
