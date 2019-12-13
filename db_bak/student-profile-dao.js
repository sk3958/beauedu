var dao = require('./beauedu-dao')

class StudentProfileDAO extends dao.BeauEduDAO {
  insertStudentProfile (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('insertStudentProfile')
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

  updateStudentProfile (updateMode, myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute(1 == updateMode ? 'updateStudentProfile' : 'updateStudentProfile_2')
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

  selectStudentProfile (user_id, myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        var param = {
          user_id: user_id
        }
        myself.execute('selectStudentProfile', param)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return null
    }
  }
}

module.exports = StudentProfileDAO

