import { defineConfig } from 'vite'
import  vue  from '@vitejs/plugin-vue2'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue','.css'],
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
  },
  // 其他配置...
});
