import { Registry } from 'saas-plat-native-core';

import EditLocale from './en/EditLocale';
import ListLocale from './en/ListLocale';

Registry.registerLocales('saas-plat-erp-purchase-order-native', () => ({ EditLocale, ListLocale }));
