// Fixture data mirroring the lamp-catalog-service response contract.
// Field set is intentionally the full record the service returns.

const NAMES = [
  ['Aurelia Pendant', 'pendant', 'brass'], ['Nordvik Floor Lamp', 'floor', 'black'],
  ['Selma Table Lamp', 'table', 'white'], ['Halden Wall Sconce', 'wall', 'brass'],
  ['Mirabel Chandelier', 'ceiling', 'chrome'], ['Oslo Reading Lamp', 'table', 'black'],
  ['Vinter Pendant Trio', 'pendant', 'white'], ['Falk Arc Floor Lamp', 'floor', 'chrome'],
  ['Lysne Ceiling Flush', 'ceiling', 'white'], ['Bergen Desk Lamp', 'table', 'brass'],
  ['Skara Wall Light', 'wall', 'black'], ['Elva Globe Pendant', 'pendant', 'chrome'],
  ['Tindra Floor Uplight', 'floor', 'white'], ['Marin Bath Sconce', 'wall', 'chrome'],
  ['Oden Linear Suspension', 'pendant', 'black'], ['Sunne Table Light', 'table', 'chrome'],
  ['Granvik Ceiling Ring', 'ceiling', 'brass'], ['Astrid Bedside Lamp', 'table', 'white'],
  ['Kvist Branch Pendant', 'pendant', 'brass'], ['Fjell Floor Reader', 'floor', 'black'],
  ['Solvik Flush Mount', 'ceiling', 'chrome'], ['Nore Picture Light', 'wall', 'brass'],
  ['Havet Drum Pendant', 'pendant', 'white'], ['Ryd Tripod Floor Lamp', 'floor', 'brass'],
]

const ROOMS_BY_CATEGORY = {
  pendant: ['esszimmer', 'kueche', 'wohnzimmer'],
  floor: ['wohnzimmer', 'schlafzimmer'],
  table: ['schlafzimmer', 'wohnzimmer', 'kinderzimmer'],
  wall: ['bad', 'schlafzimmer', 'wohnzimmer'],
  ceiling: ['wohnzimmer', 'kueche', 'bad', 'kinderzimmer'],
}

const MATERIALS = ['Messing gebürstet', 'Stahl pulverbeschichtet', 'Opalglas', 'Eichenholz massiv']
const DESIGNERS = ['A. Lindqvist', 'M. Halvorsen', 'C. Berg', 'J. Thorsen']

function buildProduct(index) {
  const [name, category, colour] = NAMES[index % NAMES.length]
  const variant = Math.floor(index / NAMES.length)
  const priceGross = Math.round((49 + ((index * 37) % 540) + variant * 15) * 100) / 100

  return {
    id: 1000 + index,
    sku: `LL-${String(1000 + index)}-${colour.slice(0, 2).toUpperCase()}`,
    name: variant === 0 ? name : `${name} ${['', 'II', 'Large', 'Mini'][variant % 4]}`.trim(),
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category,
    colour,
    priceGross,
    priceNet: Math.round((priceGross / 1.19) * 100) / 100,
    vatRate: 0.19,
    currency: 'EUR',
    rrp: Math.round(priceGross * 1.25 * 100) / 100,
    onSale: index % 5 === 0,
    stock: (index * 7) % 23,
    image: '',
    imageWidth: 1600,
    imageHeight: 1600,
    gallery: Array.from({ length: 6 }, (_, g) => ({
      url: `https://images.luminara.example/catalog/${1000 + index}/${g}.jpg`,
      width: 2400,
      height: 2400,
      alt: `${name} Ansicht ${g + 1}`,
    })),
    description: `${name} aus ${MATERIALS[index % MATERIALS.length]}. Entworfen von ${DESIGNERS[index % DESIGNERS.length]} für Luminara Living. Zeitloses skandinavisches Design für Wohn- und Essbereiche.`,
    longDescription: `${name} vereint handwerkliche Verarbeitung mit klarer Formensprache. Der Schirm aus ${MATERIALS[index % MATERIALS.length]} streut das Licht weich und blendfrei. Geeignet für Leuchtmittel der Energieeffizienzklassen A bis E. Lieferung erfolgt inklusive Montagematerial und ausführlicher Aufbauanleitung in sechs Sprachen. Die Leuchte ist dimmbar in Kombination mit handelsüblichen Phasenabschnittdimmern.`.repeat(2),
    designer: DESIGNERS[index % DESIGNERS.length],
    material: MATERIALS[index % MATERIALS.length],
    energyClass: ['A', 'B', 'C', 'D', 'E'][index % 5],
    bulbType: 'E27',
    bulbCount: (index % 3) + 1,
    maxWattage: 40 + (index % 4) * 20,
    dimmable: index % 2 === 0,
    ipRating: category === 'wall' ? 'IP44' : 'IP20',
    weightGrams: 800 + ((index * 113) % 4200),
    dimensions: { height: 20 + (index % 90), width: 15 + (index % 50), depth: 15 + (index % 50) },
    cableLength: 150,
    assemblyRequired: true,
    warrantyMonths: 24,
    countryOfOrigin: ['DE', 'PL', 'PT', 'IT'][index % 4],
    customsCode: '94051910',
    supplierId: 400 + (index % 12),
    supplierLeadDays: 3 + (index % 10),
    warehouseCode: ['FUL-DE1', 'FUL-DE2', 'FUL-NL1'][index % 3],
    ratingAverage: Math.round((3.4 + ((index % 16) / 10)) * 10) / 10,
    ratingCount: 4 + ((index * 17) % 380),
    reviews: Array.from({ length: 8 }, (_, r) => ({
      id: `${1000 + index}-${r}`,
      author: `Kundin ${r + 1}`,
      rating: 3 + ((index + r) % 3),
      body: 'Sehr schöne Leuchte, schnelle Lieferung und gute Verarbeitung. Das Licht ist angenehm warm.',
      createdAt: '2026-04-11T09:00:00.000Z',
    })),
    rooms: (() => {
      const pool = ROOMS_BY_CATEGORY[category]
      return [pool[index % pool.length], pool[(index + 1) % pool.length]]
    })(),
    tags: ['skandinavisch', category, colour],
    relatedIds: [1000 + ((index + 1) % 48), 1000 + ((index + 5) % 48), 1000 + ((index + 9) % 48)],
    seoTitle: `${name} kaufen | Luminara Living`,
    seoDescription: `${name} jetzt online bestellen. Versandkostenfrei ab 49 EUR.`,
    createdAt: '2025-11-02T10:15:00.000Z',
    updatedAt: '2026-08-19T14:32:00.000Z',
  }
}

const IMAGE_VARIANTS = 8

// Each category cycles through its own image set so neighbouring cards in the
// grid never repeat.
function assignImages(products) {
  const seen = {}
  for (const product of products) {
    seen[product.category] = (seen[product.category] || 0) + 1
    const variant = ((seen[product.category] - 1) % IMAGE_VARIANTS) + 1
    product.image = `/img/${product.category}-${variant}.jpg`
  }
  return products
}

export const PRODUCTS = assignImages(Array.from({ length: 48 }, (_, i) => buildProduct(i)))
