class UserBean {
  constructor (json) {
    if (undefined === json || null === json || 0 == Object.keys(json).length) {
      this.data = {
      user_id: '',
      user_name: '',
      user_kind: '',
      user_passwd: '',
	    audit_time: '',
	    create_time: ''
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
  
  getUser_id () {
    return this.data.user_id;
  }
  setUser_id (user_id) {
    this.data.user_id = user_id;
  }
  getUser_name () {
    return this.data.user_name;
  }
  setUser_name (user_name) {
    this.data.user_name = user_name;
  }
  getUser_kind () {
    return this.data.user_kind;
  }
  setUser_kind (user_kind) {
    this.data.user_kind = user_kind;
  }
  getUser_passwd () {
    return this.data.user_passwd;
  }
  setUser_passwd (user_passwd) {
    this.data.user_passwd = user_passwd;
  }
  getAudit_time () {
    return this.data.audit_time;
  }
  setAudit_time (audit_time) {
    this.data.audit_time = audit_time;
  }
  getCreate_time () {
    return this.data.create_time;
  }
  setCreate_time (create_time) {
    this.data.create_time = create_time;
  }
}

module.exports = UserBean
