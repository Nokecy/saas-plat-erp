import saasplat from 'saasplat';

export default class extends saasplat.controller.base {
  indexAction(){
    this.display();
  }

  * listAction(){
     let model = this.model("warehouse_list");
     let data = yield model.page(this.get("page"), 10).countSelect();
     return this.success(data);
   }
}
