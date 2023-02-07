require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const { app } = require('./app')

const server = express()

const connectDatabse = async () => {
  const database = await mongoose
    .set('strictQuery', false)
    .connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.log('database not connected')
    })
  return database
}

const initializeServer = async () => {
  const database = await connectDatabse()
  if (!database) {
    server.use('*', (req, res) => {
      res.redirect('/error')
    })
    return
  }
  app(server)
}

initializeServer()
server.listen(process.env.PORT || 3001)
