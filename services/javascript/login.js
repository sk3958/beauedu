var myself = {}

myself.login = function(form_id)
{
  var form = document.getElementById(form_id)
	
	if (null == form || undefined == form) return false
	
	if (false == form instanceof HTMLFormElement) return false
	
	if (false == form.checkValidity()) {
		try {
			form.reportValidity()
		} catch (e) {
			utils.checkRequiredField(form_id)
		}
		
		return false
	}
	ajax.ajaxRequest('POST', 'login', utils.getJsonStringByFormData(form_id), myself.success, myself.error)
	
	return true
}

myself.showInitPasswd = function () {
	var div = document.querySelector('#init-passwd')
	div.style.display = 'block'
}

myself.requestInitPasswd = function () {
	var userId = document.querySelector('#user_id').value
	var rtn = utils.checkID(userId)

	if (null !== rtn) {
		utils.alert(rtn, 'ERROR', utils.ALERT_ERROR)
		return false
	}

	ajax.ajaxRequest('POST', 'initPassword', JSON.stringify({ user_id: userId }), myself.onInitPasswdSuccess, myself.error)
}

myself.onUserPasswdKeyPress = function(e) {
	if (e.keyCode == 13 && e.target.value.length > 0) {
		myself.login('login_form')
	}
}

myself.onUserIdKeyPress = function(e) {
	if (e.keyCode == 13 && e.target.value.length > 0) {
		var user_passwd = document.getElementById('user_passwd')
		if (user_passwd.value.length > 0) {
			myself.login('login_form')
		} else {
			user_passwd.focus()
			user_passwd.select()
		}
	}
}

myself.bodyOnLoad = function() {
	var storage = window.localStorage
	var user_id = document.getElementById('user_id')
	var remember_me = document.getElementById('remember_me')
	if (storage.user_id) {
		user_id.value = storage.user_id
		remember_me.checked = true
	}
	document.getElementById('user_id').focus()
}

myself.rememberMe = function() {
	var remember_me = document.getElementById('remember_me')
	var storage = window.localStorage
	var user_id = document.getElementById('user_id')
  if (remember_me.checked) {
		storage.setItem('user_id', user_id.value)
	} else {
		storage.removeItem('user_id')
	}
}

myself.success = function(responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		myself.rememberMe()
		location.href = json.url
	} else {
		utils.alert('Invalid ID or password.', 'ERROR', utils.ALERT_ERROR)
	}
	
	return true
}

myself.onInitPasswdSuccess = function(responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		location.href = json.url
	} else {
		utils.alert(json.message, 'ERROR', utils.ALERT_ERROR)
	}
	
	return true
}

myself.error = function() {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
	return true
}
