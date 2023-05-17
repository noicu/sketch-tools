export function generateUUID(): string {
  let date = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const random = (date + Math.random() * 16) % 16 | 0
    date = Math.floor(date / 16)
    return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export type Dep = Set<ReactiveEffect>

let activeEffect: ReactiveEffect | undefined
export const targetMap = new WeakMap<object, Map<string, Dep>>()
export function getDep(target: object, key: string): Dep {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  return dep
}

export type ReactiveEffect = () => void
export function effect(fn: ReactiveEffect) {
  activeEffect = fn
  fn()
  activeEffect = undefined
}

export function reactive<T extends object>(obj: T): T {
  return new Proxy(obj, {
    get(target, key) {
      const dep = getDep(target, key as string)
      if (activeEffect)
        dep.add(activeEffect)

      return Reflect.get(target, key)
    },
    set(target, key, value) {
      Reflect.set(target, key, value)
      const dep = getDep(target, key as string)
      dep.forEach((effect: ReactiveEffect) => effect())
      return true
    },
  })
}
