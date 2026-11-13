const BASE = import.meta.env.VITE_CATALOG_API_URL

export async function fetchCatalog(filters) {
  const params = new URLSearchParams()
  params.set('category', filters.category)
  params.set('colour', filters.colour)
  params.set('maxPrice', String(filters.maxPrice))
  if (filters.q) params.set('q', filters.q)
  if (filters.sale) params.set('sale', '1')
  params.set('room', filters.room)

  const res = await fetch(`${BASE}?${params.toString()}`)

  const data = await res.json()
  return data
}

export async function fetchStock() {
  const res = await fetch(`${BASE}/stock`)
  return res.json()
}
