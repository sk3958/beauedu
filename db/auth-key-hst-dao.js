var dao = require('./beauedu-dao')

class AuthKeyHstDAO extends dao.BeauEduDAO {
  insertAuthKeyHst (myself = this) {
		this.inputParam.auth_key = this.generateKey()
		return new Promise(function(resolve, reject) {
			myself.execute('insertAuthKeyHst')
				.then(res => {
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
		})
  }

	generateKey () {
		let min = 100000
		let max = 1000000
		return Math.floor(Math.random() * (max - min)) + min
	}

	selectFollowUp (myself = this) {
		var input = {
			user_id: this.inputParam.user_id,
		}
		return new Promise(function(resolve, reject) {
			myself.execute('selectFollowUp', input)
				.then(res => {
					resolve(res)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}

module.exports = AuthKeyHstDAO
