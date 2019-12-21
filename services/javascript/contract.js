var myself = {}
myself.Contracts = {}
myself.OriginContracts = {}
var $targetTeacherID = null
var $targetTeacherName = null

myself.setEvent = function() {
	$('.teacher_lov').on('click', function(event) {
		$('#teacher_list_popup').css('display', 'none')
		var $tr = $(event.target).closest('tr')
		$targetTeacherID = $tr.find('.teacher_id')
		$targetTeacherName = $tr.find('.teacher_name')
		
		$('#teacher_list_popup').css('display', 'block')

		ajax.ajaxRequest('POST', 'selectTeacherList', '', myself.onGetTeacherListSuccess, myself.onGetTeacherListFail)
	})
	
	$('.clear_teacher').on('click', function(event) {
		var $tr = $(event.target).closest('tr')
		var $teacherId = $tr.find('.teacher_id')
		var $teacherName = $tr.find('.teacher_name')

		$teacherId.val('')
		$teacherName.val('')
		
		myself.onChange($teacherId)
		myself.onChange($teacherName)
	})
	
	$('.teacher_id,.teacher_name, .status, .start_dt, .end_dt, .period_unit_class, .class_times, .period_unit_pay, .pay_times, .pay_amount')
		.on('change', function() {
			myself.onChange($(this))
	})
	
	$('.save_button').on('click', function(event) {
		myself.saveContract($(event.target))
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

myself.onChange = function($target) {
	var $tr = $target.closest('tr')
	var $row_id = $tr.find('.row_id')
	
	$target.val($target.val().trim())
	var dataGroup = $target.attr('data-group')
	
	if ((dataGroup == 'class_times' || dataGroup == 'pay_times') && $target.val() == '') {
		$target.val('0')
	} else if ((dataGroup == 'pay_amount') && $target.val() == '') {
		$target.val('0.0')
	}
	
	myself.Contracts[$row_id.val()][dataGroup] = $target.val()
	
	if (true == myself.isDataChanged($row_id.val())) {
		myself.Contracts[$row_id.val()]['changed'] = true
		$tr.addClass('changed')
	} else {
		myself.Contracts[$row_id.val()]['changed'] = false
		$tr.removeClass('changed')
	}
}

myself.isDataChanged = function(row_id) {
	var a = myself.Contracts[row_id]
	var b = myself.OriginContracts[row_id]
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

myself.saveContract = function($target) {
	var $tr = $target.closest('tr')
	var row_id = $tr.find('.row_id').val()
	
	if (false == myself.Contracts[row_id]['changed']) {
		utils.alert('Nothing is changed.')
			.then(res => {
			})
			.catch(err => {
			})
		return
	}
	
	if (true == myself.isValidData($tr, myself.Contracts[row_id])) {
		ajax.ajaxRequest('POST', 'saveContract', JSON.stringify(myself.Contracts[row_id]), myself.onContractChangeSuccess, myself.onContractChangeFail)
	}
}

myself.isValidData = function($tr, data) {
	if (isNaN(data['class_times']) || 0 <= ('0' + data['class_times']).indexOf('.')) {
		utils.alert('This field must be a integer.')
			.then(res => {
				$tr.find('.class_times').focus()
			})
			.catch(err => {
			})
		return false
	} else if (isNaN(data['pay_times']) || 0 <= ('0' + data['pay_times']).indexOf('.')) {
		utils.alert('This field must be a integer.')
			.then(res => {
				$tr.find('.pay_times').focus()
			})
			.catch(err => {
			})
		return false
	} else if (isNaN(data['pay_amount'])) {
		utils.alert('This field must be a number.')
			.then(res => {
				$tr.find('.pay_amount').focus()
			})
			.catch(err => {
			})
		return false
	}
	
	if (utils.CONTRACT_STATUS_REQUESTED == data['status']) return true
	
	if (null == data['teacher_id'] || '' == data['teacher_id'].trim()) {
		utils.alert('Teacher must be selected.')
			.then(res => {
			})
			.catch(err => {
			})
		return false
	} else if (false == moment(data['start_dt'], 'YYYYMMDD', true).isValid()) {
		utils.alert('Date format must be YYYYMMDD.')
			.then(res => {
				$tr.find('.start_dt').focus()
			})
			.catch(err => {
			})
		return false
	} else if (false == moment(data['end_dt'], 'YYYYMMDD', true).isValid()) {
		utils.alert('Date format must be YYYYMMDD.')
			.then(res => {
				$tr.find('.end_dt').focus()
			})
			.catch(err => {
			})
		return false
	} else if (data['start_dt'] > data['end_dt']) {
		utils.alert('Check sart and end date.')
			.then(res => {
				$tr.find('.end_dt').focus()
			})
			.catch(err => {
			})
		return false
	} else if (null == data['period_unit_class'] || '' == data['period_unit_class']) {
		utils.alert('This field must be selected.')
			.then(res => {
				$tr.find('.period_unit_class').focus()
			})
			.catch(err => {
			})
		return false
	} else if (null == data['period_unit_pay'] || '' == data['period_unit_pay']) {
		utils.alert('This field must be selected.')
			.then(res => {
				$tr.find('.period_unit_pay').focus()
			})
			.catch(err => {
			})
		return false
	}
	return true
}

myself.onContractChangeSuccess = function(responsText) {
	var json = JSON.parse(responsText)
	var row_id = ''
	
	if (json.result != 'success') {
		utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
			.then(res => {
			})
			.catch(err => {
			})
		return
	}
	
	utils.alert('Saved.', 'SUCCESS', utils.ALERT_SUCCESS)
		.then(res => {
		})
		.catch(err => {
		})
	
	row_id = json.row_id
	var $tr = $('#' + row_id)
	
	if (myself.OriginContracts[row_id]['status'] != json.status || 0 == myself.OriginContracts[row_id]['contract_num']) {
		$tr.remove()
		delete myself.Contracts[row_id]
		delete myself.OriginContracts[row_id]
		
		return
	}
	
	myself.Contracts[row_id]['changed'] = false
	
	myself.OriginContracts[row_id] = utils.copyObject(myself.Contracts[row_id])
	
	$tr.removeClass('changed')
}

myself.onContractChangeFail = function() {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
		.then(res => {
		})
		.catch(err => {
		})
}

myself.onGetTeacherListSuccess = function(responseText) {
	var json = JSON.parse(responseText)
	
	if (json.result == 'success') {
		myself.showTeacherListPopup(json)
	} else {
		utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
			.then(res => {
			})
			.catch(err => {
			})
	}
	
	return true
}

myself.onGetTeacherListFail = function() {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
		.then(res => {
		})
		.catch(err => {
		})
	
	return true
}

myself.showTeacherListPopup = function(obj) {
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
		var $tr = $(event.target).closest('tr')
		var $children = $tr.children('td')
		$targetTeacherID.val($children[0].innerText)
		$targetTeacherName.val($children[1].innerText)
		
		myself.onChange($targetTeacherID)
		myself.onChange($targetTeacherName)
		
		$('#teacher_list_popup').css('display', 'none')
	})
}

myself.closeTeacherListPopup = function() {
	$('#teacher_list_popup').css('display', 'none')
}

myself.onNameKeyPress = function(e) {
	if (e.keyCode == 13) document.getElementById('search_form').submit()
}
