var BeauEduRouter = require('./beauedu-router')
var consts = require('../core/const')

class FindTeacherRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}
    data.session = this.req.session

    try {
      this.res.render('findTeacher.ejs', data)
      return true
    } catch (e) {
      this.error(e.stack)
      this.res.render('error.ejs')
      return false
    }
  }  
}

module.exports = FindTeacherRouter
