BeauEdu.login = function(form_id)
{
	debugger
  var form = document.getElementById(form_id)
	
	if (null == form || undefined == form) return false
	
	if (false == form instanceof HTMLFormElement) return false
	
	if (false == form.checkValidity()) {
		try {
			form.reportValidity()
		} catch (e) {
			BeauEdu.checkRequiredField(form_id)
		}
		
		return false
	}
	
	BeauEdu.ajaxRequest('POST', 'login', BeauEdu.getJsonStringByFormData(form_id), BeauEdu.success, BeauEdu.error)
	
	return true
}

BeauEdu.onUserPasswdKeyPress = function(e) {
	if (e.keyCode == 13 && e.target.value.length > 0) {
		BeauEdu.login('login_form')
	}
}

BeauEdu.onUserIdKeyPress = function(e) {
	if (e.keyCode == 13 && e.target.value.length > 0) {
		var user_passwd = document.getElementById('user_passwd')
		if (user_passwd.value.length > 0) {
			BeauEdu.login('login_form')
		} else {
			user_passwd.focus()
			user_passwd.select()
		}
	}
}

BeauEdu.bodyOnLoad = function() {
	var storage = window.localStorage
	var user_id = document.getElementById('user_id')
	var remember_me = document.getElementById('remember_me')
	if (storage.user_id) {
		user_id.value = storage.user_id
		remember_me.checked = true
	}
	document.getElementById('user_id').focus()
}

BeauEdu.rememberMe = function() {
	var remember_me = document.getElementById('remember_me')
	var storage = window.localStorage
	var user_id = document.getElementById('user_id')
  if (remember_me.checked) {
		storage.setItem('user_id', user_id.value)
	} else {
		storage.removeItem('user_id')
	}
}

BeauEdu.success = function(responseText) {
	debugger
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		BeauEdu.rememberMe()
		location.href = json.url
	} else {
		BeauEdu.alert('Invalid ID or password.', 'ERROR', ALERT_ERROR)
		$(':focus').select()
	}
	
	return true
}

BeauEdu.error = function() {
	BeauEdu.alert('Error occured.', 'ERROR', ALERT_ERROR)
	return true
}
