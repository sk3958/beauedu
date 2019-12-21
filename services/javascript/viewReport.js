var myself = {}

myself.setEvent = function() {
	$('.a_report_text').on('click', function(event) {
		var $tr = $(event.target).closest('tr')

		document.querySelector('#div_report_text').innerText = $tr.find('.report_text').val()
		document.querySelector('#report_text_popup').style.display = 'block'
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
