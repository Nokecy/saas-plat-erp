export default class extends saasplat.aggregate {

  // 订单编号
  code;

  // 单据日期
  datetime;

  // 供应商
  partner_id;
  // 部门
  department_id;
  // 业务员
  employee_id;
  // 项目
  project_id;
  // 预计到货日期
  arrival_datetime;

  // 币种
  currency_id;
  // 汇率
  exchange_rate;

  // 运输方式
  transportation;
  // 到货地址
  shipping_address;
  // 联系人
  contacts;
  // 联系电话
  telephone_number;

  // 合同号
  contract_no;

  // 结算方式
  settlement_id;
  // 订金金额 付款单号
  payment_id;

  // 销售订单号
  sales_order_id;
  // 来源单据
  source_type;
  // 来源单号
  source_id;

  // 明细
  details = [];

  // 状态
  state;

  static create({
    id,
    code,
    datetime,
    partner,
    department = {},
    employee = {},
    project = {},
    currency = {},
    settlement = {},
    payment = {},
    sales_order = {},
    source = {},
    details = [],
    ...other
  }) {
    const order = new Order(id);

    order.raiseEvent('created', {
      id,
      code,
      datetime,
      ...other,
      partner_id: partner.id,
      department_id: department.id,
      employee_id: employee.id,
      project_id: project.id,
      currency_id: currency.id,
      settlement_id: settlement.id,
      payment_id: payment.id,
      sales_order_id: sales_order.id,
      source_id: source.id,
      details
    });
    return order;
  }

  save({
    code,
    datetime,
    partner,
    department = {},
    employee = {},
    project = {},
    currency = {},
    settlement = {},
    payment = {},
    sales_order = {},
    source = {},
    details = [],
    ...other
  }) {
    if (this.state !== 0 && this.state !== 1) {
      throw Error(this.t('订单已审核无法修改'));
    }
    if (!code) {
      throw Error(this.t('订单编号不能为空'));
    }
    if (!datetime) {
      throw Error(this.t('订单日期不能为空'));
    }
    const mdate = saasplat.moment(datetime || this.datetime);
    if (mdate.invalid()) {
      throw Error(this.t('订单日期无效'));
    }
    if (!partner && !this.partner_id) {
      throw Error(this.t('供应商不能为空'));
    }
    if ((!details || !details.length) && (!this.details || !this.details.length)) {
      throw Error(this.t('订单明细不能为空'));
    }
    // todo 当采购订单日期小于启用日期或是已期末处理的会计期间日期时，不允许在采购订单上录入、修改订金。

    this.raiseEvent('saved', {
      id: this.id,
      code,
      datetime: mdate.format('YYYY-MM-DD'),
      ...other,
      partner_id: partner.id || this.partner_id,
      department_id: department.id || this.department_id,
      employee_id: employee.id || this.employee_id,
      project_id: project.id || this.project_id,
      currency_id: currency.id || this.currency_id,
      settlement_id: settlement.id || this.settlement_id,
      payment_id: payment.id || this.payment_id,
      sales_order_id: sales_order.id || this.sales_order_id,
      source_id: source.id || this.source_id,
      details: details || this.details
    });
  }

  // 提交
  submit() {
    this.raiseEvent('submited', {
      ...this
    });
  }

  // 取消提交
  cancel() {
    this.raiseEvent('submited', { id: this.id });
  }

  // 变更
  change() {}

  // ************* events *************

  created({
    state,
    ...other
  }) {
    for (cont key in other) {
      this[key] = other[key];
    }
    this.state = 0;
  }

  saved({
    state,
    ...other
  }) {
    for (cont key in other) {
      this[key] = other[key];
    }
    this.state = 1;
  }

  submited() {
    this.state = 2;
  }
}
