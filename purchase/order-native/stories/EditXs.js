import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Edit from '../components/edit';

const edit = {
  xs: {
    title: '采购订单',
    editMode: {
      nav: {
        left: {
          icon: 'arrow-left'
        },
        right: {
          text: '编辑',
          action: 'editMode'
        }
      },
      list: {
        items: [
          {
            headerText: '单据',
            items: [
              {
                text: '单据编号',
                required: true
              }, {
                text: '单据日期',
                required: true
              }
            ]
          }, {
            headerText: '供应商',
            items: [
              {
                text: '供应商',
                required: true
              }, {
                text: '编码',
                required: true
              }, {
                text: '简称'
              }
            ]
          }, {
            headerText: '部门',
            items: []
          }, {
            headerText: '业务员',
            items: []
          }, {
            headerText: '项目',
            items: []
          }, {
            headerText: '币种',
            items: []
          }, {
            headerText: '配送',
            items: []
          }, {
            headerText: '付款',
            items: []
          }, {
            headerText: '其他',
            items: [
              {
                text: '来源'
              }, {
                text: '销售订单跟踪'
              }
            ]
          }, {
            headerText: '明细',
            items: []
          }, {
            headerText: '相关',
            items: [
              {
                text: '制单人'
              }, {
                text: '审核人'
              }, {
                text: '审核日期'
              }
            ]
          }
        ]
      }
    }
  }
};

const data = {};

const data2 = {
  code: 'AAA-BB-001',
  detail: [
    {
      inventory_code: 'BB-CC-0099'
    }
  ]
};

storiesOf('XS').add('Edit', () => (
  <Edit config={edit} data={data} size='xs' onAction={action('execute action')}/>));
