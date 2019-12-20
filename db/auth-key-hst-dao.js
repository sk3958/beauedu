var dao = require('./beauedu-dao')
var consts = require('../core/const')

class AuthKeyHstDAO extends dao.BeauEduDAO {
  insertAuthKeyHst () {
		this.inputParam.auth_key = this.generateKey()
		return this.execute('insertAuthKeyHst')
  }

	generateKey () {
		let min = 100000
		let max = 1000000
		return Math.floor(Math.random() * (max - min)) + min
	}

	selectFollowUp () {
		var input = {
			user_id: this.inputParam.user_id,
		}
		return this.execute('selectFollowUp', input)
	}
	
	selectAuthKeyInfoByHstNum () {
		var input = {
			hst_num: this.inputParam.hst_num,
		}
		return this.execute('selectAuthKeyInfoByHstNum', input)
	}

	makeParamByFollowUp (action) {
		var param = {
			is_active: false,
			is_follow_up_ended: false,
			follow_up: action.follow_up,
			hst_num: action.hst_num
		}

		switch (action.follow_up) {
			case consts.AUTH_KEY_ACTION_VERIFY_CNTC:
			case consts.AUTH_KEY_ACTION_CHANGE_PASSWD:
				param.is_follow_up_ended = true
				return param
			case consts.AUTH_KEY_ACTION_INIT_PASSWD:
				param.is_active = true
				param.follow_up = consts.AUTH_KEY_ACTION_CHANGE_PASSWD
				return param
			default:
				return undefined
		}
	}

	updateFollowUp (action) {
		var param = this.makeParamByFollowUp(action)
		return this.execute('updateFollowUp', param)
	}

	cancelFollowUp (hst_num) {
		var param = { hst_num: hst_num }
		return this.execute('cancelFollowUp', param)
	}

  reinsertAuthKeyHst (hst_num) {
		var param = {
			auth_key: this.generateKey(),
			hst_num: hst_num
		}
		return this.execute('reinsertAuthKeyHst')
  }
}

module.exports = AuthKeyHstDAO
