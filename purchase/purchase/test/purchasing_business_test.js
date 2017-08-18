// 进货业务
import { expect } from 'chai';
import init from './config';
import { name } from '../package.json';

describe('进货业务', function() {
  init();

  it('普通进货', async function() {
    await saasplat.publish(name, 'purchase', {});
  });

  it('普通退货', function() {

  });

  it('冲抵进货', function() {

  });

  it('换货', function() {

  });
});
