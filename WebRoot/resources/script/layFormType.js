class LayForm extends MBase {
  constructor(source, model, options) {
    super(source, model, options)

    // this.initData(options.name)

    this.layInputEl = this.createLayInputEl
    this.layDateEl = this.createLayDateEl
    this.laySelectEl = this.createLaySelectEl
    this.layTextAreaEl = this.createLayTextAreaEl
    this.layButtonEl = this.createLayButtonEl

    this.init = this.layFormType
    this.set = this.setData
  }
  /**
   * 创建输入框
   *
   * @returns
   * @memberof LayForm
   */
  createLayInputEl(columns) {
    const { source, options, layInputAttr, handleInputKeyUp } = this
    columns = columns || options
    const className = util.addClassName(['layui-input', columns.className])
    const input = $('<input>').addClass(className)
    input.attr(layInputAttr(columns, true))
    input.data('options', columns)
    const item = util.getDate(source, columns.index)
    input.val(item[columns.name])
    input.on('keyup', event => handleInputKeyUp(this, event))
    return input
  }
  /**
   * 创建时间输入框
   *
   * @param {*} columns
   * @returns
   * @memberof LayForm
   */
  createLayDateEl(columns) {
    const { source, model: vm, options, layInputAttr } = this
    columns = columns || options
    const className = ['tw-input-date', 'layui-input', columns.className]
    const newColumns = Object.assign({}, columns, { data: source, vm })
    const inputDate = $('<input>').addClass(util.addClassName(className))
    inputDate.attr(layInputAttr(columns, false))
    inputDate.data('options', newColumns)
    const item = util.getDate(source, columns.index)
    inputDate.val(item[columns.name])
    return inputDate
  }
  /**
   * 创建文本框
   *
   * @returns
   * @memberof LayForm
   */
  createLayTextAreaEl(columns) {
    const { source, options, layInputAttr, handleInputKeyUp } = this
    columns = columns || options
    const className = util.addClassName(['layui-textarea', columns.className])
    const textarea = $('<textarea>').addClass(className)
    textarea.attr(layInputAttr(columns, true))
    textarea.data('options', columns)
    const item = util.getDate(source, columns.index)
    textarea.val(item[columns.name])
    textarea.on('keyup', event => handleInputKeyUp(this, event))
    return textarea
  }
  /**
   * 创建下拉框
   *
   * @returns
   * @memberof LayForm
   */
  createLaySelectEl(columns) {
    const { source, options, layInputAttr, handleInputKeyUp } = this
    columns = columns || options
    const className = util.addClassName(['layui-select', columns.className])
    const select = $('<select>').addClass(className)
    select.html(
      _.map(columns.options, item => {
        const option = $('<option>')
        option.attr('value', item.value)
        option.text(item.label)
        return option
      })
    )
    select.attr(layInputAttr(columns, true))
    select.data('options', columns)
    const item = util.getDate(source, columns.index)
    select.val(item[columns.name])
    select.on('keyup', event => handleInputKeyUp(this, event))
    return select
  }

  createLayButtonEl(columns) {
    columns = columns || this.options
    console.info('creatLayButtonEl:', columns, this.layButtonClassName(columns))
    const button = $('<a>').addClass(this.layButtonClassName(columns))
    button.attr({ href: columns.href || 'javascript:void(0);' })
    return button
  }
  /**
   * 表单属性配置
   *
   * @param {*} columns
   * @param {*} hasInput
   * @returns
   */
  layInputAttr(columns, hasInput) {
    const label = columns.title || columns.label
    const type = hasInput ? '请输入' : '请选择'
    return {
      name: columns.name,
      required: columns.required,
      'lay-verify': columns['lay-verify'],
      disabled: columns.disabled,
      placeholder: util.attrPlaceholder(
        columns.placeholder,
        label && type + label
      ),
      autocomplete: columns.autocomplete || 'off'
    }
  }

  /**
   * 按钮样式配置
   *
   * @param {*} columns
   * @returns
   * @memberof LayForm
   */
  layButtonClassName(columns) {
    columns = columns || this.options
    const { layType: ot, size: os, className, radius, disabled } = columns
    const sizeType = ['lg', 'sm', 'xs']
    const types = ['primary', 'normal', 'warm', 'danger', 'disabled']
    const radiusC = (radius && 'layui-btn-radius') || ''
    const disabledC = (disabled && 'layui-btn-disabled') || ''
    console.info('lay---------------:', columns)
    const btnST = ot && types.indexOf(ot) >= 0 ? 'layui-btn-' + ot : false || ''
    const size =
      os && sizeType.indexOf(os) >= 0 ? 'layui-btn-' + os : false || ''
    const classList = ['layui-btn', className, btnST, size, radiusC, disabledC]
    return util.addClassName(classList)
  }
  /**
   * 类型判断
   *
   * @param {*} columns
   * @param {*} index
   * @returns
   * @memberof EditData
   */
  layFormType({ hasInitValue, index }) {
    const { source, options: columns } = this
    // if (hasInitValue === true) this.init(columns.name)
    if (hasInitValue === true) this.initData(columns.name)
    const newColumns = $.extend({}, columns, { value: source[columns.name] })
    if (index != null) newColumns.index = index
    if (columns.type === 'lay-input') return this.layInputEl(newColumns)
    else if (columns.type === 'lay-date') return this.layDateEl(newColumns)
    else if (columns.type === 'lay-select') return this.laySelectEl(newColumns)
    else if (columns.type === 'lay-textarea')
      return this.layTextAreaEl(newColumns)
    else if (columns.type === 'lay-button') {
      newColumns.size = 'sm'
      newColumns.radius = true
      if (util.hasArray(columns.btnType)) {
        if (columns.btnType.indexOf('remove') >= 0) {
          newColumns.layType = 'danger'
          newColumns.className = 'layui-icon layui-icon-delete'
          return this.layButtonEl(newColumns)
        }
      }
      return this.layButtonEl(newColumns)
    }
  }
  /**
   * 初始化数据
   *
   * @param {*} name 字段名
   * @memberof EditData
   */
  initData(name) {
    const source = util.getDate(this.source, this.options.index)
    if (source && source[name] == null) this.setData(name, '')
  }
  /**
   * 赋值
   *
   * @param {*} name 字段名
   * @param {*} value 值
   * @memberof EditData
   */
  setData(name, value) {
    const source = util.getDate(this.source, this.options.index)
    if (source) this.model.$set(source, name, value || '')
  }
  /**
   * 输入框鼠标抬起实际按
   *
   * @param {*} editData
   * @param {*} event
   * @memberof LayForm
   */
  handleInputKeyUp(editData, event) {
    const value = $(event.currentTarget).val()
    const options = $(event.currentTarget).data('options')
    const data = util.getDate(editData.source, options.index)
    editData.set(options.name, value)
    if (data[options.name] == null)
      editData.model.$set(data, options.name, value)
    else data[options.name] = value
  }
}
