import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'posthog-js': path.resolve(__dirname, './plugins/posthog.js'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ['posthog-js']
    }
  },
});
