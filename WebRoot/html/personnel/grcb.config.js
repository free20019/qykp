var _tableColumn = [
  [
    { type: 'checkbox', title: '选择', width: 60, align: 'center'},
    { field: 'gridId', title: '序号', width: 60, align: 'center' },
    { field: 'PERSON_NAME', title: '姓名', width: 140, align: 'center' },
    { field: 'DEPARTMENT', title: '部门', width: 180, align: 'center' },
    { field: 'COMMIT_DATE', title: '日期', width: 140, align: 'center' },
    {
      field: 'YESTERDAY_PROGRESS',
      title: '昨日完成及进度',
      minWidth: 280,
      align: 'center'
    },
    { field: 'AWAIT_SOLUTION', title: '待解决问题', minWidth: 280, align: 'center' },
    { field: 'TODAY_PLAN', title: '今日计划', minWidth: 280, align: 'center' }
  ]
]
var config = {
  tableColumn: _tableColumn,
  editItem() {
    const columns = [
      {
        title: '姓名',
        itemGName: 'md4',
        children: {
          name: 'PERSON_NAME',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: true
        }
      },
      {
        title: '部门',
        itemGName: 'md4',
        children: {
          name: 'DEPARTMENT',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: true
        }
      },
      {
        title: '日期',
        itemGName: 'md4',
        children: {
          name: 'COMMIT_DATE',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled: true
        }
      },
      {
        title: '昨日进度',
        itemGName: 'md12',
        labelGName: 'md1',
        children: {
          name: 'YESTERDAY_PROGRESS',
          type: 'lay-textarea',
          valueType: String,
          placeholder: '请输入昨日完成及进度',
          disabled: true
        }
      },
      {
        title: '待解决问题',
        itemGName: 'md12',
        labelGName: 'md1',
        children: {
          name: 'AWAIT_SOLUTION',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true,
          disabled: true
        }
      },
      {
        title: '今日计划',
        itemGName: 'md12',
        labelGName: 'md1',
        children: {
          name: 'TODAY_PLAN',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true,
          disabled: true
        }
      }
    ]
    return columns
  },
  layerOptions(title, cb) {
    return {
      id: 'dialogEdited',
      type: 1,
      title,
      area: ['1100px', '500px'],
      content: '',
      end() {
        if (cb) cb()
      }
    }
  }
}
