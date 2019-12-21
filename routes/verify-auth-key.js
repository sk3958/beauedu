var BeauEduRouter = require('./beauedu-router')

class VerifyAuthKeyRouter extends BeauEduRouter {
  async processRequest () {
    try {
      this.render('verifyAuthKey.ejs', this.req.session)
      return true

    } catch (e) {
      this.error(e)
      return false
    }
  } 
}

module.exports = VerifyAuthKeyRouter
