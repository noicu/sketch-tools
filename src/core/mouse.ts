import { EventEmitter } from './event'

export class SketchMouse {
  private _x = 0
  private _y = 0
  private _lastX = 0
  private _lastY = 0
  private _down = false

  private _event = new EventEmitter<{ x: number; y: number }>()

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

  constructor() {
    document.onmousedown = (e) => {
      this.down = true

      this.lastX = e.clientX
      this.lastY = e.clientY

      this._event.emit('down', this.lastPosition)

      e.preventDefault()
    }

    document.onmousemove = (e) => {
      this.x = e.clientX
      this.y = e.clientY
      this._event.emit('move', this.position)
      if (this.down) {
        this.lastX = e.clientX
        this.lastY = e.clientY
      }
    }

    document.onmouseup = (e) => {
      this.down = false

      this._event.emit('up', this.lastPosition)
    }
  }

  on(eventName: 'move', handler: (data: { x: number; y: number }) => void) {
    this._event.on(eventName, handler)
  }
}
