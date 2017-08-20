// 单据列表数据统计
export default class extends saasplat.eventhandler {
  async createOrUpdate({
    id,
    ...other
  }) {
    // 简单按照单据维度创建一个列表
    const Model = this.model('list');
    const model = await Model.findById(id);
    if (!model) {
      model = await Model.create({
        id,
        ...other
      });
    } else {
      await model.update(other);
    }
  }

  async created(voucher) {
    await this.createOrUpdate({
      ...voucher,
      state: 'created'
    });
  }

  async saved(voucher) {
    // 保存和变更不触发状态改变
    await this.createOrUpdate(voucher);
  }

  async changed(voucher) {
    await this.createOrUpdate(voucher);
  }

  async submited({id}) {
    await this.createOrUpdate({id, state: 'submited'});
  }

  async canceled({id}) {
    await this.createOrUpdate({id, state: 'created'});
  }
}
