BeauEdu.registerUserRequest = function (form_id) {
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
	
	BeauEdu.ajaxRequest('POST', 'registerUserRequest', BeauEdu.getJsonStringByFormData(form_id), BeauEdu.success, BeauEdu.error)
	
	return true
}

BeauEdu.success = function (responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		BeauEdu.alert('Your request is successfully registered.', 'SUCCESS', ALERT_SUCCESS)
			.then(res => {
			})
			.catch(err => {
			})
	} else {
		BeauEdu.alert('Error occured.', 'ERROR', ALERT_ERROR)
			.then(res => {
			})
			.catch(err => {
			})
	}
	
	return true
}

BeauEdu.error = function () {
	BeauEdu.alert('Error occured.', 'ERROR', ALERT_ERROR)
		.then(res => {
		})
		.catch(err => {
		})
	
	return true
}
