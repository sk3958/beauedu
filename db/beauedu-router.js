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
    
    this.req.on('error', (err) => {
      this.error(err.stack || err)
    })
  }

  async processRequest() {
    
  }

  getJSONDataFromRequest() {
    
  }

  beginTransaction () {
    return this.conn.query('BEGIN')
  }

  render (filename, data) {
    return this.res.render(filename, data)
  }

  send (data) {
    return this.res.send(JSON.stringify(data))
  }

  json (data) {
    return this.res.json(data)
  }

  write (write) {
    return this.res.write(JSON.stringify(data))
  }

  commit () {
    return dao.commit(this.conn)
  }

  rollback () {
    return dao.rollback(this.conn)
  }

  log (message) {
    return logger.debug(message) 
  }
  info (message) {
    return logger.info(message) 
  }
  debug (message) {
    return logger.debug(message) 
  }
  warn (message) {
    return logger.warn(message) 
  }
  error (message) {
    return logger.error(message) 
  }
}

module.exports = BeauEduRouter
