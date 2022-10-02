/// <reference path="environment.d.ts" />

import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react()],
    server: {
      host: process.env.VITE_HOST ?? 'localhost',
      port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 5173,
    },
    // https://vitejs.dev/guide/build.html#library-mode
    build: {
      lib: {
        entry: resolve(__dirname, 'src/useFilters'),
        name: 'CoolFilters',
      },
      rollupOptions: {
        external: ['react'],
        output: {
          globals: {
            react: 'React',
          },
        },
      },
    },
  };
};
