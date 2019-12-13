BeauEdu.registerTeacherProfile = function(form_id) {
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
	
	if (false == BeauEdu.checkRequiredCheckbox('teacher_specialities')) {
		alert('Teacher Specialties are requird.')
		return false
	}
	if (false == BeauEdu.checkRequiredCheckbox('inet_connection')) {
		alert('Internet Connection is requird.')
		return false
	}
	
	BeauEdu.ajaxRequest('POST', 'registerTeacherProfile', BeauEdu.getJsonStringByFormData(form_id), BeauEdu.success, BeauEdu.error)
	
	return true
}

BeauEdu.success = function(responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		alert('Teacher Profile is successfully registered.')
		location.href = 'selectTeacherProfile'
	} else {
		alert('Error occured.')
	}
	
	return true
}

BeauEdu.error = function() {
	alert('Error occured.')
	
	return true
}
