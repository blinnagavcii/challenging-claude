const ROOMS = [
  { slug: 'wohnzimmer', label: 'Wohnzimmer' },
  { slug: 'schlafzimmer', label: 'Schlafzimmer' },
  { slug: 'kueche', label: 'Küche' },
  { slug: 'bad', label: 'Bad' },
  { slug: 'esszimmer', label: 'Esszimmer' },
  { slug: 'kinderzimmer', label: 'Kinderzimmer' },
]

export default function RoomTiles({ onSelect, activeRoom }) {
  return (
    <section className="rooms">
      <div className="rooms-head">
        <h2>Shoppen nach Räumen</h2>
        <p>Passende Beleuchtung für jeden Raum im Haus</p>
      </div>
      <div className="rooms-grid">
        {ROOMS.map((room) => (
          <button
            key={room.slug}
            className={'room-tile' + (activeRoom === room.slug ? ' is-active' : '')}
            onClick={() => onSelect(room.slug)}
          >
            <img src={`/img/room-${room.slug}.jpg`} alt={`${room.label} – Beleuchtungsideen`} />
            <span className="room-label">{room.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
