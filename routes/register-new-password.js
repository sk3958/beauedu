var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')
var AuthKeyHstDAO = require('../db/auth-key-hst-dao')
var consts = require('../core/const')

class LoginRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}
    data.session = this.req.session

    this.conn = await this.pool.connect()

    try {
      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam)
      var authKeyHstDAO = new AuthKeyHstDAO(this.conn, this.sqlMapper, this.inputParam)
      var user = await userDAO.selectUser()

      if (0 == user.rows.length) {
        data.result = 'fail'
        data.message = 'Invalid user id or password.'
        this.json(data)
        return true
      }
      
      this.beginTransaction()
      await userDAO.updatePasswd(this.inputParam.user_id, this.inputParam.new_passwd)
      if (this.inputParam.hst_num) {
        var res = await authKeyHstDAO.selectAuthKeyInfoByHstNum()
        await authKeyHstDAO.updateFollowUp(res.rows[0])
      }
      await authKeyHstDAO.cancelAllFollowUp(this.inputParam.user_id, consts.AUTH_KEY_INIT_PASSWORD)

      data.result = 'success'
      data.message = 'Your password is successfully registered.'
      data.url = '/'
      this.json(data)
      this.commit()
      return true

    } catch (e) {
      this.rollback()
      this.error(e)
      return false

    } finally {
      if (null !== this.conn) this.conn.release()
    }
  } 
}

module.exports = LoginRouter
