export const DepartmentList = saasplat.model.define('department',{
  id: {
    type: saasplat.model.type.INT,
    primaryKey: true
  },
  pid: saasplat.model.type.INT,
  fullid: saasplat.model.type.STRING, // 全路径用于查找所有子部门等
  name: saasplat.model.type.STRING,
  code: saasplat.model.type.STRING,
  master: saasplat.model.type.STRING,
  enabled: saasplat.model.type.BOOLEAN,
  other: saasplat.model.type.TEXT,
  order: saasplat.model.type.INT, // 显示顺序，默认按照创建顺序排序
});
