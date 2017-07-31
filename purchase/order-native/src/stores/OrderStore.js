import {
  observable,
  computed,
  runInAction,
  action
} from 'mobx';
import {
  OrderModel
} from '../models/OrderModel';
import * as api from '../apis';

export default class OrderStore {
  @observable orders;

}
