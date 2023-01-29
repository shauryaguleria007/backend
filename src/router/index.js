const express = require('express')

const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const router = express.Router()

router.use('/api/v1/auth', authRouter)
router.use('/api/v1/user', userRouter)

module.exports = router
