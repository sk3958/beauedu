var BeauEduRouter = require('./beauedu-router')

class SignUpRouter extends BeauEduRouter {
  async processRequest () {
    try {
      this.render('registerUser.ejs')
      return true

    } catch (e) {
      this.error(e)
      return false
    }
  }  
}

module.exports = SignUpRouter
