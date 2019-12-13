BeauEdu.setEvent = function() {
	$('.a_report_text').on('click', function(event) {
		$('#report_text_popup').css('display', 'none')
		
		var $tr = $(event.target).closest('tr')
		$('#div_report_text'). innerText = $tr.find('.report_text'). val()
		
		$('#report_text_popup').css('display', 'block')
	})
	
	$('#report_text_popup').draggable({handle:'#popup-header'})
	
	$('#table_reports').colResizable({liveDrag:true, postbackSafe:true})
}

BeauEdu.downloadFile = function(report_num, file_num, file_name) {
	var obj = {}
	obj['report_num'] = report_num
	obj['file_num'] = file_num
	obj['file_name'] = file_name
	
	BeauEdu.ajaxRequest(
		'POST',
		'downloadReportFile',
		JSON.stringify(obj),
    BeauEdu.onFileDownloadSuccess,
    BeauEdu.onFileDownloadFail,
    true,
		true,
		file_name)
}

BeauEdu.onFileDownloadSuccess = function (res) {

}

BeauEdu.onFileDownloadFail = function () {
	
}