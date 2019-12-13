class CommCdDtlBean {
  constructor (json) {
    if (undefined === json || null === json || 0 == Object.keys(json).length) {
      this.data = {
	    comm_cd_id: '',
	    comm_cd_val: '',
	    comm_cd_val_nm: '',
	    audit_time: '',
	    create_time: '',
	    select_order: 0,
	    is_for_ui: ''
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

  getComm_cd_id () {
    return this.data.comm_cd_id
  }
  setComm_cd_id (comm_cd_id) {
    this.data.comm_cd_id = comm_cd_id
  }
  getComm_cd_val () {
    return this.data.comm_cd_val
  }
  setComm_cd_val (comm_cd_val) {
    this.data.comm_cd_val = comm_cd_val
  }
  getComm_cd_val_nm () {
    return this.data.comm_cd_val_nm
  }
  setComm_cd_val_nm (comm_cd_val_nm) {
    this.data.comm_cd_val_nm = comm_cd_val_nm
  }
  getAudit_time () {
    return this.data.audit_time
  }
  setAudit_time (audit_time) {
    this.data.audit_time = audit_time
  }
  getCreate_time () {
    return this.data.create_time
  }
  setCreate_time (create_time) {
    this.data.create_time = create_time
  }
  getSelect_order () {
    return this.data.select_order
  }
  setSelect_order (select_order) {
    this.data.select_order = select_order
  }
  getIs_for_ui  () {
    return this.data.is_for_ui
  }
  setIs_for_ui (is_for_ui) {
    this.data.is_for_ui = is_for_ui
  }
}

module.exports = CommCdDtlBean

