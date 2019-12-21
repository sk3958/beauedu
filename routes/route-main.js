module.exports = function (app, fs, pool, sqlMapper) {

  let getRouteInfo = function(fs) {
    let data = fs.readFileSync('./config/routes.json')
    let info = JSON.parse(data)
    return info
  }

  let setSessionTime = function(session) {
    if (session.logined && undefined !== session.user_id && null !== session.user_id) {
      var threeHours = 3 * 3600 * 1000
      session.expires = new Date(Date.now() + threeHours)
      session.maxAge = threeHours
      }
  }

  let isValidRequest = function (session, auth) {
    let userType
    try {
      userType = session.user_kind
    } catch (e) {
      userType = undefined
    }

    if ('*' === auth) return true
    else if (0 <= auth.indexOf(userType)) return true
    else return false
  }

  let info = getRouteInfo(fs)
  let urls = Object.keys(info)
  let routes = Object.values(info)
  let bodyParser = require('body-parser')
  let jsonParser = bodyParser.json()
  let urlencodedParser = bodyParser.urlencoded({ extended: true })

  for (let i = 0; i < urls.length; i++) {
    if ('/registerReport' == urls[i]) {
        app.post(urls[i], function(req, res) {
          if (isValidRequest(req.session, routes[i]['auth'])) {
            setSessionTime(req.session)
            let Router = require(routes[i]['path'])
            let router = new Router(req, res, pool, sqlMapper)
            router.processRequest()
          } else {
            res.render('login.ejs')
          }
        })
    } else if ('/selectContract' == urls[i] || '/selectReport' == urls[i]) {
      app.get(urls[i], function(req, res) {
          if (isValidRequest(req.session, routes[i]['auth'])) {
            setSessionTime(req.session)
            let Router = require(routes[i]['path'])
            let router = new Router(req, res, pool, sqlMapper)
            router.processRequest()
          } else {
            res.render('login.ejs')
          }
      })

      app.post(urls[i], urlencodedParser, function(req, res) {
          if (isValidRequest(req.session, routes[i]['auth'])) {
            setSessionTime(req.session)
            let Router = require(routes[i]['path'])
            let router = new Router(req, res, pool, sqlMapper)
            router.processRequest()
          } else {
            res.render('login.ejs')
          }
      })
    } else {

      app.get(urls[i], function(req, res) {
          if (isValidRequest(req.session, routes[i]['auth'])) {
            setSessionTime(req.session)
            let Router = require(routes[i]['path'])
            let router = new Router(req, res, pool, sqlMapper)
            router.processRequest()
          } else {
            res.render('login.ejs')
          }
      })

      app.post(urls[i], jsonParser, function(req, res) {
          if (isValidRequest(req.session, routes[i]['auth'])) {
            setSessionTime(req.session)
            let Router = require(routes[i]['path'])
            let router = new Router(req, res, pool, sqlMapper)
            router.processRequest()
          } else {
            res.render('login.ejs')
          }
      })
    }
  } 
}
