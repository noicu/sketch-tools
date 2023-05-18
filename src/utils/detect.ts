import type { SketchBasic } from '../core/basic'
import type { IVector2 } from '../core/vector'

export function detectCollision(element1: SketchBasic, element2: SketchBasic): boolean {
  // 计算两个元素在当前时间步长内的位置
  const left1 = element1.x
  const right1 = element1.x + element1.width
  const top1 = element1.y
  const bottom1 = element1.y + element1.height

  const left2 = element2.x
  const right2 = element2.x + element2.width
  const top2 = element2.y
  const bottom2 = element2.y + element2.height

  // 判断两个元素是否在当前时间步长内相交
  if (left1 <= right2 && right1 >= left2 && top1 <= bottom2 && bottom1 >= top2) {
    // 发生了碰撞
    return true
  }
  else {
    // 没有碰撞
    return false
  }
}

// const point: Point = { x: 10, y: 20 };
// const polygon: Point[] = [
//   { x: 0, y: 0 },
//   { x: 100, y: 0 },
//   { x: 100, y: 100 },
//   { x: 0, y: 100 },
// ];

// if (isPointInPolygon(point, polygon)) {
//   console.log('The point is inside the polygon');
// } else {
//   console.log('The point is outside the polygon');
// }
export function isPointInPolygon(point: IVector2, polygon: IVector2[]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x
    const yi = polygon[i].y
    const xj = polygon[j].x
    const yj = polygon[j].y
    const intersect = ((yi > point.y) !== (yj > point.y))
                      && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi)
    if (intersect)
      inside = !inside
  }
  return inside
}
