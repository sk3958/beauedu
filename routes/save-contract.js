var BeauEduRouter = require('./beauedu-router')
var ContractDAO = require('../db/contract-dao')
var consts = require('../core/const')

class SaveContractRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    var result = false;

    if (true !== this.req.session.logined || consts.USER_KIND_ADMINISTRATOR != this.req.session.user_kind) {
      this.res.render('login.ejs')
      return result
    }

    try {
      this.conn = await this.pool.connect()

      this.inputParam.audit_id = this.req.session.user_id
      var contractDAO = new ContractDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
      var returnVal = await contractDAO.updateContract()

      data.result = 'success'
      data.row_id = this.inputParam.contract_num
      data.contract_num = this.inputParam.contract_num
      data.status = this.inputParam.status
      
      await this.commit()
      this.json(data)
      result = true

    } catch (e) {
      data.result = 'fail'
      await this.rollback()
      this.json(data)
      this.error(e.stack || e)
      this.res.render('error.ejs')
      result = false
    } finally {
      if (null !== this.conn) await this.conn.release()
      return result
    }
  }  
}

module.exports = SaveContractRouter
