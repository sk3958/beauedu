var dao = require('./beauedu-dao')

class UserMultiAttrDAO extends dao.BeauEduDAO {
  selectUserMultiAttr(userId, commCdId) {
    var param = {
      user_id: userId,
      comm_cd_id: commCdId
    }
    return this.execute('selectUserMultiAttr', param)
  }

  insertUserMultiAttr(userId, commCdId, commCdVal) {
    var param = {
      user_id: userId,
      comm_cd_id: commCdId,
      comm_cd_val: commCdVal
    }
    return this.execute('insertUserMultiAttr', param)
  }

  deleteUserMultiAttr(userId, commCdId) {
    var param = {
      user_id: userId,
      comm_cd_id: commCdId,
    }
    return this.execute('deleteUserMultiAttr', param)
  }
}

module.exports = UserMultiAttrDAO

