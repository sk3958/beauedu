var myself = {}

myself.onFileSelect = function() {
	document.querySelector('#file_name').value = document.querySelector('#upfile').value
}


myself.cancelFileSelect = function () {
	document.querySelector('#upfile').value = ''
	document.querySelector('#file_name').value = document.querySelector('#upfile').value
}

myself.clearReportFrom = function () {
	myself.cancelFileSelect()
	document.querySelector('#report_title').value = ''
	document.querySelector('#report_title').value = ''
}


myself.saveReport = function() {
	var formData = new FormData(document.querySelector('#report_form'))
	
	if ('' == document.querySelector('#report_title').value.trim()) {
		utils.alert('Report title must be filled.')
			.then(() => {
				document.querySelector('#report_title').focus()
			})
			.catch(() => {
			})
		return false
	} else if ('' == document.querySelector('#report_text').value.trim() && '' == document.querySelector('#file_name').value.trim()) {
		utils.alert('Attach file or write report.')
			.then(() => {
				document.querySelector('#report_text').focus()
			})
			.catch(() => {
			})
		return false
	}
	
	ajax.ajaxRequest('POST', 'registerReport', formData, myself.onReportSaveSuccess, myself.onReportSaveFail, true)
}

myself.onReportSaveSuccess = function(responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		utils.alert('Your report is successfully registered.')
	} else {
		utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
	}
	
	return true
}

myself.onReportSaveFail = function() {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
	return true
}
