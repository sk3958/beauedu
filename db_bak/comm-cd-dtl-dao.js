var dao = require('./beauedu-dao')

class CommCdDtlDAO extends dao.BeauEduDAO {
  selectCommCdDtlList(commCdId, isForUi, myself = this) {
    var param = {
      comm_cd_id: commCdId,
      is_for_ui: isForUi
    }

    try {
      return new Promise(function(resolve, reject) {
        myself.execute('selectCommCdDtl', param)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    } catch (e) {
      this.log(e.stack || e)
      return null
    }
  }
}

module.exports = CommCdDtlDAO

