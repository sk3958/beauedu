module.exports = function (app, fs, pool, sqlMapper, ejsEngine) {
  let info = getRouteInfo(fs)
  let urls = Object.keys(info)
  let routes = Object.values(info)
  let bodyParser = require('body-parser')
  let jsonParser = bodyParser.json()
  let urlencodedParser = bodyParser.urlencoded({ extended: true })

  //app.use(jsonParser)
  //app.use(urlencodedParser)

  for (let i = 0; i < urls.length; i++) {
    if ('/registerReport' == urls[i]) {
      app.post(urls[i], function(req, res) {
        setSessionTime(req.session)
        let Router = require(routes[i])
        let router = new Router(req, res, pool, sqlMapper)
        router.processRequest()
      })
    } else if ('/selectContract' == urls[i] || '/selectReport' == urls[i]) {
      app.get(urls[i], function(req, res) {
        setSessionTime(req.session)
        let Router = require(routes[i])
        let router = new Router(req, res, pool, sqlMapper)
        router.processRequest()
      })

      app.post(urls[i], urlencodedParser, function(req, res) {
        setSessionTime(req.session)
        let Router = require(routes[i])
        let router = new Router(req, res, pool, sqlMapper)
        router.processRequest()
      })
    } else {

      app.get(urls[i], function(req, res) {
        setSessionTime(req.session)
        let Router = require(routes[i])
        let router = new Router(req, res, pool, sqlMapper)
        router.processRequest()
      })

      app.post(urls[i], jsonParser, function(req, res) {
        setSessionTime(req.session)
        let Router = require(routes[i])
        let router = new Router(req, res, pool, sqlMapper)
        router.processRequest()
      })
    }
  } 
}

getRouteInfo = function(fs) {
  let data = fs.readFileSync('./config/routes.json')
  let info = JSON.parse(data)
  return info
}

setSessionTime = function(session) {
  if (session.logined && undefined !== session.user_id && null !== session.user_id) {
    var threeHours = 3 * 3600 * 1000
    session.expires = new Date(Date.now() + threeHours)
    session.maxAge = threeHours
    }
}
