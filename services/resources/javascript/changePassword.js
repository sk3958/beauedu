var myself = {}

myself.registerNewPasswd = function(form_id) {
	var form = document.getElementById(form_id)
	
	if (null === form || undefined === form) return false
	
	if (false === form instanceof HTMLFormElement) return false
	
	if (false === form.checkValidity()) {
		try {
			form.reportValidity()
		} catch (e) {
			utils.checkRequiredField(form_id)
		}
		
		return false
	}
  
  var element = document.querySelector('#user_id')
  var message = utils.checkID(element.value)
	if (null !== message) {
		utils.alert(message)
			.then(() => {
				element.focus()
				element.select()
			})
			.catch(() => {
			})

		return false
  }

	var new_passwd = document.getElementById('new_passwd').value
	var new_passwd2 = document.getElementById('new_passwd2').value
	var rtn = utils.checkPassword(new_passwd, new_passwd2)
	
	if (null !== rtn) {
		var elem
		if (1 === rtn.code) {
			elem = document.getElementById('new_passwd2')
		}
		else {
			elem = document.getElementById('new_passwd')
		}
		utils.alert(rtn.message)
			.then(() => {
				elem.focus()
				elem.select()
			})
			.catch(() => {
      })

		return false
	}
	
	ajax.ajaxRequest('POST', 'registerNewPasswd', utils.getJsonStringByFormData(form_id), myself.success, myself.error)
	
	return true
}

myself.success = function(responseText) {
	var json = JSON.parse(responseText)
	
  if (json.result == 'success') {
    utils.alert(json.message, 'SUCCESS', utils.ALERT_SUCCESS)
      .then(() => {
        location.href = json.url
      })
      .catch(() => {
      })
    
  } else {
    utils.alert(json.message, 'ERROR', utils.ALERT_ERROR)
  }
	
	return true
}

myself.error = function() {
	utils.alert('Error occured.', 'ERROR', utils.ALERT_ERROR)
	
	return true
}
