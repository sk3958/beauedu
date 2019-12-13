var BeauEduRouter = require('./beauedu-router')
var ReportDAO = require('../db/report-dao')
var formidable = require('formidable')
var fs = require('fs')

class RegisterReportRouter extends BeauEduRouter {
  async processRequest () {
    var result = false;
    if (true !== this.req.session.logined) {
      this.res.render('login.ejs')
      return result
    }

    var myself = this
    var data = {}
    data.user_id = this.req.session.user_id
    data.report_type = this.req.session.user_kind
    data.audit_id = data.user_id

    var form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.maxFileSize = 500 * 1024 * 1024
    form.maxFields = 20
    form.multiples = true
    form.uploadDir = './upload'
    form.parse(this.req)

    /*form.on('progress', function(bytesReceived, bytesExpected) {
    })*/

    form.on('field', function(name, value) {
      data[name] = value
    })

    /*form.on('fileBegin', function(name, file) {
    })*/

    form.on('file', function(name, file) {
      data.file_name = file.name
      data.saved_file_name = file.path
      data.file_size = file.size
    })

    form.on('error', function(err) {
      myself.error(err.stack || err)
      myself.json({ result: 'fail' })
    })

    form.on('aborted', function() {
      myself.error('RegisterReport is aborted.' + '[' + myself.req.session.user_id + ']')
      myself.json({ result: 'fail' })
    })

    form.on('end', function() {
      myself.inputParam = data
      myself.registerReport()
    })
  }

  async registerReport () {
    var result = false
    try {
      this.conn = await this.pool.connect()

      var reportDAO = new ReportDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
      var returnVal = await reportDAO.insertReport()
      returnVal = await reportDAO.selectReportNum(this.req.session.user_id)
      this.inputParam.report_num = returnVal.rows[0].report_num
      returnVal = await reportDAO.insertReportFile()

      await this.commit()
      this.json({ result: 'success' })
      result = true

    } catch (e) {
      await this.rollback()
      this.json({ result: 'fail' });
      this.error(e.stack || e)
      this.res.render('error.ejs')
      result = false
    } finally {
      if (null !== this.conn) await this.conn.release()

      return result
    }
  }  
}

module.exports = RegisterReportRouter
