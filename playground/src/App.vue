<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { HoverLater, SelectLayer, SketchBlock, SketchWorkspace } from 'sketch-tools'

const wpRef = ref<HTMLElement | null>(null)

onMounted(() => {
  console.log('mounted')
  const wp = new SketchWorkspace(wpRef.value as HTMLElement)

  const b1 = new SketchBlock()
  const b2 = new SketchBlock()

  const l1 = new HoverLater(wp)
  const l2 = new SelectLayer(wp)

  wp.addLayer(l1)
  wp.addLayer(l2)

  b1.width = 200
  b1.height = 100
  b1.x = 100
  b1.y = 100
  b1.element.style.backgroundColor = '#5e5e5e'
  b1.element.style.boxShadow = '0px 0px 5px #000'

  b2.width = 200
  b2.height = 100
  b2.x = 200
  b2.y = 200
  b2.element.style.backgroundColor = '#5e5e5e'

  wp.worklayer.addChild(b1)
  wp.worklayer.addChild(b2)


  for (let i = 0; i < 10; i++) {
    const bn = new SketchBlock()
    bn.width = 200
    bn.height = 100
    bn.x = 100 + i * 100
    bn.y = 100 + i * 100
    bn.element.style.backgroundColor = '#5e5e5e'
    bn.element.style.boxShadow = '0px 0px 5px #000'
    wp.worklayer.addChild(bn)
  }

  // 创建一个iframe


  console.log(wp, b1)
})
</script>

<template>
  <div ref="wpRef" style="width: 100%;height: 100%;" />
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
}
</style>
