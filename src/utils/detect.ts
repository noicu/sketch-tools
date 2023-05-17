import type { SketchBasic } from '../core/basic'

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
