import {Registry} from 'saas-plat-native-core';

import OrderStore from './OrderStore';

Registry.registerStore('saas-plat-erp-purchase-order-native', () => ({OrderStore}));
