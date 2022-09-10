import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: { transformAssetUrls }
  }),
  quasar(),
  tsconfigPaths({
    projects: ["tsconfig.json", "../api/" ]
  }),
],
});
