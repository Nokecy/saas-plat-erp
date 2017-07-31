import { Registry } from 'saas-plat-native-core';
import OrderEdit from '../components/OrderEdit';
import OrderList from '../components/OrderList';

Registry.registerRoute('saas-plat-erp-purchase-order-native', () => [{
  path: '/erp/purchase/order/:id',
  exact: true,
  component: OrderEdit
}, {
  path: '/erp/purchase/order/list',
  exact: true,
  component: OrderList
}]);
