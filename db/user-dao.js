var dao = require('./beauedu-dao')

class UserDAO extends dao.BeauEduDAO {
  insertUser (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('insertBeauUser')
          .then(res => {
            myself.execute('updatePassword')
              .then(res => {
                resolve(res)
              })
              .catch(err => {
                reject(err)
              })
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

  selectUser () {
    return this.execute('selectBeauUser')
  }

  checkUserIdDup () {
    return this.execute('checkUserId')
  }

  selectTeacherList () {
    return this.execute('selectTeacherList', {})
  }
}

module.exports = UserDAO
