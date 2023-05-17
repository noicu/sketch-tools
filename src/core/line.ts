import type { IVector2 } from './vector'

export class SketchLine {
  start: IVector2
  end: IVector2

  constructor(start: IVector2, end: IVector2) {
    this.start = start
    this.end = end
  }
}
