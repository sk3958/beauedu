var BeauEduRouter = require('./beauedu-router')
var TeacherProfileDAO = require('../db/teacher-profile-dao')
var CommCdDtlDAO = require('../db/comm-cd-dtl-dao')
var UserMultiAttrDAO = require('../db/user-multi-attr-dao')
var TeacherProfileBean = require('../beans/teacher-profile-bean')
var CommCdDtlBean = require('../beans/comm-cd-dtl-bean')
var UserMultiAttrBean = require('../beans/user-multi-attr-bean')

class SelectTeacherProfileRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session

    try {
      this.conn = await this.pool.connect()

      var teacherProfileDAO = new TeacherProfileDAO(this.conn, this.sqlMapper, this.inputParam)
      var commCdDtlDAO = new CommCdDtlDAO(this.conn, this.sqlMapper, this.inputParam)
      var userMultiAttrDAO = new UserMultiAttrDAO(this.conn, this.sqlMapper, this.inputParam)

      var teacherProfile = await teacherProfileDAO.selectTeacherProfile(this.req.session.user_id)
      var registeredTeacherSpecialities = await userMultiAttrDAO.selectUserMultiAttr(this.req.session.user_id, 'teacher_speciality')
      var teacherSpecialities = await commCdDtlDAO.selectCommCdDtlList('teacher_speciality', 'Y')
      var inetConnections = await commCdDtlDAO.selectCommCdDtlList('inet_connection', 'Y')

      var teacherProfileBean = new TeacherProfileBean(teacherProfile.rows[0])
      data.teacherProfile = teacherProfileBean

      data.registered_teacher_specialities = []
      var userMultiAttrBean
      for (let i = 0; i < registeredTeacherSpecialities.rows.length; i++) {
        userMultiAttrBean = new UserMultiAttrBean(registeredTeacherSpecialities.rows[i])
        data.registered_teacher_specialities.push(userMultiAttrBean)
      }
      
      data.teacher_specialities = []
      var commCdDtlBean
      for (let i = 0; i < teacherSpecialities.rows.length; i++) {
        commCdDtlBean = new CommCdDtlBean(teacherSpecialities.rows[i])
        data.teacher_specialities.push(commCdDtlBean)
      }

      data.inet_connections = []
      for (let i = 0; i < inetConnections.rows.length; i++) {
        commCdDtlBean = new CommCdDtlBean(inetConnections.rows[i])
        data.inet_connections.push(commCdDtlBean)
      }

      this.res.render('teacherProfile.ejs', data)
      return true

    } catch (e) {
      this.error(e)
      this.res.render('error.ejs')
      return false

    } finally {
      if (null !== this.conn) this.conn.release()
    }
  }  
}

module.exports = SelectTeacherProfileRouter
