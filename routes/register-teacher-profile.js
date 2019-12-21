var BeauEduRouter = require('./beauedu-router')
var TeacherProfileDAO = require('../db/teacher-profile-dao')
var UserMultiAttrDAO = require('../db/user-multi-attr-dao')

class RegisterTeacherProfileRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session
    data.user_id = this.req.session.user_id
    this.inputParam.user_id = this.req.session.user_id

    try {
      this.conn = await this.pool.connect()

      var teacherProfileDAO = new TeacherProfileDAO(this.conn, this.sqlMapper, this.inputParam);
      var userMultiAttrDAO = new UserMultiAttrDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
      var res = await teacherProfileDAO.selectTeacherProfile(this.inputParam.user_id)
      
      var returnVal = 0
      if (0 == res.rows.length) {
        returnVal = await teacherProfileDAO.insertTeacherProfile()
      } else {
        returnVal = await teacherProfileDAO.updateTeacherProfile(1)
      }

      if (0 == returnVal.rowCount) throw 'Register teacher profile failed.'

      var attrVal
      var teacherSpeciality = this.inputParam.teacher_specialities

      returnVal = await userMultiAttrDAO.deleteUserMultiAttr(data.user_id, 'teacher_speciality')
      var key
      for (key in teacherSpeciality) {
        attrVal = teacherSpeciality[key]
        returnVal = await userMultiAttrDAO.insertUserMultiAttr(data.user_id, 'teacher_speciality', attrVal)
      }

      if (0 == returnVal.rowCount) throw 'Register teacher profile failed.'

      data.result = 'success'
      await this.commit()
      this.req.session.first_name = this.inputParam.first_name
      this.req.session.last_name = this.inputParam.last_name
      this.req.session.email = this.inputParam.email
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

module.exports = RegisterTeacherProfileRouter
