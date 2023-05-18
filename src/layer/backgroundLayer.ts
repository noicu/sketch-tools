import { SketchLayer } from '../core/layer'
import type { SketchWorkspace } from '../core/workspace'

export class BGLayer extends SketchLayer {
  type = 'bg.layer'
  canvas: HTMLCanvasElement
  canvasCtx: CanvasRenderingContext2D
  // 设置网格属性
  gridSpacing = 20 // 网格间距
  gridColor = '#ccc' // 网格颜色
  lineWidth = 1 // 网格线宽

  constructor(context: SketchWorkspace) {
    super(context)
    this.canvas = document.createElement('canvas')
    this.canvasCtx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = this.context.width
    this.canvas.height = this.context.height
    this.element.appendChild(this.canvas)
    this.drawBackground()
    this.context.mouse.on('move', (mEvent) => {
      if (this.context.mouse.down && this.context.keyboard.keys.length === 0) {
        // const dx = mEvent.x - this.context.mouse.lastX
        // const dy = mEvent.y - this.context.mouse.lastY

        // this.x += dx
        // this.y += dy
        // this.canvasCtx.translate(dx, dy)
        this.drawBackground()
      }
    })
  }

  // 绘制网格
  drawGrid() {
    this.canvasCtx.beginPath()
    this.canvasCtx.strokeStyle = this.gridColor
    this.canvasCtx.lineWidth = this.lineWidth

    // 绘制垂直网格线
    for (let x = 0; x < this.canvas.width; x += this.gridSpacing) {
      this.canvasCtx.moveTo(x, 0)
      this.canvasCtx.lineTo(x, this.canvas.height)
    }

    // 绘制水平网格线
    for (let y = 0; y < this.canvas.height; y += this.gridSpacing) {
      this.canvasCtx.moveTo(0, y)
      this.canvasCtx.lineTo(this.canvas.width, y)
    }

    this.canvasCtx.stroke()
  }

  // 绘制背景
  drawBackground() {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.canvasCtx.save()

    // 设置画布原点
    this.canvasCtx.translate(this.context.mouse.lastX, this.context.mouse.lastY)

    // 绘制网格
    this.drawGrid()

    this.canvasCtx.restore()
  }
}
