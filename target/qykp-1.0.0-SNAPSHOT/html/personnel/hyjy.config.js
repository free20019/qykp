var _tableColumn = [
  [
    { type: 'checkbox', title: '选择', width: 60, align: 'center'},
    { field: 'gridId', title: '编号', width: 80, align: 'center' },
    { field: 'MEETING_TIME', title: '会议时间', width: 140, align: 'center' },
    { field: 'MEETING_PLACE', title: '会议地点', width: 180, align: 'center' },
    { field: 'PARTICIPANTS', title: '参会人员', width: 240, align: 'center' },
    { field: 'HOST_MEETING', title: '会议主持', width: 120, align: 'center' },
    { field: 'MEETING_RECORD', title: '会议记录', width: 240, align: 'center' },
    {
      field: 'JOB_SUMMARY',
      title: '本周工作小结',
      minWidth: 240,
      align: 'center'
    },
    {
      field: 'NEXT_WEEK_WORK',
      title: '下周重点工作',
      minWidth: 240,
      align: 'center'
    },
    {
      field: 'DECISION_MATTER',
      title: '决定事项和要求',
      minWidth: 240,
      align: 'center'
    }
  ]
]

var config = {
  tableColumn: _tableColumn,
  editItem(type) {
    const disLook = type === '查看'
    const disabled = disLook
    const columns = [
      {
        title: '会议时间',
        itemGName: 'md4',
        children: {
          name: 'meeting_time',
          type: 'lay-date',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '会议地点',
        itemGName: 'md4',
        children: {
          name: 'meeting_place',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '参会人员',
        itemGName: 'md4',
        children: {
          name: 'participants',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '会议主持',
        itemGName: 'md4',
        children: {
          name: 'host_meeting',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '会议记录',
        itemGName: 'md8',
        children: {
          name: 'meeting_record',
          type: 'lay-input',
          valueType: String,
          placeholder: true,
          disabled
        }
      },
      {
        title: '工作小结',
        itemGName: 'md12',
        children: {
          name: 'job_summary',
          type: 'lay-textarea',
          valueType: String,
          placeholder: '请输入本周工作小结',
          disabled
        }
      },
      {
        title: '下周工作',
        itemGName: 'md12',
        children: {
          name: 'next_week_work',
          type: 'lay-textarea',
          valueType: String,
          placeholder: '请输入下周重点工作',
          disabled
        }
      },
      {
        title: '决定事项',
        itemGName: 'md12',
        children: {
          name: 'decision_matter',
          type: 'lay-textarea',
          valueType: String,
          placeholder: '请输入决定事项和要求',
          disabled
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
      area: ['1100px', '550px'],
      content: '',
      end() {
        if (cb) cb()
      }
    }
  }
}
