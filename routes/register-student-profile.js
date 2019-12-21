var BeauEduRouter = require('./beauedu-router')
var StudentProfileDAO = require('../db/student-profile-dao')
var UserMultiAttrDAO = require('../db/user-multi-attr-dao')

class RegisterStudentProfileRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session
    data.user_id = this.req.session.user_id

    try {
      this.conn = await this.pool.connect()

      var studentProfileDAO = new StudentProfileDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
      this.inputParam.user_id = this.req.session.user_id
      var userMultiAttrDAO = new UserMultiAttrDAO(this.conn, this.sqlMapper, this.inputParam);
      
      var res = await studentProfileDAO.selectStudentProfile(this.inputParam.user_id)
      
      var returnVal = 0
      if (0 == res.rows.length) {
        returnVal = await studentProfileDAO.insertStudentProfile()
      } else {
        returnVal = await studentProfileDAO.updateStudentProfile(1)
      }

      if (0 == returnVal.rowCount) throw 'Fail to register student profile.'

      var attrVal
      var teacher_speciality = this.inputParam.teacher_preferences

      returnVal = await userMultiAttrDAO.deleteUserMultiAttr(data.user_id, 'teacher_speciality')
      var key
      for (key in teacher_speciality) {
        attrVal = teacher_speciality[key]
        returnVal = await userMultiAttrDAO.insertUserMultiAttr(data.user_id, 'teacher_speciality', attrVal)
        if (0 == returnVal.rowCount) throw 'Fail to register user multi attribution.'
      }

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

module.exports = RegisterStudentProfileRouter
