import testing from 'saas-plat-server/config/testing';
import { name } from '../../package.json';

global.publish = async(command, data) => {
  await saasplat.publish(name, command, data);
}

global.model = (name) => {
  return saasplat.model(name);
}

export default function() {
  before(() => testing({ password: '123456' }));
}
