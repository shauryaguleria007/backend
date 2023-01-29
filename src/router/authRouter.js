const express = require('express')
const passport = require('passport')
const { check } = require('express-validator')
const { checkValidation } = require('../middleware')
const { AsyncErrorHandler } = require('../utils')
const asyncErrorHnadler = require('../utils/asyncErrorHnadler')
const router = express.Router()
router.route('/login/email').post(
  [
    check('email').exists().isEmail(),
    check('password').exists().isLength({ min: 5 }),
  ],
  checkValidation,
  passport.authenticate('local'),
  AsyncErrorHandler((req, res, next) => {
    res.json({ email: req.user.email, name: req.user.name })
  })
)

router.route('/login/google').get(passport.authenticate('google'))
router.route('/oauth2/redirect/google').get(
  passport.authenticate('google', {
    successRedirect: `${process.env.client}/`,
    failureRedirect: `${process.env.client}/register`,
  })
)

router.route('/logout').get(
  AsyncErrorHandler((req, res) => {
    req.logout(() => {})
    res.json({ success: true })
  })
)
module.exports = router
