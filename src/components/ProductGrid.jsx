import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ items, loading, error }) {
  if (error) {
    return (
      <div className="grid-status" role="alert">
        Die Produkte konnten nicht geladen werden. Bitte versuchen Sie es später erneut.
      </div>
    )
  }

  if (loading) {
    return <div className="grid-status">Lade Produkte …</div>
  }

  return (
    <div className="grid">
      {items.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  )
}
