import { SketchLayer } from '../core/layer'
import type { SketchWorkspace } from '../core/workspace'

export class WorkLayer extends SketchLayer {
  type = 'work.layer'
  minScale = 0.1
  maxScale = 10

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

    document.addEventListener('wheel', (ev) => {
      const isZoomOut = ev.deltaY < 0 // 缩小

      const { x: mouseX, y: mouseY } = ev

      const zoomout = (Math.abs(ev.deltaY) / 2600) * this.scale

      // 当前位置
      const { x: prevX, y: prevY } = this
      // 当前宽高
      const width = this.context.width * this.scale
      const height = this.context.height * this.scale
      // 容器位置
      const { px, py } = { px: this.context.x, py: this.context.y }

      if (isZoomOut) {
        // 缩小
        this.scale -= zoomout
        if (this.minScale && this.scale < this.minScale)
          this.scale = this.minScale
      }
      else {
        // 放大
        this.scale += zoomout
        if (this.maxScale && this.scale > this.maxScale)
          this.scale = this.maxScale
      }

      // 获取比例
      const yScale = (mouseY - py - prevY) / height
      const xScale = (mouseX - px - prevX) / width

      // 放大后的宽高
      const ampWidth = this.context.width * this.scale
      const ampHeight = this.context.height * this.scale

      // 需要重新运算的 translate 坐标
      const y = yScale * (ampHeight - height)
      const x = xScale * (ampWidth - width)

      // 更新
      this.y = prevY - y
      this.x = prevX - x
    })
  }
}
