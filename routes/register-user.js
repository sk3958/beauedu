var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')
var StudentProfileBean = require('../beans/student-profile-bean')
var TeacherProfileBean = require('../beans/teacher-profile-bean')
var AuthKeyHstBean = require('../beans/auth-key-hst-bean')
var StudentProfileDAO = require('../db/student-profile-dao')
var TeacherProfileDAO = require('../db/teacher-profile-dao')
var AuthKeyHstDAO = require('../db/auth-key-hst-dao')
var consts = require('../core/const')
var Mailer = require('../core/send-mail')

class RegisterUserRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    
    try {
      this.conn = await this.pool.connect()

      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
			// Create user
      await userDAO.insertUser()

			// Create profile
			var param = this.inputParam
			if (consts.USER_KIND_STUDENT == param.user_kind) {
				var studentProfileBean = new StudentProfileBean()
				studentProfileBean.setUser_id(param.user_id);
				studentProfileBean.setEmail(param.email);
	
				var studentProfileDAO = new StudentProfileDAO(this.conn, this.sqlMapper, studentProfileBean.getData())

				await studentProfileDAO.insertStudentProfile()
			} else if (consts.USER_KIND_TEACHER == param.user_kind) {
				var teacherProfileBean = new TeacherProfileBean()
				teacherProfileBean.setUser_id(param.user_id);
				teacherProfileBean.setEmail(param.email);
	
				var teacherProfileDAO = new TeacherProfileDAO(this.conn, this.sqlMapper, teacherProfileBean.getData())

				await teacherProfileDAO.insertTeacherProfile()
			}
      
			// Create send verify mail history
			var authKeyHstBean = new AuthKeyHstBean()
			authKeyHstBean.setUser_id(this.inputParam.user_id)
			authKeyHstBean.setAuth_type(consts.AUTH_KEY_REGISTER_USER)
			authKeyHstBean.setEmail(this.inputParam.email)
			authKeyHstBean.setFollow_up(consts.AUTH_KEY_ACTION_VERIFY_CNTC)

			var authKeyHstDAO = new AuthKeyHstDAO(this.conn, this.sqlMapper, authKeyHstBean.getData())

			var res = await authKeyHstDAO.insertAuthKeyHst()

			// Send verify mail
			var mailer = new Mailer()
			mailer.sendAuthKey(
				this.inputParam.user_id,
				this.inputParam.email,
				res.rows[0].auth_key
			)

      data.user_id = this.inputParam.user_id
      data.result = 'success'
      data.url = '/'
      await this.commit()

      this.json(data)
			return true

    } catch (e) {
      await this.rollback()
      data.result = 'fail'
      this.json(data);
      this.error(e.stack || e)
      this.res.render('error.ejs')
			return false

    } finally {
      if (null !== this.conn) await this.conn.release()
    }
  }  
}
  
module.exports = RegisterUserRouter

