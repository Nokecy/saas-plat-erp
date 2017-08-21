// 订单明细表
export default class extends saasplat.model.base {
  schema = {
    // 单据id
    voucher_id: saasplat.model.type.INTEGER,
    // 单据编码
    voucher_code: saasplat.model.type.STRING,

    // 存货条码
    inventory_barcode_id: saasplat.model.type.STRING,
    inventory_barcode: saasplat.model.type.STRING,

    // 项目
    project_id: saasplat.model.type.STRING,
    project_name: saasplat.model.type.STRING,

    // 存货
    inventory_id: saasplat.model.type.STRING,
    inventory_code: saasplat.model.type.STRING,
    inventory_name: saasplat.model.type.STRING,
    inventory_shortname: saasplat.model.type.STRING,

    // 采购单位与对应的数量，支持多计量
    quantitys :  saasplat.model.type.STRING,

    // 供应商编码
    partner_id: saasplat.model.type.STRING,

    // 报价
    quoted_price: saasplat.model.type.STRING,

    // 折扣%
    discount_rate: saasplat.model.type.STRING,

    // 税率%
    tax_rate: saasplat.model.type.STRING,

    // 单价
    orig_price: saasplat.model.type.STRING,
    // 含税单价
    orig_tax_price: saasplat.model.type.STRING,
    // 金额
    orig_amount: saasplat.model.type.STRING,
    // 税额
    orig_tax: saasplat.model.type.STRING,
    // 含税金额
    orig_tax_amount: saasplat.model.type.STRING,
    // 折扣金额
    orig_discount_amount: saasplat.model.type.STRING,

    // 本币单价
    price: saasplat.model.type.STRING,
    // 本币含税单价
    tax_price: saasplat.model.type.STRING,
    // 本币金额
    amount: saasplat.model.type.STRING,
    // 本币税额
    tax: saasplat.model.type.STRING,
    // 本币含税金额
    tax_amount: saasplat.model.type.STRING,
    // 本币折扣金额
    discount_amount: saasplat.model.type.STRING,

    //预计到货日期
    arrival_datetime: saasplat.model.type.STRING,
    //赠品
    is_present: saasplat.model.type.STRING,

    // 销售订单号
    sales_order_id: saasplat.model.type.STRING,
    // 来源单据
    source_type: saasplat.model.type.STRING,
    // 来源单号
    source_id: saasplat.model.type.STRING,
  }
}
