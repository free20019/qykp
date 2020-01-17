var _tableColumn = [
  [
    { field: 'id', title: '编号', width: 80, align: 'center' },
    { field: 'name', title: '单位名称', minWidth: 260, align: 'center' },
    { field: 'sex', title: '开票内容', minWidth: 240, align: 'center' },
    { field: 'city', title: '开票金额', width: 140, align: 'center' },
    { field: 'sign', title: '发票类型', width: 140, align: 'center' },
    {
      field: 'score',
      title: '银行帐号及开户行',
      minWidth: 260,
      align: 'center'
    },
    { field: 'classify', title: '地址', minWidth: 240, align: 'center' },
    { field: 'classify', title: '电话', width: 140, align: 'center' },
    { field: 'name', title: '姓名', width: 140, align: 'center' },
    { field: 'classify', title: '联系方式', width: 140, align: 'center' },
    { field: 'classify', title: '邮寄地址', minWidth: 240, align: 'center' }
  ]
]
var config = {
  tableColumn: _tableColumn,
  editItem(type) {
    const disabled = type === '查看'
    const columns = [
      {
        title: '单位名称',
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
        title: '开票内容',
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
        title: '开票金额',
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
        title: '发票类型',
        itemGName: 'md4',
        children: {
          name: 'csrq',
          type: type === '添加' ? 'lay-select' : 'lay-input',
          valueType: String,
          placeholder: true,
          options: [
            { label: '普通发票6%', value: '普通发票6%' },
            { label: '普通发票13%', value: '普通发票13%' },
            { label: '专用发票6%', value: '专用发票6%' },
            { label: '专用发票13%', value: '专用发票13%' }
          ],
          disabled
        }
      },
      {
        title: '银行帐号及开户行',
        itemGName: 'md8',
        labelGName: 'md3',
        children: {
          name: 'csrq',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '地址',
        itemGName: 'md12',
        children: {
          name: 'csrq',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '电话',
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
        title: '姓名',
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
        title: '联系方式',
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
        title: '邮寄地址',
        itemGName: 'md12',
        children: {
          name: 'csrq',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      }
    ]
    return columns
  },
  layerOptions(title) {
    return {
      id: 'dialogEdited',
      type: 1,
      title: title,
      area: ['1100px', '400px'],
      content: ''
    }
  }
}
