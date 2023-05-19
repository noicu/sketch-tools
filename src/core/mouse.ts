import type { SketchBasic } from './basic'
import { EventEmitter } from './event'
import type { IVector2 } from './vector'

export class SketchMouse extends EventEmitter<SketchMouse> implements IVector2 {
  private _x = 0
  private _y = 0
  private _lastX = 0
  private _lastY = 0
  private _down = false

  get x(): number {
    return this._x
  }

  set x(value: number) {
    this._x = value
  }

  get y(): number {
    return this._y
  }

  set y(value: number) {
    this._y = value
  }

  get position(): { x: number; y: number } {
    return { x: this.x, y: this.y }
  }

  get lastPosition(): { x: number; y: number } {
    return { x: this.lastX, y: this.lastY }
  }

  get lastX(): number {
    return this._lastX
  }

  set lastX(value: number) {
    this._lastX = value
  }

  get lastY(): number {
    return this._lastY
  }

  set lastY(value: number) {
    this._lastY = value
  }

  get down(): boolean {
    return this._down
  }

  set down(value: boolean) {
    this._down = value
  }

  constructor(sketch?: SketchBasic) {
    const element = sketch?.element || document
    super()
    // 1
    element.onmousedown = (e) => {
      this.down = true

      this.lastX = e.clientX
      this.lastY = e.clientY

      this.emit('down', this)

      e.preventDefault()
    }

    // 2
    document.onmouseup = (e) => {
      this.down = false

      this.emit('up', this)
    }

    // 3
    element.onclick = (e) => {}

    document.onmousemove = (e) => {
      this.x = e.clientX
      this.y = e.clientY
      this.emit('move', this)
      if (this.down) {
        this.lastX = e.clientX
        this.lastY = e.clientY
      }
    }

    element.oncontextmenu = (e) => {
      e.preventDefault()
    }
  }
}
