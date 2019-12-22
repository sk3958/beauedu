var BeauEduRouter = require('./beauedu-router')

class VerifyAuthKeyRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}
    data.session = this.req.session
    try {
      this.render('verifyAuthKey.ejs', data)
      return true

    } catch (e) {
      this.error(e)
      return false
    }
  } 
}

module.exports = VerifyAuthKeyRouter
