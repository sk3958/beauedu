var request_type = ''
var checked_id = ''

BeauEdu.checkIdDup = function(element_id) {
	request_type = 'checkIdDup'
	
	var element = document.getElementById(element_id)
	
	if (false == BeauEdu.checkID(element.value)) {
		element.focus()
		return false
	}
	
	var obj = {}
	element.value = element.value.trim()
	obj.user_id = element.value
	
	BeauEdu.ajaxRequest('POST', 'checkUserId', JSON.stringify(obj), BeauEdu.success, BeauEdu.error)
	
	return true
}
	
BeauEdu.registerUser = function(form_id) {
	debugger
	request_type = 'registerUser'
	
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
	
	if (checked_id != document.getElementById('user_id').value) {
		BeauEdu.alert('Press Check ID button.')
		return false
	}
	
	var user_passwd = document.getElementById('user_passwd').value
	var check_passwd = document.getElementById('check_passwd').value
	var rtn = BeauEdu.checkPassword(user_passwd, check_passwd)
	if (1 == rtn) {
		document.getElementById('check_password').focus()
		return false
	}
	else if (2 == rtn) {
		document.getElementById('user_password').focus()
		return false
	}
	
	BeauEdu.ajaxRequest('POST', 'registerUser', BeauEdu.getJsonStringByFormData(form_id), BeauEdu.success, BeauEdu.error)
	
	return true
}

BeauEdu.success = function(responseText) {
	var json = JSON.parse(responseText)
	
	if ('checkIdDup' == request_type) {
		if (json.available == 'true') {
			BeauEdu.alert(json.user_id + ' is available.')
			checked_id = json.user_id
		} else {
			BeauEdu.alert(json.user_id + ' is not available.')
		}
	} else if ('registerUser' == request_type) {
		if (json.result == 'success') {
			BeauEdu.alert(json.user_id + ' is successfully registered.', 'SUCCESS', 'success')
			
			location.href = json.url
		} else {
			BeauEdu.alert('Error occured.', 'ERROR', 'error')
		}
	}
	
	return true
}

BeauEdu.error = function() {
	BeauEdu.alert('Error occured.', 'ERROR', 'error')
	
	return true
}
