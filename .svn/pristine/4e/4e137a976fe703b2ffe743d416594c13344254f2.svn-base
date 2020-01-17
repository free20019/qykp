try {
  _
} catch (error) {
  throw new ReferenceError('未检测到“underscore”。')
}
try {
  $
} catch (error) {
  throw new ReferenceError('未检测到“jQuery”。')
}
var _toString = Object.prototype.toString
var util = {
  // 类型验证
  hasObject(value) {
    return _toString.call(value) === '[object Object]'
  },
  hasFunction(value) {
    return _toString.call(value) === '[object Function]'
  },
  hasArray(value) {
    return _toString.call(value) === '[object Array]'
  },
  hasString(value) {
    return _toString.call(value) === '[object String]'
  },
  hasNumber(value) {
    return _toString.call(value) === '[object Number]'
  },
  hasBoolean(value) {
    return _toString.call(value) === '[object Boolean]'
  },
  dateType() {
    return ['year', 'month', 'date', 'time', 'datetime']
  },
  initialCapital(value) {
    return value.substring(0, 1).toUpperCase() + value.substring(1)
  },
  addClassName(value) {
    var className = ''
    if (value instanceof Array && value.length > 0) className += value.join(' ')
    else if (typeof value === 'string' || value instanceof String)
      className += value
    return className
  },
  cssUnit(value) {
    if (typeof value === 'string' || value instanceof String) {
      var regNumber = /^[1-9]+$/
      var regString = /^[0-9]+(px|em|rem|%)$/
      if (regString.test(value) || value == 0) return value
      else if (regNumber.test(value)) return value + 'px'
      return ''
    } else if (typeof value === 'number' || value instanceof Number)
      return value + 'px'
  },
  attrPlaceholder(placeholder, alternative) {
    if (util.hasString(placeholder)) return placeholder
    else if (util.hasBoolean(placeholder) && placeholder) return alternative
  },
  layColOneLine(title) {
    return { title: title, itemGName: 'md12', labelGName: 'md2' }
  },
  layColOneLineThree(title) {
    return { title: title, itemGName: 'md4' }
  },
  /** layui框架插件 */
  /**
   * 验证栅格参数
   * 返回栅格样式
   *
   * @param {*} value
   * @returns
   */
  layColOffsetClassName(value) {
    if (value) {
      var reg = value.match(/^(md)([1][0-2]?|[2-9])$/)
      if (reg && reg.length === 3)
        return 'layui-col-' + reg[1] + '-offset' + reg[2]
    }
    return ''
  },
  // // 创建表格
  // createTable(options, append) {
  //   var className = util.addClassName(['tw-table-imitate', options.className])
  //   return $('<table>')
  //     .addClass(className)
  //     .html(append)
  // },
  // // 创建表头
  // createTableHeaderHtml(options) {
  //   var header = _.map(options.columns, function(item, index) {
  //     var className = util.addClassName([
  //       'tw-table-header',
  //       'tw-table-column_' + (index + 1)
  //     ])
  //     return $('<th>')
  //       .addClass(className)
  //       .css({
  //         width: util.cssUnit(item.width),
  //         minWidth: util.cssUnit(item.minWidth),
  //         textAlign: item.headerAlign || item.align
  //       })
  //       .text(item.label)
  //   })
  //   return $('<thead>').html(
  //     $('<tr>')
  //       .addClass('tw-table-row')
  //       .html(header)
  //   )
  // },
  // // 初始化表格内容
  // createTableBodyHtml(options, data) {
  //   var tableBody = $('<tbody>').addClass('tw-table-wrapper')
  //   if (data == null || data.length === 0) return tableBody
  //   return tableBody.html(
  //     _.map(data, function(item, index) {
  //       return util.createTableBodyItemHtml(options, item, index)
  //     })
  //   )
  // },
  // // 表格每行数据
  // createTableBodyItemHtml(options, item, index) {
  //   var columns = options.columns
  //   var tableRow = $('<tr>')
  //     .addClass('tw-table-row')
  //     .html(
  //       _.map(columns, function(col) {
  //         if (options.data) col.data = options.data
  //         if (options.vm) col.vm = options.vm
  //         var tag = util.layFormType(col, item, index)
  //         if (tag)
  //           tag.on({
  //             click(e) {
  //               if (col.type === 'button') {
  //                 var hasRemove = options.hasRemove
  //                 var hasRemoveBtn = tag.attr('class').indexOf('delete') >= 0
  //                 if (hasRemove && hasRemoveBtn) {
  //                   if (util.hasFunction(options.beforeRemove))
  //                     options.beforeRemove(item, e)
  //                   if (options.data.length > 0 && options.data[index]) {
  //                     options.data.splice(index, 1)
  //                     util.removeTableItem(tableRow)
  //                   }
  //                   if (util.hasFunction(options.afterRemove))
  //                     options.afterRemove(item, e)
  //                 }
  //               }
  //             },
  //             keyup() {
  //               var _item = options.data[index]
  //               _item[col.name] = $(this).val()
  //               options.vm.$set(options.data, index, _item)
  //             }
  //           })
  //         return $('<td>')
  //           .addClass('tw-table-col')
  //           .css({
  //             textAlign: col.align
  //           })
  //           .html(tag || item[col.name])
  //       })
  //     )
  //   return tableRow
  // },
  // // 表格底部添加按钮
  // createTableAddButtonHtml(options) {
  //   var footerItem = $('<td>').addClass('tw-table-col')
  //   var footer = $('<tr>').addClass('tw-table-row')
  //   var columns = options.columns
  //   if (columns) {
  //     var layButton = util.layButtonHtml({
  //       type: 'primary',
  //       className: 'tw-block tw-btn-add'
  //     })
  //     layButton.html('<i class="layui-icon layui-icon-add-1"></i>')
  //     layButton.on('click', function(e) {
  //       if (util.hasFunction(options.addClick)) options.addClick(e)
  //     })
  //     footerItem.html(layButton)
  //     footerItem.attr('colspan', Object.keys(columns).length)
  //   }
  //   if (util.hasBoolean(options.hasAdd) && options.hasAdd) {
  //     return $('<tfoot>')
  //       .addClass('tw-table-footer')
  //       .html(footer.html(footerItem))
  //   }
  // },
  // 表单元素类型
  // layFormType(column, item, index) {
  //   var ags = $.extend({}, { value: item[column.name] }, column)
  //   if (index != null) ags.index = index
  //   if (column.type === 'input') return util.layInputHtml(ags)
  //   else if (column.type === 'date') return util.layDateHtml(ags)
  //   else if (column.type === 'textarea') return util.layTextAreaHtml(ags)
  //   else if (column.type === 'button') {
  //     ags.size = 'sm'
  //     ags.radius = true
  //     if (util.hasArray(column.btnType)) {
  //       if (column.btnType.indexOf('remove') >= 0) {
  //         ags.type = 'danger'
  //         ags.className = 'layui-icon layui-icon-delete'
  //         return util.layButtonHtml(ags)
  //       }
  //     }
  //   }
  // },
  // layFormType(columns, newColumns) {
  //   if (columns.type === 'lay-input') return this.layInputEl(newColumns)
  //   else if (columns.type === 'lay-date') return this.layDateEl(newColumns)
  //   else if (columns.type === 'lay-textarea')
  //     return this.layTextAreaEl(newColumns)
  //   else if (columns.type === 'lay-button') {
  //     newColumns.size = 'sm'
  //     newColumns.radius = true
  //     if (util.hasArray(columns.btnType)) {
  //       if (columns.btnType.indexOf('remove') >= 0) {
  //         newColumns.type = 'danger'
  //         newColumns.className = 'layui-icon layui-icon-delete'
  //         return this.layButtonEl(newColumns)
  //       }
  //     }
  //   }
  // },
  // 创建每列表单
  // createLayFormItemHtml(append, options) {
  //   var oLabelGName = options.labelGName
  //   var oItemGName = options.itemGName
  //   var labelEl = $('<label>')
  //     .addClass(() => {
  //       return util.addClassName([
  //         'layui-form-label',
  //         oLabelGName && 'layui-col-' + oLabelGName
  //       ])
  //     })
  //     .text(options.title + '：')
  //   var centerEl = $('<div>')
  //     .addClass(() => {
  //       return util.addClassName([
  //         'layui-input-block',
  //         util.layColOffsetClassName(oLabelGName)
  //       ])
  //     })
  //     .html(append)
  //   return $('<div>')
  //     .addClass(() => {
  //       return util.addClassName([
  //         'tw-form-item',
  //         oLabelGName && 'layui-row',
  //         oItemGName && 'layui-col-' + oItemGName
  //       ])
  //     })
  //     .html([labelEl, centerEl])
  // },
  // removeTableItem(el) {
  //   el.remove()
  // },
  // 创建面板
  createPanelEl(options, append) {
    const itemGName = item.itemGName
    const className = util.addClassName([
      'layui-card',
      options.className,
      itemGName && 'layui-col-' + itemGName
    ])
    var headerEl = $('<div>')
      .addClass('layui-card-header')
      .css({ textAlign: options.titleAlign, fontSize: titleFontSize })
      .text(options.title)
    var bodyEl = $('<div>')
      .addClass('layui-card-body')
      .attr({ id: options.id })
    if (append) bodyEl.append(append)
    return $('<div>')
      .addClass(className)
      .html([headerEl, bodyEl])
  },
  createPanelHtml(append, options) {
    var titleFontSize = util.cssUnit(options.titleFontSize)
    var headerEl = $('<div>')
      .addClass('layui-card-header')
      .css({ textAlign: options.titleAlign, fontSize: titleFontSize })
      .text(options.title)
    var bodyEl = $('<div>')
      .addClass('layui-card-body')
      .append(append)
    return $('<div>')
      .addClass(() => {
        return util.addClassName(['layui-card', options.className])
      })
      .html([headerEl, bodyEl])
  },
  // 输入框
  layInputHtml(options) {
    var className = util.addClassName(['layui-input', options.className])
    var label = options.title || options.label
    return $('<input>')
      .addClass(className)
      .attr({
        name: options.name,
        required: options.required,
        'lay-verify': options['lay-verify'],
        placeholder: util.attrPlaceholder(
          options.placeholder,
          label && '请输入' + label
        ),
        autocomplete: options.autocomplete || 'off'
      })
      .val(options.value)
  },
  // 日期输入框
  layDateHtml(options) {
    var className = util.addClassName([
      'tw-input-date',
      'layui-input',
      options.className
    ])
    var label = options.title || options.label
    var inputDate = $('<input>')
      .addClass(className)
      .attr({
        name: options.name,
        required: options.required,
        'lay-verify': options['lay-verify'],
        placeholder: util.attrPlaceholder(
          options.placeholder,
          label && '请输入' + label
        ),
        autocomplete: options.autocomplete || 'off'
      })
      .val(options.value)
    inputDate.data('options', options)
    return inputDate
  },
  layTextAreaHtml(options) {
    var className = util.addClassName(['layui-textarea', options.className])
    var label = options.title || options.label
    return $('<textarea>')
      .addClass(className)
      .attr({
        name: options.name,
        required: options.required,
        'lay-verify': options['lay-verify'],
        placeholder: util.attrPlaceholder(
          options.placeholder,
          label && '请输入' + label
        )
      })
      .val(options.value)
  },

  // /**
  //  * 表单属性配置
  //  *
  //  * @param {*} columns
  //  * @param {*} hasInput
  //  * @returns
  //  */
  // layInputAttr(columns, hasInput) {
  //   const label = columns.title || columns.label
  //   var type = hasInput ? '请输入' : '请选择'
  //   return {
  //     name: columns.name,
  //     required: columns.required,
  //     'lay-verify': columns['lay-verify'],
  //     disabled: columns.disabled,
  //     placeholder: util.attrPlaceholder(
  //       columns.placeholder,
  //       label && type + label
  //     ),
  //     autocomplete: columns.autocomplete || 'off'
  //   }
  // },
  // lay 按钮
  layButtonClassName(columns) {
    var ot = columns.layType
    var os = columns.size
    var sizeType = ['lg', 'sm', 'xs']
    var type = ['primary', 'normal', 'warm', 'danger', 'disabled']
    var radius = (columns.radius && 'layui-btn-radius') || ''
    var disabled = (columns.disabled && 'layui-btn-disabled') || ''
    var btnST = ot && type.indexOf(ot) >= 0 ? 'layui-btn-' + ot : false || ''
    var size = os && sizeType.indexOf(os) >= 0 ? 'layui-btn-' + os : false || ''
    return util.addClassName([
      'layui-btn',
      columns.className,
      btnST,
      size,
      radius,
      disabled
    ])
  },
  layButtonHtml(options) {
    var ot = options.type
    var os = options.size
    var sizeType = ['lg', 'sm', 'xs']
    var type = ['primary', 'normal', 'warm', 'danger', 'disabled']
    var radius = (options.radius && 'layui-btn-radius') || ''
    var disabled = (options.disabled && 'layui-btn-disabled') || ''
    var btnST = ot && type.indexOf(ot) >= 0 ? 'layui-btn-' + ot : false || ''
    var size = os && sizeType.indexOf(os) >= 0 ? 'layui-btn-' + os : false || ''
    var className = util.addClassName([
      'layui-btn',
      options.className,
      btnST,
      size,
      radius,
      disabled
    ])
    return $('<a>')
      .addClass(className)
      .attr({ href: options.href || 'javascript:void(0);' })
  },
  // 获取页面的'.tw-input-date'标签绑定时间控件
  layDateControl(vm) {
    var laydate = layui.laydate
    setTimeout(() => {
      $('.tw-input-date').each(function(index, el) {
        let options = $(el).data('options')
        if (options && options.disabled === true) return
        let initValue = ''
        const source = options.data
        const oValue = options.index
        if (util.hasArray(source) && oValue >= 0 && source[oValue])
          initValue = source[options.index][options.name] || ''
        else initValue = source[options.name] || ''
        if (!$(el).data('laydate')) {
          laydate.render({
            elem: el,
            done(value) {
              let options = $(el).data('options')
              console.info('ccc:', options)
              if (options) {
                const data = options.data || options.source
                const name = options.name
                if (util.hasArray(data)) data[options.index][name] = value
                else vm.$set(data, name, value)
              }
            }
          })
          $(el).data('laydate', true)
        }
      })
    }, 0)
  },
  getDate(data, index) {
    if (util.hasArray(data) && index != null && data[index]) return data[index]
    return data
  },
  wrapEl(id, itemGName) {
    var className = ' .layui-input-block>.layui-input.innerWrap'
    if (id) {
      const input = $(id + className)
      if (itemGName) {
        input.wrap('<div class="layui-col-' + itemGName + '" />')
      }
    }
  }
}
