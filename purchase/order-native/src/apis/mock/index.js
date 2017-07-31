import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

mock.onGet('~/saas-plat-erp/purchase/order').reply(200, {
  errno: 0,
  data: [
    { id: 1, name: 'xxxx' }
  ]
});
