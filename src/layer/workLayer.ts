import { SketchLayer } from '../core/layer'
import type { SketchWorkspace } from '../core/workspace'

export class WorkLayer extends SketchLayer {
  type = 'work.layer'
  constructor(context: SketchWorkspace) {
    super(context)

    this.context.mouse.on('move', (mEvent) => {
      if (this.context.mouse.down && this.context.keyboard.keys.length === 0) {
        const dx = mEvent.x - mEvent.lastX
        const dy = mEvent.y - mEvent.lastY

        this.x += dx
        this.y += dy
      }
    })
  }
}
