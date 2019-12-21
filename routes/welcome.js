var BeauEduRouter = require('./beauedu-router')

class WelcomeRouter extends BeauEduRouter {
  async processRequest () {
    try {
      this.render('login.ejs')
      return true

    } catch (e) {
      this.error(e)
			return false
    }
  }  
}

module.exports = WelcomeRouter
