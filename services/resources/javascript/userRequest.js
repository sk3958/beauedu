var myself = {}

myself.registerUserRequest = function (form_id) {
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
	
	ajax.ajaxRequest('POST', 'registerUserRequest', utils.getJsonStringByFormData(form_id), myself.success, myself.error)
	
	return true
}

myself.success = function (responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		utils.alert('Your request is successfully registered.', 'SUCCESS', utils.ALERT_SUCCESS)
	} else {
		utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
	}
	
	return true
}

myself.error = function () {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
	return true
}
