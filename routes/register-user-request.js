var BeauEduRouter = require('./beauedu-router')
var UserRequestDAO = require('../db/user-request-dao')
var StudentProfileBean = require('../beans/student-profile-bean')
var TeacherProfileBean = require('../beans/teacher-profile-bean')
var StudentProfileDAO = require('../db/student-profile-dao')
var TeacherProfileDAO = require('../db/teacher-profile-dao')
var consts = require('../core/const')

class RegisterUserRequestRouter extends BeauEduRouter {
  async processRequest () {

    var result = false;
    if (true !== this.req.session.logined) {
      this.res.render('login.ejs')
      return result
    }

    var data = {}
    data.session = this.req.session
    data.user_id = this.req.session.user_id

    try {
      this.conn = await this.pool.connect()
      
      if (undefined === this.inputParam.request_type || null == this.inputParam.request_type) {
        this.inputParam.request_type = data.session.user_kind
      }
      this.inputParam.request_status = consts.REQUEST_STATUS_REQUESTED
      var userRequestDAO = new UserRequestDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
      var returnVal = await userRequestDAO.insertUserRequestMst()
      returnVal = await this.insertProfile()
      if (0 == returnVal) throw 'Fail to register user request.'

      data.result = 'success'
      await this.commit()
      this.req.session.first_name = this.inputParam.first_name
      this.req.session.last_name = this.inputParam.last_name
      this.req.session.email = this.inputParam.email
      this.json(data)
      result = true

    } catch (e) {
      await this.rollback()
      data.result = 'fail'
      this.json(data);
      this.error(e.stack || e)
      this.res.render('error.ejs')
      result = false
      
    } finally {
      if (null !== this.conn) await this.conn.release()

      return result
    }
  }
  
  async insertProfile (myself = this) {
    return new Promise(async function(resolve, reject) {
      var result = 0
      var session = myself.req.session
      var param = myself.inputParam
      var res
  
      try {
        if (consts.USER_KIND_STUDENT == session.user_kind) {
          var studentProfileBean = new StudentProfileBean()
          studentProfileBean.setUser_id(session.user_id);
          studentProfileBean.setFirst_name(param.first_name);
          studentProfileBean.setLast_name(param.last_name);
          studentProfileBean.setEmail(param.email);
    
          var studentProfileDAO = new StudentProfileDAO(myself.conn, myself.sqlMapper, studentProfileBean.getData())
  
          res = await studentProfileDAO.selectStudentProfile(session.user_id)

          if (0 == res.rows.length) {
            result = await studentProfileDAO.insertStudentProfile()
          } else {
            result = await studentProfileDAO.updateStudentProfile(2)
          }
        } else if (consts.USER_KIND_TEACHER == session.user_kind) {
          var teacherProfileBean = new TeacherProfileBean()
          teacherProfileBean.setUser_id(session.user_id);
          teacherProfileBean.setFirst_name(param.first_name);
          teacherProfileBean.setLast_name(param.last_name);
          teacherProfileBean.setEmail(param.email);
    
          var teacherProfileDAO = new TeacherProfileDAO(myself.conn, myself.sqlMapper, teacherProfileBean.getData())
  
          res = await teacherProfileDAO.selectTeacherProfile(session.user_id)
          if (0 == res.rows.length) {
            result = await teacherProfileDAO.insertTeacherProfile()
          } else {
            result = await teacherProfileDAO.updateTeacherProfile(2)
          }
        }

        resolve(1)
      }
      catch (err) {
        myself.log(err.stack || err)

        reject(0)
      }
    })
  }
}

module.exports = RegisterUserRequestRouter
