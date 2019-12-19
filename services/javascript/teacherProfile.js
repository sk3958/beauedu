var myself = {}

myself.registerTeacherProfile = function(form_id) {
	debugger
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
	
	if (false == utils.checkRequiredCheckbox('teacher_specialities')) {
		utils.alert('Teacher Specialties are requird.')
			.then(res => {
			})
			.catch(err => {
			})
		return false
	}
	if (false == utils.checkRequiredCheckbox('inet_connection')) {
		utils.alert('Internet Connection is requird.')
			.then(res => {
			})
			.catch(err => {
			})
		return false
	}
	
	ajax.ajaxRequest('POST', 'registerTeacherProfile', utils.getJsonStringByFormData(form_id), myself.success, myself.error)
	
	return true
}

myself.success = function(responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		utils.alert('Teacher Profile is successfully registered.', 'SUCCESS', utils.ALERT_SUCCESS)
			.then(res => {
				location.href = 'selectTeacherProfile'
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
