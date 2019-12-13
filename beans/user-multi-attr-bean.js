class UserMultiAttrBean {
  constructor (json) {
    if (undefined === json || null === json || 0 == Object.keys(json).length) {
      this.data = {
	    user_id: '',
	    comm_cd_id: '',
	    comm_cd_val: '',
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
  getComm_cd_id () {
    return this.data.comm_cd_id;
  }
  setComm_cd_id (comm_cd_id) {
    this.data.comm_cd_id = comm_cd_id;
  }
  getComm_cd_val () {
    return this.data.comm_cd_val;
  }
  setComm_cd_val (comm_cd_val) {
    this.data.comm_cd_val = comm_cd_val;
  }
  getCreate_time () {
    return this.data.create_time;
  }
  setCreate_time (create_time) {
    this.data.create_time = create_time;
  }
}

module.exports = UserMultiAttrBean
