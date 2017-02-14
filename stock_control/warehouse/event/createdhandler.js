
export default class extends saasplat.event.handler{
  run(event){
    this.model('warehouse').create({
      id: event.id,
      name: event.name
    });
  }
}
