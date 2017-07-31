import { Registry } from 'saas-plat-native-core';

import EditStyle from './default/EditStyle';
import ListStyle from './default/ListStyle';

Registry.registerTheme('saas-plat-erp-purchase-order-native', () => ({ EditStyle, ListStyle }));
