import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// Static GitHub Pages build (npm run build:pages). The Cloudflare build in vite.config.ts is unchanged.
export default defineConfig({
  root: 'static',
  base: '/sanctions-review-desk/',
  publicDir: '../public',
  css: {postcss: {plugins: [tailwindcss()]}},
  plugins: [react()],
  build: {outDir: '../pages-dist', emptyOutDir: true},
});
