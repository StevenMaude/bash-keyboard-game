import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isElectron = mode === 'electron';
  return {
    // Electron renderer needs relative asset paths (file:// protocol).
    // The GitHub Pages build uses absolute paths (served from a web root).
    base: isElectron ? './' : '/',
    build: {
      outDir: isElectron ? 'dist/renderer' : 'docs',
      emptyOutDir: true,
    },
  };
});
