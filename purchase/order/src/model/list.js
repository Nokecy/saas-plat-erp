// 订单列表
export default class extends saasplat.model.base {
  schema = {
    state: {
      type: saasplat.model.type.ENUM('enable', 'disabled', 'error'),
      allowNull: false
    }
  }
}
