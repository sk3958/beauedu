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

  selectUser (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('selectBeauUser')
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

  checkUserIdDup (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('checkUserId')
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

  selectTeacherList (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('selectTeacherList', {})
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

module.exports = UserDAO
