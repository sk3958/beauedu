var myself = {}

myself.setEvent = function() {
	$.datepicker.setDefaults({
		dateFormat: 'yymmdd',
		showOtherMonths: true,
		showMonthAfterYear:true,
		changeYear: true,
		changeMonth: true,         
		buttonImageOnly: true           
	});
	
	$(".start_dt, .end_dt").datepicker();
	
	$('.a_report_text').on('click', function(event) {
		var $tr = $(event.target).closest('tr')

		document.querySelector('#div_report_text').innerText = $tr.find('.report_text').val()
		document.querySelector('#report_text_popup').style.display = 'block'
	})

	$('.save_button').on('click', function(event) {
		myself.saveComment($(event.target))
	})
	
	
	$('#report_text_popup').draggable({handle:'#popup_header'})
	$('#table_reports').colResizable({liveDrag:true, postbackSafe:true})
}

myself.closeReportTextPopup = function () {
	document.querySelector('#report_text_popup').style.display = 'none'
}

myself.downloadFile = function(report_num, file_num, file_name) {
	var obj = {}
	obj['report_num'] = report_num
	obj['file_num'] = file_num
	obj['file_name'] = file_name
	
	ajax.ajaxRequest(
		'POST',
		'downloadReportFile',
		JSON.stringify(obj),
    myself.onFileDownloadSuccess,
    myself.onFileDownloadFail,
    true,
		true,
		file_name)
}

myself.onFileDownloadSuccess = function (res) {

}

myself.onFileDownloadFail = function () {
	
}

myself.saveComment = function($target) {
	var $tr = $target.closest('tr')
	var param = {}
	param.report_num = $tr.find('.report_num').val()
	param.comment = $tr.find('.comment').val()
	
	ajax.ajaxRequest('POST', 'commentReport', JSON.stringify(param), myself.onCommentSuccess, myself.onCommentFail)
}

myself.onCommentSuccess = function (responseText) {
	var json = JSON.parse(responseText)
	if ('success' == json.result) utils.alert('Comment saved.', 'SUCCESS', utils.ALERT_SUCCESS)
	else utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
}

myself.onCommentFail = function () {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
}
