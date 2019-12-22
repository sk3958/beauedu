var BeauEduRouter = require('./beauedu-router')

class LogoutRouter extends BeauEduRouter {
  async processRequest () {
    try {
      this.req.session.destroy()
      this.res.redirect('/')
      return true

    } catch (e) {
      this.error(e)
			return false
    }
  }  
}

module.exports = LogoutRouter
