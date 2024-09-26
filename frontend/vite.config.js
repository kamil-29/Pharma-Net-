import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define aliases for commonly used paths
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
    server: {
      proxyTimeout: 60000, // Set a higher value in milliseconds
    },
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
    optimizeDeps: {
      include: ['axios'], // Specify dependencies for optimization
    },
  },
})
