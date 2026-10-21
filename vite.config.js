import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { catalogService } from './mock-api/lamp-catalog-service.js'

// The real lamp-catalog-service runs in Kubernetes. For local frontend work we
// mount an equivalent stub on the dev server so `npm run dev` is the only step.
export default defineConfig({
  plugins: [react(), catalogService()],
  build: {
    // Still generated for error tracking, but no longer referenced from the public bundle.
    sourcemap: 'hidden',
  },
})
