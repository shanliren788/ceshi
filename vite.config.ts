
import { defineConfig } from 'vite';

export default defineConfig({
  // base 设置为 './' 确保在 github.io/repo-name/ 这种子路径下资源路径解析正确
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    historyApiFallback: true,
  }
});
