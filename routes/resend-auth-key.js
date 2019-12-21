var BeauEduRouter = require('./beauedu-router')
var AuthKeyHstDAO = require('../db/auth-key-hst-dao')
var Mailer = require('../core/send-mail')

class ResendAuthKeyRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}

    this.conn = await this.pool.connect()

    try {
			var authKeyHstDAO = new AuthKeyHstDAO(this.conn, this.sqlMapper, this.inputParam)

      var hstNum = this.inputParam.hst_num
      await this.beginTransaction()
			await authKeyHstDAO.cancelFollowUp(hstNum)
			var info = await authKeyHstDAO.reinsertAuthKeyHst(hstNum)
			info = info.rows[0]

			new Mailer().sendAuthKey(info.user_id, info.email, info.auth_key)

      data.result = 'success'
      this.json(data)
      await this.commit()
      return true

    } catch (e) {
      this.rollback()
      this.error(e)
      data.result = 'fail'
      data.message = 'Internal server error occured.'
      return false

    } finally {
      if (null !== this.conn) this.conn.release()
    }
  } 
}

module.exports = ResendAuthKeyRouter
