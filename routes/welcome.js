var BeauEduRouter = require('./beauedu-router')

class WelcomeRouter extends BeauEduRouter {
  async processRequest () {
    try {
      var data = {}
      data.session = this.req.session
      this.render('login.ejs', data)
      return true

    } catch (e) {
      this.error(e)
			return false
    }
  }  
}

module.exports = WelcomeRouter
