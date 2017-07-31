import axios from 'axios';

if (__DEV__) {
  require('./mock');
}

export async function getOrderList() {
  const rep = await axios.get('~/saas-plat-erp/purchase/order', {
    params: {}
  });
  return rep;
}
