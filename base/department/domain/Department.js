function check(id, pid, name, code) {
  if (!name)
    throw t('部门名称不能为空');
  if (!code)
    throw t('部门编码不能为空');

  // 检查部门名称和编码是否重复
}

export default class extends saasplat.aggregate {
  deleted = false;

  constructor({
    id,
    pid,
    name,
    code,
    master,
    enabled,
    note
  }) {
    super(id);
    this.pid = pid;
    this.name = name;
    this.code = code;
    this.master = master;
    this.enabled = enabled || true;
    this.note = note;
  }

  static create({
    id,
    pid,
    name,
    code,
    master,
    enabled,
    note
  }) {
    check(id, pid, name, code);

    let dept = new this({
      id
    });
    dept.raise('created', {
      id,
      pid,
      name,
      code,
      master,
      enabled: enabled || true,
      note
    });
    return dept;
  }

  // 修改部门信息
  update({
    pid,
    name,
    code,
    master,
    enabled,
    note
  }) {
    if (this.deleted) {
      throw t('部门不存在，已经删除');
    }

    check(this.id, pid, name, code);

    this.raise('updated', {
      id: this.id,
      pid,
      name,
      code,
      master,
      enabled,
      note
    });
  }

  delete() {
    if (this.deleted) {
      throw t('部门不存在，已经删除');
    }

    this.raise('deleted', {
      id: this.id,
      pid: this.pid,
      name: this.name,
      code: this.code,
    });
  }

  createdEvent({
    id,
    pid,
    name,
    code,
    master,
    enabled,
    note
  }) {
    this.pid = pid;
    this.name = name;
    this.code = code;
    this.master = master;
    this.enabled = !!enabled;
    this.note = note;
  }

  updatedEvent(evnet) {
    if ('pid' in event)
      this.pid = event.pid;
    if ('name' in event)
      this.name = event.name;
    if ('code' in event)
      this.code = event.code;
    if ('master' in event)
      this.master = event.master;
    if ('enabled' in event)
      this.enabled = !!event.enabled;
    if ('note' in event)
      this.note = event.note;
  }

  deletedEvent() {
    this.deleted = true;
  }
}
