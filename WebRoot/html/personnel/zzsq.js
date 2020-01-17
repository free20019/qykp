;(function(Vue, _, layui, util, config, axios) {
  var $
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
          form: {}
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
          config.editItem('编辑')
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
        this.table.el.reload({ data })
      }, 1000)
    },
    computed: {},
    methods: {
      handleQueryClick() {},
      handleDetailsClick() {
        var html = this.createFormHtml('查看')
        layer.open(config.layerOptions('转正申请-详情', this.closeLayerOpen))
        $('#dialogEdited').html(html)
        util.layDateControl(this)
      },
      handleAddClick() {
        var html = this.createFormHtml()
        layer.open(config.layerOptions('转正申请', this.closeLayerOpen))
        $('#dialogEdited').html(html)
        util.layDateControl(this)
      },
      handleDepartmentClick() {
        var html = this.createFormHtml('部门')
        layer.open(
          config.layerOptions('转正申请-部门意见', this.closeLayerOpen)
        )
        $('#dialogEdited').html(html)
        util.layDateControl(this)
      },
      handlePersonnelClick() {
        var html = this.createFormHtml('人事')
        layer.open(
          config.layerOptions('转正申请-人事意见', this.closeLayerOpen)
        )
        $('#dialogEdited').html(html)
        util.layDateControl(this)
      },
      handleReviewClick() {
        this.dialog.form.entryTime = '2019-09-18'
        var html = this.createFormHtml('审批')
        layer.open(
          config.layerOptions('转正申请-总经理审核', this.closeLayerOpen)
        )
        $('#dialogEdited').html(html)
        util.layDateControl(this)
        util.wrapEl('#dialogEdited', 'md6')
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
