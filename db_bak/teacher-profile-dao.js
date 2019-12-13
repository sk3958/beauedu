var dao = require('./beauedu-dao')

class TeacherProfileDAO extends dao.BeauEduDAO {
  insertTeacherProfile(myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('insertTeacherProfile')
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

  updateTeacherProfile(updateMode, myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute(1 == updateMode ? 'updateTeacherProfile' : 'updateTeacherProfile_2')
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

  selectTeacherProfile(user_id, myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        var param = {
          user_id: user_id
        }
        myself.execute('selectTeacherProfile', param)
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

module.exports = TeacherProfileDAO
