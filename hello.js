var fs = require('fs')
const stream = fs.createReadStream('./beauedu.js')

var data = []
stream.on('data', function (chunk) {
  data.push(chunk)
})
stream.on('close', function () {
  console.log(data.toString())
})