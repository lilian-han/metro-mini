import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
  },
  resolve: {
    // ↓路径别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    uni(),
    AutoImport({
      // 使用
      imports: ['vue'],
      dts: 'src/auto-import.d.ts',
      // 如有用到eslint记得加上写段，没有用到可以忽略
      eslintrc: {
        enabled: true,
      },
    }),
  ],
});
