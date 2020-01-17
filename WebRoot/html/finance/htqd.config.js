var _tableColumn = [
  [
    { field: 'id', title: '编号', width: 80, align: 'center' },
    { field: 'name', title: '合同编号', width: 160, align: 'center' },
    { field: 'sex', title: '合同名称', width: 140, align: 'center' },
    { field: 'city', title: '类型', width: 140, align: 'center' },
    { field: 'sign', title: '内容摘要', width: 180, align: 'center' },
    { field: 'experience', title: '签约方名称', width: 140, align: 'center' },
    { field: 'score', title: '签约方地址', minWidth: 260, align: 'center' },
    { field: 'classify', title: '签约方联系人', width: 140, align: 'center' },
    { field: 'classify', title: '签约方联系电话', width: 140, align: 'center' },
    { field: 'classify', title: '签约方法人代表', width: 140, align: 'center' },
    { field: 'classify', title: '签约方传真', width: 140, align: 'center' },
    { field: 'classify', title: '合同总金额', width: 140, align: 'center' },
    { field: 'classify', title: '拟签订日期', width: 140, align: 'center' },
    { field: 'classify', title: '申请部门', width: 140, align: 'center' },
    { field: 'classify', title: '申请人', width: 140, align: 'center' },
    { field: 'classify', title: '申请时间', width: 140, align: 'center' },
    { field: 'classify', title: '部门经理', width: 140, align: 'center' },
    { field: 'classify', title: '财务部', width: 140, align: 'center' },
    { field: 'classify', title: '总经理', width: 140, align: 'center' }
  ]
]
var config = {
  tableColumn: _tableColumn,
  editItem(type) {
    const look = type === '查看'
    const disabled =
      look || type === '经理' || type === '财务' || type === '部门'
    const columns = [
      {
        title: '合同编号',
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
        title: '合同名称',
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
        title: '类型',
        itemGName: 'md4',
        children: {
          name: 'mz',
          type: type === '添加' ? 'lay-select' : 'lay-input',
          valueType: String,
          placeholder: true,
          options: [
            { label: '技术服务类', value: '技术服务类' },
            { label: '技术开发(委托)类', value: '技术开发(委托)类' },
            { label: '技术开发(合作)类', value: '技术开发(合作)类' },
            { label: '技术转让类', value: '技术转让类' },
            { label: '技术咨询类', value: '技术咨询类' },
            { label: '其他类', value: '其他类' }
          ],
          disabled
        }
      },
      {
        title: '内容摘要',
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
        title: '签约方名称',
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
        title: '签约方联系人',
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
        title: '签约方联系电话',
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
        title: '签约方地址',
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
        title: '签约方法人代表',
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
        title: '签约方传真',
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
        title: '合同总金额',
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
        title: '拟签订日期',
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
        title: '申请部门',
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
        title: '申请人',
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
        title: '申请时间',
        itemGName: 'md4',
        children: {
          name: 'csrq',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      }
    ]
    if (type === '部门' || type === '查看') {
      columns.push({
        title: '部门经理',
        itemGName: 'md12',
        children: [
          {
            name: 'departmentName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: look
          },
          {
            name: 'departmentTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: look
          },
          {
            name: 'department',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true,
            disabled: look
          }
        ]
      })
    }
    if (type === '财务' || type === '查看') {
      columns.push({
        title: '财务部',
        itemGName: 'md12',
        children: [
          {
            name: 'financeName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: look
          },
          {
            name: 'financeTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: look
          },
          {
            name: 'finance',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true,
            disabled: look
          }
        ]
      })
    }
    if (type === '经理' || type === '查看') {
      columns.push({
        title: '总经理',
        itemGName: 'md12',
        children: [
          {
            name: 'managerName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: look
          },
          {
            name: 'managerTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: look
          },
          {
            name: 'manager',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true,
            disabled: look
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
