var dao = require('./beauedu-dao')

class ReportDAO extends dao.BeauEduDAO {
  insertReport () {
    return this.execute('insertReport')
  }

  selectReportNum (user_id) {
    return this.execute('selectReportNum', { user_id: user_id })
  }  

  insertReportFile () {
    return this.execute('insertReportFile')
  }  

  selectReportFile (file_num) {
    return this.execute('selectReportFile', { file_num: file_num })
  }

  selectReportFiles (report_num) {
    return this.execute('selectReportFiles', { report_num: report_num })
  }

  selectReportList (user_nm, start_dt, end_dt) {
    return this.execute('selectReportList', { user_nm: user_nm, start_dt: start_dt, end_dt: end_dt })
  }  

  commentReport () {
    return this.execute('commentReport')
  }
}

module.exports = ReportDAO
