var _tableColumn = [
  [
    { field: 'id', title: '编号', width: 80, align: 'center' },
    { field: 'name', title: '姓名', width: 140, align: 'center' },
    { field: 'sex', title: '性别', width: 80, align: 'center' },
    { field: 'birth', title: '出生日期', width: 140, align: 'center' },
    { field: 'idNumber', title: '身份证号', width: 160, align: 'center' },
    { field: 'school', title: '毕业学校', width: 240, align: 'center' },
    { field: 'education', title: '最高学历', width: 100, align: 'center' },
    { field: 'profession', title: '专业', width: 240, align: 'center' },
    { field: 'jobTitle', title: '职称', width: 180, align: 'center' },
    {
      field: 'entryDate',
      title: '进公司试用日期',
      width: 140,
      align: 'center'
    },
    {
      field: 'laborContractLen',
      title: '申请签订固定劳动合同期限',
      width: 180,
      align: 'center'
    },
    {
      field: 'summary',
      title: '申请意向及试用总结',
      width: 280,
      align: 'center'
    },
    { field: 'depOpinion', title: '部门意见', width: 280, align: 'center' },
    { field: 'perOpinion', title: '人事意见', minWidth: 280, align: 'center' },
    { field: 'review', title: '总经理审核', width: 240, align: 'center' }
  ]
]

var config = {
  tableColumn: _tableColumn,
  editItem(type) {
    const disLR = type === '查看' || type === '审批'
    const disabled = disLR || type === '部门' || type === '人事'
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
        title: '性别',
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
        title: '出生日期',
        itemGName: 'md4',
        children: {
          name: 'birth',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '身份证号',
        itemGName: 'md4',
        children: {
          name: 'idNumber',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '毕业学校',
        itemGName: 'md4',
        children: {
          name: 'school',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
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
          disabled
        }
      },
      {
        title: '专业',
        itemGName: 'md4',
        children: {
          name: 'profession',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '职称',
        itemGName: 'md4',
        children: {
          name: 'jobTitle',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '进公司日期',
        itemGName: 'md4',
        children: {
          name: 'entryDate',
          type: 'lay-date',
          valueType: String,
          placeholder: '请选择进公司试用日期',
          disabled
        }
      },
      {
        title: '劳动合同期限',
        itemGName: 'md4',
        children: {
          name: 'laborContractLen',
          type: 'lay-date',
          valueType: String,
          placeholder: '请选择申请签订固定劳动合同期限',
          disabled
        }
      },
      {
        title: '试用总结',
        itemGName: 'md12',
        // labelGName: 'md2',
        children: {
          name: 'summary',
          type: 'lay-textarea',
          valueType: String,
          placeholder: '请输入申请意向及试用总结',
          disabled
        }
      }
    ]
    if (disLR || type === '部门')
      columns.push({
        title: '部门意见',
        itemGName: 'md12',
        // labelGName: 'md2',
        children: {
          name: 'depOpinion',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true,
          disabled: disLR
        }
      })
    if (disLR || type === '人事')
      columns.push({
        title: '人事意见',
        itemGName: 'md12',
        // labelGName: 'md2',
        children: {
          name: 'perOpinion',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true,
          disabled: disLR
        }
      })
    if (disLR)
      columns.push({
        title: '总经理审核',
        itemGName: 'md12',
        // labelGName: 'md2',
        children: [
          {
            name: 'reviewName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          },
          {
            name: 'reviewTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
          },
          {
            name: 'review',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true,
            disabled: type === '查看'
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
