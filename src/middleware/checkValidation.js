const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    const result = validationResult(req).errors[0]
    return res.json({ message: `${result.param} has ${result.msg}` })
  }
  return next()
}
