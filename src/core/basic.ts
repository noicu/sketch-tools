import { generateUUID } from '../utils'
import { EventEmitter } from './event'
import type { IVector2 } from './vector'
import type { ISize } from './size'

export type ISketchParent = SketchBasic | null | undefined

export type ISketchBasicEvent = 'parentChange' | 'rotateChange' | 'positionChange' | 'sizeChange'

export class SketchBasic extends EventEmitter<SketchBasic> implements IVector2, ISize {
  readonly id: string
  readonly element: HTMLElement
  private _rotate = 0
  private _children: SketchBasic[] = []
  private _parent?: ISketchParent
  private _x = 0
  private _y = 0
  private _width = 0
  private _height = 0
  private _name = ''
  private _scale = 1

  offset: IVector2 = { x: 0, y: 0 }

  readonly polygon: IVector2[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]

  type = 'basic'
  constructor(element?: HTMLElement) {
    super()
    this.id = generateUUID()
    this.element = element || document.createElement('div')
    this.element.setAttribute('data-id', this.id)

    // this.element.onmouseover = (e) => {
    //   this.element.style.border = '1px solid #fff'
    // }

    // this.element.onmouseout = (e) => {
    //   this.element.style.border = 'none'
    // }

    this.on('parentChange', () => {
      this.updateOffset()
      this.updatePolygon()
    })

    this.on('rotateChange', () => {
      this.updateOffset()
      this.updatePolygon()
    })

    this.on('positionChange', () => {
      this.updateOffset()
      this.updatePolygon()
    })
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

  removeChildAll(): void {
    this._children.forEach((child) => {
      this.removeChild(child)
    })
  }

  removeChildAt(index: number): void {
    this.element.removeChild(this._children[index].element)
    this._children[index].parent = null
    this._children.splice(index, 1)
  }

  removeChildById(id: string): void {
    const index = this._children.findIndex(child => child.id === id)
    if (index > -1)
      this.removeChildAt(index)
  }

  removeChildByName(name: string): void {
    const index = this._children.findIndex(child => child.name === name)
    if (index > -1)
      this.removeChildAt(index)
  }

  getChildAt(index: number): SketchBasic {
    return this._children[index]
  }

  getChildById(id: string): SketchBasic | undefined {
    return this._children.find(child => child.id === id)
  }

  getChildByName(name: string): SketchBasic | undefined {
    return this._children.find(child => child.name === name)
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

  updatePolygon(): void {
    const { x, y, width, height } = this
    const ox = x + this.offset.x
    const oy = y + this.offset.y
    this.polygon[0].x = ox
    this.polygon[0].y = oy
    this.polygon[1].x = ox + width
    this.polygon[1].y = oy
    this.polygon[2].x = ox + width
    this.polygon[2].y = oy + height
    this.polygon[3].x = ox
    this.polygon[3].y = oy + height
  }

  updateOffset(): void {
    this.children.forEach((child) => {
      child.offset.x = this.x + this.offset.x
      child.offset.y = this.y + this.offset.y
      child.updateOffset()
      child.updatePolygon()
    })
  }

  get scale(): number {
    return this._scale
  }

  set scale(value: number) {
    this._scale = value
    this.element.style.transform = this.transform
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  get transform(): string {
    return `translate(${this._x}px, ${this._y}px) rotate(${this._rotate}deg ) scale(${this._scale})`
  }

  get width(): number {
    return this._width
  }

  set width(value: number) {
    this._width = value
    this.element.style.width = `${value}px`
    this.emit('sizeChange', this)
  }

  get height(): number {
    return this._height
  }

  set height(value: number) {
    this._height = value
    this.element.style.height = `${value}px`
    this.emit('sizeChange', this)
  }

  get x(): number {
    return this._x
  }

  set x(value: number) {
    this._x = value
    this.element.style.transform = this.transform
    this.emit('positionChange', this)
  }

  get y(): number {
    return this._y
  }

  set y(value: number) {
    this._y = value
    this.element.style.transform = this.transform
    this.emit('positionChange', this)
  }

  get rotate(): number {
    return this._rotate
  }

  set rotate(value: number) {
    this._rotate = value
    this.element.style.transform = this.transform
    this.emit('rotateChange', this)
  }

  get children(): SketchBasic[] {
    return this._children
  }

  get parent(): ISketchParent {
    return this._parent
  }

  set parent(parent: ISketchParent) {
    this._parent = parent
    this.emit('parentChange', this)
  }
}
