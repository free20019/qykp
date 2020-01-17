var _tableColumn = [
  [
    { field: 'id', title: '编号', width: 80, align: 'center' },
    { field: 'name', title: '姓名', width: 140, align: 'center' },
    { field: 'sex', title: '部门', width: 160, align: 'center' },
    { field: 'city', title: '职务', width: 160, align: 'center' },
    { field: 'sign', title: '入职时间', width: 140, align: 'center' },
    { field: 'experience', title: '离职时间', width: 140, align: 'center' },
    { field: 'score', title: '离职原因', minWidth: 240, align: 'center' },
    { field: 'classify', title: '部门审批', minWidth: 240, align: 'center' },
    { field: 'classify', title: '人事审批', minWidth: 240, align: 'center' },
    { field: 'classify', title: '总经理审批', minWidth: 240, align: 'center' }
  ]
]
var config = {
  tableColumn: _tableColumn,
  editItem(type) {
    const disabled =
      type === '查看' || type === '部门' || type === '人事' || type === '经理'
    const columns = [
      {
        title: '姓名',
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
        title: '部门',
        itemGName: 'md4',
        children: {
          name: 'sex',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '职务',
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
        title: '入职时间',
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
        title: '离职时间',
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
        title: '离职原因',
        itemGName: 'md12',
        children: [
          {
            name: 'selfDetailName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled
          },
          {
            name: 'selfDetailTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled
          },
          {
            name: 'selfDetail',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true,
            disabled
          }
        ]
      }
    ]
    if (type === '部门' || type === '查看') {
      columns.push({
        title: '部门审批',
        itemGName: 'md12',
        children: [
          {
            name: 'selfDetailName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          },
          {
            name: 'selfDetailTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          },
          {
            name: 'selfDetail',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          }
        ]
      })
    }
    if (type === '人事' || type === '查看') {
      columns.push({
        title: '人事审批',
        itemGName: 'md12',
        children: [
          {
            name: 'selfDetailName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          },
          {
            name: 'selfDetailTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          },
          {
            name: 'selfDetail',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          }
        ]
      })
    }
    if (type === '经理' || type === '查看') {
      columns.push({
        title: '总经理审批',
        itemGName: 'md12',
        children: [
          {
            name: 'selfDetailName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          },
          {
            name: 'selfDetailTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          },
          {
            name: 'selfDetail',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          }
        ]
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
