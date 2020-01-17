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
      handleQueryClick() {},
      handleAddClick() {
        var html = this.createFormHtml()
        layer.open(config.layerOptions('离职申请'))
        $('#dialogEdited').html(html)
        util.wrapEl('#dialogEdited', 'md6')
        util.layDateControl(this)
      },
      handleDepartmentClick() {
        var html = this.createFormHtml('部门')
        layer.open(config.layerOptions('离职申请-部门审批'))
        $('#dialogEdited').html(html)
        util.wrapEl('#dialogEdited', 'md6')
        util.layDateControl(this)
      },
      handlePersonnelClick() {
        var html = this.createFormHtml('人事')
        layer.open(config.layerOptions('离职申请-人事审批'))
        $('#dialogEdited').html(html)
        util.wrapEl('#dialogEdited', 'md6')
        util.layDateControl(this)
      },
      handleManagerClick() {
        var html = this.createFormHtml('经理')
        layer.open(config.layerOptions('离职申请-总经理审批'))
        $('#dialogEdited').html(html)
        util.wrapEl('#dialogEdited', 'md6')
        util.layDateControl(this)
      },
      handleDetailsClick() {
        var html = this.createFormHtml('查看')
        layer.open(config.layerOptions('离职申请-详情'))
        $('#dialogEdited').html(html)
        util.wrapEl('#dialogEdited', 'md6')
      },
      createFormHtml(type) {
        const editData = this.dialog.editData
        editData.options = config.editItem(type)
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
