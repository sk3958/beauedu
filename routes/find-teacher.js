var BeauEduRouter = require('./beauedu-router')
var consts = require('../core/const')

class FindTeacherRouter extends BeauEduRouter {
  async processRequest () {

    var result = false;
    if (true !== this.req.session.logined) {
      this.res.render('login.ejs')
      return result
    }

    var data = {}
    data.session = this.req.session

    try {
      if (consts.USER_KIND_STUDENT != data.session.user_kind && consts.USER_KIND_ADMINISTRATOR != data.session.user_kind) {
        this.res.render('login.ejs')
      }

      this.res.render('findTeacher.ejs', data)
      result = true
    } catch (e) {
      this.error(e.stack)
      this.res.render('error.ejs')
      result = false
    } finally {
      return result
    }
  }  
}

module.exports = FindTeacherRouter
