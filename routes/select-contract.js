var BeauEduRouter = require('./beauedu-router')
var ContractDAO = require('../db/contract-dao')
var CommCdDtlDAO = require('../db/comm-cd-dtl-dao')
var ContracBean = require('../beans/contract-bean')
var CommCdDtlBean = require('../beans/comm-cd-dtl-bean')
var consts = require('../core/const')

class SelectContractRouter extends BeauEduRouter {
  async processRequest () {

    var data = {}
    data.session = this.req.session

    try {
      this.conn = await this.pool.connect()

      var contractDAO = new ContractDAO(this.conn, this.sqlMapper, this.inputParam);
      var commCdDtlDAO = new CommCdDtlDAO(this.conn, this.sqlMapper, this.inputParam);
      var status
      var name

      if (!this.inputParam || !this.inputParam.status) {
        status = ''
      } else {
        status = this.inputParam.status
      }
      if (!this.inputParam || !this.inputParam.name) {
        name = ''
      } else {
        name = this.inputParam.name
      }
      
      data.searchedStatus = status
      data.searchedName = name

      if ('' == status) status = consts.CONTRACT_STATUS_REQUESTED
      
      var contractBeanList = []
      var contractBean
      var statusList = []
      var commCdDtlBean
      var periodList = []

      Promise.all([
        contractDAO.selectContract(status, name),
        commCdDtlDAO.selectCommCdDtlList('contract_status', 'Y'),
        commCdDtlDAO.selectCommCdDtlList('period_unit', 'Y')
      ])
      .then(results => {
        var res = results[0]
        for (let i = 0; i < res.rows.length; i++) {
          contractBean = new ContracBean(res.rows[i])
          contractBeanList.push(contractBean)
        }
        data.contractBeanList = contractBeanList

        res = results[1]
        for (let i = 0; i < res.rows.length; i++) {
          commCdDtlBean = new CommCdDtlBean(res.rows[i])
          statusList.push(commCdDtlBean)
        }
        data.statusList = statusList

        res = results[2]
        for (let i = 0; i < res.rows.length; i++) {
          commCdDtlBean = new CommCdDtlBean(res.rows[i])
          periodList.push(commCdDtlBean)
        }
        data.periodList = periodList

        this.render('contract.ejs', data)
        return true
      })
      .catch(err => {
        throw err
      })
      
    } catch (e) {
      this.error(e)
      this.res.render('error.ejs')
      return false
    } finally {
      if (null !== this.conn) this.conn.release()
    }
  }  
}

module.exports = SelectContractRouter
