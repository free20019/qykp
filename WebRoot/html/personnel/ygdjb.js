;(function(Vue, _, layui, util, config, axios) {
  var $, layer
  var vm = new Vue({
    el: '#root',
    data() {
      return {
        layLoaded: false,
        table: {
          el: null,
          cols: config.tableColumn
        },
        dialog: {
          editData: null,
          tableResume: null,
          tableFamily: null,
          form: {
            resume: [],
            family: []
          }
        }
      }
    },
    beforeCreate() {
      layui.use(['table', 'laydate'], () => {
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
          data: []
        })
        vm.layLoaded = true
      })
    },
    mounted() {
      if (!this.dialog.editData)
        this.dialog.editData = new EditData(
          this.dialog.form,
          this,
          config.editItem()
        )
      var data = [
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' },
        { id: '123', name: '炸SAN' }
      ]
      setTimeout(() => {
        vm.table.el.reload({ data })
      }, 1000)
    },
    computed: {
      resumeTableColumns() {
        const className = 'table-resume'
        return {
          ...config.resumeTableColumns(),
          className,
          hasAdd: true,
          hasRemove: true,
          addClick: this.handleAddResumeClick
        }
      },
      familyTableColumns() {
        var className = 'table-family'
        return {
          ...config.familyTableColumns(),
          className,
          hasAdd: true,
          hasRemove: true,
          addClick: this.handleAddFamilyClick
        }
      }
    },
    methods: {
      handleAddResumeClick() {
        this.dialog.tableResume.push(config.resumeDefItem())
      },
      handleAddFamilyClick() {
        this.dialog.tableFamily.push(config.familyDefItem())
      },
      handleQueryClick() {},
      handleAddClick() {
        this.dialog.form.resume = [config.resumeDefItem()]
        this.dialog.form.family = [config.familyDefItem()]
        var html = this.createFormHtml()
        layer.open(config.layerOptions('添加员工'))
        $('#dialogEdited').html(html)
        const { resume, family } = this.dialog.form
        const resumePanelOpt = config.panelOptions('本人简历')
        const familyPanelOpt = config.panelOptions('家庭成员情况')
        const panelResume = new MPanel(this, resumePanelOpt)
        panelResume.init()
        const tableResume = new MTable(resume, this, this.resumeTableColumns)
        this.dialog.tableResume = tableResume
        tableResume.init()
        const familyPanel = new MPanel(this, familyPanelOpt)
        familyPanel.init()
        const tableFamily = new MTable(family, this, this.familyTableColumns)
        this.dialog.tableFamily = tableFamily
        tableFamily.init()
        util.wrapEl('#dialogEdited', 'md6')
      },
      createFormHtml() {
        const editData = this.dialog.editData
        editData.options = config.editItem()
        return $('<div>')
          .addClass('tw-form')
          .html(editData.initTag())
      },
      panelOption(title) {
        return {
          title: title,
          titleAlign: 'center',
          titleFontSize: 18,
          className: 'layui-col-md12'
        }
      }
    }
  })
})(Vue, _, layui, util, config, axios)
