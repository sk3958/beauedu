var BeauEduRouter = require('./beauedu-router')

class FindStudentRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session

    try {
      this.res.render('findStudent.ejs', data)
      return true
    } catch (e) {
      this.error(e.stack)
      this.res.render('error.ejs')
      return false
    }
  }  
}

module.exports = FindStudentRouter
