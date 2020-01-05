var BeauEduRouter = require('./beauedu-router')
const utils = require('../core/utils')
const redis = require('redis')

class ClassroomRouter extends BeauEduRouter {
  async processRequest () {

    var session = this.req.session
    const redisClient = redis.createClient(process.env.REDIS_PORT || 6379)
    const tempKey = utils.makeRandPasswd()
    session.tempKey = tempKey

    try {
      await redisClient.setex(session.user_id, 120, JSON.stringify(session))
      delete session.tempKey
      let url = `https://localhost:3002/?user_id=${session.user_id}&tempKey=${tempKey}`
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