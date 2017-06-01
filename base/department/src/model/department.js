export class extends saasplat.model.base {
  schame() {
    return {
      id: {
        type: TYPE.INT,
        primaryKey: true
      },
      pid: TYPE.INT,
      fullid: TYPE.STRING, // 全路径用于查找所有子部门等
      name: TYPE.STRING,
      code: TYPE.STRING,
      master: TYPE.STRING,
      enabled: TYPE.BOOLEAN,
      other: TYPE.TEXT,
      order: TYPE.INT, // 显示顺序，默认按照创建顺序排序
    };
  }
}
