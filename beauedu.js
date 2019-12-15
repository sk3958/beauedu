const express = require('express')
const beauedu = express()
const session = require('express-session')
const fs = require('fs')
const ejs = require('ejs')
const pg = require('pg')
const pgSession = require('express-pg-session')(session)

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

var pgPool = new pg.Pool(config)
beauedu.use(session({
  store: new pgSession({
    pool: pgPool,
    tableName: 'session'
  }),
  secret: process.env['SESSION_SECRET'],
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  saveUninitialized: true
}))

var router = require('./routes/route-main')(beauedu, fs, pool, mybatis, ejs)

const server = beauedu.listen(3000, function() {
  console.log('Express server has started on port 3000')
})
