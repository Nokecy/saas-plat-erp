export default class extends saasplat.aggregate {
  constructor({
    name,
    phone,
    deptid,
    enabled,
    other
  }) {
    super(id);
    this.name= name;
    this.phone= phone;
    this.deptid= deptid;
    this.enabled= enabled;
    this.other= other;
  }
}
