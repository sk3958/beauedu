var BeauEduRouter = require('./beauedu-router')
var AuthKeyHstDAO = require('../db/auth-key-hst-dao')
var Mailer = require('../core/send-mail')

class ResendAuthKeyRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}

    this.conn = await this.pool.connect()

    try {
			var authKeyHstDAO = new AuthKeyHstDAO(this.conn, this.sqlMapper, this.inputParam)

			var hstNum = this.inputaParam.hst_num
			await authKeyHstDAO.cancelFollowUp(hstNum)
			var info = await authKeyHstDAO.reinsertAuthKeyHst(hstNum)
			info = info.rows[0]

			new Mailer.sendAuthKey(info.user_id, info.email, info.auth_key)

      return true
    } catch (e) {
      this.error(e)
			return false
    } finally {
      if (null !== this.conn) this.conn.release()
    }
  } 
}

module.exports = ResendAuthKeyRouter

