export default class extends saasplat.commandhandler {
  async create() {
    await this.repository.use(async() => {
      const order = this.getAggregate('order').create({});
      await this.repository.save(order);
      await this.repository.commit();
    });
  }

  // 从请购单新建采购订单
  async createByRequistion({
    // 选中的来源单据对象
    requisition,
    // 选中的请购单明细列表
    selecteds
  }) {
    if (!requisition) {
      throw Error(this.t('选中的请购单不存在'));
    }
    if (!Array.isArray(selecteds) || selecteds.length <= 0) {
      throw Error(this.t('没有选中任何存货无法创建采购订单'));
    }

    await this.repository.use(async() => {
      // 参照请购单字段
      const partner = requisition.partner_code && await this.getRepository(
          'saas-plat-erp-base-partner/partner').get(requisition.partner_code),
        department = requisition.department_code && await this.getRepository(
          'saas-plat-erp-base-department/department').get(requisition.department_code),
        employee = requisition.employee_code && await this.getRepository(
          'saas-plat-erp-base-employee/employee').get(requisition.employee_code),
        project = requisition.project_code && await this.getRepository(
          'saas-plat-erp-base-project/project').get(requisition.project_code),
        sales_order = requisition.sales_order_code && await this.getRepository(
          'saas-plat-erp-sales-order/order').get(requisition.sales_order_code),

        // 请购单存货
        const details = requisition.details.filter(it =>
          selecteds.indexOf(it.code) > -1).map(it => {
          return new this.getAggregate('order_detail')({
            inventory: await this.getRepository(
              'saas-plat-erp-base-inventory/inventory').get(
              it.inventory_id)
          });
        });

      const order = this.getAggregate('order').create({
        details,
        partner,
        department,
        employee,
        project,
        sales_order,
        source: requisition,
      });

      await this.repository.save(order);
      await this.repository.commit();
    });
  }
}
