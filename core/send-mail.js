let nodemailer = require('nodemailer')
let logger = require('./logger')
let ejs = require('ejs')
let fs = require('fs')
var consts = require('../core/const')

class Mailer {
	constructor () {
    this.email = process.env.EMAIL
    this.passwd = process.env.EMAIL_PASSWD
	}

	makeMessage (userId, params, type) {
		let result = {}
		let data = fs.readFileSync('./config/mailTemplate.json')
		data = JSON.parse(data)
		data = data[type]
		result.subject = data['subject']
		result.body =
			ejs.render(data['body'], {
				userId: userId,
				verifyCode: verifyCode
			})
		return result
	}

	sendAuthKey (userId, mailTo, verifyCode) {
		let params = {
			userId: uaerId,
			verifyCode: verifyCode
		}
		let contents = this.makeMessage(userId, params, consts.AUTH_KEY_REGISTER_USER)
console.log(this.email + '\n' + contents.subject + '\n' + contents.body)
		return this.sendMail(userId, mailTo, contents)
	}

	sendTmpPasswd (userId, mailTo, tmpPasswd) {
		let params = {
			userId: uaerId,
			tmpPasswd: tmpPasswd
		}
		let contents = this.makeMessage(userId, params, consts.AUTH_KEY_INIT_PASSWD)
console.log(this.email + '\n' + contents.subject + '\n' + contents.body)
		return this.sendMail(userId, mailTo, contents)
	}

	sendMail (userId, mailTo, contents) {
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: this.email,
				pass: this.passwd
			}
		});

		let mailOptions = {
			from: this.email,
			to: mailTo,
			subject: contents.subject,
			text: contents.body
		} 

		transporter.sendMail(
			mailOptions, function(error, info) {
				if (error) {
					//logger.error(error.stack || error)
					console.log(error)
				} else {
					//logger.info(info)
					console.log(info)
				}
				transporter.close()
			}
		) 
	}
}

module.exports = Mailer
