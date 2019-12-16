var BeauEdu = {}

const CONTRACT_STATUS_REQUESTED = '00'
const CONTRACT_STATUS_ON_GOING = '01'
const CONTRACT_STATUS_CHANGED = '02'
const CONTRACT_STATUS_ENDED = '03'
const CONTRACT_STATUS_CANCELED = '99'
const INET_CONNECTION_YES = '01'
const INET_CONNECTION_NO = '02'
const LEVEL_OF_EDUCATION_PRIMARY_SCHOOL = '01'
const LEVEL_OF_EDUCATION_MIDDLE_SCHOOL = '02'
const LEVEL_OF_EDUCATION_HIGH_SCHOOL = '03'
const LEVEL_OF_EDUCATION_COLLEGE = '04'
const LEVEL_OF_EDUCATION_UNIVERSITY = '05'
const LEVEL_OF_EDUCATION_GRADUATE_SCHOOL = '06'
const PERIOD_UNIT_DAY = 'DAY'
const PERIOD_UNIT_WEEK = 'WEEK'
const PERIOD_UNIT_MONTH = 'MONTH'
const PERIOD_UNIT_YEAR = 'YEAR'
const PERIOD_UNIT_TOTAL = 'TOTAL'
const REQUEST_STATUS_REQUESTED = '01'
const REQUEST_STATUS_CONTRACTED = '02'
const REQUEST_TYPE_FIND_TEACHER = '01'
const REQUEST_TYPE_FIND_STUDENT = '02'
const TEACHER_SPECIALITY_PATIENT = '01'
const TEACHER_SPECIALITY_HANDS_ON = '02'
const TEACHER_SPECIALITY_HEAVY_WORKLOAD = '03'
const TEACHER_SPECIALITY_LIGHT_WORKLOAD = '04'
const USER_KIND_STUDENT = '01'
const USER_KIND_TEACHER = '02'
const USER_KIND_PARTNER = '03'
const USER_KIND_ADMINISTRATOR = '99'
const REPORT_TYPE_STUDENT = '01'
const REPORT_TYPE_TEACHER = '02'

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

const ALERT_SUCCESS = 'success'
const ALERT_ERROR = 'error'
const ALERT_NOTIFY = 'notify'
const alertClass = {
	error: 'alert-error',
	success: 'alert-success',
	notify: 'alert-notify'
}

BeauEdu.bodyOnKeyPress = undefined

BeauEdu.arrangeTopMenu = function(userKind, fileName) {
}

BeauEdu.arrangeLeftMenu = function(userKind, fileName) {
	if (USER_KIND_ADMINISTRATOR == userKind) {
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

BeauEdu.getJsonStringByFormData = function (form_id) {
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

BeauEdu.checkRequiredField = function(form_id)
{
	var form = document.getElementById(form_id)
	
	if (null == form || undefined == form) return false
	
	if (false == form instanceof HTMLFormElement) return false
	
	for (let i = 0; i < form.length; i++) {
		if ('checkbox' == form[i].type || 'radio' == form[i].type) {
			continue
		}
		if (true == form[i].required && ('' == form[i].value || null == form[i].value || undefined == form[i].value)) {
			BeauEdu.alert(form[i].id.replace('\_', ' ').toUpperCase() + ' is required.')
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

BeauEdu.checkRequiredCheckbox = function(checkbox_name)
{
	var checkboxs = document.getElementsByName(checkbox_name)
	
	for (let i = 0; i < checkboxs.length; i++) {
		if (true == checkboxs[i].checked) {
			return true
		}
	}
	
	return false
}

BeauEdu.replaceNullString = function(form_id) {
	var form = document.getElementById(form_id)
	
	if (null == form || undefined == form) return false
	
	if (false == form instanceof HTMLFormElement) return false
	
	for (let i = 0; i < form.length; i++) {
		if ('null' == form[i].value) form[i].value = ''
	}
	
	return true
}

BeauEdu.checkID = function(user_id) {
	if (4 > user_id.trim().length) {
		return 'User ID must be over 4 characters.'
	}
	
	var str_match = user_id.trim().match(/[^a-zA-Z0-9]/)
	
	if (null != str_match) {
		return 'User ID must be consisted of alphabet and number.'
	}
	
	return null
}

BeauEdu.checkPassword = function(passwd, passwd2) {
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

BeauEdu.readOnlyInputKeyDown = function (e) {
	if (8 === e.keyCode)
	{
		e.preventDefault()
		return false
	}
	
	return true
}

BeauEdu.copyObject = function(obj) {
	if (obj === null || typeof(obj) !== 'object') return null
	
	var copy = obj.constructor()
	
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
	}
	
	return copy
}

BeauEdu.alertOnKeyPress = function(e) {
	var closeElement = document.querySelector('#alert_close')
	if (13 == e.keyCode) closeElement.click()
}

BeauEdu.alert = function(message, title = 'Notify', type = 'notify') {
	var container = document.querySelector('#alert_container')
	var formElement = document.querySelector('#alert_form')
	var titleElement = document.querySelector('#alert_title')
	var messageElement = document.querySelector('#alert_content')
	var closeElement = document.querySelector('#alert_close')

	BeauEdu.bodyOnKeyPress = document.body.onkeypress
	document.body.onkeypress = BeauEdu.alertOnKeyPress

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
				document.body.onkeypress = BeauEdu.bodyOnKeyPress
				BeauEdu.bodyOnKeyPress = undefined
				resolve(true)
			} catch(e) {
				reject(false)
			}
		}
		closeElement.focus()
	})
}

