import { EventEmitter } from './event'
import { generateUUID } from './utils'

export type ISketchParent = SketchBasic | null | undefined

export type ISketchBasicEvent = 'parentChange' | 'rotateChange' | 'positionChange' | 'sizeChange'

export class SketchBasic {
  readonly id: string
  readonly element: HTMLElement
  private _width = 0
  private _height = 0
  private _x = 0
  private _y = 0
  private _rotate = 0
  private _children: SketchBasic[] = []
  private _parent?: ISketchParent

  private _event = new EventEmitter<SketchBasic>()

  type = 'basic'
  constructor(element?: HTMLElement) {
    this.id = generateUUID()
    this.element = element || document.createElement('div')
    this.element.setAttribute('data-id', this.id)
  }

  addChild(sketch: SketchBasic): void {
    this._children.push(sketch)
    sketch.parent = this
    this.element.appendChild(sketch.element)
  }

  removeChild(sketch: SketchBasic): void {
    this.element.removeChild(sketch.element)
    sketch.parent = null
    const index = this._children.indexOf(sketch)
    if (index > -1)
      this._children.splice(index, 1)
  }

  insertChild(sketch: SketchBasic, index: number): void {
    this.element.insertBefore(sketch.element, this._children[index].element)
    this._children.splice(index, 0, sketch)
    this.parent = this
  }

  replaceChild(sketch: SketchBasic, index: number): void {
    this.element.replaceChild(sketch.element, this._children[index].element)
    this._children.splice(index, 1, sketch)
    this.parent = this
  }

  get transform(): string {
    return `translate(${this._x}px, ${this._y}px) rotate(${this._rotate}deg)`
  }

  get width(): number {
    return this._width
  }

  set width(value: number) {
    this._width = value
    this.element.style.width = `${value}px`
    this._event.emit('sizeChange', this)
  }

  get height(): number {
    return this._height
  }

  set height(value: number) {
    this._height = value
    this.element.style.height = `${value}px`
    this._event.emit('sizeChange', this)
  }

  get x(): number {
    return this._x
  }

  set x(value: number) {
    this._x = value
    this.element.style.transform = this.transform

    this._event.emit('positionChange', this)
  }

  get y(): number {
    return this._y
  }

  set y(value: number) {
    this._y = value
    this.element.style.transform = this.transform

    this._event.emit('positionChange', this)
  }

  get rotate(): number {
    return this._rotate
  }

  set rotate(value: number) {
    this._rotate = value
    this.element.style.transform = this.transform
    this._event.emit('rotateChange', this)
  }

  get children(): SketchBasic[] {
    return this._children
  }

  get parent(): ISketchParent {
    return this._parent
  }

  set parent(parent: ISketchParent) {
    this._parent = parent
    this._event.emit('parentChange', this)
  }

  on(event: ISketchBasicEvent, callback: (data: SketchBasic) => void): void {
    this._event.on(event, callback)
  }
}
