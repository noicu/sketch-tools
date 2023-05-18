import { SketchBasic } from './basic'
import type { SketchWorkspace } from './workspace'

export class SketchLayer extends SketchBasic {
  type = 'layer'
  private _zIndex?: number
  context: SketchWorkspace
  constructor(context: SketchWorkspace) {
    super()
    this.context = context
    this.element.style.position = 'absolute'
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.zIndex = 0
  }

  get zIndex(): number {
    return this._zIndex || 0
  }

  set zIndex(zIndex: number) {
    this._zIndex = zIndex
    this.element.style.zIndex = zIndex.toString()
  }
}
