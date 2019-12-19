var BeauEduRouter = require('./beauedu-router')

class VerifyAuthKeyRoute extends BeauEduRouter {
  async processRequest () {
    try {
      this.render('verifyAuthKey.ejs', this.req.session)
      return true

    } catch (e) {
      this.error(e.stack)
    } finally {
      if (null !== this.conn) this.conn.release()
    }
  }  
}

module.exports = VerifyAuthKeyRoute

