var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')
var consts = require('../core/const')

class SelectTeacherListRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session

    try {
      this.conn = await this.pool.connect()

      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam);
      var res = await userDAO.selectTeacherList()

      data.data = res.rows
      data.result = 'success'
      
      this.json(data)
      return true

    } catch (e) {
      this.error(e)
      this.res.render('error.ejs')
      return false

    } finally {
      if (null !== this.conn) this.conn.release()
    }
  }  
}

module.exports = SelectTeacherListRouter
