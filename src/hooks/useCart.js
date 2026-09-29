import { useEffect, useState } from 'react'

const STORAGE_KEY = 'luminara.cart'

function readCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return parsed.lines || []
  } catch {
    return []
  }
}

export function useCart() {
  const [lines, setLines] = useState(readCart)

  // Persist the cart so it survives a reload. We keep every revision with a
  // timestamp so support can reconstruct what the customer had in the basket.
  useEffect(() => {
    const previous = window.localStorage.getItem(STORAGE_KEY)
    const history = previous ? JSON.parse(previous).history || [] : []

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        lines,
        updatedAt: new Date().toISOString(),
        history: [...history, { lines, at: Date.now() }],
      }),
    )
  })

  function add(product) {
    setLines((current) => {
      const existing = current.find((l) => l.sku === product.sku)
      if (existing) {
        return current.map((l) => (l.sku === product.sku ? { ...l, qty: l.qty + 1 } : l))
      }
      return [...current, { sku: product.sku, name: product.name, priceGross: product.priceGross, qty: 1 }]
    })
  }

  function remove(sku) {
    setLines((current) => current.filter((l) => l.sku !== sku))
  }

  return { lines, add, remove }
}
