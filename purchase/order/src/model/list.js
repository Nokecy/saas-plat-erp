// 订单列表
export default class extends saasplat.model.base {
  schema = {
    code: saasplat.model.type.STRING,
    // 单据日期
    datetime: saasplat.model.type.DATE,

    // 供应商
    partner_id: saasplat.model.type.STRING,
    partner_name: saasplat.model.type.STRING,
    partner_shortname: saasplat.model.type.STRING,

    // 部门
    department_id: saasplat.model.type.STRING,
    department_name: saasplat.model.type.STRING,
    // 业务员
    employee_id: saasplat.model.type.STRING,
    employee_name: saasplat.model.type.STRING,
    // 项目
    project_id: saasplat.model.type.STRING,
    project_name: saasplat.model.type.STRING,
    // 预计到货日期
    arrival_datetime: saasplat.model.type.STRING,

    // 运输方式
    transportation: saasplat.model.type.STRING,
    // 到货地址
    shipping_address: saasplat.model.type.STRING,
    // 联系人
    constacts: saasplat.model.type.STRING,
    // 联系电话
    telephone_number: saasplat.model.type.STRING,

    // 合同号
    constract_no: saasplat.model.type.STRING,

    // 付款单id
    payment_id: saasplat.model.type.STRING,
    // 订金金额
    payment_amount: saasplat.model.type.DECIMAL(10, 8),

    // 销售订单号
    sales_order_id: saasplat.model.type.STRING,
    // 来源单据
    source_type: saasplat.model.type.STRING,
    // 来源单号
    source_id: saasplat.model.type.STRING,

    // 明细汇总
    // 总金额
    orig_total_amount: saasplat.model.type.DECIMAL(10, 8),
    // 含税总金额
    orig_total_tax_amount: saasplat.model.type.DECIMAL(10, 8),

    // 币种
    currency_id: saasplat.model.type.STRING,
    currency_name: saasplat.model.type.STRING,
    // 汇率
    exchange_rate: saasplat.model.type.STRING,
    // 本币总金额
    total_amount: saasplat.model.type.DECIMAL(10, 8),
    // 本币含税总金额
    total_tax_amount: saasplat.model.type.DECIMAL(10, 8),

    // 备注
    note: saasplat.model.type.STRING(2048),

    // 附件数
    attachment_count: saasplat.model.type.INTEGER,

    state: {
      type: saasplat.model.type.ENUM('created', 'submitted'),
      allowNull: false
    }
  }
}
