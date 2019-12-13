var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')
var consts = require('../core/const')

class SelectTeacherListRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    var result = false;

    if (true !== this.req.session.logined || consts.USER_KIND_ADMINISTRATOR != this.req.session.user_kind) {
      this.res.render('login.ejs')
      return result
    }

    try {
      this.conn = await this.pool.connect()

      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam);
      var res = await userDAO.selectTeacherList()

      data.data = res.rows
      data.result = 'success'
      
      this.json(data)
      result = true
    } catch (e) {
      this.error(e.stack || e)
      this.res.render('error.ejs')
      result = false
    } finally {
      if (null !== this.conn) this.conn.release()
      return result
    }
  }  
}

module.exports = SelectTeacherListRouter
