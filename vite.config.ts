import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PACKAGE_ROOT = __dirname

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    port: 3000,
    strictPort: true,
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri supports es2021
    target: ['es2021', 'chrome97', 'safari13'],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    alias: {
      '~/': join(PACKAGE_ROOT, 'src') + '/',
      '~/components/': join(PACKAGE_ROOT, 'src') + '/components/',
      '~/context/': join(PACKAGE_ROOT, 'src') + '/context/',
      '~/hooks/': join(PACKAGE_ROOT, 'src') + '/hooks/',
      '~/locales/': join(PACKAGE_ROOT, 'src') + '/locales/',
      '~/styles/': join(PACKAGE_ROOT, 'src') + '/styles/',
      '~/types/': join(PACKAGE_ROOT, 'src') + '/types/',
      '~/utils/': join(PACKAGE_ROOT, 'src') + '/utils/',
    },
  },
})
