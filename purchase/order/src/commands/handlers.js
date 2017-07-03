const getDatetime = (datetime) => {
  // 默认业务日期
  if (!datetime || saasplat.moment(datetime).invalid()) {
    const usersess = saasplat.service('usersession');
    if (usersess) {
      datetime = saasplat.moment(usersess.login_date).toDate();
    }
  }
  datetime = saasplat.moment(datetime).fromat('YYYY-MM-DD');
  return datetime;
}

const genCode = (datetime, partner, department, employee, project) => {
  // 自动编号
  const coder = saasplat.service('coder');
  if (coder && coder.canCode(this.__module)) {
    return coder.create(tihs.__module, {
      type_code: 'PO',
      datetime,
      partner_id: partner.id,
      department_id: department.id,
      employee_id: employee.id,
      project_id: project.id
    });
  }
  return null;
}

export default class extends saasplat.commandhandler {
  async create({
    id,
    datetime,
    partner_id,
    department_id,
    employee_id,
    project_id,
    currency_id,
    settlement_id,
    payment_id,
    sales_order_id,
    source_id,
    source_type,
    details
    ...other
  }) {
    await this.repository.use(async() => {
      const partner = partner_id && await this.getRepository(
          'saas-plat-erp-base-partner/partner').get(partner_id),
        department = department_id && await this.getRepository(
          'saas-plat-erp-base-department/department').get(
          department_id),
        employee = employee_id && await this.getRepository(
          'saas-plat-erp-base-employee/employee').get(employee_id),
        project = project_id && await this.getRepository(
          'saas-plat-erp-base-project/project').get(project_id),
        sales_order = sales_order_id && await this.getRepository(
          'saas-plat-erp-sales-order/order').get(sales_order_id),
        currency = currency_id && await this.getRepository(
          'saas-plat-erp-arap-currency/currency').get(currency_id),
        settlement = settlement_id && await this.getRepository(
          'saas-plat-erp-arap-settlement/settlement').get(
          settlement_id),
        payment = payment_id && await this.getRepository(
          'saas-plat-erp-arap-payment/payment').get(payment_id),
        source = source_id && source_type && await this.getRepository(
          source_type).get(source_id);
      let order_details;
      if (Array.isArray(details)) {
        order_details = details.map(it =>
          new this.model('order_detail')(it));
      }
      datetime = getDatetime(datetime);
      const order = this.getAggregate('order').create({
        code: genCode(datetime, partner,
          department, employee, project),
        datetime,
        ...other,
        partner,
        department,
        employee,
        project,
        currency,
        settlement,
        payment,
        sales_order,
        source,
        order_details
      });
      await this.repository.save(order);
      await this.repository.commit();
      return order.id;
    });
  }

  // 从请购单新建采购订单
  async createByRequistion({
    datetime,
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
      const partner = requisition.partner_id && await this.getRepository(
          'saas-plat-erp-base-partner/partner').get(requisition.partner_id),
        department = requisition.department_id && await this.getRepository(
          'saas-plat-erp-base-department/department').get(requisition.department_id),
        employee = requisition.employee_id && await this.getRepository(
          'saas-plat-erp-base-employee/employee').get(requisition.employee_id),
        project = requisition.project_id && await this.getRepository(
          'saas-plat-erp-base-project/project').get(requisition.project_id),
        sales_order = requisition.sales_order_id && await this.getRepository(
          'saas-plat-erp-sales-order/order').get(requisition.sales_order_id);

      // 请购单存货
      const details = requisition.details.filter(it =>
        selecteds.indexOf(it.code) > -1).map(it => {
        return new this.getAggregate('order_detail')({
          inventory: await this.getRepository(
            'saas-plat-erp-base-inventory/inventory').get(
            it.inventory_id)
        });
      });

      datetime = getDatetime(datetime);

      const order = this.getAggregate('order').create({
        code: genCode(datetime, partner,
          department, employee, project),
        datetime,
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

  async save({
    id,
    datetime,
    partner_id,
    department_id,
    employee_id,
    project_id,
    currency_id,
    settlement_id,
    payment_id,
    sales_order_id,
    source_id,
    source_type,
    details,
    ...other
  }) {
    await this.repository.use(async() => {
      const partner = partner_id && await this.getRepository(
          'saas-plat-erp-base-partner/partner').get(partner_id),
        department = department_id && await this.getRepository(
          'saas-plat-erp-base-department/department').get(
          department_id),
        employee = employee_id && await this.getRepository(
          'saas-plat-erp-base-employee/employee').get(employee_id),
        project = project_id && await this.getRepository(
          'saas-plat-erp-base-project/project').get(project_id),
        sales_order = sales_order_id && await this.getRepository(
          'saas-plat-erp-sales-order/order').get(sales_order_id),
        currency = currency_id && await this.getRepository(
          'saas-plat-erp-arap-currency/currency').get(currency_id),
        settlement = settlement_id && await this.getRepository(
          'saas-plat-erp-arap-settlement/settlement').get(
          settlement_id),
        payment = payment_id && await this.getRepository(
          'saas-plat-erp-arap-payment/payment').get(payment_id),
        source = source_id && source_type && await this.getRepository(
          source_type).get(source_id),
        order_details = Array.isArray(details) ? details.map(it =>
          new this.model('order_detail')(it)) : [];
      const datetime = getDatetime(datetime);
      const order = await this.getRepository('order').get(id);
      order.save({
        ...other,
        code: genCode(datetime, partner,
          department, employee, project),
        datetime,
        partner,
        department,
        employee,
        project,
        currency,
        settlement,
        payment,
        sales_order,
        source,
        details: order_details
      });
      await this.repository.save(order);
      await this.repository.commit();
    });
  }

  async saveByPartner({ id, datetime }) {
    await this.repository.use(async() => {
      const partner = partner_id && await this.getRepository(
          'saas-plat-erp-base-partner/partner').get(partner_id),
        department = department_id && await this.getRepository(
          'saas-plat-erp-base-department/department').get(
          department_id),
        employee = employee_id && await this.getRepository(
          'saas-plat-erp-base-employee/employee').get(employee_id),
        project = project_id && await this.getRepository(
          'saas-plat-erp-base-project/project').get(project_id),
        sales_order = sales_order_id && await this.getRepository(
          'saas-plat-erp-sales-order/order').get(sales_order_id),
        currency = currency_id && await this.getRepository(
          'saas-plat-erp-arap-currency/currency').get(currency_id),
        settlement = settlement_id && await this.getRepository(
          'saas-plat-erp-arap-settlement/settlement').get(
          settlement_id),
        payment = payment_id && await this.getRepository(
          'saas-plat-erp-arap-payment/payment').get(payment_id),
        source = source_id && source_type && await this.getRepository(
          source_type).get(source_id),
        order_details = Array.isArray(details) ? details.map(it =>
          new this.model('order_detail')(it)) : [];

      // 当前订单只保留第一个供应商，其他供应商创建新单据
      datetime = getDatetime(datetime);
      const partners = saasplat.uniq(order_details.map(it => it.partner_id));
      partners.forEach((it, i) => {
        if (i === 0) {
          const order = await this.getRepository('order').get(id);
          order.save({
            ...other,
            code: genCode(datetime, partner,
              department, employee, project),
            datetime,
            partner,
            department,
            employee,
            project,
            currency,
            settlement,
            payment,
            sales_order,
            source,
            details: order_details.filter(di => di.partner_id ===
              it)
          });
          await this.repository.save(order);
        } else {
          this.create({
            ...other,
            datetime,
            partner: (await this.getRepository(
              'saas-plat-erp-base-partner/partner').get(
              it)),
            department,
            employee,
            project,
            currency,
            // settlement,
            // payment,
            sales_order,
            source,
            details: order_details.filter(di => di.partner_id ===
              it)
          });
        }
      });
      await this.repository.commit();
    });
  }
}
