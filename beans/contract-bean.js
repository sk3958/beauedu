class ContractBean {
  constructor (json) {
    if (undefined === json || null === json || 0 == Object.keys(json).length) {
      this.data = {
        contract_num: 0,
        request_num: 0,
        requester_id: '',
        requester_name: '',
        teacher_id: '',
        teacher_name: '',
        status: '',
        start_dt: '',
        end_dt: '',
        period_unit_class: '',
        class_times: 0,
        period_unit_pay: '',
        pay_times: 0,
        pay_amount: 0.0,
        create_time: '',
        audit_time: '',
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
  
  getContract_num () {
    return this.data.contract_num;
  }
  setRequest_num (request_num) {
    this.data.request_num = request_num;
  }
  getRequest_num () {
    return this.data.request_num;
  }
  setRequest_num (request_num) {
    this.data.request_num = request_num;
  }
  getRequester_id () {
    return this.data.requester_id;
  }
  setRequester_id (requester_id) {
    this.data.requester_id = requester_id;
  }
  getRequester_name () {
    return this.data.requester_name;
  }
  setRequester_name (requester_name) {
    this.data.requester_name = requester_name;
  }
  getTeacher_id () {
    return this.data.teacher_id;
  }
  setTeacher_id (teacher_id) {
    this.data.teacher_id = teacher_id;
  }
  getTeacher_name () {
    return this.data.teacher_name;
  }
  setTeacher_name (teacher_name) {
    this.data.teacher_name = teacher_name;
  }
  getStatus () {
    return this.data.status
  }
  setStatus (status) {
    this.data.status = status
  }
  getStart_dt () {
    return this.data.start_dt
  }
  setStart_dt (start_dt) {
    this.data.start_dt = start_dt
  }
  getEnd_dt () {
    return this.data.end_dt
  }
  setEnd_dt (end_dt) {
    this.data.end_dt = end_dt
  }
  getPeriod_unit_class () {
    return this.data.period_unit_class
  }
  setPeriod_unit_class (period_unit_class) {
    this.data.period_unit_class = period_unit_class
  }
  getClass_times () {
    return this.data.class_times
  }
  setClass_times (class_times) {
    this.data.class_times = class_times
  }
  getPeriod_unit_pay () {
    return this.data.period_unit_pay
  }
  setPeriod_unit_pay (period_unit_pay) {
    this.data.period_unit_pay = period_unit_pay
  }
  getPay_times () {
    return this.data.pay_times
  }
  setPay_times (pay_times) {
    this.data.pay_times = pay_times
  }
  getPay_amount () {
    return this.data.pay_amount
  }
  setPay_amount (pay_amount) {
    this.data.pay_amount = pay_amount
  }
  getCreate_time () {
    return this.data.create_time
  }
  setCreate_time (create_time) {
    this.data.create_time = create_time
  }
  getAudit_time () {
    return this.data.Audit_time;
  }
  setAudit_time (audit_time) {
    this.data.audit_time = audit_time;
  }
  getAudit_id () {
    return this.data.Audit_id;
  }
  setAudit_id (audit_id) {
    this.data.audit_id = audit_id;
  }
}

module.exports = ContractBean
  