var BeauEduRouter = require('./beauedu-router')

class WelcomeRouter extends BeauEduRouter {
  async processRequest () {
    try {
      this.render('login.ejs')
      return true

    } catch (e) {
      this.error(e.stack)
    } finally {
      if (null !== this.conn) this.conn.release()
    }
  }  
}

module.exports = WelcomeRouter
