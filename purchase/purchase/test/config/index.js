import testing from 'saas-plat-server/config/testing';

export default function() {
  before(() => testing({ password: '123456' }));
}
