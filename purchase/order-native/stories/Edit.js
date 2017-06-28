import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Edit from '../components/edit';

const options = {
  barcodeEnable: true
};

const edit = {
  md: {
    readonlyMode: {
      toolbar: {
        groups: [
          {
            items: [
              {
                text: '首张',
                type: 'primary',
                action: 'first'
              }, {
                text: '上一张',
                type: 'primary',
                icon: 'left',
                action: 'previous'
              }, {
                text: '下一张',
                type: 'primary',
                icon: 'right',
                action: 'next'
              }, {
                text: '末张',
                type: 'primary',
                action: 'last'
              }
            ]
          }, {
            items: [
              {
                text: '新增',
                action: 'addnew'
              }, {
                text: '刷新',
                action: 'refresh'
              }, {
                text: '查找',
                action: 'search'
              }, {
                text: '打印',
                action: 'print'
              }
            ]
          }, {
            pull: 'right',
            items: [
              {
                text: '更多',
                action: 'fieldSetting'
              }, {
                text: '设置',
                action: 'setting'
              }
            ]
          }
        ]
      },
      detail: {
        header: {
          items: [
            {
              text: '单据编号',
              required: true,
              visible: true,
              value: 'code'
            }, {
              text: '单据日期',
              required: true,
              visible: true,
              value: 'datetime'
            }, {
              text: '供应商',
              required: true,
              visible: true,
              value: 'supplier_name'
            }, {
              text: '供应商编码',
              required: true,
              value: 'supplier_code'
            }, {
              text: '供应商简称',
              value: 'supplier_short_name'
            }, {
              text: '部门',
              value: 'department_name'
            }, {
              text: '业务员',
              value: 'employee_name'
            }, {
              text: '项目',
              value: 'project_name'
            }, {
              text: '币种',
              value: 'currency_name'
            }, {
              text: '汇率',
              value: 'currency_rate'
            }, {
              text: '送货地址',
              visible: true,
              value: 'distribution_address'
            }, {
              text: '到货日期',
              visible: true,
              value: 'distribution_datetime'
            }, {
              text: '联系人',
              visible: true,
              value: 'distribution_user_name'
            }, {
              text: '联系电话',
              visible: true,
              value: 'distribution_phone'
            }, {
              text: '合同号',
              visible: true,
              value: 'contract_number'
            }, {
              text: '付款方式',
              visible: true,
              value: 'payment_name'
            }, {
              text: '定金金额',
              visible: true,
              value: 'currency_value'
            }, {
              text: '来源',
              value: 'src_code'
            }, {
              text: '销售订单跟踪',
              value: 'sale_code'
            }
          ]
        },
        body: {
          headerText: '明细',
          items: [
            {
              text: '存货条码',
              required: true,
              disabled: !options.barcodeEnable,
              visible: true,
              value: 'inventory_barcode'
            }, {
              text: '存货编号',
              required: true,
              visible: true,
              value: 'inventory_code'
            }, {
              text: '存货名称',
              required: true,
              visible: true,
              value: 'inventory_name'
            }, {
              text: '供应商编码',
              required: true,
              visible: true,
              value: 'supplier_code'
            }, {
              text: '供应商名称',
              required: true,
              visible: true,
              value: 'supplier_name'
            }, {
              text: '数量',
              required: true,
              visible: true,
              value: 'quantity'
            }, {
              text: '报价',
              required: true,
              visible: true
            }, {
              text: '折扣价',
              required: true,
              visible: true
            }, {
              text: '单价',
              required: true,
              visible: true
            }, {
              text: '含税单价',
              required: true,
              visible: true
            }, {
              text: '税率',
              required: true,
              visible: true
            }, {
              text: '金额',
              required: true,
              visible: true
            }, {
              text: '含税金额',
              required: true,
              visible: true
            }, {
              text: '折扣金额',
              required: true,
              visible: true
            }
          ]
        },
        footer: {
          items: [
            {
              text: '制单人',
              visible: true,
              value: 'originator_name'
            }, {
              text: '审核人',
              visible: true,
              value: 'auditor_name'
            }, {
              text: '审核日期',
              visible: true,
              value: 'audit_date'
            }
          ]
        }
      }
    },
    editMode: {
      toolbar: {
        groups: [
          {
            items: [
              {
                text: '首张',
                type: 'primary',
                action: 'first'
              }, {
                text: '上一张',
                type: 'primary',
                icon: 'arrow-left',
                action: 'previous'
              }, {
                text: '下一张',
                type: 'primary',
                icon: 'arrow-right',
                display: 'text_icon',
                action: 'next'
              }, {
                text: '末张',
                type: 'primary',
                action: 'last'
              }
            ]
          }, {
            items: [
              {
                text: '新增',
                action: 'addnew',
                items: [
                  {
                    text: '拷贝新增',
                    action: 'copy'
                  }
                ]
              }, {
                text: '选单',
                items: [
                  {
                    text: '选请购单',
                    action: {
                      name: 'select',
                      args: 'requisition'
                    }
                  }
                ]
              }, {
                text: '生单',
                items: [
                  {
                    text: '生成销货单',
                    action: {
                      name: 'create',
                      args: 'stock'
                    }
                  }, {
                    text: '生成采购入库单',
                    action: {
                      name: 'create',
                      args: {
                        system: 'stock',
                        module: 'in'
                      }
                    }
                  }
                ]
              }, {
                text: '刷新',
                action: 'refresh'
              }
            ]
          }, {
            items: [
              {
                text: '查找',
                action: 'search'
              }, {
                text: '整单折扣',
                action: {
                  name: 'batchUpdate',
                  args: 'detail_discount_rate'
                }
              }
            ]
          }, {
            items: [
              {
                text: '打印',
                action: 'print'
              }
            ]
          }, {
            pull: 'right',
            items: [
              {
                text: '更多',
                action: 'fieldSetting'
              }, {
                text: '设置',
                action: 'setting'
              }
            ]
          }
        ]
      },
      form: {
        titleVisible: true,
        editor: [
          {
            name: 'supplier_refselector',
            type: 'refselector',
            query: () => {
              return [
                {
                  id: '001',
                  code: 'AAA',
                  name: '供应商1'
                }, {
                  id: '003',
                  code: 'BBB',
                  name: '供应商3'
                }
              ];
            },
            update: ({result, record}) => {
              record.supplier_id = result.id;
              record.supplier_code = result.code;
              record.supplier_name = result.name;
            }
          }, {
            name: 'inventory_refselector',
            type: 'refselector',
            query: () => {
              return [
                {
                  id: '001',
                  code: 'AAA',
                  name: '存货1'
                }, {
                  id: '003',
                  code: 'BBB',
                  name: '存货2'
                }
              ];
            },
            update: ({result, record}) => {
              record.supplier_id = result.id;
              record.supplier_code = result.code;
              record.supplier_name = result.name;
            }
          }, {
            name: 'inventory_barcode_refselector',
            type: 'refselector',
            query: () => {
              return [
                {
                  id: '0014',
                  code: '00-3399-44-55',
                  name: '存货3'
                }, {
                  id: '0033',
                  code: '00-334499-4334-5555',
                  name: '存货4'
                }
              ];
            },
            update: ({result, record}) => {
              record.supplier_id = result.id;
              record.supplier_code = result.code;
              record.supplier_name = result.name;
            }
          }
        ],
        header: {
          items: [
            {
              text: '单据编号',
              required: true,
              visible: true,
              disabled: true,
              value: 'code'
            }, {
              text: '单据日期',
              required: true,
              visible: true,
              type: 'date',
              value: 'datetime'
            }, {
              text: '供应商',
              required: true,
              visible: true,
              type: 'supplier_refselector',
              value: 'supplier_name'
            }, {
              text: '供应商编码',
              required: true,
              type: 'supplier_refselector',
              value: 'supplier_code'
            }, {
              text: '供应商简称',
              type: 'supplier_refselector',
              value: 'supplier_short_name'
            }, {
              text: '部门',
              value: 'department_name'
            }, {
              text: '业务员',
              value: 'employee_name'
            }, {
              text: '项目',
              value: 'project_name'
            }, {
              text: '币种',
              value: 'currency_name'
            }, {
              text: '汇率',
              type: 'number',
              value: 'currency_rate'
            }, {
              text: '送货地址',
              visible: true,
              value: 'distribution_address'
            }, {
              text: '到货日期',
              visible: true,
              type: 'date',
              value: 'distribution_datetime'
            }, {
              text: '联系人',
              visible: true,
              value: 'distribution_user_name'
            }, {
              text: '联系电话',
              visible: true,
              value: 'distribution_phone'
            }, {
              text: '合同号',
              visible: true,
              value: 'contract_number'
            }, {
              text: '付款方式',
              visible: true,
              value: 'payment_name'
            }, {
              text: '定金金额',
              visible: true,
              type: 'number',
              format: 'money',
              value: 'currency_value'
            }, {
              text: '来源',
              value: 'src_code'
            }, {
              text: '销售订单跟踪',
              value: 'sale_code'
            }
          ]
        },
        body: [
          {
            text: '明细',
            btns: {},
            type: 'edittable',
            ds: 'detail',
            items: [
              {
                text: '存货条码',
                required: true,
                disabled: !options.barcodeEnable,
                visible: true,
                type: 'inventory_barcode_refselector',
                value: 'inventory_barcode'
              }, {
                text: '存货编号',
                required: true,
                visible: true,
                type: 'inventory_refselector',
                value: 'inventory_code'
              }, {
                text: '存货名称',
                required: true,
                visible: true,
                type: 'inventory_refselector',
                value: 'inventory_name'
              }, {
                text: '供应商编码',
                required: true,
                visible: true,
                type: 'supplier_refselector',
                value: 'supplier_code'
              }, {
                text: '供应商名称',
                required: true,
                visible: true,
                type: 'supplier_refselector',
                value: 'supplier_name'
              }, {
                text: '数量',
                required: true,
                visible: true,
                type: 'number',
                format: {
                  type: 'quantity',
                  integral: 12,
                  decimal: 0,
                  negative: false,
                  positive: true
                },
                value: 'quantity'
              }, {
                text: '报价',
                required: true,
                type: 'number',
                visible: true
              }, {
                text: '折扣%',
                required: true,
                visible: true,
                type: 'number',
                format: 'percentage',
                value: 'discount_rate'
              }, {
                text: '折扣价',
                required: true,
                visible: true,
                type: 'number',
                format: 'money',
                value: 'discount_price'
              }, {
                text: '单价',
                required: true,
                visible: true,
                type: 'number',
                format: 'money',
                value: 'price'
              }, {
                text: '含税单价',
                required: true,
                visible: true,
                type: 'number',
                format: 'money',
                value: 'orig_tax_price'
              }, {
                text: '税率%',
                required: true,
                visible: true,
                type: 'number',
                format: 'percentage',
                value: 'orig_tax_amount'
              }, {
                text: '金额',
                required: true,
                visible: true,
                type: 'number',
                format: 'money',
                value: 'amount'
              }, {
                text: '含税金额',
                required: true,
                visible: true,
                type: 'number',
                format: 'money',
                value: 'orig_tax_amount'
              }, {
                text: '折扣金额',
                required: true,
                visible: true,
                type: 'number',
                format: 'money',
                value: 'discount_amount'
              }
            ]
          }, {
            text: '汇总'
          }
        ],
        footer: {
          items: [
            {
              text: '备注',
              visible: true,
              labelSpan:1,
              span: 24,
              value: 'note'
            }, {
              text: '制单人',
              visible: true,
              disabled: true,
              value: 'originator_name'
            }, {
              text: '审核人',
              visible: true,
              disabled: true,
              value: 'auditor_name'
            }, {
              text: '审核日期',
              visible: true,
              disabled: true,
              value: 'audit_date'
            }
          ]
        },
        total: {
          items: [
            {
              text: '合计金额',
              value: 'price_sum'
            }, {
              text: '合计含税金额',
              value: 'orig_tax_amount_sum'
            }, {
              text: '合计折扣金额',
              value: 'discount_amount_sum'
            }
          ]
        },
        btns: {
          items: [
            {
              text: '变更',
              action: 'change'
            }, {
              text: '审核',
              type: 'primary',
              action: {
                name: 'submit',
                args: {
                  auditedText: '弃审',
                  unuditText: '审核'
                }
              }
            }, {
              text: '保存',
              type: 'primary',
              action: 'save',
              items: [
                {
                  text: '保存新增',
                  action: ['save', 'addnew']
                }, {
                  text: '保存为草稿',
                  action: 'savedraft'
                }
              ]
            }, {
              text: '放弃',
              action: 'cancel'
            }
          ]
        }
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

storiesOf('MD').add('Edit', () => (
  <Edit config={edit} data={data} onAction={action('execute action')}/>
))
// .add('Edit(修改)', () => (<Edit config={edit} data={data2}
// onAction={action('execute action')}/>));
