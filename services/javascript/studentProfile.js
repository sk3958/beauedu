var myself = {}

myself.registerStudentProfile = function(form_id) {
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
	
	if (false == utils.checkRequiredCheckbox('teacher_preferences')) {
		alert('Teacher Preferences are requird.')
			.then(res => {
			})
			.catch(err => {
			})
		return false
	}
	
	ajax.ajaxRequest('POST', 'registerStudentProfile', utils.getJsonStringByFormData(form_id), myself.success, myself.error)
	
	return true
}

myself.success = function(responseText) {
	debugger
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		utils.alert('Student Profile is successfully registered.', 'SUCCESS', utils.ALERT_SUCCESS)
			.then(res => {
				location.href = 'selectStudentProfile'
			})
			.catch(err => {
			})
	} else {
		utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
			.then(res => {
			})
			.catch(err => {
			})
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
