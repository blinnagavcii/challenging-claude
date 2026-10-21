import { useEffect, useState } from 'react'
import { useCartContext } from '../App.jsx'
import { fetchStock } from '../lib/api.js'
import { formatPrice, cartTotal } from '../lib/format.js'

export default function CartDrawer() {
  const cart = useCartContext()
  const [stock, setStock] = useState({})
  const hasLines = cart.lines.length > 0

  // Keep availability fresh while the drawer is open — stock moves fast during
  // campaign weeks and we do not want customers checking out sold-out lines.
  // At most one poller runs, and only while the drawer is open with items in it.
  useEffect(() => {
    if (!cart.open || !hasLines) return

    let cancelled = false
    const refresh = () =>
      fetchStock()
        .then((data) => {
          if (!cancelled) setStock(data.stock)
        })
        .catch(() => {}) // keep the last known stock if a refresh fails

    refresh()
    const id = setInterval(refresh, 3000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [cart.open, hasLines])

  if (!cart.open) return null

  return (
    <div className="drawer-backdrop" onClick={() => cart.setOpen(false)}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h2>Warenkorb</h2>
          <div className="drawer-close" onClick={() => cart.setOpen(false)}>
            ×
          </div>
        </div>

        {cart.lines.length === 0 && <p className="drawer-empty">Noch nichts im Warenkorb.</p>}

        <ul className="drawer-lines">
          {cart.lines.map((line) => (
            <li key={line.sku} className="drawer-line">
              <div>
                <p className="drawer-line-name">{line.name}</p>
                <p className="drawer-line-meta">
                  {line.qty} × {formatPrice(line.priceGross)}
                  {stock[line.sku] !== undefined && stock[line.sku] < 5 && (
                    <span className="drawer-low"> · nur noch {stock[line.sku]} verfügbar</span>
                  )}
                </p>
              </div>
              <div className="drawer-remove" onClick={() => cart.remove(line.sku)}>
                Entfernen
              </div>
            </li>
          ))}
        </ul>

        <div className="drawer-total">
          <span>Summe</span>
          <strong>{formatPrice(cartTotal(cart.lines))}</strong>
        </div>
        <button className="drawer-checkout">Zur Kasse</button>
      </div>
    </div>
  )
}
