# Review — category listing page

## How the issues are ranked

By **business impact**: how much revenue an issue can cost, multiplied by how many visitors it reaches.

I’m aware that localization issues, such as incorrect language settings, could impact a large number of customers outside the German-speaking market. However, since I only have three issues to fix, I think it makes more sense to focus on a single market for now, where we have the greatest potential to generate revenue.

- **Security exposure with unknown scope** is treated at its worst case: the damage is outside our control and cannot be undone.
- **Campaign weeks count most**: revenue is concentrated there and prices and stock move fastest.
- Taking the shop down **for everyone** ranks above breaking individual sessions.
- **Losing the sale** ranks above making the page worse.

## 1. A live API key is shipped to every browser

`VITE_CATALOG_API_KEY=lum_live_sk_…` is committed in `.env`, inlined into the production bundle (confirmed in the `vite build` output), exposed through public sourcemaps, and present in git history.

**Why first:** `live_sk` reads as a production secret with unknown scope. If it can write, anyone can change prices or stock. Even if it is read-only, it allows scraping and quota abuse in Luminara's name. The exposure grows every hour the key stays valid and cannot be undone, and rotation is the cheapest action on this list.

**Ask the platform team** rotate the API key today and revoke the old one, then add it at the server instead of in the browser.

## 2. The basket drawer polls stock forever, and the load multiplies

In `CartDrawer.jsx:12-16`, `setInterval` has no cleanup and runs even while the drawer is closed. Every basket change and every open or close adds **another** 3-second poller, each fetching stock for the whole catalogue.

**Why second:** every visitor generates this load from page load onward, and the most active shoppers in campaign weeks generate the most. It can take the catalogue service, and with it the whole shop, down at its most valuable moment.

## 3. Prices are slow to load and go stale in the basket
This is more backend that's why I left it out since there is not much we can do. The idea here is that when we fetch data on basket for quantity, we should as the beckend team to also give us prices where we could update the basket as well. Fetching everything from the catalogue when opening the basket is not ideal therefore I will move to fix 4.

- **Uncacheable and oversized:** `no-store` plus `Vary: Cookie` makes Varnish send every listing view to origin (about 1 s). Each response is 202 KB, where the cards use about 7 KB.
- **Stale basket:** the basket saves `priceGross` in `localStorage` and never refreshes it. After a campaign price change, the basket and the card disagree.

**Why third:** every visitor waits on every filter change, and slow listings lose conversion. In campaign weeks, the uncached catalogue also makes #2 worse. A basket price that disagrees with the card costs trust and sales, but none of this takes the shop down.

**Ask the service team**

- a short `s-maxage` with `stale-while-revalidate`, plus a purge on PIM changes, instead of `no-store`
- dropping `Vary: Cookie`
- a slim listing response

## 4. The grid can show the wrong products, or never finish loading

In `useCatalog.js`, the debounce is recreated on every render, and nothing cancels stale requests, so responses arrive out of order. To reproduce: click **Sale**, then **Pendelleuchten** within about 200 ms, and the grid shows sale items. With no error handling, any API failure leaves "Lade Produkte …" on screen forever.

**Why fourth:** it breaks the core job of the page and loses the sale outright, but one session at a time.

## 5. First load is slower than it needs to be

The hero image, the likely LCP element, is `loading="lazy"`. Fonts use `display=block`. 48 product images load eagerly without dimensions, which causes layout shift.

**Why here:** this hits every visitor's conversion and search ranking, but it degrades the page rather than breaking it.

## 6. Filter state lives only in memory

Nothing is written to the URL. Campaign emails and ads cannot link to "Sale" or a category, the back button leaves the shop, and views cannot be shared.

**Why here:** it wastes campaign marketing spend, but it is a missing capability rather than a defect.

## 7. Basket storage grows without limit and eventually white-screens the page

In `useCart.js:21-31`, the persist effect has no dependency list. It appends a full basket snapshot on every render. When `localStorage` fills up, the write throws, the page goes blank, and it stays blank on every reload.

**Why here:** it is fatal for the most loyal repeat customers, but storage fills slowly, so few are affected today.

## 8. Every string and format is hardcoded

All copy is inline German, prices are formatted by hand, and `lang="de"` is fixed.

**Why here:** German-only is the business's choice. The cost only lands if they decide to localise.

## 9. Prices show German VAT to every EU customer, in the wrong number format

- **Wrong amount (service-side):** every EU customer sees German 19 % VAT, so French and Dutch customers likely see the wrong final price.
- **Wrong notation:** `129.00 €` instead of `129,00 €`, even for German customers.

**Why here:** the wrong amount affects only non-German customers and can only be fixed by the service. The notation is cosmetic.

**Ask Service team** per-country gross prices, so each customer sees the VAT of their own country.

## 10. Filters and the basket are not usable by keyboard or screen reader

Filter options, the drawer's close button and "Entfernen" are `<div onClick>`. The drawer has no dialog role, focus handling or Escape key.

**Why last:** these customers cannot filter or edit their basket at all, and the European Accessibility Act (BFSG) applies since June 2025. It affects a small share of sessions, but I could argue it higher on legal risk.

---

## Issues that share a fix

I'm leaving the list here so these stay separate issues but each pair can be tackled together.

- **#1 and #3:** removing the key also removes the custom request headers that would hurt caching in #3.
- **#2 and #7** are the same mistake: an effect with no cleanup or no dependency list.
- **#3's stale basket and #7** are both fixed by one change to `useCart` that stores only `sku` and `qty`.
- **#8 and #9's notation** both start with `Intl.NumberFormat`.

## Seen, deliberately not ranked

- `key={index}` in `ProductGrid`.
- The page is not responsive in mobile.
- The grid blanks on every filter change.
- The basket counter counts lines, not items.
- Sold-out products can be added to the basket ("nur noch 0 verfügbar").
- Google Fonts are loaded from Google's servers, which German courts have treated as a GDPR issue (LG München I, 2022).
- `.env` hardcodes `VITE_ENV=production`.
- Price-display rules: the struck-through RRP is not labelled UVP, there is no 30-day lowest price (PAngV §11), and the banner promises "bis zu 40 %" while every sale item is −20 %.
