const BASE = import.meta.env.VITE_CATALOG_API_URL
const API_KEY = import.meta.env.VITE_CATALOG_API_KEY

export async function fetchCatalog(filters, { signal } = {}) {
  const params = new URLSearchParams()
  params.set('category', filters.category)
  params.set('colour', filters.colour)
  params.set('maxPrice', String(filters.maxPrice))
  if (filters.q) params.set('q', filters.q)
  if (filters.sale) params.set('sale', '1')
  params.set('room', filters.room)

  const res = await fetch(`${BASE}?${params.toString()}`, {
    signal,
    headers: {
      'X-Api-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) throw new Error(`Catalogue request failed: ${res.status}`)

  const data = await res.json()
  return data
}

export async function fetchStock() {
  const res = await fetch(`${BASE}/stock`, {
    headers: { 'X-Api-Key': API_KEY },
  })
  return res.json()
}
