import type { IVector2 } from '../core'
import { SketchBlock } from '../core'
import type { SketchBasic } from '../core/basic'
import { SketchLayer } from '../core/layer'
import type { SketchWorkspace } from '../core/workspace'
import { detectCollision, isPointInPolygon } from '../utils/detect'

export class SelectLayer extends SketchLayer {
  type = 'select.layer'

  lastX = 0
  lastY = 0

  // 选中的元素
  private _selected: {
    [id: string]: {
      select: boolean
      sketch: SketchBasic
    }
  } = {}

  selectSketch: SketchBlock | undefined

  constructor(context: SketchWorkspace) {
    super(context)

    // 未释放鼠标

    this.context.mouse.on('down', (mEvent) => {
      // this._selected = {}

      this.lastX = mEvent.x
      this.lastY = mEvent.y

      // 点选
      const collisions = this._pointInPolygon({
        x: this.lastX,
        y: this.lastY,
      }, this.context.worklayer.children)

      Object.values(this._selected).forEach((detect) => {
        detect.select = false
      })

      const collision = collisions[collisions.length - 1]

      if (collision) {
        this._selected[collision.id] = {
          select: true,
          sketch: collision,
        }
      }

      this.updateSelect()
    })

    // 框选
    this.context.mouse.on('move', (mEvent) => {
      if (this.context.mouse.down && this.context.keyboard.isPressed('ControlLeft')) {
        const x = Math.min(this.lastX, mEvent.x)
        const y = Math.min(this.lastY, mEvent.y)
        const width = Math.abs(this.lastX - mEvent.x)
        const height = Math.abs(this.lastY - mEvent.y)

        if (!this.getChildByName('select')) {
          this.selectSketch = new SketchBlock()
          this.selectSketch.name = 'select'

          this.selectSketch.element.style.border = '1px dashed white'
          this.addChild(this.selectSketch)
        }

        if (this.selectSketch) {
          this.selectSketch.x = x
          this.selectSketch.y = y
          this.selectSketch.width = width
          this.selectSketch.height = height

          // 框选
          this._detectCollisions(this.selectSketch, this.context.worklayer.children)
          this.updateSelect()
        }
      }
    })

    this.context.keyboard.on('ControlLeftUp', () => {
      this.release()
    })

    this.context.mouse.on('up', () => {
      this.release()
    })
  }

  // 释放
  release() {
    this.selectSketch = undefined
    this.removeChildByName('select')
  }

  // 更新选中框
  updateSelect() {
    Object.values(this._selected).forEach((detect) => {
      if (detect.select) {
        if (!this.getChildByName(detect.sketch.id)) {
          const sketch = new SketchBlock()
          sketch.name = detect.sketch.id
          sketch.x = detect.sketch.x + detect.sketch.offset.x - 1
          sketch.y = detect.sketch.y + detect.sketch.offset.y - 1
          sketch.width = detect.sketch.width + 2
          sketch.height = detect.sketch.height + 2
          sketch.element.style.cursor = 'pointer'
          sketch.element.style.boxSizing = 'border-box'
          sketch.element.style.border = '2px solid #009688'
          this.addChild(sketch)
        }
      }

      else {
        this.removeChildByName(detect.sketch.id)
      }
    })
  }

  // 递归遍历所有子元素，返回所有范围里包含点的元素
  private _detectCollisions(point: SketchBasic, children: SketchBasic[]) {
    const collisions: SketchBasic[] = []
    for (const child of children) {
      if (detectCollision(point, child)) {
        collisions.push(child)
        this._selected[child.id] = {
          select: true,
          sketch: child,
        }
      }

      else {
        collisions.push(...this._detectCollisions(point, child.children))
        this._selected[child.id] = {
          select: false,
          sketch: child,
        }
      }
    }
    return collisions
  }

  private _pointInPolygon(point: IVector2, children: SketchBasic[]) {
    const collisions: SketchBasic[] = []
    for (const child of children) {
      if (isPointInPolygon(point, child.polygon))
        collisions.push(child)

      else
        collisions.push(...this._pointInPolygon(point, child.children))
    }
    return collisions
  }
}
