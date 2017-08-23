import {name} from '../../package.json';

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
  const coder = saasplat.service('saas-plat-erp-coder');
  if (coder && coder.canCode(name)) {
    return coder.create(name, {
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
  // 新建订单，所有值都可以为空
  async create({
    code,
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
      const partner = partner_id && await this.getRepository('saas-plat-erp-partner/partner').get(partner_id),
        department = department_id && await this.getRepository('saas-plat-erp-department/department').get(department_id),
        employee = employee_id && await this.getRepository('saas-plat-erp-employee/employee').get(employee_id),
        project = project_id && await this.getRepository('saas-plat-erp-project/project').get(project_id),
        sales_order = sales_order_id && await this.getRepository('saas-plat-erp-sales-order/order').get(sales_order_id),
        currency = currency_id && await this.getRepository('saas-plat-erp-arap-currency/currency').get(currency_id),
        settlement = settlement_id && await this.getRepository('saas-plat-erp-arap-settlement/settlement').get(settlement_id),
        payment = payment_id && await this.getRepository('saas-plat-erp-arap-payment/payment').get(payment_id),
        source = source_id && source_type && await this.getRepository(source_type).get(source_id);
      datetime = getDatetime(datetime);
      const order = this.getAggregate().create({
        code: code || genCode(datetime, partner, department, employee, project),
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
        details
      });
      await this.saveAndCommit(order);
      await this.repository.commit();
      return order.id;
    });
  }

  // 删除数据
  async remove({id}) {}

  // 修改单据，审批后变更有条件限制
  async save({
    id,
    code,
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
    details,  // 新增无id， 修改有id
    details_deleted, // 删除id列表
    ...other
  }) {
    await this.repository.use(async() => {
      const order = await this.getRepository().get(id);
      if (order.state === 'submitted') {
        // 执行变更
        order.change({note: other.note, details});
      } else {
        const partner = partner_id && await this.getRepository('saas-plat-erp-partner/partner').get(partner_id),
          department = department_id && await this.getRepository('saas-plat-erp-department/department').get(department_id),
          employee = employee_id && await this.getRepository('saas-plat-erp-employee/employee').get(employee_id),
          project = project_id && await this.getRepository('saas-plat-erp-project/project').get(project_id),
          sales_order = sales_order_id && await this.getRepository('saas-plat-erp-sales-order/order').get(sales_order_id),
          currency = currency_id && await this.getRepository('saas-plat-erp-arap-currency/currency').get(currency_id),
          settlement = settlement_id && await this.getRepository('saas-plat-erp-arap-settlement/settlement').get(settlement_id),
          payment = payment_id && await this.getRepository('saas-plat-erp-arap-payment/payment').get(payment_id),
          source = source_id && source_type && await this.getRepository(source_type).get(source_id);
        datetime = getDatetime(datetime);
        order.save({
          ...other,
          code: code || genCode(datetime, partner, department, employee, project),
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
          details,
          details_deleted
        });
      }
      await this.saveAndCommit(order);
    });
  }

  async submit({id, wfName}) {
    const order = await this.getRepository().get(id);
    const wfs = await this.getWorkflowDefines();
    const wf = await this.getWorkflow(order.id);
    if (wf.isPassed || wfs.length === 0) {
      // 审批通过，或没有流程直接审批通过
      order.submit();
      await this.saveAndCommit(order);
    } else {
      // 多个流程需要wfName
      this.startWorkflow(order.id, wfName);
    }
  }

  async cancel({id}) {
    const order = await this.getRepository().get(id);
    const wf = await this.getWorkflow(order.id);
    if (wf) {
      // 如果有审批流取消
      await this.cancelWorkflow(order.id);
    }
    order.cancel();
    await this.saveAndCommit(order);
  }
}
