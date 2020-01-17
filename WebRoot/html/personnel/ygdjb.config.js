var _tableColumn = [
  [
    { field: 'id', title: '编号', width: 80, align: 'center' },
    { field: 'name', title: '姓名', width: 140, align: 'center' },
    { field: 'sex', title: '性别', width: 80, align: 'center' },
    { field: 'city', title: '民族', width: 120, align: 'center' },
    { field: 'sign', title: '出生日期', width: 140, align: 'center' },
    { field: 'experience', title: '政治面貌', width: 100, align: 'center' },
    { field: 'score', title: '学历学位', width: 120, align: 'center' },
    { field: 'classify', title: '职称', width: 140, align: 'center' },
    { field: 'classify', title: '身份证号', width: 160, align: 'center' },
    { field: 'classify', title: '进公司时间', width: 140, align: 'center' },
    {
      field: 'classify',
      title: '何院（校）何专业毕业',
      width: 280,
      align: 'center'
    },
    {
      field: 'classify',
      title: '现住地址（具体）',
      width: 280,
      align: 'center'
    },
    {
      field: 'classify',
      title: '户口地址（具体）',
      width: 280,
      align: 'center'
    },
    {
      field: 'classify',
      title: '户口所在地（省/市）',
      width: 180,
      align: 'center'
    },
    { field: 'classify', title: '户口性质', width: 120, align: 'center' },
    { field: 'classify', title: '婚姻状况', width: 120, align: 'center' },
    { field: 'classify', title: '电话', width: 120, align: 'center' },
    { field: 'classify', title: '手机号码', width: 140, align: 'center' },
    {
      field: 'classify',
      title: '邮编',
      width: 120,
      align: 'center',
      unresize: true
    }
  ]
]
var _resumeTableColumns = [
  {
    label: '操作',
    width: 60,
    type: 'button',
    btnType: ['remove'],
    align: 'center'
  },
  { name: 'time', label: '时间', width: 140, type: 'date', placeholder: true },
  {
    name: 'work',
    label: '工作（学习）单位',
    minWidth: 280,
    type: 'input',
    placeholder: true
  },
  {
    name: 'post',
    label: '岗位/职务',
    width: 140,
    type: 'input',
    placeholder: true
  },
  {
    name: 'remark',
    label: '备注',
    width: 180,
    type: 'input',
    placeholder: true
  }
]

var _familyMemberColumns = [
  {
    label: '操作',
    width: 60,
    type: 'button',
    btnType: ['remove'],
    align: 'center'
  },
  { name: 'name', label: '姓名', width: 120, type: 'input', placeholder: true },
  {
    name: 'nexus',
    label: '与本人关系',
    width: 140,
    type: 'input',
    placeholder: true
  },
  {
    name: 'contact',
    label: '联系方式',
    width: 140,
    type: 'input',
    placeholder: true
  },
  {
    name: 'work',
    label: '工作（学习）单位',
    minWidth: 280,
    type: 'input',
    placeholder: true
  }
]
var config = {
  tableColumn: _tableColumn,
  resumeTableColumns() {
    const columns = [
      {
        title: '操作',
        width: 60,
        type: 'lay-button',
        btnType: ['remove'],
        align: 'center'
      },
      {
        name: 'time',
        title: '时间',
        width: 140,
        type: 'lay-date',
        placeholder: true
      },
      {
        name: 'work',
        title: '工作（学习）单位',
        minWidth: 280,
        type: 'lay-input',
        placeholder: true
      },
      {
        name: 'post',
        title: '岗位/职务',
        width: 140,
        type: 'lay-input',
        placeholder: true
      },
      {
        name: 'remark',
        title: '备注',
        width: 180,
        type: 'lay-input',
        placeholder: true
      }
    ]
    return {
      id: 'tableResume',
      columns
    }
  },
  familyTableColumns() {
    const columns = [
      {
        title: '操作',
        width: 60,
        type: 'lay-button',
        btnType: ['remove'],
        align: 'center'
      },
      {
        name: 'name',
        title: '姓名',
        width: 120,
        type: 'lay-input',
        placeholder: true
      },
      {
        name: 'nexus',
        title: '与本人关系',
        width: 140,
        type: 'lay-input',
        placeholder: true
      },
      {
        name: 'contact',
        title: '联系方式',
        width: 140,
        type: 'lay-input',
        placeholder: true
      },
      {
        name: 'work',
        title: '工作（学习）单位',
        minWidth: 280,
        type: 'lay-input',
        placeholder: true
      }
    ]
    return {
      id: 'tableFamily',
      columns
    }
  },
  resumeDefItem() {
    return { time: '', work: '', post: '', remark: '' }
  },
  familyDefItem() {
    return { name: '', nexus: '', contact: '', work: '' }
  },
  panelOptions(title) {
    const options = {
      title,
      titleAlign: 'center',
      titleFontSize: 18,
      className: 'layui-col-md12'
    }
    if (title === '本人简历') {
      options.id = 'panelResume'
      options.idEl = 'tableResume'
    } else if (title === '家庭成员情况') {
      options.id = 'panelFamily'
      options.idEl = 'tableFamily'
    }
    return options
  },
  editItem(type) {
    const columns = [
      {
        title: '姓名',
        itemGName: 'md4',
        children: {
          name: 'name',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '性别',
        itemGName: 'md4',
        children: {
          name: 'sex',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '民族',
        itemGName: 'md4',
        children: {
          name: 'mz',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '出生年月',
        itemGName: 'md4',
        children: {
          name: 'csrq',
          type: 'lay-date',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '政治面貌',
        itemGName: 'md4',
        children: {
          name: 'zzmm',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '学历学位',
        itemGName: 'md4',
        children: {
          name: 'xsxw',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '职称',
        itemGName: 'md4',
        children: {
          name: 'zc',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '身份证号',
        itemGName: 'md4',
        children: {
          name: 'sfzh',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '入职时间',
        itemGName: 'md4',
        children: {
          name: 'rzsj',
          type: 'lay-date',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '电话',
        itemGName: 'md4',
        children: {
          name: 'dh',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '手机号码',
        itemGName: 'md4',
        children: {
          name: 'sjhm',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '邮编',
        itemGName: 'md4',
        children: {
          name: 'yb',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '户口所在地',
        itemGName: 'md4',
        children: {
          name: 'hkszd',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '户口性质',
        itemGName: 'md4',
        children: {
          name: 'hkxz',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '婚姻情况',
        itemGName: 'md4',
        children: {
          name: 'hyqk',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '何院(校)何专业毕业',
        itemGName: 'md12',
        labelGName: 'md2',
        children: {
          name: 'zyby',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '现居地址',
        itemGName: 'md12',
        labelGName: 'md2',
        children: {
          name: 'xjdz',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        title: '户口地址',
        itemGName: 'md12',
        labelGName: 'md2',
        children: {
          name: 'khdz',
          type: 'lay-input',
          valueType: String,
          placeholder: true
        }
      },
      {
        idEl: 'panelResume',
        typeEl: 'table',
        title: '本人简历',
        itemGName: 'md12'
      },
      {
        idEl: 'panelFamily',
        typeEl: 'table',
        title: '家庭成员情况',
        itemGName: 'md12'
      },
      {
        title: '本人愿意',
        itemGName: 'md12',
        labelGName: 'md2',
        children: [
          {
            name: 'selfDetailName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'selfDetailTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'selfDetail',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true
          }
        ]
      },
      {
        title: '部门意见',
        itemGName: 'md12',
        labelGName: 'md2',
        children: [
          {
            name: 'departmentName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'departmentTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'department',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true
          }
        ]
      },
      {
        title: '人事聘用意见',
        itemGName: 'md12',
        labelGName: 'md2',
        children: [
          {
            name: 'personnelName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'personnelTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'personnel',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true
          }
        ]
      },
      {
        title: '总经理审批',
        itemGName: 'md12',
        labelGName: 'md2',
        children: [
          {
            name: 'directorName',
            title: '签名',
            type: 'lay-input',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'directorTime',
            title: '日期',
            type: 'lay-date',
            className: 'innerWrap',
            valueType: String,
            placeholder: true
          },
          {
            name: 'director',
            type: 'lay-textarea',
            valueType: String,
            placeholder: true
          }
        ]
      }
    ]
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
