class MPanel extends MBase {
  constructor(model, options) {
    super(null, model, options)
    this.init = appendEl => {
      if (!util.hasObject(this.options)) return
      $('#' + options.id).html(this.createPanelEl(appendEl))
    }
  }
  createPanelEl(append) {
    const { options } = this
    var titleFontSize = util.cssUnit(options.titleFontSize)
    var headerEl = $('<div>')
      .addClass('layui-card-header')
      .css({ textAlign: options.titleAlign, fontSize: titleFontSize })
      .text(options.title)
    var bodyEl = $('<div>')
      .addClass('layui-card-body')
      .append(append)
    if (options.idEl) bodyEl.attr('id', options.idEl)
    return $('<div>')
      .addClass(() => {
        return util.addClassName(['layui-card', options.className])
      })
      .html([headerEl, bodyEl])
  }
}
