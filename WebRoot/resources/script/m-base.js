class MBase {
  constructor(source, model, options) {
    this.source = source
    this.model = model
    this.options = options
  }
  get source() {
    return this._source
  }
  set source(value) {
    this._source = value
  }
  get model() {
    return this._model
  }
  set model(value) {
    if (!value instanceof Vue) throw new Error('该模块不是VUE')
    this._model = value
  }
  get options() {
    return this._options
  }
  set options(value) {
    this._options = value
  }
}
