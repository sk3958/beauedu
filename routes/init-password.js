var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')
var StudentProfileDAO = require('../db/student-profile-dao')
var TeacherProfileDAO = require('../db/teacher-profile-dao')
var AuthKeyHstDAO = require('../db/auth-key-hst-dao')
var AuthKeyHstBean = require('../beans/auth-key-hst-bean')
var consts = require('../core/const')
var Mailer = require('../core/send-mail')

class InitPasswordRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}
    data.session = this.req.session

    this.conn = await this.pool.connect()

    try {
      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam)
      var user = await userDAO.checkUserIdDup()

      if (0 == user.rows.length) {
        data.result = 'fail'
        data.message = 'No such user id is founded.'
        this.json(data)
        return true
      }

      await this.beginTransaction()

      var profile = null
      var email = ''
      if (consts.USER_KIND_STUDENT == user.user_kind) {
        var studentProfileDAO = new StudentProfileDAO(this.conn, this.sqlMapper, this.inputParam)
        profile = await studentProfileDAO.selectStudentProfile(user.user_id)
        email = profile.rows[0].email
      } else if (consts.USER_KIND_TEACHER == user.user_kind) {
        var teacherProfileDAO = new TeacherProfileDAO(this.conn, this.sqlMapper, this.inputParam)
        profile = await teacherProfileDAO.selectTeacherProfile(user.user_id)
        email = profile.rows[0].email
      } else if (consts.USER_KIND_ADMINISTRATOR == user.user_kind) {
        email = process.env.EMAIL
      }
      
			var authKeyHstBean = new AuthKeyHstBean()
			authKeyHstBean.setUser_id(this.inputParam.user_id)
			authKeyHstBean.setAuth_type(consts.AUTH_KEY_INIT_PASSWORD)
			authKeyHstBean.setEmail(email)
			authKeyHstBean.setFollow_up(consts.AUTH_KEY_ACTION_INIT_PASSWD)

			var authKeyHstDAO = new AuthKeyHstDAO(this.conn, this.sqlMapper, authKeyHstBean.getData())

      var res = await authKeyHstDAO.insertAuthKeyHst()
      this.req.session.hst_num = res.rows[0].hst_num

			// Send verify mail
			//var mailer = new Mailer()
			//mailer.sendAuthKey(this.inputParam.user_id, this.inputParam.email, res.rows[0].auth_key)

      data.result = 'success'
      data.url = 'verifyAuthKey'
      this.json(data)
      this.commit()
			// Send verify mail
			var mailer = new Mailer()
			mailer.sendAuthKey(this.inputParam.user_id, this.inputParam.email, res.rows[0].auth_key)

      return true

    } catch (e) {
      this.rollback()
      this.error(e)
      return false

    } finally {
      if (null !== this.conn) this.conn.release()
    }
  } 
}

module.exports = InitPasswordRouter
