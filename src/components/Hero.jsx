export default function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-image"
        src="/img/hero-interior.jpg"
        alt="Wohnzimmer mit Luminara Leuchten"
        loading="lazy"
      />
      <div className="hero-copy">
        <p className="hero-kicker">Neue Kollektion</p>
        <h1>Licht, das bleibt</h1>
        <p className="hero-sub">Designerleuchten aus Skandinavien</p>
        <button
          className="hero-cta"
          onClick={() => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Kollektion entdecken
        </button>
      </div>
    </section>
  )
}
