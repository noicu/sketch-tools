import { SketchLayer } from '../core/layer'
import type { SketchWorkspace } from '../core/workspace'

export class BGLayer extends SketchLayer {
  type = 'ruler.layer'
  canvas: HTMLCanvasElement
  canvasCtx: CanvasRenderingContext2D

  constructor(context: SketchWorkspace) {
    super(context)
    this.canvas = document.createElement('canvas')
    this.canvasCtx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvas.width = this.context.width
    this.canvas.height = this.context.height
    this.element.appendChild(this.canvas)

    this.drawRuler()
    this.context.mouse.on('move', (mEvent) => {
      if (this.context.mouse.down && this.context.keyboard.keys.length === 0) {
        // const dx = mEvent.x - this.context.mouse.lastX
        // const dy = mEvent.y - this.context.mouse.lastY

        // this.x += dx
        // this.y += dy
        // this.canvasCtx.translate(dx, dy)
        this.drawRuler()
      }
    })
  }

  // 设置标尺属性
  unit = 10 // 标尺单位长度
  mainLineColor = '#000' // 主刻度线颜色
  subLineColor = '#888' // 次刻度线颜色
  fontColor = '#000' // 字体颜色
  fontSize = 12 // 字体大小

  // 绘制刻度线
  drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
    this.canvasCtx.beginPath()
    this.canvasCtx.moveTo(x1, y1)
    this.canvasCtx.lineTo(x2, y2)
    this.canvasCtx.strokeStyle = color
    this.canvasCtx.stroke()
  }

  // 绘制标尺
  drawRuler() {
    const width = this.canvas.width
    const height = this.canvas.height

    this.canvasCtx.clearRect(0, 0, width, height)

    // 绘制水平刻度线
    for (let x = 0; x <= width; x += this.unit) {
      const isMainLine = x % (this.unit * 10) === 0
      const isHalfLine = x % this.unit === 0 && !isMainLine
      const y1 = isMainLine ? 0 : height * 0.8
      const y2 = isMainLine ? height : height * 0.9
      this.drawLine(x, y1, x, y2, isMainLine ? this.mainLineColor : this.subLineColor)

      // 绘制文字
      if (isMainLine) {
        const text = (x / this.unit).toFixed(0)
        this.canvasCtx.fillStyle = this.fontColor
        this.canvasCtx.font = `${this.fontSize}px Arial`
        this.canvasCtx.fillText(text, x + 2, height * 0.7)
      }
      else if (isHalfLine) {
        const text = '—'
        this.canvasCtx.fillStyle = this.fontColor
        this.canvasCtx.font = `${this.fontSize}px Arial`
        this.canvasCtx.fillText(text, x + 2, height * 0.75)
      }
    }

    // 绘制垂直刻度线
    for (let y = 0; y <= height; y += this.unit) {
      const isMainLine = y % (this.unit * 10) === 0
      const isHalfLine = y % this.unit === 0 && !isMainLine
      const x1 = isMainLine ? 0 : width * 0.8
      const x2 = isMainLine ? width : width * 0.9
      this.drawLine(x1, y, x2, y, isMainLine ? this.mainLineColor : this.subLineColor)

      // 绘制文字
      if (isMainLine) {
        const text = (y / this.unit).toFixed(0)
        this.canvasCtx.fillStyle = this.fontColor
        this.canvasCtx.font = `${this.fontSize}px Arial`
        this.canvasCtx.fillText(text, width * 0.7, y + this.fontSize + 2)
      }
      else if (isHalfLine) {
        const text = '|'
        this.canvasCtx.fillStyle = this.fontColor
        this.canvasCtx.font = `${this.fontSize}px Arial`
        this.canvasCtx.fillText(text, width * 0.75, y + this.fontSize + 2)
      }
    }
  }
}
