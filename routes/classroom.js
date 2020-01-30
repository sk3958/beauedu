var BeauEduRouter = require('./beauedu-router')
const utils = require('../core/utils')
const redis = require('redis')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SESSION_SECRET)

class ClassroomRouter extends BeauEduRouter {
  async processRequest () {

    var session = this.req.session
    const redisClient = redis.createClient(process.env.REDIS_PORT || 6379)
    var tempKey = utils.makeRandPasswd()
    session.tempKey = tempKey
    try {
			const key = `classroom:login:${session.user_id}`
      redisClient.setex(key, 30, JSON.stringify(session))
      delete session.tempKey

      tempKey = cryptr.encrypt(tempKey)
      var userId = cryptr.encrypt(session.user_id)
      let url = `https://localhost:3002/?param1=${userId}&param2=${tempKey}`
      // let url = `https://115.143.192.140:3002/?param1=${userId}&param2=${tempKey}`
      url = encodeURI(url)

      this.res.redirect(url)
      return true
    } catch (e) {
      this.error(e.stack)
      this.res.render('error.ejs')
      return false
    } finally {
      if (redisClient.connected) redisClient.quit()
    }
  }  
}

module.exports = ClassroomRouter
