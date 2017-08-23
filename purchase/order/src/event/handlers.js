// 单据数据列表
export default class extends saasplat.eventhandler {
  async createOrUpdate({
    id,
    settlements = [],
    details = [],
    details_deleted = [],
    attachments = [],
    attachments_deleted = [],
    ...other
  }) {
    // 简单按照单据维度创建一个列表
    const Model = this.model('list');
    const DetailModel = this.model('detail');
    const AttachmentModel = this.model('attachment');

    // 更新订单列表
    let model = await Model.findById(id);
    if (!model) {
      model = await Model.create({
        id,
        payment_amount: saasplat.sum(settlements, 'amount'),
        ...other
      });
    } else {
      await model.update(other);
    }
    // 删除
    for (const detail of details_deleted) {
      let dmodel = await DetailModel.findOne({
        where: {
          voucher_id: id,
          detail_id: detail.id
        }
      });
      if (dmodel) {
        await dmodel.destroy();
      }
    }
    // 新增或修改
    for (const detail of details) {
      const {
        quantitys,
        ...detial_other
      } = detail;
      let dmodel = await DetailModel.findOne({
        where: {
          voucher_id: id,
          detail_id: detial_other.id
        }
      });
      if (!dmodel) {
        dmodel = await DetailModel.create({
          voucher_id: id,
          detail_id: detial_other.id,
          voucher_code: other.code,
          ...detial_other
        });
      } else {
        await dmodel.update({
          voucher_code: other.code,
          ...detial_other
        });
      }
    }
    // 删除
    for (const attach of attachments_deleted) {
      let attmodel = await AttachmentModel.findOne({
        where: {
          voucher_id: id,
          attach_id: attach.id
        }
      });
      if (attmodel) {
        await attmodel.destroy();
      }
    }
    // 新增或修改
    for (const attach of attachments) {
      let attmodel = await AttachmentModel.findOne({
        where: {
          voucher_id: id,
          attach_id: attach.id
        }
      });
      if (!attmodel) {
        attmodel = await AttachmentModel.create({
          attach_id: attach.id,
          voucher_id: id,
          ...attach
        });
      } else {
        await attmodel.update({
          ...attach
        });
      }
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
