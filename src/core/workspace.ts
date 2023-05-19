import { WorkLayer } from '../layer/workLayer'
import type { SketchLayer } from './layer'
import { SketchBasic } from './basic'
import { SketchMouse } from './mouse'
import { SketchKeyboard } from './keyboard'

export class SketchWorkspace extends SketchBasic {
  worklayer: WorkLayer
  layers: SketchLayer[] = []
  mouse = new SketchMouse()
  keyboard = new SketchKeyboard()

  type = 'workspace'
  constructor(element: HTMLElement | string) {
    super()

    this.worklayer = new WorkLayer(this)
    if (typeof element === 'string')
      element = document.querySelector(element) as HTMLElement

    element.appendChild(this.element)

    this.element.className = 'sketch-workspace'
    this.width = element.clientWidth
    this.height = element.clientHeight
    this.element.style.position = 'relative'
    this.element.style.background = '#202124'
    this.element.style.overflow = 'hidden'
    this.addLayer(this.worklayer)
  }

  addLayer(layer: SketchLayer, index?: number): void {
    layer.context = this
    if (index !== undefined)
      this.layers.splice(index, 0, layer)
    else
      this.layers.push(layer)
    this.addChild(layer)
    // this.updateZIndex()
  }

  removeLayer(layer: SketchLayer): void {
    const index = this.layers.indexOf(layer)
    if (index > -1)
      this.layers.splice(index, 1)
    this.removeChild(layer)
    // this.updateZIndex()
  }

  updateZIndex(): void {
    this.layers.sort((a, b) => a.zIndex - b.zIndex)
    this.layers.forEach((layer, index) => {
      layer.zIndex = index
    })
  }
}
