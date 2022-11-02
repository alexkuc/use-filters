/// <reference path="environment.d.ts" />

import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const build = {
    // https://v2.vitejs.dev/guide/build.html#library-mode
    lib: {
      entry: resolve(__dirname, 'src/useFilters'),
      name: 'use-filters',
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  };

  // workaround for https://github.com/vitejs/vite/issues/2967
  if (process.env.VITE_MODE === 'DOCS') {
    delete build['lib'];
    delete build['rollupOptions'];
    build['outDir'] = 'docs';
  }

  // workaround for https://github.com/vitejs/vite/issues/2967
  const base: string = process.env.VITE_MODE !== 'DOCS' ? '/' : '/use-filters/';

  return {
    // https://v2.vitejs.dev/guide/static-deploy.html#github-pages
    base,
    plugins: [react()],
    server: {
      host: process.env.VITE_HOST ?? 'localhost',
      port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 5173,
    },
    build,
  };
};
