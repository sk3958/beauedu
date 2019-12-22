var BeauEduRouter = require('./beauedu-router')

class ChangePasswordRouter extends BeauEduRouter {
  async processRequest () {
    try {
      var data = {}
      if (!this.req.session.hst_num) this.req.session.hst_num = 0
      data.session = this.req.session
      this.render('changePasswd.ejs', data)
      return true

    } catch (e) {
      this.error(e)
			return false
    }
  }  
}

module.exports = ChangePasswordRouter