var dao = require('./beauedu-dao')
var ContractBean = require('../beans/contract-bean')
var consts = require('../core/const')

class UserRequestDAO extends dao.BeauEduDAO {
  insertUserRequestMst (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('insertUserRequestMst')
          .then(res => {
            if (consts.REQUEST_TYPE_FIND_STUDENT == myself.inputParam.request_type) {
              resolve(res)
            } else {
								var row = res.rows[0]
								var contractBean = new ContractBean()
								contractBean.setRequest_num(row.request_num)
								contractBean.setStatus(consts.CONTRACT_STATUS_REQUESTED)
								
								myself.execute('insertContract', contractBean.getData())
									.then(res2 => {
										resolve(res2)
									})
									.catch(err2 => {
										reject(err2)
									})
							}
						})
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return 0
    }
  }

  updateUserRequestMst () {
    return this.execute('updateUserRequestMst')
  }
}

module.exports = UserRequestDAO
