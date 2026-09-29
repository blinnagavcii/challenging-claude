import { PRODUCTS } from './fixtures.js'

const LATENCY_MS = 120

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Mirrors the response shape of lamp-catalog-service (see platform repo).
function queryCatalog(params) {
  const category = params.get('category')
  const colour = params.get('colour')
  const maxPrice = params.get('maxPrice')
  const q = params.get('q')
  const sale = params.get('sale')
  const room = params.get('room')

  let items = PRODUCTS.slice()

  if (category && category !== 'all') {
    items = items.filter((p) => p.category === category)
  }
  if (colour && colour !== 'all') {
    items = items.filter((p) => p.colour === colour)
  }
  if (maxPrice) {
    items = items.filter((p) => p.priceGross <= Number(maxPrice))
  }
  if (q) {
    const needle = q.toLowerCase()
    items = items.filter((p) => p.name.toLowerCase().includes(needle))
  }
  if (sale) {
    items = items.filter((p) => p.onSale)
  }
  if (room && room !== 'all') {
    items = items.filter((p) => p.rooms.includes(room))
  }

  return items
}

async function handle(req, res, next) {
  const url = new URL(req.url, 'http://localhost')

  if (!url.pathname.startsWith('/api/catalog')) return next()

  // Broader filter combinations take the slow path in the real service.
  const params = url.searchParams
  const filterCount = ['category', 'colour', 'maxPrice', 'q', 'room'].filter(
    (k) => params.get(k) && params.get(k) !== 'all',
  ).length
  await delay(LATENCY_MS + (5 - filterCount) * 210)

  if (url.pathname === '/api/catalog/stock') {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    const stock = {}
    for (const p of PRODUCTS) {
      stock[p.sku] = p.stock
    }
    res.end(JSON.stringify({ stock, checkedAt: Date.now() }))
    return
  }

  const items = queryCatalog(params)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
  res.setHeader('Vary', 'Cookie, Accept-Encoding')
  res.end(JSON.stringify({ items, total: items.length, generatedAt: Date.now() }))
}

export function catalogService() {
  return {
    name: 'lamp-catalog-service-stub',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}
