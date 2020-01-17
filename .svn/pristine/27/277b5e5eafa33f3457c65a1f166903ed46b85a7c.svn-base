var _tableColumn = [
  [
    { field: 'id', title: '编号', width: 80, align: 'center' },
    { field: 'name', title: '姓名', width: 140, align: 'center' },
    { field: 'sex', title: '申请日期', width: 140, align: 'center' },
    { field: 'city', title: '部门', width: 160, align: 'center' },
    { field: 'sign', title: '事由', minWidth: 240, align: 'center' },
    { field: 'experience', title: '开始日期', width: 140, align: 'center' },
    { field: 'score', title: '结束日期', width: 140, align: 'center' },
    { field: 'classify', title: '地点', minWidth: 260, align: 'center' },
    { field: 'classify', title: '是否支付', width: 120, align: 'center' },
    { field: 'classify', title: '支付费用', width: 140, align: 'center' },
    { field: 'classify', title: '备注', minWidth: 240, align: 'center' },
    { field: 'classify', title: '总经理', width: 120, align: 'center' },
    { field: 'classify', title: '财务负责人', width: 120, align: 'center' },
    { field: 'classify', title: '部门负责人', width: 120, align: 'center' }
  ]
]
var config = {
  tableColumn: _tableColumn,
  editItem(type) {
    const disabled =
      type === '查看' || type === '部门' || type === '人事' || type === '经理'
    const prepaidType = type === '添加' ? 'lay-select' : 'lay-input'
    const columns = [
      {
        title: '申请人',
        itemGName: 'md4',
        children: {
          name: 'name',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '申请日期',
        itemGName: 'md4',
        children: {
          name: 'sex',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '部门',
        itemGName: 'md4',
        children: {
          name: 'mz',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '日期',
        itemGName: 'md4',
        children: {
          name: 'csrq',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '是否预支费用',
        itemGName: 'md4',
        children: {
          name: 'csrq',
          type: prepaidType,
          valueType: String,
          placeholder: true,
          options: [{ label: '是', value: '是' }, { label: '否', value: '否' }],
          disabled
        }
      },
      {
        title: '费用',
        itemGName: 'md4',
        children: {
          name: 'csrq',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '事由',
        itemGName: 'md12',
        children: {
          name: 'csrq',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '地点',
        itemGName: 'md12',
        children: {
          name: 'csrq',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '备注',
        itemGName: 'md12',
        children: {
          name: 'csrq',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true,
          disabled
        }
      }
    ]
    if (type === '经理' || type === '查看') {
      columns.push({
        title: '总经理',
        itemGName: type === '查看' ? 'md4' : 'md12',
        children: {
          name: 'csrq',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: type !== '经理'
        }
      })
    }
    if (type === '财务' || type === '查看') {
      columns.push({
        title: '财务负责人',
        itemGName: type === '查看' ? 'md4' : 'md12',
        children: {
          name: 'csrq',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: type !== '财务'
        }
      })
    }
    if (type === '部门' || type === '查看') {
      columns.push({
        title: '部门负责人',
        itemGName: type === '查看' ? 'md4' : 'md12',
        children: {
          name: 'csrq',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: type !== '部门'
        }
      })
    }
    return columns
  },
  layerOptions(title) {
    return {
      id: 'dialogEdited',
      type: 1,
      title: title,
      area: ['1100px', '600px'],
      content: ''
    }
  }
}
