var dao = require('./beauedu-dao')
var consts = require('../core/const')

class ContractDAO extends dao.BeauEduDAO {
  updateContract (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('insertContractHst')
          .then(res => {
            myself.execute('updateContract')
              .then(res2 => {
                myself.inputParam.request_status = 
                  (consts.CONTRACT_STATUS_REQUESTED == myself.inputParam.status)
                    ? consts.REQUEST_STATUS_REQUESTED : consts.REQUEST_STATUS_CONTRACTED
                myself.execute('updateUserRequestMst')
                  .then(res3 => {
                    resolve(res3)
                  })
                  .catch(err3 => {
                    reject(err3)
                  })
              })
              .catch(err2 => {
                reject(err2)
              })
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

  selectContract (contracStatus, userName) {
    var data = {
      status: contracStatus,
      requester_name: userName
    }
    return this.execute('selectContract', data)
  }
}

module.exports = ContractDAO
