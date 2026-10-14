import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { catalogService } from './mock-api/lamp-catalog-service.js'

// Stands in for the edge proxy in production: the catalogue API key is
// attached server-side so it never ships in the browser bundle.
function catalogApiKey(key) {
  const inject = (req, _res, next) => {
    if (key && req.url.startsWith('/api/catalog')) req.headers['x-api-key'] = key
    next()
  }
  return {
    name: 'catalog-api-key',
    configureServer(server) {
      server.middlewares.use(inject)
    },
    configurePreviewServer(server) {
      server.middlewares.use(inject)
    },
  }
}

// The real lamp-catalog-service runs in Kubernetes. For local frontend work we
// mount an equivalent stub on the dev server so `npm run dev` is the only step.
export default defineConfig(({ mode }) => {
  // '' loads unprefixed vars too; CATALOG_API_KEY is only read here, never exposed to the client.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // catalogApiKey must run before catalogService so the header is set first.
    plugins: [react(), catalogApiKey(env.CATALOG_API_KEY), catalogService()],
    build: {
      // Still generated for error tracking, but no longer referenced from the public bundle.
      sourcemap: 'hidden',
    },
  }
})
