class AuthKeyHstBean {
  constructor (json) {
    if (undefined === json || null === json || 0 == Object.keys(json).length) {
      this.data = {
				hst_num: 0,
				user_id: '',
				auth_type: '',
				auth_key: 0,
				email: '',
				is_active: true,
				is_auth_key_verified: false,
				follow_up: '',
				is_follow_up_ended: null,
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
    return this.data.user_id
  }
  setUser_id (user_id) {
    this.data.user_id = user_id
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
	getHstNum () {
    return this.data.hst_num
  }
  setHst_num (hst_num) {
    this.data.hst_num = hst_num
  }
	getAuth_type() {
    return this.data.auth_type
  }
  setAuth_type(auth_type) {
    this.data.auth_type = auth_type
  }
	getAuth_key() {
    return this.data.auth_key
  }
  setAuth_key(auth_key) {
    this.data.auth_key = auth_key
  }
	getEmail() {
    return this.data.email
  }
  setEmail(email) {
    this.data.email = email
  }
	getIs_active() {
    return this.data.is_active
  }
  setIs_active(is_active) {
    this.data.is_active = is_active
  }
	getIs_auth_key_verified() {
    return this.data.is_auth_key_verified
  }
  setIs_auth_key_verified(is_auth_key_verified) {
    this.data.is_auth_key_verified = is_auth_key_verified
  }
	getFollow_up() {
    return this.data.follow_up
  }
  setFollow_up(follow_up) {
    this.data.follow_up = follow_up
  }
	getIs_follow_up_ended() {
    return this.data.is_follow_up_ended
  }
  setIs_follow_up_ended(is_follow_up_ended) {
    this.data.is_follow_up_ended = isgfollow_up_ended
  }
}

module.exports = AuthKeyHstBean
