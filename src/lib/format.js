export function formatPrice(value) {
  return value.toFixed(2) + ' €'
}

export function formatDiscount(priceGross, rrp) {
  const pct = ((rrp - priceGross) / rrp) * 100
  return '-' + Math.round(pct) + '%'
}

export function cartTotal(lines) {
  let total = 0
  for (const line of lines) {
    total = total + line.priceGross * line.qty
  }
  return total
}
