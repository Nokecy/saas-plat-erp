
@saasplat.module('saas-plat-erp-purchase-order', 'order')
export default class OrderEvents extends saasplat.eventhandler{
  submited(){
    // 若订金金额不为空，则订单生效时，自动生成一张预付款单

  }

  changed(){
    // 当采购订单没有审核环节时，修改订单的订单日期、订单编号、供应商、部门、业务员、币种、汇率、及订金的金额、结算方式、账号名称、票据号完后，保存，对于生成的付款单要同时自动修改。
  }
}
