
export default class extends saasplat.aggregate {
  constructor({id,name}){
    super(id);
    this.name = name;
  }

  static create({id, name}){
    if (!name)
      throw '库房名称必须填写';
    let warehouse = new this({id});
    warehouse.raise('created',{
      name
    });
    return warehouse;
  }

  createdEvent(event){
    this.name = event.name;
  }
}
