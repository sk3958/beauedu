var BeauEduRouter = require('./beauedu-router')
var ReportDAO = require('../db/report-dao')
var ReportBean = require('../beans/report-bean')
var consts = require('../core/const')

class SelectReportRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session
    var searched_status = '', searched_name, searched_start_dt, searched_end_dt

    try {
      this.conn = await this.pool.connect()

      var reportDAO = new ReportDAO(this.conn, this.sqlMapper, this.inputParam);

      if (!this.inputParam || !this.inputParam.searched_name) {
        searched_name = ''
      } else {
        searched_name = this.inputParam.searched_name
      }
      if (!this.inputParam || !this.inputParam.searched_start_dt) {
        searched_start_dt = '20000101'
      } else {
        searched_start_dt = this.inputParam.searched_start_dt
      }
      if (!this.inputParam || !this.inputParam.searched_end_dt) {
        //var today = new Date()
        searched_end_dt = '21000101'
      } else {
        searched_end_dt = this.inputParam.searched_end_dt
      }
      
      data.searched_status = searched_status
      data.searched_name = searched_name
      data.searched_start_dt = searched_start_dt
      data.searched_end_dt = searched_end_dt

      var res = await reportDAO.selectReportList(searched_name, searched_start_dt, searched_end_dt)

      var reportBeanList = []
      var reportBean
      for (let i = 0; i < res.rows.length; i++) {
        reportBean = new ReportBean(res.rows[i])
        reportBeanList.push(reportBean)
      }
      data.reportBeanList = reportBeanList

      this.render('viewReport.ejs', data)
      return true

    } catch (e) {
      this.error(e)
      this.res.render('error.ejs')
      return false

    } finally {
      if (null !== this.conn) await this.conn.release()
    }
  }   
}

module.exports = SelectReportRouter
