import { useEffect, useState } from 'react'
import { fetchCatalog } from '../lib/api.js'

function useDebouncedValue(value, wait) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), wait)
    return () => clearTimeout(timer)
  }, [value, wait])

  return debounced
}

export function useCatalog(filters) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Typing and dragging the price slider fire on every change, so wait for a
  // pause. Clicks on category, colour, room and sale apply immediately.
  const q = useDebouncedValue(filters.q, 250)
  const maxPrice = useDebouncedValue(filters.maxPrice, 250)
  const { category, colour, sale, room } = filters

  useEffect(() => {
    // Abort the previous request when filters change, so a slow response for
    // an old filter can never overwrite the results for the current one.
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchCatalog({ category, colour, maxPrice, q, sale, room }, { signal: controller.signal })
      .then((data) => {
        setItems(data.items)
        setTotal(data.total)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err)
        setLoading(false)
      })

    return () => controller.abort()
  }, [category, colour, maxPrice, q, sale, room])

  return { items, total, loading, error }
}
