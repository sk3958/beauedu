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
	document.getElementById('user_id').focus()
}

BeauEdu.success = function(responseText) {
	debugger
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		location.href = json.url
	} else {
		alert('Invalid ID or password.')
		$(':focus').select()
	}
	
	return true
}

BeauEdu.error = function() {
	alert('Error occured.')
	
	return true
}
