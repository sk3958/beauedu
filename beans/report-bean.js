class ReportBean {
  constructor (json) {
    if (undefined === json || null === json || 0 == Object.keys(json).length) {
      this.data = {
        report_num: 0,
        user_id: '',
        user_name: '',
        create_time: '',
        report_type: '',
        report_title: '',
        report_text: '',
        file_num: 0,
        file_nums: '',
        file_name: '',
        file_names: 0,
        comment: '',
        file_data: [],
				audit_id: '',
				comment: ''
      }
    } else {
        this.data = json
    }
  }
	
	getData () {
    return this.data
  }

  setData (data) {
    this.data = data
  }
	
	getReport_num () {
		return this.data.report_num
	}
	setReport_num (report_num) {
		this.data.report_num = report_num
	}
	getUser_id () {
		return this.data.user_id
	}
	setUser_id (user_id) {
		this.data.user_id = user_id
	}
	getUser_name () {
		return this.data.user_name
	}
	setUser_name (user_name) {
		this.data.user_name = user_name
	}
	getCreate_time () {
		return this.data.create_time
	}
	setCreate_time (create_time) {
		this.data.create_time = create_time
	}
	getReport_type () {
		return this.data.report_type
	}
	setReport_type (report_type) {
		this.data.report_type = report_type
	}
	getReport_title () {
		return this.data.report_title
	}
	setReport_title (report_title) {
		this.data.report_title = report_title
	}
	getReport_text () {
		return this.data.report_text
	}
	setReport_text (report_text) {
		this.data.report_text = report_text
  }
  getFile_num () {
		return this.data.file_num
	}
	setFile_num (file_num) {
		this.data.file_num = file_num
  }
  getFile_nums () {
		return this.data.file_nums
	}
	setFile_nums (file_nums) {
		this.data.file_nums = file_nums
	}
	getFile_name () {
		return this.data.file_name
	}
	setFile_name (file_name) {
		this.data.file_name = file_name
  }
  getFile_names () {
		return this.data.file_names
	}
	setFile_names (file_names) {
		this.data.file_names = file_names
  }
  getComment () {
    return this.data.comment
  }
  setComment (comment) {
    this.data.comment = comment
  }
	getFile_data () {
		return this.data.file_data
	}
	setFile_data (file_data) {
		this.data.file_data = file_data
	}
	getAudit_id () {
		return this.data.audit_id
	}
	setAudit_id (audit_id) {
		this.data.audit_id = audit_id
	}
	getComment () {
		return this.data.comment
	}
	setComment (comment) {
		this.data.comment = comment
	}
}

module.exports = ReportBean
