var dao = require('./beauedu-dao')

class StudentProfileDAO extends dao.BeauEduDAO {
  insertStudentProfile () {
    return this.execute('insertStudentProfile')
  }

  updateStudentProfile (updateMode) {
    return this.execute(1 == updateMode ? 'updateStudentProfile' : 'updateStudentProfile_2')
  }

  selectStudentProfile (user_id) {
    var param = {
        user_id: user_id
    }
    return this.execute('selectStudentProfile', param)
  }
}

module.exports = StudentProfileDAO

