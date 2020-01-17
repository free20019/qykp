;(function(Vue, _, layui, util, config, axios) {
  const vm = new Vue({
    el: '#root',
    data() {
      return {
        query:{
          person_name: '',
          department: '',
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
    beforeCreate() {
      layui.use(['table', 'laydate'], () => {
        var {data} = this.table
        var layTable = layui.table
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
      // this.$nextTick(() => {
      //   this.findPersonalMorningReport();
      // })
      // setTimeout(() => {
        this.findPersonalMorningReport();
      // }, 500)
    },
    computed: {},
    methods: {
      findPersonalMorningReport(){
        const {person_name, department} = this.query;
        axios.get('../../personnelMatters/findPersonalMorningReport', {
          params: {
            person_name,
            department
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
      handleQueryClick() {
        this.findPersonalMorningReport();
      },
      handleAddClick() {
        var checkStatus = layui.table.checkStatus('tw-table'); //idTest 即为基础参数 id 对应的值
        console.log(checkStatus.data) //获取选中行的数据
        console.log(checkStatus.isAll ) //表格是否全选
        if(checkStatus.data.length!==1){
          layer.msg("请选中一行！");
          return ;
        }
        this.dialog.form.PERSON_NAME = checkStatus.data[0].PERSON_NAME;
        this.dialog.form.DEPARTMENT = checkStatus.data[0].DEPARTMENT;
        this.dialog.form.COMMIT_DATE = checkStatus.data[0].COMMIT_DATE;
        this.dialog.form.YESTERDAY_PROGRESS = checkStatus.data[0].YESTERDAY_PROGRESS;
        this.dialog.form.AWAIT_SOLUTION = checkStatus.data[0].AWAIT_SOLUTION;
        this.dialog.form.TODAY_PLAN = checkStatus.data[0].TODAY_PLAN;

        var html = this.createFormHtml('编辑')
        layer.open(config.layerOptions('查看个人晨报', this.closeLayerOpen))
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
