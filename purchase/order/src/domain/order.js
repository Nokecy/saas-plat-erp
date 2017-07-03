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

  // 备注
  note;

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
      partner_id: partner && partner.id,
      department_id: department && department.id,
      employee_id: employee && employee.id,
      project_id: project && project.id,
      currency_id: currency && currency.id,
      settlement_id: settlement && settlement.id,
      payment_id: payment && payment.id,
      sales_order_id: sales_order && sales_order.id,
      source_id: source && source.id,
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
    if (!partner) {
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
      partner_id: partner && partner.id,
      department_id: department && department.id,
      employee_id: employee && employee.id,
      project_id: project && project.id,
      currency_id: currency && currency.id,
      settlement_id: settlement && settlement.id,
      payment_id: payment && payment.id,
      sales_order_id: sales_order && sales_order.id,
      source_id: source && source.id,
      details: details,
    });
  }

  // 折扣到指定金额
  discount(amount, calField = 'amount') {
    // 分摊规则：
    //   - 分摊到最后一笔用减法，将（整单折扣金额-已分摊金额合计）分摊到最后一条明细上。
    //   - 分摊后的原币折扣金额=原币折扣金额+分摊的折扣金额。

    this.raiseEvent('updated', {
      id: this.id,

    });
  }

  // 配比拆单
  matchBOM() {
    // 数量计算：在配比采购页面通过输入需要分解的产品及产品数量，系统自动按“产品数量*[需用数量/生产数量*（1+损耗率）]”
    // (说明：库存选项“领料数量的计算方式”为“ 需用数量”时，计算公式中不考虑损耗率；为“需用数量+损耗数量”时，材料计算公式中考虑损耗率。)
    // 计算该产品各零部件的数量，该数量是对应主计量单位的数量。

    this.raiseEvent('updated', {
      id: this.id,

    });
  }

  // 提交
  submit() {
    if (this.state !== 1) {
      throw Error(this.t('单据未保存无法提交'));
    }
    this.raiseEvent('submited', {
      id: this.id
    });
  }

  // 取消提交
  cancel() {
    if (this.state !== 2) {
      throw Error(this.t('单据提交无法取消'));
    }

    // 已结转不能取消

    this.raiseEvent('canceled', { id: this.id });
  }

  // 变更
  change({

  }) {
    // - ‘备注’可变更。
    // - 明细：对已后续执行的行只可修改数量，修改后的量应大于后续执行量中的最小值；对由来源单生成但未后续执行的行，除来源带入的字段不可改，其它不控制。
    this.raiseEvent('changed', { id: this.id });
  }

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

  updated(){

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

  changed(){
    
  }

  submited() {
    this.state = 2;
  }

  canceled() {
    this.state = 1;
  }
}
