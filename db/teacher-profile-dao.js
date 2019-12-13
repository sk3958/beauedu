var dao = require('./beauedu-dao')

class TeacherProfileDAO extends dao.BeauEduDAO {
  insertTeacherProfile() {
    return this.execute('insertTeacherProfile')
  }

  updateTeacherProfile(updateMode) {
    return this.execute(1 == updateMode ? 'updateTeacherProfile' : 'updateTeacherProfile_2')
  }

  selectTeacherProfile(user_id) {
    var param = {
        user_id: user_id
    }
    return this.execute('selectTeacherProfile', param)
  }
}

module.exports = TeacherProfileDAO
