# sketch-tools

> A collection of tools for Sketch

## Install

```sh
npm install sketch-tools
```

## Usage

```js
import { getDocument } from 'sketch-tools'

const document = getDocument()
```

## 目标
- [] 工作区
  - [] 画板
    - [] 普通元素
    - [] 组
    - [] svg
  - [] 普通元素
  - [] 组
  - [] svg

### 工作区 属性
- 子元素 【类型任意】

### 画板（页面） 属性
- 子元素 【类型任意 不包括工作区】
- 可被选中
- 可被锁定
- 可被隐藏
- 可被重命名
- 可被删除
- 可被复制
- 可被粘贴
- 可被移动
- 可被调整大小

### 普通元素（组件） 属性
- 子元素 【类型任意 不包括工作区，画板】
- 可被选中
- 可被锁定
- 可被隐藏
- 可被重命名
- 可被删除
- 可被复制
- 可被粘贴
- 可被移动
- 可被调整大小


### 组（组件） 属性
- 子元素 【类型任意 不包括工作区，画板】
- 可被选中
- 可被锁定
- 可被隐藏
- 可被重命名
- 可被删除
- 可被复制
- 可被粘贴
- 可被移动
- 可被调整大小


### svg（组件）属性
- 子元素 【svg元素】
- 可被选中
- 可被锁定
- 可被隐藏
- 可被重命名
- 可被删除
- 可被复制
- 可被粘贴
- 可被移动
- 可被调整大小
- 可被编辑 【svg编辑器】


## License

[MIT](./LICENSE) License © 2022 [Noicu](https://github.com/nociu)
