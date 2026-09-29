const CATEGORIES = [
  { value: 'all', label: 'Alle Kategorien' },
  { value: 'pendant', label: 'Pendelleuchten' },
  { value: 'floor', label: 'Stehleuchten' },
  { value: 'table', label: 'Tischleuchten' },
  { value: 'wall', label: 'Wandleuchten' },
  { value: 'ceiling', label: 'Deckenleuchten' },
]

const COLOURS = [
  { value: 'all', label: 'Alle Farben' },
  { value: 'brass', label: 'Messing' },
  { value: 'black', label: 'Schwarz' },
  { value: 'white', label: 'Weiß' },
  { value: 'chrome', label: 'Chrom' },
]

const ROOMS = [
  { value: 'all', label: 'Alle Räume' },
  { value: 'wohnzimmer', label: 'Wohnzimmer' },
  { value: 'schlafzimmer', label: 'Schlafzimmer' },
  { value: 'kueche', label: 'Küche' },
  { value: 'esszimmer', label: 'Esszimmer' },
  { value: 'bad', label: 'Bad' },
  { value: 'kinderzimmer', label: 'Kinderzimmer' },
]

export default function FilterPanel({ filters, onChange }) {
  return (
    <aside className="filters">
      <div className="filter-block">
        <p className="filter-label">Kategorie</p>
        <ul className="filter-list">
          {CATEGORIES.map((c) => (
            <li key={c.value}>
              <div
                className={'filter-option' + (filters.category === c.value ? ' is-active' : '')}
                onClick={() => onChange('category', c.value)}
              >
                <span className="filter-box" />
                {c.label}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-block">
        <p className="filter-label">Farbe</p>
        <ul className="filter-list">
          {COLOURS.map((c) => (
            <li key={c.value}>
              <div
                className={'filter-option' + (filters.colour === c.value ? ' is-active' : '')}
                onClick={() => onChange('colour', c.value)}
              >
                <span className="filter-box" />
                {c.label}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-block">
        <p className="filter-label">Raum</p>
        <ul className="filter-list">
          {ROOMS.map((r) => (
            <li key={r.value}>
              <div
                className={'filter-option' + (filters.room === r.value ? ' is-active' : '')}
                onClick={() => onChange('room', r.value)}
              >
                <span className="filter-box" />
                {r.label}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-block">
        <label className="filter-label" htmlFor="price">
          Preis bis {filters.maxPrice} €
        </label>
        <input
          id="price"
          className="filter-range"
          type="range"
          min="49"
          max="600"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onChange('maxPrice', Number(e.target.value))}
        />
      </div>
    </aside>
  )
}
