import { useEffect, useState } from 'react'
import { fetchCatalog } from '../lib/api.js'

function debounce(fn, wait) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

export function useCatalog(filters) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const load = debounce((activeFilters) => {
    fetchCatalog(activeFilters).then((data) => {
      setItems(data.items)
      setTotal(data.total)
      setLoading(false)
    })
  }, 250)

  useEffect(() => {
    setLoading(true)
    load(filters)
  }, [filters.category, filters.colour, filters.maxPrice, filters.q, filters.sale, filters.room])

  return { items, total, loading }
}
