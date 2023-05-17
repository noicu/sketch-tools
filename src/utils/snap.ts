import type { SketchLine } from '../core/line'
import type { IVector2 } from '../core/vector'

export function snapToLine(point: IVector2, lines: SketchLine[], threshold: number): IVector2 {
  let closestLine: SketchLine | null = null
  let closestDistance = threshold

  // 遍历所有参考线，找到距离当前点最近的参考线
  for (const line of lines) {
    const distance = distanceToLine(point, line)
    if (distance < closestDistance) {
      closestLine = line
      closestDistance = distance
    }
  }

  if (closestLine) {
    // 如果找到了距离当前点最近的参考线，则将当前点吸附到该参考线上
    const snappedPoint = snapToLineSegment(point, closestLine)
    return snappedPoint
  }
  else {
    // 如果没有找到距离当前点足够近的参考线，则返回原始点
    return point
  }
}

export function distanceToLine(point: IVector2, line: SketchLine): number {
  // 计算点到直线的距离
  const x1 = line.start.x
  const y1 = line.start.y
  const x2 = line.end.x
  const y2 = line.end.y

  const numerator = Math.abs((y2 - y1) * point.x - (x2 - x1) * point.y + x2 * y1 - y2 * x1)
  const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2)

  return numerator / denominator
}

export function snapToLineSegment(point: IVector2, line: SketchLine): IVector2 {
  // 计算点到线段最近的点，然后将该点返回
  const x1 = line.start.x
  const y1 = line.start.y
  const x2 = line.end.x
  const y2 = line.end.y

  const dx = x2 - x1
  const dy = y2 - y1

  const t = ((point.x - x1) * dx + (point.y - y1) * dy) / (dx ** 2 + dy ** 2)

  if (t <= 0) {
    return line.start
  }
  else if (t >= 1) {
    return line.end
  }
  else {
    const x = x1 + t * dx
    const y = y1 + t * dy
    return { x, y }
  }
}
