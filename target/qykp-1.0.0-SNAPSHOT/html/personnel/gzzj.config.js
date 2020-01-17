var _tableColumn = [
  [
    { type: 'checkbox', title: '选择', width: 60, align: 'center'},
    { field: 'gridId', title: '编号', width: 80, align: 'center' },
    { field: 'USERNAME', title: '姓名', width: 140, align: 'center' },
    { field: 'AGE', title: '年龄', width: 80, align: 'center' },
    { field: 'SEX', title: '性别', width: 80, align: 'center' },
    { field: 'EDUCATION', title: '最高学历', width: 100, align: 'center' },
    { field: 'POLITIC_COUNTENANCE', title: '政治面貌', width: 100, align: 'center' },
    { field: 'POST', title: '岗位', width: 180, align: 'center' },
    { field: 'DEPARTMENT', title: '所属部门', width: 180, align: 'center' },
    { field: 'JOIN_TIME', title: '进公司时间', width: 140, align: 'center' },
    { field: 'WORK_SUMMARY', title: '工作总结', width: 140, align: 'center' },
    { field: 'DEPARTMENT_EVALUATION', title: '部门评价', minWidth: 280, align: 'center' },
    { field: 'DEPARTMENT_LEADER', title: '部门负责人', width: 140, align: 'center' },
    { field: 'EVALUATION_DATE', title: '评价日期', width: 140, align: 'center' }
  ]
]

var config = {
  tableColumn: _tableColumn,
  editItem(type,user) {
    const prepaidType = type === '编辑' ? 'lay-select' : 'lay-input'
    const columns = [
      {
        title: '姓名',
        itemGName: 'md4',
        children: {
          name: 'username',
          type: prepaidType,
          valueType: String,
          placeholder: true,
          laySearch: true,
          options:user,
          disabled: type === '审批'
        }
      },
      {
        title: '年龄',
        itemGName: 'md4',
        children: {
          name: 'age',
          type: 'lay-input',
          valueType: Number,
          placeholder: true,
          disabled: type === '审批'
        }
      },
      {
        title: '性别',
        itemGName: 'md4',
        children: {
          name: 'sex',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: type === '审批'
        }
      },
      {
        title: '最高学历',
        itemGName: 'md4',
        children: {
          name: 'education',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: type === '审批'
        }
      },
      {
        title: '政治面貌',
        itemGName: 'md4',
        children: {
          name: 'politic_countenance',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: type === '审批'
        }
      },
      {
        title: '岗位',
        itemGName: 'md4',
        children: {
          name: 'post',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: type === '审批'
        }
      },
      {
        title: '所属部门',
        itemGName: 'md4',
        children: {
          name: 'department',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: type === '审批'
        }
      },
      {
        title: '进公司时间',
        itemGName: 'md4',
        children: {
          name: 'join_time',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled: type === '审批'
        }
      }
    ]
    if (type === '编辑' || type === '审批')
      columns.push({
        // title: '2019年个人年中工作总结',
        title: '工作总结',
        itemGName: 'md12',
        labelGName: 'md1',
        children: {
          name: 'work_summary',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true,
          disabled: type === '审批'
        }
      })
    if (type === '审批')
      columns.push({
        title: '部门评价',
        itemGName: 'md12',
        labelGName: 'md1',
        children: [
          {
            name: 'department_leader',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'evaluation_date',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'department_evaluation',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true
          }
        ]
      })
    return columns
  },
  layerOptions(title, cb) {
    return {
      id: 'dialogEdited',
      type: 1,
      title,
      area: ['1100px', '600px'],
      content: '',
      end() {
        if (cb) cb()
      }
    }
  }
}
