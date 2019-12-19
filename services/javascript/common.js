var utils = {}

utils.CONTRACT_STATUS_REQUESTED = '00'
utils.CONTRACT_STATUS_ON_GOING = '01'
utils.CONTRACT_STATUS_CHANGED = '02'
utils.CONTRACT_STATUS_ENDED = '03'
utils.CONTRACT_STATUS_CANCELED = '99'
utils.INET_CONNECTION_YES = '01'
utils.INET_CONNECTION_NO = '02'
utils.LEVEL_OF_EDUCATION_PRIMARY_SCHOOL = '01'
utils.LEVEL_OF_EDUCATION_MIDDLE_SCHOOL = '02'
utils.LEVEL_OF_EDUCATION_HIGH_SCHOOL = '03'
utils.LEVEL_OF_EDUCATION_COLLEGE = '04'
utils.LEVEL_OF_EDUCATION_UNIVERSITY = '05'
utils.LEVEL_OF_EDUCATION_GRADUATE_SCHOOL = '06'
utils.PERIOD_UNIT_DAY = 'DAY'
utils.PERIOD_UNIT_WEEK = 'WEEK'
utils.PERIOD_UNIT_MONTH = 'MONTH'
utils.PERIOD_UNIT_YEAR = 'YEAR'
utils.PERIOD_UNIT_TOTAL = 'TOTAL'
utils.REQUEST_STATUS_REQUESTED = '01'
utils.REQUEST_STATUS_CONTRACTED = '02'
utils.REQUEST_TYPE_FIND_TEACHER = '01'
utils.REQUEST_TYPE_FIND_STUDENT = '02'
utils.TEACHER_SPECIALITY_PATIENT = '01'
utils.TEACHER_SPECIALITY_HANDS_ON = '02'
utils.TEACHER_SPECIALITY_HEAVY_WORKLOAD = '03'
utils.TEACHER_SPECIALITY_LIGHT_WORKLOAD = '04'
utils.USER_KIND_STUDENT = '01'
utils.USER_KIND_TEACHER = '02'
utils.USER_KIND_PARTNER = '03'
utils.USER_KIND_ADMINISTRATOR = '99'
utils.REPORT_TYPE_STUDENT = '01'
utils.REPORT_TYPE_TEACHER = '02'

utils.LEN_AUTH_KEY = 6

const userMenu = {
	'01':'for_students',
	'02':'for_teachers',
	'99':'menu_tree'
}

const pageMenu = {
	'studentProfile.ejs': 'Student Application',
	'teacherProfile.ejs': 'Join Us',
	'findTeacher.ejs': 'Find a Teacher',
	'findStudent.ejs': 'Find Students',
	'report.ejs': 'Class Report',
	'error.ejs': ''
}

utils.ALERT_SUCCESS = 'success'
utils.ALERT_ERROR = 'error'
utils.ALERT_NOTIFY = 'notify'
const alertClass = {
	error: 'alert-error',
	success: 'alert-success',
	notify: 'alert-notify'
}

utils.bodyOnKeyPress = undefined

utils.arrangeTopMenu = function(userKind, fileName) {
}

utils.arrangeLeftMenu = function(userKind, fileName) {
	if (utils.USER_KIND_ADMINISTRATOR == userKind) {
		$('.menu-level-1').css('display', 'block')
	}
	
	var menu = document.getElementById(userMenu[userKind])
	menu.style.display = 'block'
	
	var children = menu.getElementsByClassName('tree-child')
	for (let i = 0; i < children.length; i++) {
		if (pageMenu[fileName] == children[i].innerText) {
			children[i].className = 'tree-child-select'
			break
		}
	}
}

utils.getJsonStringByFormData = function (form_id) {
	var form = document.getElementById(form_id)
	
	if (null == form || undefined == form) return '{}'
	
	if (false == form instanceof HTMLFormElement) return '{}'
	
	var obj = {}
	for (let i = 0; i < form.length; i++) {
		if (null == form[i].id || undefined == form[i].id) {
			continue
		}
		
		if ('BUTTON' == form[i].tagName) continue
		if ('A' == form[i].tagName) continue
		
		if ('checkbox' == form[i].type) {
			if (false == form[i].checked) continue
			
			if (null == obj[form[i].name] || undefined == obj[form[i].name]) {
				obj[form[i].name] = {}
				obj[form[i].name][form[i].id] = form[i].value
			} else {
				obj[form[i].name][form[i].id] = form[i].value
			}
		} else if ('radio' == form[i].type) {
			if (false == form[i].checked) continue
			
			obj[form[i].name] = form[i].value
		} else {
			obj[form[i].id] = form[i].value
		}
	}

	return JSON.stringify(obj)
}

utils.checkRequiredField = function(form_id)
{
	var form = document.getElementById(form_id)
	
	if (null == form || undefined == form) return false
	
	if (false == form instanceof HTMLFormElement) return false
	
	for (let i = 0; i < form.length; i++) {
		if ('checkbox' == form[i].type || 'radio' == form[i].type) {
			continue
		}
		if (true == form[i].required && ('' == form[i].value || null == form[i].value || undefined == form[i].value)) {
			utils.alert(form[i].id.replace('\_', ' ').toUpperCase() + ' is required.')
				.then(res => {
					form[i].focus()
				})
				.catch(err => {
				})
			
			return false
		}
	}
	
	return true
}

utils.checkRequiredCheckbox = function(checkbox_name)
{
	var checkboxs = document.getElementsByName(checkbox_name)
	
	for (let i = 0; i < checkboxs.length; i++) {
		if (true == checkboxs[i].checked) {
			return true
		}
	}
	
	return false
}

utils.replaceNullString = function(form_id) {
	var form = document.getElementById(form_id)
	
	if (null == form || undefined == form) return false
	
	if (false == form instanceof HTMLFormElement) return false
	
	for (let i = 0; i < form.length; i++) {
		if ('null' == form[i].value) form[i].value = ''
	}
	
	return true
}

utils.checkID = function(user_id) {
	if (4 > user_id.trim().length) {
		return 'User ID must be over 4 characters.'
	}
	
	var str_match = user_id.trim().match(/[^a-zA-Z0-9]/)
	
	if (null != str_match) {
		return 'User ID must be consisted of alphabet and number.'
	}
	
	return null
}

utils.checkPassword = function(passwd, passwd2) {
	if (passwd != passwd2) {
		return {
			message: 'Check password is different.',
			code: 1
		}
	}
	
	if (6 > passwd.length) {
		return {
			message: 'Password must be over 6 characters.',
			code: 2
		}
	}
	
	var str_match = passwd.match(/[^a-zA-Z0-9\{\}\[\]\/?.,:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/); //`
	
	if (null != str_match) {
		return {
			message: 'There is an invaild password character.(' + str_match[0] + ').',
			code: 3
		}
	}
	
	return null
}

utils.readOnlyInputKeyDown = function (e) {
	if (8 === e.keyCode)
	{
		e.preventDefault()
		return false
	}
	
	return true
}

utils.copyObject = function(obj) {
	if (obj === null || typeof(obj) !== 'object') return null
	
	var copy = obj.constructor()
	
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
	}
	
	return copy
}

utils.alertOnKeyPress = function(e) {
	var closeElement = document.querySelector('#alert_close')
	if (13 == e.keyCode) closeElement.click()
}

utils.alert = function(message, title = 'Notify', type = 'notify') {
	var container = document.querySelector('#alert_container')
	var formElement = document.querySelector('#alert_form')
	var titleElement = document.querySelector('#alert_title')
	var messageElement = document.querySelector('#alert_content')
	var closeElement = document.querySelector('#alert_close')

	utils.bodyOnKeyPress = document.body.onkeypress
	document.body.onkeypress = utils.alertOnKeyPress

	for (var attr in alertClass) {
		formElement.classList.remove(alertClass[attr])
	}
	var className = alertClass[type]
	formElement.classList.add(className)
	formElement.classList.toggle('alert')
	titleElement.innerText = title
	messageElement.innerText = message
	container.style.display = 'block'
	
	return new Promise(function(resolve, reject) {
		closeElement.onclick = function() {
			try {
				var container = document.querySelector('#alert_container')
				container.style.display = 'none'
				document.body.onkeypress = utils.bodyOnKeyPress
				utils.bodyOnKeyPress = undefined
				resolve(true)
			} catch(e) {
				reject(false)
			}
		}
		closeElement.focus()
	})
}

