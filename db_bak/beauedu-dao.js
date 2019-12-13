var logger = require('../core/logger.js')

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

  execute (id, param = this.inputParam, myself = this) {
    return new Promise(function(resolve, reject) {
      if (null === myself.conn || undefined === myself.conn) throw 'DB connection is missing.'
      var query = myself.getQuery(id, param)

      try {
        myself.conn.query(query)
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
  error (message) {
    logger.error(message) 
  }
}

fnCommit = function (conn) {
  return new Promise(function(resolve, reject) {
    conn.query('COMMIT')
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

fnRollback = function (conn) {
  return new Promise(function(resolve, reject) {
    conn.query('ROLLBACK')
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = {
  BeauEduDAO: BeauEduDAOClass,
  commit: fnCommit,
  rollback: fnRollback  
}
