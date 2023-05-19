import type { SketchBasic } from '../core/basic'
import { SketchBlock } from '../core/block'
import { SketchLayer } from '../core/layer'
import type { IVector2 } from '../core/vector'
import type { SketchWorkspace } from '../core/workspace'
import { isPointInPolygon } from '../utils'

export class HoverLater extends SketchLayer {
  type = 'hover.layer'

  private _detects: {
    [id: string]: {
      hover: boolean
      sketch: SketchBasic
    }
  } = {}

  constructor(context: SketchWorkspace) {
    super(context)
    this.context?.mouse.on('move', (mEvent) => {
      this._detects = {}
      this._detectCollisions({
        x: mEvent.x,
        y: mEvent.y,
      }, this.context.worklayer.children)

      this.update()
    })
  }

  update() {
    Object.values(this._detects).forEach((detect) => {
      if (detect.hover) {
        const sketch = this.getChildByName(detect.sketch.id)
        if (!sketch) {
          const sketch = new SketchBlock()
          sketch.name = detect.sketch.id
          sketch.x = detect.sketch.x + detect.sketch.offset.x - 1
          sketch.y = detect.sketch.y + detect.sketch.offset.y - 1
          sketch.width = detect.sketch.width + 2
          sketch.height = detect.sketch.height + 2
          sketch.element.style.cursor = 'pointer'
          sketch.element.style.boxSizing = 'border-box'
          sketch.element.style.border = '1px solid white'
          this.addChild(sketch)
        }
        else {
          sketch.x = detect.sketch.x + detect.sketch.offset.x - 1
          sketch.y = detect.sketch.y + detect.sketch.offset.y - 1
          sketch.width = detect.sketch.width + 2
          sketch.height = detect.sketch.height + 2
        }
      }

      else {
        this.removeChildByName(detect.sketch.id)
      }
    })
  }

  // 递归遍历所有子元素，返回所有范围里包含点的元素
  private _detectCollisions(point: IVector2, children: SketchBasic[]) {
    const collisions: SketchBasic[] = []
    for (const child of children) {
      if (isPointInPolygon(point, child.polygon)) {
        collisions.push(child)
        this._detects[child.id] = {
          hover: true,
          sketch: child,
        }
      }

      else {
        collisions.push(...this._detectCollisions(point, child.children))
        this._detects[child.id] = {
          hover: false,
          sketch: child,
        }
      }
    }
    return collisions
  }
}
