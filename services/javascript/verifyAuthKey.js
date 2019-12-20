var myself = {}
myself.reqCount = 0
myself.actionType = 0

myself.verifyKey = function(elementId)
{
  var element = document.getElementById(elementId)
	var authKey = element.value.trim()
	var keyLen = utils.LEN_AUTH_KEY
	if (isNaN(authKey) || authKey.length !== keyLen) {
		utils.alert('Authentication key is ' + keyLen + ' digit number. Check your input.', 'CHECK')
		return false
	}

	var data = {
		auth_key: authKey,
		hst_num: myself.hst_num
	}

	ajax.ajaxRequest('POST', 'registerAuthKey', JSON.stringify(data), myself.success, myself.error)

	myself.actionType = 1
	return true
}

myself.requestKey = function()
{
	var data = {
		hst_num: myself.hst_num
	}
	
	ajax.ajaxRequest('POST', 'resendAuthKey', JSON.stringify(data), myself.success, myself.error)
	
	myself.actionType = 2
	return true
}

myself.onAuthKeyKeyPress = function(e) {
	if (e.keyCode == 13 && e.target.value.length > 0) {
		myself.verifyKey('auth_key')
	}
}

myself.success = function(responseText) {
	var json = JSON.parse(responseText)

	if (1 === myself.actionType) {
		if (json.result == 'success') {
			location.href = json.url
		} else {
			utils.alert(json['message'], 'ERROR', utils.ALERT_ERROR)
				.then(res => {
				})
				.catch(err => {
				})
		}
	}
	else if (2 === myself.actionType) {
		if (json.result == 'success') {
			utils.alert('We just sent the key. Check your email.', 'SUCCESS', utils.ALERT_SUCCESS)
				.then(res => {
				})
				.catch(err => {
				})
		} else {
			utils.alert(json['message'], 'ERROR', utils.ALERT_ERROR)
				.then(res => {
				})
				.catch(err => {
				})
		}
	}
	
	return true
}

myself.error = function() {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
		.then(res => {
		})
		.catch(err => {
		})
	return true
}