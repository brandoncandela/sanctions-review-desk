import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// Builds the static site in pages-dist/, published to GitHub Pages at /sanctions-review-desk/.
export default defineConfig({
  root: 'static',
  base: '/sanctions-review-desk/',
  publicDir: '../public',
  css: {postcss: {plugins: [tailwindcss()]}},
  plugins: [react()],
  build: {outDir: '../pages-dist', emptyOutDir: true},
});
