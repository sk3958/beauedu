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
              myself.execute('selectUserRequestMstForContract')
                .then(res2 => {
                  if (0 == res2.rows.count) {
                    throw 'SelectUserRequestMstForContract failed.'
                  } else {
                    var row = res2.rows[0]
                    var contractBean = new ContractBean()
                    contractBean.setRequest_num(row.request_num)
                    contractBean.setStatus(consts.CONTRACT_STATUS_REQUESTED)
                    
                    myself.execute('insertContract', contractBean.getData())
                      .then(res3 => {
                        resolve(res3)
                      })
                      .catch(err3 => {
                        reject(err3)
                      })
                  }
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

  updateUserRequestMst (myself = this) {
    try {
      return new Promise(function(resolve, reject) {
        myself.execute('updateUserRequestMst')
          .then(res => {
            resolve(res)
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
}

module.exports = UserRequestDAO
