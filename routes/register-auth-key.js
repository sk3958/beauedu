var BeauEduRouter = require('./beauedu-router')
var AuthKeyHstDAO = require('../db/auth-key-hst-dao')
var UserDAO = require('../db/user-dao')
var consts = require('../core/const')
var utils = require('../core/utils')
var Mailer = require('../core/send-mail')

class RegisterAuthKeyRouter extends BeauEduRouter {
  async processRequest () {
    var data = {}

    this.conn = await this.pool.connect()

    try {
			var authKeyHstDAO = new AuthKeyHstDAO(this.conn, this.sqlMapper, this.inputParam)
			var action = await authKeyHstDAO.selectAuthKeyInfoByHstNum()
			action = action.rows[0]
			if (action.auth_key != this.inputParam.auth_key) {
				data.result = 'fail'
				data.message = 'Key is not matched.'
				this.json(data)
				return false
			}

			await this.beginTransaction()
			await this.followUpAction(action, authKeyHstDAO)

			data.result = 'success'
			data.url = this.getUrlByAction(action.follow_up)
      this.json(data)
			this.commit()
      return true

    } catch (e) {
      this.error(e)
			data.result = 'fail'
			data.message = 'Internal server error occured.'
			this.json(data)
			this.rollback()
			return false

    } finally {
      if (null !== this.conn) this.conn.release()
    }
  } 

	getUrlByAction (followUp) {
		switch(followUp) {
			case consts.AUTH_KEY_ACTION_VERIFY_CNTC:
				return '/'
			case consts.AUTH_KEY_ACTION_INIT_PASSWD:
				return '/'
			default:
				return ''
		}
	}

	followUpAction (action, authKeyHstDao) {
		switch(action.follow_up) {
			case consts.AUTH_KEY_ACTION_VERIFY_CNTC:
				return this.verifyContact(action, authKeyHstDao)
			case consts.AUTH_KEY_ACTION_INIT_PASSWD:
				return this.initPassword(action, authKeyHstDao)
			default:
				throw 'No following action founded'
		}
	}

	verifyContact (action, authKeyHstDao) {
		return authKeyHstDao.updateFollowUp(action)
	}

	initPassword (action, data, authKeyHstDAO, myself = this) {
		var passwd = utils.makeRandPasswd()
			var userDAO = new UserDAO(this.conn, this.sqlMapper, this.inputParam)
		
		return new Promise(function(resolve, reject) {
			userDAO.updatePasswd(action.user_id, passwd)
				.then(res => {
					if (0 === res.rowCount)
						throw 'Updat password failed.'

					new Mailer().sendTmpPasswd(action.user_id, action.email, passwd)
					authKeyHstDAO.updateFollowUp(action)
						.then(res => {
							resolve(res)
						})
						.catch(err => {
							myself.error(err)
							reject(err)
						})
				})
				.catch(err => {
					myself.error(err)
					reject(err)
				})
		})
	}
}

module.exports = RegisterAuthKeyRouter
