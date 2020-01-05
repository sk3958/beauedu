const express = require('express')
const beauedu = express()
const session = require('express-session')
const fs = require('fs')
const ejs = require('ejs')
const pg = require('pg')
const uuid = require('uuid/v4')
const redis = require('redis')
const redisStore = require('connect-redis')(session)


const config = {
  host: 'localhost',
  user: process.env['DB_USER'],     
  password: process.env['DB_PASSWD'],
  database: process.env['DB_NAME'],
  port: 5432
};

const pool = new pg.Pool(config)
const mybatis = require('mybatis-mapper')
mybatis.createMapper(['./config/sql.xml'])

beauedu.set('views', __dirname + '/services')
beauedu.set('view engine', 'ejs')
beauedu.engine('html', ejs.renderFile)
beauedu.use(express.static('./services'))

const redisClient = redis.createClient()
redisClient.on('error', (err) => {
  console.log('Redis error : ', err)
})

beauedu.use(session({
    genid: () => {
      return uuid()
    },
    store: new redisStore({ host: 'localhost', port: process.env.REDIS_PORT || 6379, client: redisClient }),
    secret: process.env['SESSION_SECRET'],
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    saveUninitialized: true
}))

var router = require('./routes/route-main')
router(beauedu, fs, pool, mybatis)

beauedu.listen(5000, function() {
  console.log('Express server has started on port 5000')
})

process.on('uncaughtException', (error) => {
  console.log(error.stack);
})
