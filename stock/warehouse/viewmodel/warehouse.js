
export default class extends saasplat.model.base{
  constructor(){
    super();
    this.schema = {
      id: saasplat.model.INTEGER,
      name: saasplat.model.STRING
    }
  }
}
