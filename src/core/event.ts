export type EventHandler<T> = (data: T) => void

export interface EventData<T> {
  handler: EventHandler<T>
  once: boolean
}

export class EventEmitter<T> {
  private eventHandlers: { [key: string]: EventData<T>[] }

  constructor() {
    this.eventHandlers = {}
  }

  on(eventName: string, handler: EventHandler<T>, once = false) {
    if (!this.eventHandlers[eventName])
      this.eventHandlers[eventName] = []

    this.eventHandlers[eventName].push({ handler, once })
  }

  off(eventName: string, handler: EventHandler<T>) {
    const handlers = this.eventHandlers[eventName]
    if (handlers) {
      const index = handlers.findIndex(eventData => eventData.handler === handler)
      if (index !== -1)
        handlers.splice(index, 1)
    }
  }

  once(eventName: string, handler: EventHandler<T>) {
    this.on(eventName, handler, true)
  }

  emit(eventName: string, data: T) {
    const handlers = this.eventHandlers[eventName]
    if (handlers) {
      for (let i = 0; i < handlers.length; i++) {
        const eventData = handlers[i]
        eventData.handler(data)
        if (eventData.once) {
          handlers.splice(i, 1)
          i--
        }
      }
    }
  }
}
