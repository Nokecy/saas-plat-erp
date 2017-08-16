// 进货业务
import {
    expect
} from 'chai';
import 'saas-plat-server';
import CommandHandlers from '../src/command';

describe('进货业务', function() {
  
    it('普通进货', function() {
        const command = new CommandHandlers();
        //command.create({ datetime: new Date().toString() });
    });

    it('普通退货', function() {
        const command = new CommandHandlers();
        //command.create({ datetime: new Date().toString() });
    });

    it('冲抵进货', function() {
        const command = new CommandHandlers();
        //command.create({ datetime: new Date().toString() });
    });

    it('换货', function() {
        const command = new CommandHandlers();
        //command.create({ datetime: new Date().toString() });
    });
});
