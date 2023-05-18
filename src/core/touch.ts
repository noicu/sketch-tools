import { EventEmitter } from './event'
import type { IVector2 } from './vector'

export interface ITouchPadDetail {
  detail: {
    direction: string
    distance: number
  }
}

export class TouchPad extends EventEmitter<ITouchPadDetail> {
  private element: HTMLElement
  private touchStartPos: IVector2 | null = null
  private touchEndPos: IVector2 | null = null

  constructor(element?: HTMLElement) {
    super()
    this.element = element || document.body
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this))
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this))
  }

  private handleTouchStart(event: TouchEvent) {
    this.touchStartPos = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    }
  }

  private handleTouchEnd(event: TouchEvent) {
    this.touchEndPos = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    }
    this.handleSwipe()
  }

  private handleSwipe() {
    if (this.touchStartPos && this.touchEndPos) {
      const deltaX = this.touchEndPos.x - this.touchStartPos.x
      const deltaY = this.touchEndPos.y - this.touchStartPos.y
      const angle = Math.atan2(deltaY, deltaX)
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      const swipeDirection = this.getSwipeDirection(angle)
      this.emit('swipe', {
        detail: {
          direction: swipeDirection,
          distance,
        },
      })
    }
    this.touchStartPos = null
    this.touchEndPos = null
  }

  private getSwipeDirection(angle: number): string {
    if (angle >= -Math.PI / 4 && angle < Math.PI / 4)
      return 'right'

    else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4)
      return 'down'

    else if (angle >= (3 * Math.PI) / 4 || angle < -(3 * Math.PI) / 4)
      return 'left'

    else
      return 'up'
  }
}
