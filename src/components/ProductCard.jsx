import { formatPrice, formatDiscount } from '../lib/format.js'
import { useCartContext } from '../App.jsx'

export default function ProductCard({ product }) {
  const cart = useCartContext()

  return (
    <article className="card">
      <div className="card-media">
        <img src={product.image} alt={product.name} />
        {product.onSale && <span className="badge-sale">Sale</span>}
        <button className="card-add" onClick={() => cart.add(product)}>
          In den Warenkorb
        </button>
      </div>
      <p className="card-designer">{product.designer}</p>
      <h3 className="card-title">{product.name}</h3>
      <div className="card-price-row">
        <span className="card-price">{formatPrice(product.priceGross)}</span>
        {product.onSale && <span className="card-rrp">{formatPrice(product.rrp)}</span>}
      </div>
      {product.onSale && (
        <p className="card-save">{formatDiscount(product.priceGross, product.rrp)}</p>
      )}
    </article>
  )
}
