import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import List from '../components/list';

const edit = {
  title: '订单列表',
  xs: {
    viewMode: {
      nav: {
        left: {
          icon: 'arrow-left',
          action: 'back'
        },
        right: {
          showCount: 3,
          items: [
            {
              text: '新增订单',
              action: 'add',
              //type: 'fontawesome',
              icon: 'plus'
            }, {
              text: '扫码',
              visible: true,
              action: 'scan'
            }, {
              text: '更多1',
              visible: true,
              action: 'm1'
            }, {
              text: '更多2',
              visible: true,
              action: 'm2'
            }, {
              text: '更多3',
              visible: true,
              action: 'scan'
            }
          ]
        }
      },
      filter: {
        quick: {
          items: [
            {
              text: '业务日期',
              value: 'datetime',
              desc: true
            }, {
              text: '单号',
              value: 'code',
              desc: true
            }, {
              text: '客户',
              value: 'customer_name',
              desc: true
            }, {
              text: '金额',
              value: 'price',
              desc: true,
              visible: false
            }, {
              text: '未生效',
              value: 'unaudited'
            }, {
              text: '已生效',
              value: 'audited',
              visible: false
            }
          ]
        },
        search: {
          visible: true,
          placeholder: '查找 订单编号、客户名称、存货名称、备注',
          match: 'fuzzy'
        },
        filters: {
          items: [
            {
              text: '订单日期',
              value: 'datetime',
              type: 'daterange',
              visible: true
            }, {
              text: '订单编号',
              value: 'code',
              type: 'refselector',
              visible: true
            }, {
              text: '供应商',
              type: 'refselector',
              visible: true
            }, {
              text: '供应商分类',
              type: 'refselector',
              visible: false
            }, {
              text: '部门',
              type: 'refselector',
              visible: true
            }, {
              text: '业务员',
              type: 'refselector',
              visible: true
            }, {
              text: '项目',
              type: 'refselector',
              visible: false
            }, {
              text: '项目分类',
              type: 'refselector',
              visible: false
            }, {
              text: '运输方式',
              visible: false
            }, {
              text: '送货地址',
              visible: false
            }, {
              text: '联系人',
              visible: false
            }, {
              text: '联系电话',
              visible: false
            }, {
              text: '含税总金额',
              type: 'number',
              format: 'money',
              visible: true
            }, {
              text: '预付款',
              type: 'number',
              format: 'money',
              visible: false
            }, {
              text: '总金额',
              type: 'number',
              format: 'money',
              visible: false
            }, {
              text: '到货日期',
              type: 'datetime',
              visible: false
            }, {
              text: '制单人',
              type: 'text',
              visible: true
            }, {
              text: '单据状态',
              type: 'select',
              visible: true
            }, {
              text: '审核人',
              type: 'text',
              visible: false
            }, {
              text: '审核日期',
              type: 'daterange',
              visible: false
            }, {
              text: '变更人',
              type: 'text',
              visible: false
            }, {
              text: '变更日期',
              type: 'daterange',
              visible: false
            }, {
              text: '存货',
              type: 'refselector',
              visible: true
            }, {
              text: '存货编码',
              type: 'refselector',
              visible: false
            }, {
              text: '仓库',
              type: 'refselector',
              visible: false
            }, {
              text: '来源单据',
              type: 'refselector',
              visible: false
            }, {
              text: '来源单号',
              type: 'refselector',
              visible: false
            }
          ]
        }
      },
      list: {
        items: [
          {
            text: '供应商',
            value: 'supplier_name'
          }, {
            text: '订单编号',
            value: 'code'
          }, {
            text: '存货列表',
            value: 'inventorys'
          }, {
            text: '数量合计',
            value: 'quantity_sum',
            type: 'number'
          }, {
            text: '含税总金额',
            value: 'price_sum',
            type: 'number',
            format: 'money'
          }, {
            text: '状态',
            value: 'state',
            type: 'badge'
          }
        ]
      }
    }
  }
};

const data = {
  code: 'AAA-BB-001',
  detail: [
    {
      inventory_code: 'BB-CC-0099'
    }
  ]
};

storiesOf('XS').add('List', () => (<List config={edit} data={data} size='xs' onAction={action('execute action')}/>));
