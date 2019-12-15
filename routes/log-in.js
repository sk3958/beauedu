var BeauEduRouter = require('./beauedu-router')
var UserDAO = require('../db/user-dao')
var StudentProfileDAO = require('../db/student-profile-dao')
var TeacherProfileDAO = require('../db/teacher-profile-dao')
var consts = require('../core/const')

class LoginRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}

    this.conn = await this.pool.connect()

    try {
      var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam)
      //var promise = userDAO.selectUser()
      var user = await userDAO.selectUser()

      if (0 == user.rows.length) {
        data['result'] = 'fail'
        this.json(data)
        return true
      }
      
      user = user.rows[0]
      var threeHours = 3 * 3600 * 1000
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

      /*promise
        .then(res => {
          if (null === res || 0 === res.rows.length) {
            data['result'] = 'fail'
            this.json(data)
            return true
          }

          data['result'] = 'success'
          
          var user = res.rows[0]
          var profilePromise = null
          if (consts.USER_KIND_STUDENT == user.user_kind) {
            data['url'] = 'selectStudentProfile'
            var studentProfileDAO = new StudentProfileDAO(this.conn, this.sqlMapper, this.inputParam)
            profilePromise = studentProfileDAO.selectStudentProfile(user.user_id)
          } else if (consts.USER_KIND_TEACHER == user.user_kind) {
            data['url'] = 'selectTeacherProfile'
            var teacherProfileDAO = new StudentProfileDAO(this.conn, this.sqlMapper, this.inputParam)
            profilePromise = teacherProfileDAO.selectTeacherProfile(user.user_id)
          } else if (consts.USER_KIND_ADMINISTRATOR == user.user_kind) {
            data['url'] = 'selectContract'
          } else {
            data['url'] = ''
          }

          if (null !== profilePromise) {
            profilePromise
              .then(res => {
                if (0 < res.rows.length) {
                  var profile = res.rows[0]
                  this.req.session.email = profile.email
                  this.req.session.first_name = profile.first_name
                  this.req.session.last_name = profile.last_name
this.log(this.req.session)
                }
              })
              .catch(err => {
                data["result"] = "fail"
              })
          }

          this.json(data)
          return true
        })
        .catch(err => {
          data["result"] = "fail"
          this.json(data)
          return false
        })*/
    } catch (e) {
      this.error(e.stack)
    } finally {
      if (null !== this.conn) this.conn.release()
    }
  }  
}

module.exports = LoginRouter

