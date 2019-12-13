var dao = require('./beauedu-dao')

class UserMultiAttrDAO extends dao.BeauEduDAO {
  selectUserMultiAttr(userId, commCdId, myself = this) {
    var param = {
      user_id: userId,
      comm_cd_id: commCdId
    }

    try {
      return new Promise(function(resolve, reject) {
        myself.execute('selectUserMultiAttr', param)
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

  insertUserMultiAttr(userId, commCdId, commCdVal, myself = this) {
    var param = {
      user_id: userId,
      comm_cd_id: commCdId,
      comm_cd_val: commCdVal
    }

    try {
      return new Promise(function(resolve, reject) {
        myself.execute('insertUserMultiAttr', param)
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

  deleteUserMultiAttr(userId, commCdId, myself = this) {
    var param = {
      user_id: userId,
      comm_cd_id: commCdId,
    }

    try {
      return new Promise(function(resolve, reject) {
        myself.execute('deleteUserMultiAttr', param)
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

module.exports = UserMultiAttrDAO

