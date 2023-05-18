import { SketchLayer } from '../core/layer'
import type { SketchWorkspace } from '../core/workspace'

export class BlockLayer extends SketchLayer {
  type = 'block.layer'
  constructor(context: SketchWorkspace) {
    super(context)
  }
}
