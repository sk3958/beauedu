var BeauEduRouter = require('./beauedu-router')
var AuthKeyHstDAO = require('../db/auth-key-hst-dao')
var consts = require('../core/const')

class VerifyAuthKeyRouter extends BeauEduRouter {
  async processRequest () {
    try {
      this.render('verifyAuthKey.ejs', this.req.session)
      return true

    } catch (e) {
      this.error(e)
			return false
    } finally {
      if (null !== this.conn) this.conn.release()
    }
  } 
}

module.exports = VerifyAuthKeyRouter

