;(function(Vue, _, layui, util, config, axios) {
    var $, layer, form, laydate
  var vm = new Vue({
    el: '#root',
    data() {
      return {
        layLoaded: false,
        query:{
          stime: formatYYYYMMDD(new Date()),
          etime: formatYYYYMMDD(new Date()),
        },
        table: {
          el: null,
          data:[],
          cols: config.tableColumn
        },
        dialog: {
          editData: null,
          form: {}
        }
      }
    },
    created() {
        var _this = this;
      layui.use(['table', 'laydate'], () => {
        laydate = layui.laydate;
        laydate.render({
            elem: '.layui-date1', //指定元素
            value: _this.query.stime,
            format:'yyyy-MM-dd',
            done(value) {
                _this.query.stime=value;
            }
        });
        laydate.render({
          elem: '.layui-date2', //指定元素
            value: _this.query.etime,
            format:'yyyy-MM-dd',
            done(value) {
                _this.query.etime=value;
            }
        });
        var {data} = this.table
        var layTable = layui.table
          form = layui.form
        $ = layui.jquery
        layer = layui.layer
        vm.table.el = layTable.render({
          id: 'tw-table',
          elem: '.tw-table-placeholder',
          height: 'full-80',
          size: 'sm',
          page: true,
          limit: 50,
          cols: vm.table.cols,
          data
        })
        vm.layLoaded = true
      })
    },
    mounted() {
      if (!this.dialog.editData)
        this.dialog.editData = new EditData(
          this.dialog.form,
          this,
          config.editItem('编辑')
        )
      this.findMeetingMinutes();
    },
    computed: {},
    methods: {
      findMeetingMinutes(){
        const {stime, etime} = this.query;
        axios.get('../../personnelMatters/findMeetingMinutes', {
          params: {
            stime: stime&&formatYYYYMMDD(stime),
            etime: etime&&formatYYYYMMDD(etime),
          }
        }).then(res => {
          this.table.data = _.each(res.data,(item,index)=>{
            item.gridId=index+1;
          })||[];
          if(this.table.el) this.table.el.reload({ data:this.table.data })
        }).catch(function (error) {
          console.log(error);
        });
      },
      addMeetingMinutes(){
        var {meeting_time,meeting_place,participants,host_meeting,meeting_record,job_summary,next_week_work,decision_matter} =this.dialog.form
        if(meeting_time===''||meeting_place===''||participants===''||host_meeting===''||meeting_record===''||job_summary===''||next_week_work===''||decision_matter===''){
          layer.msg("请填写完整信息！");
          return ;
        }
        let params = new URLSearchParams();
        params.append('meeting_time', meeting_time);
        params.append('meeting_place', meeting_place);
        params.append('participants', participants);
        params.append('host_meeting', host_meeting);
        params.append('meeting_record', meeting_record);
        params.append('job_summary', job_summary);
        params.append('next_week_work', next_week_work);
        params.append('decision_matter', decision_matter);
        axios.post('../../personnelMatters/addMeetingMinutes',params, {
        }).then(res => {
          if(res.data>0){
            layer.closeAll(); //疯狂模式，关闭所有层
            layer.msg("操作成功！");
            this.findMeetingMinutes();
          }else if (res.data===0){
            layer.msg("操作失败！");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
      handleQueryClick() {
        this.findMeetingMinutes()
      },
      handleDetailsClick() {
        var checkStatus = layui.table.checkStatus('tw-table'); //idTest 即为基础参数 id 对应的值
        if(checkStatus.data.length!==1){
          layer.msg("请选中一行！");
          return ;
        }
        this.dialog.form.meeting_time = checkStatus.data[0].MEETING_TIME;
        this.dialog.form.meeting_place = checkStatus.data[0].MEETING_PLACE;
        this.dialog.form.participants = checkStatus.data[0].PARTICIPANTS;
        this.dialog.form.host_meeting = checkStatus.data[0].HOST_MEETING;
        this.dialog.form.meeting_record = checkStatus.data[0].MEETING_RECORD;
        this.dialog.form.job_summary = checkStatus.data[0].JOB_SUMMARY;
        this.dialog.form.next_week_work = checkStatus.data[0].NEXT_WEEK_WORK;
        this.dialog.form.decision_matter = checkStatus.data[0].DECISION_MATTER;

        var html = this.createFormHtml('查看')
        layer.open(config.layerOptions('会议纪要-详情', this.closeLayerOpen))
        $('#dialogEdited').html(html)
        util.layDateControl(this)
      },
      handleAddClick() {
        var html = this.createFormHtml()
        var options = config.layerOptions('会议纪要-添加', this.closeLayerOpen)
        options.btn = ['添加', '取消']
        var _this=this;
        options.yes = function (index,lay) {
          _this.addMeetingMinutes();
          return false
        }
        options.cancel= function(){
        }
        layer.open(options)
        $('#dialogEdited').html(html)
        util.layDateControl(this)
      },
      createFormHtml(type) {
        const editData = this.dialog.editData
        editData.options = config.editItem(type)
        return $('<div>')
          .addClass('tw-form')
          .html(editData.initTag())
      },
      closeLayerOpen() {
        this.dialog.editData.clearDate()
      }
    }
  })
})(Vue, _, layui, util, config, axios)
