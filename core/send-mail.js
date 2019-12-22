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

	makeMessage (params, type) {
		let result = {}
		let data = fs.readFileSync('./config/mailTemplate.json')
		data = JSON.parse(data)
		data = data[type]
		result.subject = data['subject']
		result.body =
			ejs.render(data['body'], params)
		return result
	}

	sendAuthKey (userId, mailTo, verifyCode) {
		let params = {
			userId: userId,
			verifyCode: verifyCode
		}
		let contents = this.makeMessage(params, consts.AUTH_KEY_REGISTER_USER)
		return this.sendMail(mailTo, contents)
	}

	sendTmpPasswd (userId, mailTo, tmpPasswd) {
		let params = {
			userId: userId,
			tmpPasswd: tmpPasswd
		}
		let contents = this.makeMessage(params, consts.AUTH_KEY_INIT_PASSWORD)
		return this.sendMail(mailTo, contents)
	}

	sendMail (mailTo, contents) {
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
					logger.error(error.stack || error)
					console.log(error)
				} else {
					logger.info(info)
					console.log(info)
				}
				transporter.close()
			}
		) 
	}
}

module.exports = Mailer
