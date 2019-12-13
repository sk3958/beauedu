var BeauEduRouter = require('./beauedu-router')

class ReportPageRouter extends BeauEduRouter {
  async processRequest () {

    var result = false
    if (true !== this.req.session.logined) {
      this.res.render('login.ejs')
      return false
    }

    var data = {}
    data.session = this.req.session

    try {
      this.render('report.ejs', data)
      result = true
    } catch (e) {
      this.error(e.stack || e)
      result = false
    } finally {
      if (null !== this.conn) this.conn.release()
      return result
    }
  }  
}

module.exports = ReportPageRouter

