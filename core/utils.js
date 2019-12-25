var utils = {}

utils.makeRandPasswd = function () {
	var passwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@~#-$_%=^+&{*}([)]|<;,.>:/?"
	var min = 8
	var max = 16
	var len = Math.floor(Math.random() * (max - min + 1)) + min
	var passwd =
		Array(len).fill(passwdChars)
			.map(x => {
				return x[Math.floor(Math.random() * x.length)]
			})
			.join('');
	return passwd;
}

utils.makePostgreQuery = function (str) {
	return str.replace(/"E"\s*'/g, `E'`)
}

module.exports = utils
