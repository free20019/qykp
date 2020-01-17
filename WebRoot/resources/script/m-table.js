class MTable extends MBase {
  constructor(source, model, options) {
    super(source, model, options)
    this.init = () => {
      // console.info('MTable-init:', options)
      if (!util.hasObject(this.options)) return
      // console.info('MTable:', $('#' + options.id))
      $('#' + options.id).html(this.createTableEl())
    }
    this.push = item => {
      const source = this.source
      if (util.hasArray(source) && util.hasObject(item)) {
        source.push(item)
        const bodyItemEl = this.createTableBodyColEl(item, source.length - 1)
        $('#' + options.id + ' .tw-table-wrapper').append(bodyItemEl)
        util.layDateControl(this.model)
      }
    }
  }
  createTableEl() {
    const { options: columns } = this
    var className = util.addClassName(['tw-table-imitate', columns.className])
    const table = $('<table>').addClass(className)
    return table.html([
      this.createTableHeaderEl(),
      this.createTableBodyEl(),
      this.createTableAddButtonEl()
    ])
  }

  /**
   * 表格头部标签
   *
   * @returns
   * @memberof MTable
   */
  createTableHeaderEl() {
    const columns = this.options.columns
    return $('<thead>').html(
      $('<tr>')
        .addClass('tw-table-row')
        .html(_.map(columns, this.createTableHeaderItemEl))
    )
  }

  /**
   * 表格头部配置
   *
   * @param {*} columns
   * @param {*} index
   * @returns
   * @memberof MTable
   */
  createTableHeaderItemEl(columns, index) {
    const className = util.addClassName([
      'tw-table-header',
      'tw-table-column_' + (index + 1)
    ])
    return $('<th>')
      .addClass(className)
      .css({
        width: util.cssUnit(columns.width),
        minWidth: util.cssUnit(columns.minWidth),
        textAlign: columns.headerAlign || columns.align
      })
      .text(columns.title)
  }

  /**
   * 表格主体
   *
   * @returns
   * @memberof MTable
   */
  createTableBodyEl() {
    const source = this.source
    var tableBody = $('<tbody>').addClass('tw-table-wrapper')
    if (source == null || source.length === 0) return tableBody
    return tableBody.html(
      _.map(source, (item, index) => {
        return this.createTableBodyColEl(item, index)
      })
    )
  }
  createTableBodyColEl(item, index) {
    // const { options: columns } = this
    const columns = this.options.columns
    const tableBody = _.map(columns, column => {
      return this.createTableBodyItemEl(column, item, index)
    })
    const tableRow = $('<tr>').addClass('tw-table-row')
    return tableRow.html(tableBody)
  }
  createTableBodyItemEl(columns, item, index) {
    const { source, model } = this
    const styles = { textAlign: columns.align }
    const layForm = new LayForm(source, model, columns)
    const element = layForm.init({ index })
    this.createTableBodyItemEvent(element, item, index)
    const tableBodyEl = $('<td>').addClass('tw-table-col')
    tableBodyEl.css(styles).html(element || item[columns.name])
    console.info('createTableBodyItemEl:', tableBodyEl, index)
    return tableBodyEl
  }
  createTableBodyItemEvent(element, item, index) {
    if (!element) return
    const { source, model, options } = this
    const { hasFunction, removeTableItem } = util
    const columns = options.columns
    element.on({
      click(e) {
        if (columns.type === 'button') {
          const hasRemove = columns.hasRemove
          const hasRemoveBtn = element.attr('class').indexOf('delete') >= 0
          if (hasRemove && hasRemoveBtn) {
            if (hasFunction(columns.beforeRemove)) columns.beforeRemove(item, e)
            if (source.length > 0 && source[index]) {
              source.splice(index, 1)
              removeTableItem(tableRow)
            }
            if (hasFunction(columns.afterRemove)) columns.afterRemove(item, e)
          }
        }
      }
      // keyup() {
      //   const value = source[index]
      //   value[columns.name] = $(this).val()
      //   console.info(source)
      //   // model.$set(source, index, value)
      // }
    })
  }
  // 表格底部添加按钮
  createTableAddButtonEl() {
    const { options } = this
    const columns = options.columns
    var footerItem = $('<td>').addClass('tw-table-col')
    var footer = $('<tr>').addClass('tw-table-row')
    if (util.hasArray(columns)) {
      var layButton = util.layButtonHtml({
        type: 'primary',
        className: 'tw-block tw-btn-add'
      })
      layButton.html('<i class="layui-icon layui-icon-add-1"></i>')
      layButton.on('click', function(e) {
        if (util.hasFunction(options.addClick)) options.addClick(e)
      })
      footerItem.html(layButton)
      footerItem.attr('colspan', Object.keys(columns).length)
    }
    if (util.hasBoolean(options.hasAdd) && options.hasAdd) {
      return $('<tfoot>')
        .addClass('tw-table-footer')
        .html(footer.html(footerItem))
    }
  }
}
