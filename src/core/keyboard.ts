import { EventEmitter } from './event'
import { reactive } from './utils'

export enum IKeyCode {
  Backquote = 'Backquote',
  Digit1 = 'Digit1',
  Digit2 = 'Digit2',
  Digit3 = 'Digit3',
  Digit4 = 'Digit4',
  Digit5 = 'Digit5',
  Digit6 = 'Digit6',
  Digit7 = 'Digit7',
  Digit8 = 'Digit8',
  Digit9 = 'Digit9',
  Digit0 = 'Digit0',
  Minus = 'Minus',
  Equal = 'Equal',
  Backspace = 'Backspace',
  Tab = 'Tab',
  KeyQ = 'KeyQ',
  KeyW = 'KeyW',
  KeyE = 'KeyE',
  KeyR = 'KeyR',
  KeyT = 'KeyT',
  KeyY = 'KeyY',
  KeyU = 'KeyU',
  KeyI = 'KeyI',
  KeyO = 'KeyO',
  KeyP = 'KeyP',
  BracketLeft = 'BracketLeft',
  BracketRight = 'BracketRight',
  Backslash = 'Backslash',
  CapsLock = 'CapsLock',
  KeyA = 'KeyA',
  KeyS = 'KeyS',
  KeyD = 'KeyD',
  KeyF = 'KeyF',
  KeyG = 'KeyG',
  KeyH = 'KeyH',
  KeyJ = 'KeyJ',
  KeyK = 'KeyK',
  KeyL = 'KeyL',
  Semicolon = 'Semicolon',
  Quote = 'Quote',
  Enter = 'Enter',
  ShiftLeft = 'ShiftLeft',
  KeyZ = 'KeyZ',
  KeyX = 'KeyX',
  KeyC = 'KeyC',
  KeyV = 'KeyV',
  KeyB = 'KeyB',
  KeyN = 'KeyN',
  KeyM = 'KeyM',
  Comma = 'Comma',
  Period = 'Period',
  Slash = 'Slash',
  ShiftRight = 'ShiftRight',
  ControlLeft = 'ControlLeft',
  MetaLeft = 'MetaLeft',
  AltLeft = 'AltLeft',
  Space = 'Space',
  AltRight = 'AltRight',
  MetaRight = 'MetaRight',
  ContextMenu = 'ContextMenu',
  ControlRight = 'ControlRight',
}

export type IKeyCodeType = IKeyCode | keyof typeof IKeyCode

export type ISketchKeyboardEvent = 'ctrlKey' | 'altKey' | 'shiftKey' | IKeyCodeType | 'keydown' | 'keyup' | 'key'

export class SketchKeyboard {
  private _event = new EventEmitter<SketchKeyboard>()

  private _ctrlKey = false
  private _altKey = false
  private _shiftKey = false
  private _metaKey = false
  private _keys = reactive<{
    [key in IKeyCodeType]: boolean
  }>({} as any)

  get keys() {
    return Object.keys(this._keys).filter(key => this._keys[key as IKeyCodeType]) as IKeyCodeType[]
  }

  get ctrl() {
    return this._ctrlKey
  }

  set ctrl(value) {
    if (this._ctrlKey !== value) {
      this._ctrlKey = value
      this._event.emit('ctrlKey', this)
    }
  }

  get alt() {
    return this._altKey
  }

  set alt(value) {
    if (this._altKey !== value) {
      this._altKey = value
      this._event.emit('altKey', this)
    }
  }

  get shift() {
    return this._shiftKey
  }

  set shift(value) {
    if (this._shiftKey !== value) {
      this._shiftKey = value
      this._event.emit('shiftKey', this)
    }
  }

  get meta() {
    return this._metaKey
  }

  set meta(value) {
    if (this._metaKey !== value) {
      this._metaKey = value
      this._event.emit('metaKey', this)
    }
  }

  constructor() {
    document.addEventListener('keydown', (event) => {
      this._keyEvent(event)
      this._event.emit('keydown', this)
    })

    document.addEventListener('keyup', (event) => {
      this._keyEvent(event)
      this._event.emit('keyup', this)
    })
  }

  private _keyEvent(event: KeyboardEvent) {
    this.ctrl = event.ctrlKey
    this.alt = event.altKey
    this.shift = event.shiftKey
    this.meta = event.metaKey
    this._keys[event.code as IKeyCodeType] = event.type === 'keydown'
  }

  isPressed(key: IKeyCodeType) {
    return this._keys[key]
  }

  on(eventName: ISketchKeyboardEvent, handler: (event: SketchKeyboard) => void) {
    this._event.on(eventName, handler)
  }
}
