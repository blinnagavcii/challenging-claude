import { createContext, useContext, useState } from 'react'
import Hero from './components/Hero.jsx'
import FilterPanel from './components/FilterPanel.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import RoomTiles from './components/RoomTiles.jsx'
import { useCatalog } from './hooks/useCatalog.js'
import { useCart } from './hooks/useCart.js'

const CartContext = createContext(null)

export function useCartContext() {
  return useContext(CartContext)
}

const DEFAULT_FILTERS = {
  category: 'all',
  colour: 'all',
  maxPrice: 600,
  q: '',
  sale: false,
  room: 'all',
}

const NAV = [
  { category: 'pendant', label: 'Pendelleuchten' },
  { category: 'floor', label: 'Stehleuchten' },
  { category: 'table', label: 'Tischleuchten' },
  { category: 'wall', label: 'Wandleuchten' },
  { category: 'ceiling', label: 'Deckenleuchten' },
]

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [cartOpen, setCartOpen] = useState(false)
  const cart = useCart()
  const { items, total, loading, error } = useCatalog(filters)

  function updateFilter(key, value) {
    setFilters({ ...filters, [key]: value })
  }

  function selectCategory(category) {
    setFilters({ ...filters, category, sale: false })
  }

  function selectRoom(room) {
    setFilters({ ...filters, room, category: 'all', sale: false })
  }

  return (
    <CartContext.Provider value={{ ...cart, open: cartOpen, setOpen: setCartOpen }}>
      <div className="announce">Herbstaktion — bis zu 40 % reduziert</div>

      <header className="site-header">
        <div className="header-row">
          <input
            className="header-search"
            type="search"
            placeholder="Leuchten suchen"
            aria-label="Leuchten suchen"
            value={filters.q}
            onChange={(e) => updateFilter('q', e.target.value)}
          />
          <a className="wordmark" href="/">
            Luminara
            <span>Living</span>
          </a>
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            Warenkorb ({cart.lines.length})
          </button>
        </div>
        <nav className="site-nav">
          {NAV.map((item) => (
            <button
              key={item.category}
              className={
                'nav-link' +
                (!filters.sale && filters.category === item.category ? ' is-active' : '')
              }
              onClick={() => selectCategory(item.category)}
            >
              {item.label}
            </button>
          ))}
          <button
            className={'nav-link is-sale' + (filters.sale ? ' is-active' : '')}
            onClick={() => setFilters({ ...filters, category: 'all', room: 'all', sale: true })}
          >
            Sale
          </button>
        </nav>
      </header>

      <Hero />

      <main className="layout" id="katalog">
        <FilterPanel filters={filters} onChange={updateFilter} />
        <section className="results">
          <div className="results-head">
            <h2>Leuchten</h2>
            <p className="results-count">{error ? '' : loading ? 'Lade …' : `${total} Artikel`}</p>
          </div>
          <ProductGrid items={items} loading={loading} error={error} />
        </section>
      </main>

      <RoomTiles onSelect={selectRoom} activeRoom={filters.room} />

      <CartDrawer />

      <footer className="site-footer">
        <p className="footer-mark">Luminara Living</p>
        <p>Versand in alle EU-Länder · Preise inkl. MwSt. · 30 Tage Rückgaberecht</p>
      </footer>
    </CartContext.Provider>
  )
}
