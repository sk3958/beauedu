module.exports = function (req, res, pool, mybatis) {
  processRequest(req, res, pool, mybatis)
}

processRequest = function (req, res, pool) {
  var conn = null
  var query = ''
  var param = {}
  const option = {
    language: 'sql',
    indent: ' '
  }

  try {
    conn = awit pool.connect()
    query = mybatis.getStatement('BeauEdu', 'getUserList', param, option)
    console.log(conn.query(query))
  } catch(e) {
  } finally {
    if (null !== conn) conn.release(true)  
  }
}
