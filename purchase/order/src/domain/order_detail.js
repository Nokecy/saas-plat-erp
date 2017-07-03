export default class {
  // 存货条码
  inventory_barcode_id;

  // 存货
  inventory_id;

  // 供应商编码
  partner_id;


  // 数量
  quantity;

  // 报价
  quoted_price;

  // 折扣%
  discount_rate;

  // 折扣价
  discount_price;

  // 单价
  price;

  // 含税单价
  tax_price;

  // 税率%
  tax_rate;

  // 金额
  amount;

  // 含税金额
  tax_amount;

  // 折扣金额
  discount_amount;

  constructor(obj) {
    for (cont key in obj) {
      this[key] = obj[key];
    }
  }
}
