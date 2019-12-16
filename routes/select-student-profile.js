var BeauEduRouter = require('./beauedu-router')
var StudentProfileDAO = require('../db/student-profile-dao')
var CommCdDtlDAO = require('../db/comm-cd-dtl-dao')
var UserMultiAttrDAO = require('../db/user-multi-attr-dao')
var StudentProfileBean = require('../beans/student-profile-bean')
var CommCdDtlBean = require('../beans/comm-cd-dtl-bean')
var UserMultiAttrBean = require('../beans/user-multi-attr-bean')

class SelectStudentProfileRouter extends BeauEduRouter {
  async processRequest () {

    var result = false;
    if (!this.req.session.user_id) {
      this.res.render('login.ejs')
      return result
    }

    var data = {}
    data.session = this.req.session

    try {
      this.conn = await this.pool.connect()

      var studentProfileDAO = new StudentProfileDAO(this.conn, this.sqlMapper, this.inputParam)
      var commCdDtlDAO = new CommCdDtlDAO(this.conn, this.sqlMapper, this.inputParam)
      var userMultiAttrDAO = new UserMultiAttrDAO(this.conn, this.sqlMapper, this.inputParam)

      var student_profile = await studentProfileDAO.selectStudentProfile(this.req.session.user_id)
      var level_of_education = await commCdDtlDAO.selectCommCdDtlList('level_of_education', 'Y')
      var teacher_specialities = await commCdDtlDAO.selectCommCdDtlList('teacher_speciality', 'Y')
      var registered_teacher_preferences = await userMultiAttrDAO.selectUserMultiAttr(this.req.session.user_id, 'teacher_speciality')

      var studentProfileBean = new StudentProfileBean(student_profile.rows[0])
	    data.student_profile = studentProfileBean

	    data.level_of_education = []      
      var commCdDtlBean
      for (let i = 0; i < level_of_education.rows.length; i++) {
        commCdDtlBean = new CommCdDtlBean(level_of_education.rows[i])
        data.level_of_education.push(commCdDtlBean)
      }

      data.teacher_specialities = []
      for (let i = 0; i < teacher_specialities.rows.length; i++) {
        commCdDtlBean = new CommCdDtlBean(teacher_specialities.rows[i])
        data.teacher_specialities.push(commCdDtlBean)
      }

      data.registered_teacher_preferences = []
      var userMultiAttrBean
      for (let i = 0; i < registered_teacher_preferences.rows.length; i++) {
        userMultiAttrBean = new UserMultiAttrBean(registered_teacher_preferences.rows[i])
        data.registered_teacher_preferences.push(userMultiAttrBean)
      }
      
      this.res.render('studentProfile.ejs', data)
      
      result = true
    } catch (e) {
      this.error(e.stack)
      this.res.render('error.ejs')
      result = false
    } finally {
      if (null !== this.conn) this.conn.release()
      return result
    }
  }  
}

module.exports = SelectStudentProfileRouter

