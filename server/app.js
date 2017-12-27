// require libraries
require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// set up mongoose
mongoose.connect(`mongodb://zuhri:${ process.env.MONGO_ATLAS }@cluster0-shard-00-00-67zih.mongodb.net:27017,cluster0-shard-00-01-67zih.mongodb.net:27017,cluster0-shard-00-02-67zih.mongodb.net:27017/todo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`, { useMongoClient: true })
mongoose.Promise = global.Promise

// require routes
const index = require('./routes/index')
const users = require('./routes/users')
const tasks = require('./routes/tasks')

// invoke express
const app = express()

// use middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// website routes
app.use('/', index)
app.use('/api/users', users)
app.use('/api/tasks', tasks)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
