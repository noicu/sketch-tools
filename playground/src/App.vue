<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BlockLayer, SelectLayer, SketchBlock, SketchWorkspace } from 'sketch-tools'

const wpRef = ref<HTMLElement | null>(null)

onMounted(() => {
  console.log('mounted')
  const wp = new SketchWorkspace(wpRef.value as HTMLElement)

  const b1 = new SketchBlock()

  const l1 = new BlockLayer()
  const l2 = new SelectLayer()

  wp.addLayer(l1)
  wp.addLayer(l2)

  b1.width = 100
  b1.height = 100
  b1.x = 100
  b1.y = 100
  b1.element.style.backgroundColor = 'red'

  wp.worklayer.addChild(b1)

  console.log(wp, b1)
})
</script>

<template>
  <div ref="wpRef" style="width: 100%;height: 100%;" />
</template>

<style>
html,body {
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
