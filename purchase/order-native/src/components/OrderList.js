import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'saas-plat-native-core';

@connect('saas-plat-erp-purchase-order-native', 'ListLocale', 'ListStyle', 'OrderStore')
export default class OrderList extends Component {
  render() {
    return (<View>
        <Text>todo OrderList</Text>
      </View>);
  }
}
