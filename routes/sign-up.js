var BeauEduRouter = require('./beauedu-router')

class SignUpRouter extends BeauEduRouter {
  async processRequest () {
    try {
      this.render('registerUser.ejs')
      return true

    } catch (e) {
      this.error(e.stack)
    } finally {
      if (null !== this.conn) this.conn.release()
    }
  }  
}

module.exports = SignUpRouter
