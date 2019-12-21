var BeauEduRouter = require('./beauedu-router')
var UserRequestDAO = require('../db/user-request-dao')
var StudentProfileBean = require('../beans/student-profile-bean')
var TeacherProfileBean = require('../beans/teacher-profile-bean')
var StudentProfileDAO = require('../db/student-profile-dao')
var TeacherProfileDAO = require('../db/teacher-profile-dao')
var consts = require('../core/const')

class RegisterUserRequestRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
		var session = this.req.session
    data.session = session
    data.user_id = session.user_id

    try {
      this.conn = await this.pool.connect()
      
      if (undefined === this.inputParam.request_type || null == this.inputParam.request_type) {
        this.inputParam.request_type = session.user_kind
      }
      this.inputParam.request_status = consts.REQUEST_STATUS_REQUESTED
      var userRequestDAO = new UserRequestDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
      await userRequestDAO.insertUserRequestMst()

			var param = this.inputParam
			var res
			if (consts.USER_KIND_STUDENT == session.user_kind) {
				var studentProfileBean = new StudentProfileBean()
				studentProfileBean.setUser_id(session.user_id);
				studentProfileBean.setFirst_name(param.first_name);
				studentProfileBean.setLast_name(param.last_name);
				studentProfileBean.setEmail(param.email);
	
				var studentProfileDAO = new StudentProfileDAO(this.conn, this.sqlMapper, studentProfileBean.getData())

				res = await studentProfileDAO.selectStudentProfile(session.user_id)

				if (0 == res.rows.length) {
					await studentProfileDAO.insertStudentProfile()
				} else {
					await studentProfileDAO.updateStudentProfile(2)
				}
			} else if (consts.USER_KIND_TEACHER == session.user_kind) {
				var teacherProfileBean = new TeacherProfileBean()
				teacherProfileBean.setUser_id(session.user_id);
				teacherProfileBean.setFirst_name(param.first_name);
				teacherProfileBean.setLast_name(param.last_name);
				teacherProfileBean.setEmail(param.email);
	
				var teacherProfileDAO = new TeacherProfileDAO(this.conn, this.sqlMapper, teacherProfileBean.getData())

				res = await teacherProfileDAO.selectTeacherProfile(session.user_id)
				if (0 == res.rows.length) {
					await teacherProfileDAO.insertTeacherProfile()
				} else {
					await teacherProfileDAO.updateTeacherProfile(2)
				}
			}

      data.result = 'success'
      await this.commit()
      session.first_name = this.inputParam.first_name
      session.last_name = this.inputParam.last_name
      session.email = this.inputParam.email
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

module.exports = RegisterUserRequestRouter
