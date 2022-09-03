/// <reference path="environment.d.ts" />

import react from '@vitejs/plugin-react';
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
  };
};
