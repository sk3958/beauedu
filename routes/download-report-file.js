var BeauEduRouter = require('./beauedu-router')
var ReportDAO = require('../db/report-dao')
var consts = require('../core/const')
var fs = require('fs')

class DownloadReportFileRouter extends BeauEduRouter {
  async processRequest () {
    var myself = this
    try {
      this.conn = await this.pool.connect()

      var reportDAO = new ReportDAO(this.conn, this.sqlMapper, this.inputParam);
      var res = await reportDAO.selectReportFile(this.inputParam.file_num)
      var fileName = res.rows[0].saved_file_name
      var fileSize = res.rows[0].file_size

      this.res.setHeader('Content-Length', fileSize)
      var stream = fs.createReadStream('./' + fileName)
      stream.on('data', function(chunk) {
        myself.res.write(chunk)
      })
      stream.on('error', function(err) {
        throw 'Error occured during reading file.'
      })
      stream.on('close', function() {
        myself.res.statusCode = 200
        myself.res.end()
      })
      
      return true

    } catch (e) {
      this.error(e.stack || e)
      this.res.render('error.ejs')
      this.res.statusCode = 503
      this.res.end()

      return false

    } finally {
      if (null !== this.conn) await this.conn.release()
    }
  }   
}

module.exports = DownloadReportFileRouter
