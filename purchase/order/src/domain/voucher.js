class Settlement {
  // 结算方式id
  id,
  // 账户
  account,
  // 金额
  money,
  // 票据号
  bill_number
}

class Attachment {
  file_id;
  // 显示文件名
  name;
  // 上传日期
  datetime;
  // 上传人
  uploader_id;
  // created deleted
  status;
}

class UnitQuantity {
  // 单位
  unit_id;
  // 数量
  quantity;
  // 换算率
  exchange_rate;
  // 是否是主计量单位
  is_main;
}

class Detail {
  // 存货条码
  inventory_barcode_id;

  // 项目
  project_id;

  // 存货
  inventory_id;

  // 采购单位与对应的数量，支持多计量
  quantitys = [];

  // 供应商编码
  partner_id;

  // 报价
  quoted_price;

  // 折扣%
  discount_rate;

  // 税率%
  tax_rate;

  // 单价
  orig_price;
  // 含税单价
  orig_tax_price;
  // 金额
  orig_amount;
  // 税额
  orig_tax;
  // 含税金额
  orig_tax_amount;
  // 折扣金额
  orig_discount_amount;

  // 本币单价
  price;
  // 本币含税单价
  tax_price;
  // 本币金额
  amount;
  // 本币税额
  tax;
  // 本币含税金额
  tax_amount;
  // 本币折扣金额
  discount_amount;

  //预计到货日期
  arrival_datetime;
  //赠品
  is_present;

  // 销售订单号
  sales_order_id;
  // 来源单据
  source_type;
  // 来源单号
  source_id;

  constructor(obj) {
    for (cont key in obj) {
      this[key] = obj[key];
    }
  }
}

export default class Voucher extends saasplat.aggregate {
  // 单据编号，所有对象都有
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
  constacts;
  // 联系电话
  telephone_number;

  // 合同号
  constract_no;

  // 结算方式 & 订金金额
  settlements = [];
  //  付款单号
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
  // 制单人
  maker_id;
  // 审核人
  auditor_id;
  // 变更人
  changer_id;
  // 取消人
  canceler_id;

  // 单据附件
  attachments = [];

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
    const order = new this(id);
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
    if (datetime) {
      const mdate = saasplat.moment(datetime);
      if (mdate.invalid()) {
        throw Error(this.t('订单日期无效'));
      }
    }
    // todo 当采购订单日期小于启用日期或是已期末处理的会计期间日期时，不允许在采购订单上录入、修改订金。

    this.raiseEvent('saved', {
      id: this.id,
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
      details: details
    });
  }

  // 提交
  submit() {
    if (this.state !== 1 && this.state !== 0) {
      throw Error(this.t('订单已审核无法修改'));
    }
    if (!this.code) {
      throw Error(this.t('订单编号不能为空'));
    }
    if (!this.datetime) {
      throw Error(this.t('订单日期不能为空'));
    }
    const mdate = saasplat.moment(this.datetime);
    if (mdate.invalid()) {
      throw Error(this.t('订单日期无效'));
    }
    if (!this.partner) {
      throw Error(this.t('供应商不能为空'));
    }
    if (!this.details || !this.details.length) {
      throw Error(this.t('订单明细不能为空'));
    }
    this.raiseEvent('submited', { id: this.id });
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
    details,
    note,
    ...other
  }) {
    // - ‘备注’可变更。
    // - 明细：对已后续执行的行只可修改数量，修改后的量应大于后续执行量中的最小值；
    // 对由来源单生成但未后续执行的行，除来源带入的字段不可改，其它不控制。
    if (Object.keys(other).length > 0) {
      throw Error(this.t('对已后续执行的行只可修改数量和备注字段'));
    }
    this.raiseEvent('changed', {
      id: this.id,
      note
    });
  }

  // ************* events *************

  created({
    state, // 排除state
    ...other
  }) {
    for (const key in other) {
      this[key] = other[key];
    }
    this.state = 0;
  }

  saved({
    state,
    ...other
  }) {
    for (const key in other) {
      this[key] = other[key];
    }
    this.state = 1;
  }

  changed({ note, changer_id }) {
    if (note !== undefined) {
      this.note = note;
    }
    this.changer_id = changer_id;
  }

  submited({ auditor_id }) {
    this.auditor_id = auditor_id;
    this.state = 2;
  }

  canceled({ canceler_id }) {
    this.canceler_id = canceler_id;
    this.state = 1;
  }
}
