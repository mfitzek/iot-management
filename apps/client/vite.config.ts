import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

const getPath = (short) => path.resolve(__dirname, short);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': getPath('./src/components'),
      '@pages': getPath('./src/pages'),
      '@layouts': getPath('./src/layouts'),
      '@store': getPath('./src/store'),
      '@service': getPath('./src/service'),
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar(),
    tsconfigPaths({
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.vue', '.Vue'],
    }),
  ],
  server: {
    fs: {
      allow: ['..', '../..'],
    },
  },
});
