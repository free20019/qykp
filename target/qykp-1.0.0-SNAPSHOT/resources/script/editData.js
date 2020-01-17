class EditData extends MBase {
  constructor(source, model, options) {
    super(source, model, options)

    this.initTag = () => {
      if (util.hasArray(this.options)) {
        return _.map(this.options, item => {
          const labelGName = item.labelGName
          const itemGName = item.itemGName
          let els
          if (util.hasObject(item.children))
            els = this.createEachElements(item.children, item.title)
          else if (util.hasArray(item.children)) {
            els = _.map(item.children, _item => {
              return this.createEachElements(_item, item.title)
            })
          }
          const labelEl = this.createItemLabelEl(item)
          const centerEl = this.createItemCenterEl(item, els)
          if (item.typeEl === 'table')
            return $('<div>')
              .addClass(
                util.addClassName([
                  'tw-form-item',
                  itemGName && 'layui-col-' + itemGName
                ])
              )
              .attr({ id: item.idEl })
          return $('<div>')
            .addClass(() => {
              return util.addClassName([
                'tw-form-item',
                labelGName && 'layui-row',
                itemGName && 'layui-col-' + itemGName
              ])
            })
            .html([labelEl, centerEl])
        })
      }
    }

    // this.layInputEl = columns => {
    //   var className = util.addClassName(['layui-input', columns.className])
    //   return $('<input>')
    //     .addClass(className)
    //     .attr(util.layInputAttr(columns, true))
    //     .data('options', columns)
    //     .on('keyup', event => this.handleInputKeyUp(this, event))
    //     .val(this.source[columns.name])
    // }
    // this.layDateEl = options => {
    //   var className = util.addClassName([
    //     'tw-input-date',
    //     'layui-input',
    //     options.className
    //   ])
    //   var label = options.title || options.label
    //   var inputDate = $('<input>')
    //     .addClass(className)
    //     .attr({
    //       name: options.name,
    //       required: options.required,
    //       'lay-verify': options['lay-verify'],
    //       disabled: options.disabled,
    //       placeholder: util.attrPlaceholder(
    //         options.placeholder,
    //         label && '请选择' + label
    //       ),
    //       autocomplete: options.autocomplete || 'off'
    //     })
    //     .val(this.source[options.name])
    //   inputDate.data('options', {
    //     ...options,
    //     source: this.source,
    //     vm: this.mode
    //   })
    //   return inputDate
    // }
    // this.layTextAreaEl = options => {
    //   var className = util.addClassName(['layui-textarea', options.className])
    //   var label = options.title || options.label
    //   return $('<textarea>')
    //     .addClass(className)
    //     .attr({
    //       name: options.name,
    //       required: options.required,
    //       'lay-verify': options['lay-verify'],
    //       disabled: options.disabled,
    //       placeholder: util.attrPlaceholder(
    //         options.placeholder,
    //         label && '请输入' + label
    //       )
    //     })
    //     .data('options', options)
    //     .on('keyup', event => this.handleInputKeyUp(this, event))
    //     .val(this.source[options.name])
    // }
    // this.layButtonEl = columns => {
    //   // var ot = columns.type
    //   // var os = columns.size
    //   // var sizeType = ['lg', 'sm', 'xs']
    //   // var type = ['primary', 'normal', 'warm', 'danger', 'disabled']
    //   // var radius = (columns.radius && 'layui-btn-radius') || ''
    //   // var disabled = (columns.disabled && 'layui-btn-disabled') || ''
    //   // var btnST = ot && type.indexOf(ot) >= 0 ? 'layui-btn-' + ot : false || ''
    //   // var size =
    //   //   os && sizeType.indexOf(os) >= 0 ? 'layui-btn-' + os : false || ''
    //   // var className = util.addClassName([
    //   //   'layui-btn',
    //   //   columns.className,
    //   //   btnST,
    //   //   size,
    //   //   radius,
    //   //   disabled
    //   // ])
    //   return $('<a>')
    //     .addClass(util.layButtonClassName(columns))
    //     .attr({ href: columns.href || 'javascript:void(0);' })
    // }
    this.clearDate = () => {
      _.each(this.options, item => {
        if (util.hasObject(item.children)) {
          const column = item.children
          this.source[column.name]
          this.clearEachData(item.children)
        } else if (util.hasArray(item.children)) {
          _.each(item.children, _item => {
            this.clearEachData(_item)
          })
        }
      })
    }
  }

  /**
   * 表单每项标题
   *
   * @param {*} column 配置项
   * @returns
   * @memberof EditData
   */
  createItemLabelEl(column) {
    const labelGName = column.labelGName
    return $('<label>')
      .addClass(() => {
        return util.addClassName([
          'layui-form-label',
          labelGName && 'layui-col-' + labelGName
        ])
      })
      .text(column.title + '：')
  }
  /**
   * 表单每项内容
   *
   * @param {*} column 配置项
   * @param {*} append 内容[可以是String也可以是DOM]
   * @returns
   * @memberof EditData
   */
  createItemCenterEl(column, append) {
    const labelGName = column.labelGName
    const gridClassName = util.layColOffsetClassName(labelGName)
    const className = util.addClassName(['layui-input-block', gridClassName])
    return $('<div>')
      .addClass(className)
      .html(append)
  }
  /**
   * 遍历配置参数并初始化参数
   *
   * @param {*} columns 配置项
   * @param {*} title 标题
   * @returns
   * @memberof EditData
   */
  createEachElements(columns, title) {
    const { source, model } = this
    if (!util.hasObject(columns)) return
    if (!columns.title) columns.title = title
    // this.initData(columns.name)
    const layForm = new LayForm(source, model, columns)
    return layForm.init({ hasInitValue: true })
    // return this.layFormType(columns)
  }
  // /**
  //  * 类型判断
  //  *
  //  * @param {*} columns
  //  * @param {*} index
  //  * @returns
  //  * @memberof EditData
  //  */
  // layFormType(columns, index) {
  //   var newColumns = $.extend({}, { value: this.source[columns.name] }, columns)
  //   if (index != null) newColumns.index = index
  //   util.layFormType(columns, newColumns)
  // }

  // /**
  //  * 初始化数据
  //  *
  //  * @param {*} name 字段名
  //  * @memberof EditData
  //  */
  // initData(name) {
  //   if (this.source && this.source[name] == null) this.setDate(name, '')
  // }

  /**
   * 赋值
   *
   * @param {*} name 字段名
   * @param {*} value 值
   * @memberof EditData
   */
  setDate(name, value) {
    const source = util.getDate(this.source, this.options.index)
    if (source) this.model.$set(source, name, value || '')
  }

  clearEachData(columns) {
    if (!util.hasObject(columns)) return
    if (columns.valueType === Array) this.setDate(columns.name, [])
    else if (columns.valueType === Object) this.setDate(columns.name, {})
    else this.setDate(columns.name, '')
  }
  handleInputKeyUp(editData, event) {
    const value = $(event.currentTarget).val()
    const options = $(event.currentTarget).data('options')
    console.info('2qwe:')
    editData.setDate(options.name, value)
  }
}
