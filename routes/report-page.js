var BeauEduRouter = require('./beauedu-router')

class ReportPageRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session

    try {
      this.render('report.ejs', data)
      return true
    } catch (e) {
      this.error(e)
      this.res.render('error.ejs')
      return false
    }
  }  
}

module.exports = ReportPageRouter
