var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')

class RegisterUserRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    var result = false;
    
    try {
      this.conn = await this.pool.connect()

      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
      var returnVal = await userDAO.insertUser()
      
      data.user_id = this.inputParam.user_id
      data.result = 'success'
      data.url = 'login.ejs'
      await this.commit()

      this.json(data)
    } catch (e) {
      await this.rollback()
      data.result = 'fail'
      this.json(data);
      this.error(e.stack || e)
      this.res.render('error.ejs')
      result = false
    } finally {
      if (null !== this.conn) await this.conn.release()

      return result
    }
  }  
}

module.exports = RegisterUserRouter

