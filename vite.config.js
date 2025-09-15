import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serves project sites under /<repo>/, set base accordingly
  base: '/liihaozhe-portfolio-page-portfolio/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    // 生成的文件名不包含hash，便于Hugo引用
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})