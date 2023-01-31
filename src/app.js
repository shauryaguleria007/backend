const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')
const { ErrorHandler } = require('./middleware')
const AppRouter = require('./router')
const cors = require('cors')
const bodyParser = require('body-parser')
const {
  LocalStrategy,
  passportValidateSession,
  passportGoogleStrategy,
} = require('./utils')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')

exports.app = (server) => {
  server.use(
    cors({
      origin: [`${process.env.client}`, 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
    })
  )

  LocalStrategy(passport)
  passportGoogleStrategy(passport)
  passportValidateSession(passport)

  server.use(
    session({
      secret: process.env.SSEC,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        dbName: 'sessionStore',
        touchAfter: 1000 * 60 * 60 * 24,
        autoRemove: 'interval',
        autoRemoveInterval: 1,
      }),
      cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: false,
        sameSite: 'none',
        secure: true,
      }, // 1 hour
    })
  )
  // server.use(morgan('dev'))
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(passport.initialize())
  server.use(passport.session())
  server.use(express.json())
  server.use(AppRouter)
  server.use(ErrorHandler)
}
