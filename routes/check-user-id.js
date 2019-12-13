var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')

class CheckUserIdRouter extends BeauEduRouter {
  async processRequest () {

    var result = false;
    var data = {}
    data.user_id = this.inputParam.user_id

    try {
      this.conn = await this.pool.connect()

      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam);
      var res = await userDAO.checkUserIdDup()
      
      if (0 == res.rows.length) {
        data.available = 'true'
      } else {
        data.available = 'false'
      }

      this.json(data)
    } catch (e) {
      this.error(e.stack)
      this.res.render('error.ejs')
      result = 0
    } finally {
      if (null !== this.conn) await this.conn.release()

      return result
    }
  }  
}

module.exports = CheckUserIdRouter

