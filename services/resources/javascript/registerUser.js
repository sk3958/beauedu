var myself = {}

var request_type = ''
var checked_id = ''

myself.checkIdDup = function(element_id) {
	request_type = 'checkIdDup'
	
	var element = document.getElementById(element_id)
	
	var message = utils.checkID(element.value)
	if (null !== message) {
		utils.alert(message)
			.then(() => {
				element.focus()
				element.select()
			})
			.catch(() => {
			})

		return false
	}
	
	var obj = {}
	element.value = element.value.trim()
	obj.user_id = element.value
	
	ajax.ajaxRequest('POST', 'checkUserId', JSON.stringify(obj), myself.success, myself.error)
	
	return true
}

myself.registerUser = function(form_id) {
	request_type = 'registerUser'
	
	var form = document.getElementById(form_id)
	
	if (null === form || undefined === form) return false
	
	if (false === form instanceof HTMLFormElement) return false
	
	if (false === form.checkValidity()) {
		try {
			form.reportValidity()
		} catch (e) {
			utils.checkRequiredField(form_id)
		}
		
		return false
	}
	
	if (checked_id != document.getElementById('user_id').value) {
		utils.alert('Press Check ID button.')
		return false
	}
	
	var user_passwd = document.getElementById('user_passwd').value
	var check_passwd = document.getElementById('check_passwd').value
	var rtn = utils.checkPassword(user_passwd, check_passwd)
	
	if (null !== rtn) {
		var elem
		if (1 === rtn.code) {
			elem = document.getElementById('check_passwd')
		}
		else {
			elem = document.getElementById('user_passwd')
		}
		utils.alert(rtn.message)
			.then(() => {
				elem.focus()
				elem.select()
			})
			.catch(() => {
				elem.focus()
				elem.select()
			})
		return false
	}
	
	ajax.ajaxRequest('POST', 'registerUser', utils.getJsonStringByFormData(form_id), myself.success, myself.error)
	
	return true
}

myself.success = function(responseText) {
	var json = JSON.parse(responseText)
	
	if ('checkIdDup' == request_type) {
		if (json.available == 'true') {
			utils.alert(json.user_id + ' is available.', 'SUCCESS', utils.ALERT_SUCCESS)
			checked_id = json.user_id
		} else {
			utils.alert(json.user_id + ' is not available.')
		}
	} else if ('registerUser' == request_type) {
		if (json.result == 'success') {
			utils.alert(json.user_id + ' is successfully registered.', 'SUCCESS', utils.ALERT_SUCCESS)
				.then(() => {
					location.href = json.url
				})
				.catch(() => {
				})
			
		} else {
			utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
		}
	}
	
	return true
}

myself.error = function() {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
	
	return true
}
