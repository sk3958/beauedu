var dao = require('../db/beauedu-dao')
var logger = require('../core/logger.js')

class BeauEduRouter {
  constructor (request, response, pool, sqlMapper) {
    this.req = request
    this.res = response
    this.sqlMapper = sqlMapper
    this.pool = pool
    this.inputParam = request.body
    this.conn = null
  }

  async processRequest() {
    
  }

  getJSONDataFromRequest() {
    
  }

  beginTransaction (myself = this) {
    return new Promise(function(resolve, reject) {
      if (null === myself.conn || undefined === myself.conn) throw 'DB connection is missing.'
      try {
        myself.conn.query('BEGIN')
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      } catch(e) {
        myself.log(e.stack || e)
      } finally {
      }
    })
  }

  render (filename, data) {
    this.res.render(filename, data)
  }

  send (data) {
    this.res.send(JSON.stringify(data))
  }

  json (data) {
    this.res.json(data)
  }

  write (write) {
    this.res.write(JSON.stringify(data))
  }

  commit (conn = this.conn) {
    return new Promise(function(resolve, reject) {
      dao.commit(conn)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  rollback (conn = this.conn) {
    return new Promise(function(resolve, reject) {
      dao.rollback(conn)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  log (message) {
    logger.debug(message) 
  }
  info (message) {
    logger.info(message) 
  }
  debug (message) {
    logger.debug(message) 
  }
  warn (message) {
    logger.warn(message) 
  }
  error (err) {
    logger.error(err.stack || err) 
  }
}

module.exports = BeauEduRouter
