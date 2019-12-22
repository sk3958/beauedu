var BeauEduRouter = require('./beauedu-router')
var ContractDAO = require('../db/contract-dao')
var consts = require('../core/const')

class SaveContractRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session

    try {
      this.conn = await this.pool.connect()

      this.inputParam.audit_id = this.req.session.user_id
      var contractDAO = new ContractDAO(this.conn, this.sqlMapper, this.inputParam);
      await this.beginTransaction()
      var returnVal = await contractDAO.updateContract()
      if (0 == returnVal.rowCount) throw 'Update contract failed.'

      data.result = 'success'
      data.row_id = this.inputParam.contract_num
      data.contract_num = this.inputParam.contract_num
      data.status = this.inputParam.status
      
      await this.commit()
      this.json(data)
      return true

    } catch (e) {
      data.result = 'fail'
      await this.rollback()
      this.json(data)
      this.error(e)
      return false

    } finally {
      if (null !== this.conn) await this.conn.release()
    }
  }  
}

module.exports = SaveContractRouter
