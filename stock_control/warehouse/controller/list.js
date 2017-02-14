export default class extends saasplat.controller.base {
  addAction(name){
    // this.bus.publish({
    //   name: 'create_erp_warehouse',
    //   data: {name}
    // });
    this.bus.publish('create', {name});
    return display('index/index');
  }
}
