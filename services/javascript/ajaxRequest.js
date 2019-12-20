var ajax = {}

ajax.AjaxObjects = []
const TIME_FOR_REVOKE_OBJECT = 180 * 1000

ajax.ajaxRequest = function(method, url, data, success, fail, showProgress = false, isFileDownload = false, fileName = '') {
	var xhr = new XMLHttpRequest()
	xhr.open(method, url)
	if ('registerReport' != url) {
		xhr.setRequestHeader('Content-type', 'application/json')
	}
	
	if (isFileDownload) {
		xhr.responseType = 'blob'
	}
	
	xhr.send(data)
	
	var obj = {}
	obj['xhr'] = xhr
	obj['success'] = success
	obj['fail'] = fail
	obj['isFileDownload'] = isFileDownload
	obj['fileName'] = fileName
	ajax.AjaxObjects.push(obj)
	
	xhr.onreadystatechange = ajax.onAjaxReadyStatusChange
	
	if (showProgress)
	{
		ajax.setProgressbar()
		
		xhr.upload.onprogress = ajax.ajaxProgress
	}
	
	return true
}

ajax.setProgressbar = function() {
	var progress = document.querySelector('#progress')
	var progress_container
		
	if (undefined == progress || null == progress) {
		progress_container = document.createElement('div')
		progress_container.id = 'progress_container'
			
		progress = document.createElement('div')
		progress.id = 'progress'
			
		progress_container.appendChild(progress)
		document.body.appendChild(progress_container)
	}
		
	progress = document.querySelector('#progress')
	progress_container = document.querySelector('#progress_container')
	progress_container.style.display = 'block'
	progress_container.style.width = '40%'
	progress_container.style.height = '30px'
	progress_container.style.position = 'absolute'
	progress_container.style.zIndex = '100'
	progress_container.style.left = '30%'
	progress_container.style.top = '50%'
	progress_container.style.backgroundcolor = '#787878'
	
	progress.style.width = '1%'
}

ajax.ajaxProgress = function(e) {
	var progress = document.querySelector('#progress')
	progress.style.width = '' + ((e.loaded / e.total) * 100) + '%'
}

ajax.onAjaxReadyStatusChange = function(e) {
	var xhr = e.currentTarget
	
	if (xhr.readyState !== XMLHttpRequest.DONE) return

	var index = -1
	var callback = null
	
	for (let i = 0; i < ajax.AjaxObjects.length; i++) {
		if (ajax.AjaxObjects[i]['xhr'] == xhr) {
			callback = ajax.AjaxObjects[i]
			index = i
			break
		}
	}
	
	if (0 <= index) {
		if (xhr.status === 200) {
			if (callback['isFileDownload']) {
				ajax.setBrowserFileDownload(xhr.response, callback['fileName'])
			} else {
				callback['success'](xhr.responseText)
			}
		} else {
			callback['fail']()
		}
		
		ajax.AjaxObjects.splice(index, 1)
		
		var progress_container = document.querySelector('#progress_container')
		if (undefined != progress_container && null != progress_container) {
			progress_container.style.display = 'none'
		}
	}
}

ajax.setBrowserFileDownload = function(blob, fileName) {
	var downUrl = window.URL.createObjectURL(blob)
	var downLink = document.createElement('a')
	downLink.style.left = -1
	downLink.style.top = -1
	downLink.setAttribute('href', downUrl)
	downLink.setAttribute('download', fileName)
	document.body.appendChild(downLink)
	downLink.click()
	
	setTimeout(function (urlObject = downUrl, linkObjcet = downLink) {
		window.URL.revokeObjectUrl(urlObject)
		document.body.removeChild(linkObjcet)
	}, TIME_FOR_REVOKE_OBJECT)
}

