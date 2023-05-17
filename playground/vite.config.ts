import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),
  ],
})
