import {
  expect
} from 'chai';
import app from './config';
import Handlers from '../src/command/handlers';

app.run(() => {
  describe('订单', function() {
    it('新增', function() {
      const handler = new Handlers();
      //handler.create({ datetime: new Date().toString() });
    });
  });
});
