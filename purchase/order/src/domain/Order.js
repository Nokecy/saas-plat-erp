
export default class   extends saasplat.aggregate {
  // 单据编号
  code;
  // 单据日期
  datetime;

  // 供应商
  partner_code;
  // 部门
  department_code;
  // 业务员
  employee_code;
  // 项目
  project_code;
  // 预计到货日期
  arrival_datetime;

  // 币种
  currency_code;
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
  settlement_code;
  // 订金金额 付款单号
  payment_code;

  // 销售订单号
  sales_order_code;
  // 来源单据
  source_type;
  // 来源单号
  source_code;

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

    // 默认业务日期
    if (!datetime || saasplat.moment(datetime).invalid()) {
      const usersess = saasplat.service('usersession');
      if (usersess) {
        datetime = saasplat.moment(usersess.login_date).toDate();
      }
    }
    datetime = saasplat.moment(datetime).fromat('YYYY-MM-DD');

    // 自动编号
    if (!code) {
      const coder = saasplat.service('coder');
      if (coder && coder.canCode(this.__module)) {
        code = coder.create(tihs.__module, {
          type_code: 'PO',
          datetime,
          partner_code: partner.code,
          department_code: department.code,
          employee_code: employee.code,
          project_code: project.code,
        });
      }
    }

    order.raiseEvent('created', {
      code,
      datetime,
      ...other,
      partner_code: partner.code,
      department_code: department.code,
      employee_code: employee.code,
      project_code: project.code,
      currency_code: currency.code,
      settlement_code: settlement.code,
      payment_code: payment.code,
      sales_order_code: sales_order.code,
      source_code: source.code,
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
    if (this.code && code) {
      throw Error(this.t('订单编号不允许修改'));
    }
    if (!this.code && !code) {
      throw Error(this.t('订单编号不能为空'));
    }
    if (!datetime) {
      throw Error(this.t('订单日期不能为空'));
    }
    const mdate = saasplat.moment(datetime || this.datetime);
    if (mdate.invalid()) {
      throw Error(this.t('订单日期无效'));
    }
    if (!partner && !this.partner_code) {
      throw Error(this.t('供应商不能为空'));
    }
    if ((!details || !details.length) && (!this.details || !this.details.length)) {
      throw Error(this.t('订单明细不能为空'));
    }
    // todo 当采购订单日期小于启用日期或是已期末处理的会计期间日期时，不允许在采购订单上录入、修改订金。

    this.raiseEvent('saved', {
      code,
      datetime: mdate.format('YYYY-MM-DD'),
      ...other,
      partner_code: partner.code || this.partner_code,
      department_code: department.code || this.department_code,
      employee_code: employee.code || this.employee_code,
      project_code: project.code || this.project_code,
      currency_code: currency.code || this.currency_code,
      settlement_code: settlement.code || this.settlement_code,
      payment_code: payment.code || this.payment_code,
      sales_order_code: sales_order.code || this.sales_order_code,
      source_code: source.code || this.source_code,
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
    this.raiseEvent('submited', {
      code: this.code
    });
  }

  // 变更
  change() {

  }

  // ************* events *************

  created({ state, ...other }) {
    for (cont key in other) {
      this[key] = other[key];
    }
    this.state = 0;
  }

  saved({ state, ...other }) {
    for (cont key in other) {
      this[key] = other[key];
    }
    this.state = 1;
  }

  submited() {
    this.state = 2;
  }
}
