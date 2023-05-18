import { SketchBasic } from './basic'

export class SketchBlock extends SketchBasic {
  type = 'block'
  constructor() {
    super()

    this.element.className = 'sketch-block'

    this.element.style.position = 'absolute'
  }
}
