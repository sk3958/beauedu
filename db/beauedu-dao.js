const logger = require('../core/logger.js')
const utils = require('../core/utils')

class BeauEduDAOClass {
  constructor (conn, sqlMapper, inputParam) {
    this.conn = conn
    this.sqlMapper = sqlMapper
    this.inputParam = inputParam
    this.mapperOption = {
      language: 'sql',
      indent: ' '
    }
  }

  set (conn, sqlMapper, inputParam) {
    this.conn = conn
    this.sqlMapper = sqlMapper
    this.inputParam = inputParam
  }

  setConnection (conn) {
    this.conn = conn
  }

  setSqlMapper (sqlMapper) {
    this.sqlMapper = sqlMapper
  }

  setInputParam (inputParam) {
    this.inputParam = inputParam
  }

  getQuery (id, param = this.inputParam) {
    return this.sqlMapper.getStatement('BeauEdu', id, param, this.mapperOption)
  }

  execute (id, param = this.inputParam) {
    if (null === this.conn || undefined === this.conn) throw 'DB connection is missing.'
    var query = this.getQuery(id, param)
    query = utils.makePostgreQuery(query)
    return this.conn.query(query)
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

const fnCommit = function (conn) {
  return conn.query('COMMIT')
}

const fnRollback = function (conn) {
  return conn.query('ROLLBACK')
}

module.exports = {
  BeauEduDAO: BeauEduDAOClass,
  commit: fnCommit,
  rollback: fnRollback  
}
