const express = require('express')
const { check } = require('express-validator')
const { createUser, getUser } = require('../controller')
const { authenticateUser, checkValidation } = require('../middleware')
const router = express.Router()

router.route('/register').post(
  [
    check('email').exists().isEmail(),
    check('password').exists().isLength({ min: 5 }),
    check('name').exists().isLength({ min: 3 }), // update name checker
  ],
  checkValidation,
  createUser
)
router.route('/info').get(authenticateUser, getUser)
module.exports = router
