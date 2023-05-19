import type { SketchBasic } from './basic'
import { SketchBlock } from './block'

export class SketchControlPoint extends SketchBlock {
  broder = 1
  constructor(public sketch: SketchBasic, public type: 'left-top' | 'right-top' | 'right-bottom' | 'left-bottom' | 'top' | 'right' | 'bottom' | 'left') {
    super()
    this.width = 8
    this.height = 8

    this.element.className = 'sketch-control-point'
    this.element.style.position = 'absolute'
    this.name = `${sketch.id}-${type}`
    this.element.style.backgroundColor = '#fff'
    this.element.style.border = `${this.broder}px solid #009688`

    this.element.addEventListener('mousedown', (e) => {
      e.preventDefault()
    })
  }

  update() {
    const offset = (this.width / 2) + (this.broder * 2)

    switch (this.type) {
      case 'left-top':
        this.x = -offset
        this.y = -offset
        this.element.style.cursor = 'nw-resize'
        break
      case 'top':
        this.x = this.sketch.width / 2 - (offset / 2)
        this.y = -offset
        this.element.style.cursor = 'n-resize'
        break
      case 'right-top':
        this.x = this.sketch.width - offset
        this.y = -offset
        this.element.style.cursor = 'ne-resize'
        break
      case 'right':
        this.x = this.sketch.width - offset
        this.y = this.sketch.height / 2 - (offset / 2)
        this.element.style.cursor = 'e-resize'
        break
      case 'right-bottom':
        this.x = this.sketch.width - offset
        this.y = this.sketch.height - offset
        this.element.style.cursor = 'se-resize'
        break
      case 'bottom':
        this.x = this.sketch.width / 2 - (offset / 2)
        this.y = this.sketch.height - offset
        this.element.style.cursor = 's-resize'
        break
      case 'left-bottom':
        this.x = -offset
        this.y = this.sketch.height - offset
        this.element.style.cursor = 'sw-resize'
        break
      case 'left':
        this.x = -offset
        this.y = this.sketch.height / 2 - (offset / 2)
        this.element.style.cursor = 'w-resize'
        break
    }
  }
}

export class SketchControl extends SketchBlock {
  type = 'control'
  controlPoints: SketchControlPoint[] = []
  sketch: SketchBasic
  constructor(sketch: SketchBasic) {
    super()
    this.sketch = sketch
    this.element.className = 'sketch-control'

    this.element.style.position = 'absolute'

    this.name = sketch.id
    this.element.style.cursor = 'pointer'
    this.element.style.boxSizing = 'border-box'
    this.element.style.border = '2px solid #009688'
    this.element.style.background = 'rgba(0, 150, 136, 0.2)'

    // 创建控制点
    this.controlPoints = [
      new SketchControlPoint(this, 'left-top'),
      new SketchControlPoint(this, 'top'),
      new SketchControlPoint(this, 'right-top'),
      new SketchControlPoint(this, 'right'),
      new SketchControlPoint(this, 'right-bottom'),
      new SketchControlPoint(this, 'bottom'),
      new SketchControlPoint(this, 'left-bottom'),
      new SketchControlPoint(this, 'left'),
    ]

    this.controlPoints.forEach((controlPoint) => {
      this.addChild(controlPoint)
    })

    this.update()
  }

  update() {
    this.x = this.sketch.x + this.sketch.offset.x - 1
    this.y = this.sketch.y + this.sketch.offset.y - 1
    this.width = this.sketch.width + 2
    this.height = this.sketch.height + 2
    this.controlPoints.forEach((controlPoint) => {
      controlPoint.update()
    })
  }
}
