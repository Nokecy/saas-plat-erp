import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'saas-plat-native-core';

@connect('saas-plat-erp-purchase-order-native', 'EditLocale', 'EditStyle', 'OrderStore')
export default class OrderEdit extends Component {
  render() {
    return (<View>
        <Text>todo Edit Order</Text>
      </View>);
  }
}
