import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ items, loading }) {
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
