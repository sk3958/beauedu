class UserRequestMstBean {
  constructor (json) {
    if (undefined === json || null === json || 0 == Object.keys(json).length) {
      this.data = {
        request_num: 0,
        request_type: '',  
        user_id: '',
        request_status: '',
        audit_id: ''
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
  
  getRequest_num () {
    return this.data.request_num;
  }
  setRequest_num (request_num) {
    this.data.request_num = request_num;
  }
  getRequest_type () {
    return this.data.request_type;
  }
  setRequest_type (request_type) {
    this.data.request_type = request_type;
  }
  getUser_id () {
    return this.data.user_id;
  }
  setUser_id (user_id) {
    this.data.user_id = user_id;
  }
  getRequest_status () {
    return this.data.request_status;
  }
  setRequest_type (request_status) {
    this.data.request_status = request_status;
  }
  getAudit_id () {
    return this.data.Audit_id;
  }
  setAudit_id (audit_id) {
    this.data.audit_id = audit_id;
  }
}

module.exports = UserRequestMstBean
  