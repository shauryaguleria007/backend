module.exports = (req, res, next) => {
  if (req.user) return next()
  res.json({ user: null }) // throw error
}
