class StudentProfileBean {
  constructor (json) {
    if (undefined === json || null === json || 0 == Object.keys(json).length) {
      this.data = {
        user_id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        location: '',
        education_level: '',
        email: '',
        goals: '',
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
  
  getUser_id() {
    return this.data.user_id
  }
  setUser_id(user_id) {
    this.data.user_id = user_id
  }
  getFirst_name() {
    return this.data.first_name
  }
  setFirst_name(first_name) {
    this.data.first_name = first_name
  }
  getMiddle_name() {
    return this.data.middle_name
  }
  setMiddle_name(middle_name) {
    this.data.middle_name = middle_name
  }
  getLast_name() {
    return this.data.last_name
  }
  setLast_name(last_name) {
    this.data.last_name = last_name
  }
  getLocation() {
    return this.data.location
  }
  setLocation(location) {
  this.data.location = location
  }
  getEducation_level() {
    return this.data.education_level
  }
  setEducation_level(education_level) {
    this.data.education_level = education_level
  }
  getEmail() {
    return this.data.email
  }
  setEmail(email) {
    this.data.email = email
  }
  getGoals() {
    return this.data.goals
  }
  setGoals(goals) {
    this.data.goals = goals
  }
  getAudit_time() {
    return this.data.audit_time
  }
  setAudit_time(audit_time) {
    this.data.audit_time = audit_time
  }
  getCreate_time() {
    return this.data.create_time
  }
  setCreate_time(create_time) {
    this.create_time = create_time
  }
}

module.exports = StudentProfileBean
