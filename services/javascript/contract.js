BeauEdu.Contracts = {}

BeauEdu.OriginContracts = {}

var $targetTeacherID = null
var $targetTeacherName = null

BeauEdu.setEvent = function() {
	$('.teacher_lov').on('click', function(event) {
		$('#teacher_list_popup').css('display', 'none')
		var $tr = $(event.target).closest('tr')
		$targetTeacherID = $tr.find('.teacher_id')
		$targetTeacherName = $tr.find('.teacher_name')
		
		$('#teacher_list_popup').css('display', 'block')
		/*$('#teacher_list_popup').css('left', event.pageX)
		$('#teacher_list_popup').css('top', event.pageY)*/
		BeauEdu.ajaxRequest('POST', 'selectTeacherList', '', BeauEdu.onGetTeacherListSuccess, BeauEdu.onGetTeacherListFail)
	})
	
	$('.clear_teacher').on('click', function(event) {
		var $tr = $(event.target).closest('tr')
		var $teacherId = $tr.find('.teacher_id')
		var $teacherName = $tr.find('.teacher_name')

		$teacherId.val('')
		$teacherName.val('')
		
		BeauEdu.onChange($teacherId)
		BeauEdu.onChange($teacherName)
	})
	
	$('.teacher_id,.teacher_name, .status, .start_dt, .end_dt, .period_unit_class, .class_times, .period_unit_pay, .pay_times, .pay_amount')
		.on('change', function() {
			BeauEdu.onChange($(this))
	})
	
	$('.save_button').on('click', function(event) {
		BeauEdu.saveContract($(event.target))
	})
	
	$(':input[type=text][readonly="readonly"]').on('keydown', function(event) {
		if (8 === event.keyCode) {
			event.preventDefault()
			return false
		}
		
		return true
	})
	
	$('#teacher_list_popup').draggable({handle:'.list-popup-header'})
	
	$('#table_contracts').colResizable({liveDrag:true, disabledColumns:[12], postbackSafe:true})
}

BeauEdu.onChange = function($target) {
	var $tr = $target.closest('tr')
	var $row_id = $tr.find('.row_id')
	
	$target.val($target.val().trim())
	var dataGroup = $target.attr('data-group')
	
	if ((dataGroup == 'class_times' || dataGroup == 'pay_times') && $target.val() == '') {
		$target.val('0')
	} else if ((dataGroup == 'pay_amount') && $target.val() == '') {
		$target.val('0.0')
	}
	
	BeauEdu.Contracts[$row_id.val()][dataGroup] = $target.val()
	
	if (true == BeauEdu.isDataChanged($row_id.val())) {
		BeauEdu.Contracts[$row_id.val()]['changed'] = true
		$tr.addClass('changed')
	} else {
		BeauEdu.Contracts[$row_id.val()]['changed'] = false
		$tr.removeClass('changed')
	}
}

BeauEdu.isDataChanged = function(row_id) {
	var a = BeauEdu.Contracts[row_id]
	var b = BeauEdu.OriginContracts[row_id]
	if (a['teacher_id'] != b['teacher_id'] ||
		a['teacher_name'] != b['teacher_name'] ||
		a['status'] != b['status'] ||
		a['start_dt'] != b['start_dt'] ||
		a['end_dt'] != b['end_dt'] ||
		a['period_unit_class'] != b['period_unit_class'] ||
		a['class_times'] != b['class_times'] ||
		a['period_unit_pay'] != b['period_unit_pay'] ||
		a['pay_times'] != b['pay_times'] ||
		a['pay_amount'] != b['pay_amount']) return true
	
	return false
}

BeauEdu.saveContract = function($target) {
	var $tr = $target.closest('tr')
	var row_id = $tr.find('.row_id').val()
	
	if (false == BeauEdu.Contracts[row_id]['changed']) {
		alert('Nothing is changed.')
		return
	}
	
	if (true == BeauEdu.isValidData($tr, BeauEdu.Contracts[row_id])) {
		BeauEdu.ajaxRequest('POST', 'saveContract', JSON.stringify(BeauEdu.Contracts[row_id]), BeauEdu.onContractChangeSuccess, BeauEdu.onContractChangeFail)
	}
}

BeauEdu.isValidData = function($tr, data) {
	if (isNaN(data['class_times']) || 0 <= ('0' + data['class_times']).indexOf('.')) {
		alert('This field must be a integer.')
		$tr.find('.class_times').focus()
		return false
	} else if (isNaN(data['pay_times']) || 0 <= ('0' + data['pay_times']).indexOf('.')) {
		alert('This field must be a integer.')
		$tr.find('.pay_times').focus()
		return false
	} else if (isNaN(data['pay_amount'])) {
		alert('This field must be a number.')
		$tr.find('.pay_amount').focus()
		return false
	}
	
	if (CONTRACT_STATUS_REQUESTED == data['status']) return true
	
	if (null == data['teacher_id'] || '' == data['teacher_id'].trim()) {
		alert('Teacher must be selected.')
		return false
	} else if (false == moment(data['start_dt'], 'YYYYMMDD', true).isValid()) {
		alert('Date format must be YYYYMMDD.')
		$tr.find('.start_dt').focus()
		return false
	} else if (false == moment(data['end_dt'], 'YYYYMMDD', true).isValid()) {
		alert('Date format must be YYYYMMDD.')
		$tr.find('.end_dt').focus()
		return false
	} else if (data['start_dt'] > data['end_dt']) {
		alert('Check sart and end date.')
		$tr.find('.end_dt').focus()
		return false
	} else if (null == data['period_unit_class'] || '' == data['period_unit_class']) {
		alert('This field must be selected.')
		$tr.find('.period_unit_class').focus()
		return false
	} else if (null == data['period_unit_pay'] || '' == data['period_unit_pay']) {
		alert('This field must be selected.')
		$tr.find('.period_unit_pay').focus()
		return false
	}
	return true
}

BeauEdu.onContractChangeSuccess = function(responsText) {
	var json = JSON.parse(responsText)
	var row_id = ''
	
	if (json.result != 'success') {
		alert('Error occured.')
		return
	}
	
	alert('Saved.')
	
	row_id = json.row_id
	var $tr = $('#' + row_id)
	
	if (BeauEdu.OriginContracts[row_id]['status'] != json.status || 0 == BeauEdu.OriginContracts[row_id]['contract_num']) {
		$tr.remove()
		delete BeauEdu.Contracts[row_id]
		delete BeauEdu.OriginContracts[row_id]
		
		return
	}
	
	BeauEdu.Contracts[row_id]['changed'] = false
	
	BeauEdu.OriginContracts[row_id] = BeauEdu.copyObject(BeauEdu.Contracts[row_id])
	
	$tr.removeClass('changed')
}

BeauEdu.onContractChangeFail = function() {
	alert('Error occured.')
}

BeauEdu.onGetTeacherListSuccess = function(responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		BeauEdu.showTeacherListPopup(json)
	} else {
		alert('Error occured.')
	}
	
	return true
}

BeauEdu.onGetTeacherListFail = function() {
	alert('Error occured.')
	
	return true
}

BeauEdu.showTeacherListPopup = function(obj) {
	var teacherList = obj['data']
	
	var htmlText = ''
	htmlText = '<thead><tr><th>Teacher ID</th><th>Teacher Name</th><th></th></tr></thead><tbody>'
	
	for (let i = 0; i < teacherList.length; i++) {
		htmlText += '<tr><td>' + teacherList[i]['user_id'] + '</td><td>' + teacherList[i]['user_name'] + '</td>' +
					'<td><button type=\'button\' class=\'accept_teacher\'>Select</button></td></tr>'
	}
	
	htmlText += '</tbody>'
	
	document.getElementById('teacher_list_table').innerHTML = htmlText
	
	$('#teacher_list_popup').css('display', 'block')
	
	$('.accept_teacher').on('click', function(event) {
		debugger
		var $tr = $(event.target).closest('tr')
		var $children = $tr.children('td')
		$targetTeacherID.val($children[0].innerText)
		$targetTeacherName.val($children[1].innerText)
		
		BeauEdu.onChange($targetTeacherID)
		BeauEdu.onChange($targetTeacherName)
		
		$('#teacher_list_popup').css('display', 'none')
	})
}

BeauEdu.closeTeacherListPopup = function() {
	$('#teacher_list_popup').css('display', 'none')
}

BeauEdu.onNameKeyPress = function(e) {
	if (e.keyCode == 13) document.getElementById('search_form').submit()
}
