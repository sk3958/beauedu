var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')
var StudentProfileDAO = require('../db/student-profile-dao')
var TeacherProfileDAO = require('../db/teacher-profile-dao')
var AuthKeyHstDAO = require('../db/auth-key-hst-dao')
var consts = require('../core/const')

class LoginRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}

    this.conn = await this.pool.connect()

    try {
      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam)
      var user = await userDAO.selectUser()

      if (0 == user.rows.length) {
        data['result'] = 'fail'
        this.json(data)
        return true
      }
      
      user = user.rows[0]

			var authKeyHstDAO = new AuthKeyHstDAO(this.conn, this.sqlMapper, this.inputParam)
			var actions = await authKeyHstDAO.selectFollowUp()
			if (0 < actions.rows.length) {
				var action = actions.rows[0]
				this.req.session.logined = false
				this.req.session.hst_num = action.hst_num
				data['result'] = 'success'
				data['url'] = this.getUrlByAction(action.follow_up)
				this.json(data)
				return true
			}

      this.req.session.logined = true
      this.req.session.user_id = user.user_id
      this.req.session.user_kind = user.user_kind
      
      var profile = null
      if (consts.USER_KIND_STUDENT == user.user_kind) {
        data['url'] = 'selectStudentProfile'
        var studentProfileDAO = new StudentProfileDAO(this.conn, this.sqlMapper, this.inputParam)
        profile = await studentProfileDAO.selectStudentProfile(user.user_id)
      } else if (consts.USER_KIND_TEACHER == user.user_kind) {
        data['url'] = 'selectTeacherProfile'
        var teacherProfileDAO = new TeacherProfileDAO(this.conn, this.sqlMapper, this.inputParam)
        profile = await teacherProfileDAO.selectTeacherProfile(user.user_id)
      } else if (consts.USER_KIND_ADMINISTRATOR == user.user_kind) {
        data['url'] = 'selectContract'
      } else {
        data['url'] = ''
      }
      
      if (undefined !== profile && null !== profile && 0 < profile.rows.length) {
        this.req.session.email = profile.rows[0].email
        this.req.session.first_name = profile.rows[0].first_name
        this.req.session.last_name = profile.rows[0].last_name
      }

      data['result'] = 'success'
      this.json(data)

      return true
    } catch (e) {
      this.error(e)
			return false
    } finally {
      if (null !== this.conn) this.conn.release()
    }
  } 

	getUrlByAction (followUp) {
		switch(followUp) {
			case consts.AUTH_KEY_ACTION_VERIFY_CNTC:
				return 'verifyAuthKey'
			case consts.AUTH_KEY_ACTION_INIT_PASSWD:
				return 'setNewPasswd'
			default:
				return ''
		}
	}
}

module.exports = LoginRouter

