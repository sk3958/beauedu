var BeauEduRouter = require('./beauedu-router')

class SignUpRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}
    data.session = this.req.session
    try {
      this.render('registerUser.ejs', data)
      return true

    } catch (e) {
      this.error(e)
      return false
    }
  }  
}

module.exports = SignUpRouter
