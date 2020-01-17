class DataType {
  constructor(item) {
    if (item.name) this.name = item.name
    if (item.title) this.title = item.title
    if (item.value) this.value = item.value
    if (item.type) this.type = item.type
    if (item.placeholder) this.placeholder = item.placeholder
  }
  get name() {
    return this._name
  }
  set name(value) {
    this._name = value
  }
  get title() {
    return this._title
  }
  set title(value) {
    this._title = value
  }
  get value() {
    return this._value
  }
  set value(value) {
    this._value = value
  }
  get type() {
    return this._type
  }
  set type(value) {
    this._type = value
  }
  get placeholder() {
    return this._placeholder
  }
  set placeholder(value) {
    this._placeholder = value
  }
  verify() {
    const prompt = this.name || this.title || 'DataType'
    if (!this.value) throw new Error(`${prompt}无数据，无法验证。`)
    if (!this._verify instanceof RegExp)
      throw new Error(`${prompt}不是正则类型，无法验证。`)
    return this._verify.test(this.value)
  }
}
