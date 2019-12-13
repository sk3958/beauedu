var dao = require('./beauedu-dao')

class ReportDAO extends dao.BeauEduDAO {
  insertReport (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('insertReport')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return 0
    }
  }

  selectReportNum (user_id, myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('selectReportNum', { user_id: user_id })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return 0
    }
  }  

  insertReportFile (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('insertReportFile')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return 0
    }
  }  

  selectReportFile (file_num, myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('selectReportFile', { file_num: file_num })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return 0
    }
  }

  selectReportFiles (report_num, myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('selectReportFiles', { report_num: report_num })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return 0
    }
  }

  selectReportList (user_nm, start_dt, end_dt, myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('selectReportList', { user_nm: user_nm, start_dt: start_dt, end_dt: end_dt })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return 0
    }
  }  
}

module.exports = ReportDAO
