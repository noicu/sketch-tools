import type { SketchLayer } from './core/layer'
import { SketchBasic } from './core/basic'
import { BlockLayer } from './layer/blockLayer'
import { SketchMouse } from './core/mouse'
import { SketchKeyboard } from './core/keyboard'

export class SketchWorkspace extends SketchBasic {
  worklayer = new BlockLayer()
  layers: SketchLayer[] = []
  mouse = new SketchMouse()
  keyboard = new SketchKeyboard()

  type = 'workspace'
  constructor(element: HTMLElement | string) {
    super()
    if (typeof element === 'string')
      element = document.querySelector(element) as HTMLElement
    element.appendChild(this.element)

    this.element.className = 'sketch-workspace'

    this.width = element.clientWidth
    this.height = element.clientHeight
    this.element.style.position = 'relative'
    this.element.style.background = '#202124'

    this.addLayer(this.worklayer)

    this.mouse.on('move', (mEvent) => {
      if (this.mouse.down) {
        const dx = mEvent.x - this.mouse.lastX
        const dy = mEvent.y - this.mouse.lastY

        this.worklayer.x += dx
        this.worklayer.y += dy
      }
    })

    this.keyboard.on('keydown', (kEvent) => {
      // console.log('keydown', kEvent.keys)
    })

    this.keyboard.on('keyup', (kEvent) => {
      // console.log('keyup', kEvent.keys)
    })
  }

  addLayer(layer: SketchLayer): void {
    this.layers.push(layer)
    this.addChild(layer)
    this.updateZIndex()
  }

  removeLayer(layer: SketchLayer): void {
    const index = this.layers.indexOf(layer)
    if (index > -1)
      this.layers.splice(index, 1)
    this.removeChild(layer)
    this.updateZIndex()
  }

  updateZIndex(): void {
    this.layers.sort((a, b) => a.zIndex - b.zIndex)
    this.layers.forEach((layer, index) => {
      layer.zIndex = index
    })
  }
}
