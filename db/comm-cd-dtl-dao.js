var dao = require('./beauedu-dao')

class CommCdDtlDAO extends dao.BeauEduDAO {
  selectCommCdDtlList(commCdId, isForUi) {
    var param = {
      comm_cd_id: commCdId,
      is_for_ui: isForUi
    }
    return this.execute('selectCommCdDtl', param)
  }
}

module.exports = CommCdDtlDAO

