var BeauEduRouter = require('./beauedu-router')
var ReportDAO = require('../db/report-dao')

class CommentReportRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session

    try {
      this.conn = await this.pool.connect()
      
      this.inputParam.user_id = this.req.session.user_id
      await this.beginTransaction()
			await new ReportDAO(this.conn, this.sqlMapper, this.inputParam).commentReport()

      data.result = 'success'
      await this.commit()
      this.json(data)
      return true

    } catch (e) {
      await this.rollback()
      data.result = 'fail'
      this.json(data)
      this.error(e)
      return false
      
    } finally {
      if (null !== this.conn) await this.conn.release()
    }
  }
}

module.exports = CommentReportRouter
