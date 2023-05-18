import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts', // 整个打包，单入口
      name: 'sketch-tools',
      formats: ['es', 'umd', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: [], // 如果不把vue打包进来就会报错
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {},
        exports: 'named',
      },
    },
  },
})
