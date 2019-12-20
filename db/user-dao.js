var dao = require('./beauedu-dao')

class UserDAO extends dao.BeauEduDAO {
  insertUser (myself = this) {
    return this.execute('insertBeauUser')
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

	updatePasswd (userId, passwd) {
		var param = {
			user_id: userId,
			user_passwd: passwd
		}
		return this.execute('updatePassword', param)
	}
}

module.exports = UserDAO
