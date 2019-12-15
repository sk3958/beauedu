BeauEdu.onFileSelect = function() {
	document.querySelector('#file_name').value = document.querySelector('#upfile').value
}


BeauEdu.cancelFileSelect = function () {
	document.querySelector('#upfile').value = ''
	document.querySelector('#file_name').value = document.querySelector('#upfile').value
}

BeauEdu.clearReportFrom = function () {
	BeauEdu.cancelFileSelect()
	document.querySelector('#report_title').value = ''
	document.querySelector('#report_title').value = ''
}


BeauEdu.saveReport = function() {
	var formData = new FormData(document.querySelector('#report_form'))
	
	if ('' == document.querySelector('#report_title').value.trim()) {
		BeauEdu.alert('Report title must be filled.')
		document.querySelector('#report_title').focus()
		return false
	} else if ('' == document.querySelector('#report_text').value.trim() && '' == document.querySelector('#file_name').value.trim()) {
		BeauEdu.alert('Attach file or write report.')
		document.querySelector('#report_text').focus()
		return false
	}
	
	BeauEdu.ajaxRequest('POST', 'registerReport', formData, BeauEdu.onReportSaveSuccess, BeauEdu.onReportSaveFail, true)
}

BeauEdu.onReportSaveSuccess = function(responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		BeauEdu.alert('Your report is successfully registered.')

	} else {
		BeauEdu.alert('Error occured.', 'ERROR', ALERT_ERROR)
	}
	
	return true
}

BeauEdu.onReportSaveFail = function() {
	BeauEdu.alert('Error occured.', 'ERROR', ALERT_ERROR)
	
	return true
}
