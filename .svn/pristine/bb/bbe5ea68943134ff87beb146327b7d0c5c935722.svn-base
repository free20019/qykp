var _tableColumn = [
  [
    { type: 'checkbox', title: '选择', width: 60, align: 'center'},
    { field: 'gridId', title: '编号', width: 80, align: 'center' },
    { field: 'PERSON_NAME', title: '离职人', width: 140, align: 'center' },
    { field: 'POST', title: '离职人岗位', width: 140, align: 'center' },
    { field: 'SEPARATION_TIME', title: '离岗日期', width: 140, align: 'center' },
    {
      field: 'WORK_HANDOVER',
      title: '工作内容交接',
      width: 240,
      align: 'center'
    },
    {
      field: 'NET_HANDOVER',
      title: '网络管理交接',
      width: 240,
      align: 'center'
    },
    {
      field: 'GENERAL_HANDOVER',
      title: '综合部交接',
      minWidth: 240,
      align: 'center'
    },
    {
      field: 'DEPT_STATUS',
      title: '部门经理审核状态',
      minWidth: 140,
      align: 'center'
    },
    {
      field: 'NET_STATUS',
      title: '系统管理员审核状态',
      width: 140,
      align: 'center'
    },
    {
      field: 'GENERAL_STATUS',
      title: '经理审核状态',
      width: 140,
      align: 'center'
    },
    {
      field: 'MANAGER',
      title: '经办人',
      width: 140,
      align: 'center'
    },
    {
      field: 'MANAGER_TIME',
      title: '经办人日期',
      width: 140,
      align: 'center'
    }
  ]
]
var config = {
  tableColumn: _tableColumn,
  tableHandoverColumn(type) {
    const columns = [
      {
        name: 'department',
        title: '部门',
        width: 120,
        type: 'text',
        align: 'center'
      },
      {
        name: 'handoverContent',
        title: '交接内容',
        minWidth: 300,
        type: 'text',
        headerAlign: 'center'
      },
      {
        name: 'signature',
        title: '签字',
        width: 100,
        type: 'lay-input',
        headerAlign: 'center',
        disabled: type === '经办人'
      },
      {
        name: 'date',
        title: '日期',
        width: 120,
        type: 'lay-date',
        headerAlign: 'center',
        disabled: type === '经办人'
      },
      {
        name: 'remarks',
        title: '备注',
        width: 280,
        type: 'lay-input',
        headerAlign: 'center',
        disabled: type === '经办人'
      }
    ]
    return {
      id: 'tableHandover',
      columns
    }
  },
  editItem(type, confirm) {
    const disLook = type === '查看'
    const disabled = disLook || type === '部门' || type === '经办人'
    const columns = [
      {
        title: '离职人',
        itemGName: 'md4',
        children: {
          name: 'person_name',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '离职人岗位',
        itemGName: 'md4',
        children: {
          name: 'post',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '离岗日期',
        itemGName: 'md4',
        children: {
          name: 'separation_time',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      }
    ]
    if (type === '申请') {
      columns.push({
        title: '工作交接',
        itemGName: 'md12',
        children: {
          name: 'work_handover',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true
        }
      })
      columns.push({
        title: '网络管理',
        itemGName: 'md12',
        children: {
          name: 'net_handover',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true
        }
      })
      columns.push({
        title: '综合部交接',
        itemGName: 'md12',
        children: {
          name: 'general_handover',
          type: 'lay-textarea',
          valueType: String,
          placeholder: true
        }
      })
    } else if (disabled) {
      columns.push({
        idEl: 'tableHandover',
        typeEl: 'table',
        title: '离职交接信息',
        itemGName: 'md12'
      })
    }
    if ((disLook && confirm === true) || confirm === true) {
      columns.push({
        title: '经办人',
        itemGName: 'md8',
        children: {
          name: 'manager',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled: disLook
        }
      })
      columns.push({
        title: '日期',
        itemGName: 'md4',
        children: {
          name: 'manager_time',
          type: 'lay-date',
          valueType: String,
          placeholder: '请选择经办人日期',
          disabled: disLook
        }
      })
    }
    return columns
  },
  handoverContent(type, hasHtml) {
    const contents = {
      department: [
        '1、工作内容移交表',
        '2、磁盘、光盘等工作内容资料',
        '3、其他：'
      ],
      networkManage: [
        '1、电脑交接',
        '2、相关硬件信息：　鼠标、键盘、椅子等',
        '3、删除域内信息',
        '4、门禁卡等'
      ],
      generalDep: [
        '1、书籍、资料等',
        '2、办公桌及钥匙、办公用品、饭卡',
        '3、是否有借款及其他未结清帐物',
        '4、社保、公积金截止交纳月份：'
      ]
    }
    let content = undefined
    let replace = hasHtml === true ? '<br>' : '\r\n'
    if (type === '部门') content = contents.department
    else if (type === '网络') content = contents.networkManage
    else if (type === '综合') content = contents.generalDep
    if (util.hasArray(content)) return content.join(replace)
    return ''
  },
  layerOptions(title, cb) {
    return {
      id: 'dialogEdited',
      type: 1,
      title,
      area: ['1100px', '550px'],
      content: '',
      end() {
        if (cb) cb()
      }
    }
  }
}
