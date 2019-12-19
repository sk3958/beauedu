let nodemailer = require('nodemailer')
let logger = require('./logger')
let ejs = require('ejs')
let fs = require('fs')

class Mailer {
	constructor () {
    this.email = process.env.EMAIL
    this.passwd = process.env.EMAIL_PASSWD
	}

	makeMessage (userId, verifyCode, type) {
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

	sendMail (userId, mailTo, verifyCode, type) {
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: this.email,
				pass: this.passwd
			}
		});

		let contents = this.makeMessage(userId, verifyCode, type)
console.log(this.email + '\n' + contents.subject + '\n' + contents.body)
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
