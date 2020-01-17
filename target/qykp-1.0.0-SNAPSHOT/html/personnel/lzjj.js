;(function(Vue, _, layui, util, config, axios) {
  var $, layer, form
  var vm = new Vue({
    el: '#root',
    data() {
      return {
        layLoaded: false,
        query:{
          person_name: '',
          post: '',
        },
        table: {
          el: null,
          data:[],
          cols: config.tableColumn
        },
        dialog: {
          editData: null,
          form: {
            handover: []
          }
        },
        selectItem: [],
        selectType: 0,
      }
    },
    beforeCreate() {
      layui.use(['table', 'laydate'], () => {
        var {data} = this.table
        var layTable = layui.table
        $ = layui.jquery
        layer = layui.layer
        form = layui.form
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
      this.findTurnoverHandover();
    },
    computed: {},
    methods: {
      findTurnoverHandover(){
        const {person_name, post} = this.query;
        axios.get('../../personnelMatters/findTurnoverHandover', {
          params: {
            person_name,
            post
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
      addTurnoverHandover(){
        var {person_name,post,separation_time,work_handover,net_handover,general_handover} =this.dialog.form
        if(person_name===''||post===''||separation_time===''||work_handover===''||net_handover===''||general_handover===''){
          layer.msg("请填写完整信息！");
          return ;
        }
        let params = new URLSearchParams();
        params.append('person_name', person_name);
        params.append('post', post);
        params.append('separation_time', separation_time);
        params.append('work_handover', work_handover);
        params.append('net_handover', net_handover);
        params.append('general_handover', general_handover);
        axios.post('../../personnelMatters/addTurnoverHandover',params, {
        }).then(res => {
          if(res.data>0){
            layer.closeAll(); //疯狂模式，关闭所有层
            layer.msg("操作成功！");
            this.findTurnoverHandover();
          }else if (res.data===0){
            layer.msg("操作失败！");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
      auditTurnoverHandover(){
        var {selectType, selectItem} = this
        var {manager ,manager_time ,dept_name ,dept_time ,dept_remarks ,net_name ,net_time ,net_remarks ,general_name ,general_time ,general_remarks} =this.dialog.form
        let params = new URLSearchParams();
        if(selectType===1){
          if(dept_name===''||dept_time===''||dept_remarks===''){
            layer.msg("请填写完整信息！");
            return ;
          }
          params.append('dept_name', dept_name);
          params.append('dept_time', dept_time);
          params.append('dept_remarks', dept_remarks);
        }else if(selectType===2){
          if(net_name===''||net_time===''||net_remarks===''||general_name===''||general_time===''||general_remarks===''){
            layer.msg("请填写完整信息！");
            return ;
          }
          params.append('net_name', net_name);
          params.append('net_time', net_time);
          params.append('net_remarks', net_remarks);
          params.append('general_name', general_name);
          params.append('general_time', general_time);
          params.append('general_remarks', general_remarks);
        }else if(selectType===3){
          if(manager===''||manager_time===''){
            layer.msg("请填写完整信息！");
            return ;
          }
          params.append('manager', manager);
          params.append('manager_time', manager_time);
        }
        params.append('id', selectItem.ID);
        params.append('type', selectType);
        axios.post('../../personnelMatters/auditTurnoverHandover',params, {
        }).then(res => {
          if(res.data>0){
            layer.closeAll(); //疯狂模式，关闭所有层
            layer.msg("操作成功！");
            this.findTurnoverHandover();
          }else if (res.data===0){
            layer.msg("操作失败！");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
      dialogDetails(checkStatus){
        this.selectItem = checkStatus.data[0];
        this.dialog.form.person_name = checkStatus.data[0].PERSON_NAME;
        this.dialog.form.post = checkStatus.data[0].POST;
        this.dialog.form.separation_time = checkStatus.data[0].SEPARATION_TIME;
        this.dialog.form.work_handover = checkStatus.data[0].WORK_HANDOVER;
        this.dialog.form.net_handover = checkStatus.data[0].NET_HANDOVER;
        this.dialog.form.general_handover = checkStatus.data[0].GENERAL_HANDOVER;
        this.dialog.form.manager = checkStatus.data[0].MANAGER;
        this.dialog.form.manager_time = checkStatus.data[0].MANAGER_TIME;
        this.dialog.form.dept_name = checkStatus.data[0].DEPT_NAME;
        this.dialog.form.dept_time = checkStatus.data[0].DEPT_TIME;
        this.dialog.form.dept_remarks = checkStatus.data[0].DEPT_REMARKS;
        this.dialog.form.net_name = checkStatus.data[0].NET_NAME;
        this.dialog.form.net_time = checkStatus.data[0].NET_TIME;
        this.dialog.form.net_remarks = checkStatus.data[0].NET_REMARKS;
        this.dialog.form.general_name = checkStatus.data[0].GENERAL_NAME;
        this.dialog.form.general_time = checkStatus.data[0].GENERAL_TIME;
        this.dialog.form.general_remarks = checkStatus.data[0].GENERAL_REMARKS;
      },
      handleQueryClick() {
        this.findTurnoverHandover()
      },
      handleDetailsClick() {
        var checkStatus = layui.table.checkStatus('tw-table'); //idTest 即为基础参数 id 对应的值
        if(checkStatus.data.length!==1){
          layer.msg("请选中一行！");
          return ;
        }
        this.dialogDetails(checkStatus);
        const tableHandover = config.tableHandoverColumn('经办人')
        this.dialog.form.handover = [
          {
            department: '部门工作',
            handoverContent: this.dialog.form.work_handover,
            signature: this.dialog.form.dept_name,
            date: this.dialog.form.dept_time,
            remarks: this.dialog.form.dept_remarks,
          },
          {
            department: '网络管理',
            handoverContent:  this.dialog.form.net_handover,
            signature:  this.dialog.form.net_name,
            date:  this.dialog.form.net_time,
            remarks:  this.dialog.form.net_remarks,
          },
          {
            department: '综合部',
            handoverContent:  this.dialog.form.general_handover,
            signature:  this.dialog.form.general_name,
            date:  this.dialog.form.general_time,
            remarks:  this.dialog.form.general_remarks,
          }
        ]
        var html = this.createFormHtml('查看', true)
        layer.open(config.layerOptions('会议纪要-详情', this.closeLayerOpen))
        $('#dialogEdited').html(html)
        const table = new MTable(this.dialog.form.handover, this, tableHandover)
        table.init()
        util.layDateControl(this)
      },
      handleAddClick() {
        this.dialog.form.work_handover = ''
        this.dialog.form.net_handover = ''
        this.dialog.form.general_handover = ''
        var html = this.createFormHtml('申请')
        var options = config.layerOptions('离职交接-添加', this.closeLayerOpen)
        options.btn = ['添加', '取消']
        var _this=this;
        options.yes = function (index,lay) {
          _this.addTurnoverHandover();
          return false
        }
        options.cancel= function(){
        }
        layer.open(options)
        $('#dialogEdited').html(html)
        util.layDateControl(this)
      },
      handleDepManagerClick() {
        var checkStatus = layui.table.checkStatus('tw-table'); //idTest 即为基础参数 id 对应的值
        if(checkStatus.data.length!==1){
          layer.msg("请选中一行！");
          return ;
        }
        this.dialogDetails(checkStatus);
        const tableHandover = config.tableHandoverColumn()
        this.$set(this.dialog.form, 'handover', [
          {
                department: '部门工作',
                handoverContent: this.dialog.form.work_handover,
                signature: this.dialog.form.dept_name,
                date: this.dialog.form.dept_time,
                remarks: this.dialog.form.dept_remarks,
          }
        ])
        var html = this.createFormHtml('部门')
        var options = config.layerOptions('离职交接-添加', this.closeLayerOpen)
        options.btn = ['确定', '取消']
        var _this=this;
        options.yes = function (index,lay) {
          _this.selectType=1;
          _this.dialog.form.dept_name = _this.dialog.form.handover[0].signature;
          _this.dialog.form.dept_time =  _this.dialog.form.handover[0].date;
          _this.dialog.form.dept_remarks =  _this.dialog.form.handover[0].remarks;

          _this.auditTurnoverHandover();
          return false
        }
        options.cancel= function(){
        }
        layer.open(options)
        $('#dialogEdited').html(html)
        const table = new MTable(this.dialog.form.handover, this, tableHandover)
        table.init()
        util.layDateControl(this)
      },
      handleGeneralDepClick() {
        var checkStatus = layui.table.checkStatus('tw-table'); //idTest 即为基础参数 id 对应的值
        if(checkStatus.data.length!==1){
          layer.msg("请选中一行！");
          return ;
        }
        this.dialogDetails(checkStatus);
        const tableHandover = config.tableHandoverColumn()
        this.dialog.form.handover = [
          {
            department: '网络管理',
            handoverContent:  this.dialog.form.net_handover,
            signature:  this.dialog.form.net_name,
            date:  this.dialog.form.net_time,
            remarks:  this.dialog.form.net_remarks,
          },
          {
            department: '综合部',
            handoverContent:  this.dialog.form.general_handover,
            signature:  this.dialog.form.general_name,
            date:  this.dialog.form.general_time,
            remarks:  this.dialog.form.general_remarks,
          }
        ]
        var html = this.createFormHtml('部门')
        var options = config.layerOptions('离职交接-添加', this.closeLayerOpen)
        options.btn = ['确定', '取消']
        var _this=this;
        options.yes = function (index,lay) {
          _this.selectType=2;
          _this.dialog.form.net_name = _this.dialog.form.handover[0].signature;
          _this.dialog.form.net_time =  _this.dialog.form.handover[0].date;
          _this.dialog.form.net_remarks =  _this.dialog.form.handover[0].remarks;
          _this.dialog.form.general_name = _this.dialog.form.handover[1].signature;
          _this.dialog.form.general_time =  _this.dialog.form.handover[1].date;
          _this.dialog.form.general_remarks =  _this.dialog.form.handover[1].remarks;
          _this.auditTurnoverHandover();
          return false
        }
        options.cancel= function(){
        }
        layer.open(options)
        $('#dialogEdited').html(html)
        const table = new MTable(this.dialog.form.handover, this, tableHandover)
        table.init()
        util.layDateControl(this)
      },
      handleManagerClick() {
        var checkStatus = layui.table.checkStatus('tw-table'); //idTest 即为基础参数 id 对应的值
        if(checkStatus.data.length!==1){
          layer.msg("请选中一行！");
          return ;
        }
        this.dialogDetails(checkStatus);
        const tableHandover = config.tableHandoverColumn('经办人')
        this.dialog.form.handover = [
          {
            department: '部门工作',
            handoverContent: this.dialog.form.work_handover,
            signature: this.dialog.form.dept_name,
            date: this.dialog.form.dept_time,
            remarks: this.dialog.form.dept_remarks,
          },
          {
            department: '网络管理',
            handoverContent:  this.dialog.form.net_handover,
            signature:  this.dialog.form.net_name,
            date:  this.dialog.form.net_time,
            remarks:  this.dialog.form.net_remarks,
          },
          {
            department: '综合部',
            handoverContent:  this.dialog.form.general_handover,
            signature:  this.dialog.form.general_name,
            date:  this.dialog.form.general_time,
            remarks:  this.dialog.form.general_remarks,
          }
        ]
        const html = this.createFormHtml('经办人', true)
        var options = config.layerOptions('离职交接-添加', this.closeLayerOpen)
        options.btn = ['确定', '取消']
        var _this=this;
        options.yes = function (index,lay) {
          _this.selectType=3;
          _this.auditTurnoverHandover();
          return false
        }
        options.cancel= function(){
        }
        layer.open(options)
        $('#dialogEdited').html(html)
        const table = new MTable(this.dialog.form.handover, this, tableHandover)
        table.init()
        util.layDateControl(this)
      },
      createFormHtml(type, confirm) {
        const editData = this.dialog.editData
        editData.options = config.editItem(type, confirm)
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
