BeauEdu.registerStudentProfile = function(form_id) {
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
	
	if (false == BeauEdu.checkRequiredCheckbox('teacher_preferences')) {
		alert('Teacher Preferences are requird.')
			.then(res => {
			})
			.catch(err => {
			})
		return false
	}
	
	BeauEdu.ajaxRequest('POST', 'registerStudentProfile', BeauEdu.getJsonStringByFormData(form_id), BeauEdu.success, BeauEdu.error)
	
	return true
}

BeauEdu.success = function(responseText) {
	debugger
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		BeauEdu.alert('Student Profile is successfully registered.', 'SUCCESS', ALERT_SUCCESS)
			.then(res => {
				location.href = 'selectStudentProfile'
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

BeauEdu.error = function() {
	BeauEdu.alert('Error occured.', 'ERROR', ALERT_ERROR)
		.then(res => {
		})
		.catch(err => {
		})
	
	return true
}
