# Landing page audit: Vishal Apple Store

Audited 12 Nov 2026 on the running dev build (`next dev`), at 360, 390, 768, 1024 and 1440px, dark and light themes, full-page scroll.
Severity: **breaks** = broken, wrong or unusable · **looks off** = visibly wrong or generic · **polish** = small refinements.

Status column: ✅ fixed · ➖ deliberately left (reason given). Every item below was re-checked on the production build after the fixes.

---

## Global / theme

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| G1 | breaks | Light theme is a 200-line `!important` override sheet keyed to hard-coded hex classes. Anything not listed breaks: e.g. the card "Enquire" buttons become dark text on a dark fill (unreadable), the "Only 1 left" pill has no contrast. | `src/app/globals.css` | ✅ |
| G2 | looks off | No real design tokens. `tokens.ts` exists but nothing imports it; components use ~40 one-off hex values (`#0A0A0A`, `#0D0D10`, `#121214`, `#121215`, `#141417`, `#141418`, `#18181C`…) plus raw Tailwind `neutral-*`. | all components | ✅ |
| G3 | looks off | Off-palette colours throughout: emerald, sky, purple, amber, rose tints for badges and icons; WhatsApp green on the bottom bar. | ProductCard, TrustSection, MobileBottomBar, PDP | ✅ |
| G4 | looks off | Template effects: gold glow blob + dot grid behind hero, gold gradient text, glass panels, `animate-ping`/`animate-pulse` dots that loop forever, drop-shadow glows, hover-scale on images. No `prefers-reduced-motion` handling. | Hero, Header, ProductCard, VisitSection, globals.css | ✅ |
| G5 | looks off | Type scale is ad hoc (h2 sizes 2xl/3xl/4xl/5xl at random). 109 text nodes render below 12px (10–11px labels everywhere). Body copy runs past 90 characters per line in places. | all sections | ✅ |
| G6 | looks off | Section spacing varies (py-8, py-10, py-16, py-20, py-24) and every section has the same border-bottom divider. | all sections | ✅ |
| G7 | breaks | `/favicon.ico` 404 on every page (console error). | `src/app` | ✅ |
| G8 | polish | Theme default is hard-wired dark; system preference ignored. | layout.tsx, StoreContext | ✅ |

## Images

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| I1 | breaks | Every product photo is an Apple marketing render downloaded from Apple's CDN (`scripts/download-images.mjs`), several with the Apple logo on the device. Not allowed. | `public/devices/*.png` | ✅ |
| I2 | breaks | Those renders don't match each other: iPhones are tiny devices on a grey band inside a white square, Macs are white squares, iPad/AirPods fill the frame. On the dark theme they show as white rectangles floating on black. | ProductCard, Hero, PDP | ✅ |
| I3 | breaks | 10 of 22 catalog images never painted after a full scroll (blank tiles at 1440px). 7.4 MB of PNGs for the catalogue. | ProductCard | ✅ |
| I4 | looks off | Card image box is a fixed `h-52` (not an aspect ratio), PDP stage is 4:3 / 16:11, hero is 4:5: three different ratios for the same products. | ProductCard, PDP, Hero | ✅ |
| I5 | breaks | No fallback if an image fails; a broken path leaves an empty dark box. Admin, compare page and compare drawer hard-code `/devices/iphone-16-pro-natural.png` as the fallback. | ProductCard, CompareDrawer, compare page, AdminProducts | ✅ |
| I6 | looks off | Old SVG illustrations (`public/devices/*.svg`) are unused and carry gold "ambient glow" gradients. | `public/devices` | ✅ |
| I7 | polish | Logo JPEG sits on a hard white box in the dark header/footer with almost no clear space. | Header, Footer | ✅ |
| I8 | polish | Map iframe is forced into dark with `filter: invert(90%) hue-rotate(180deg)`, which also inverts the map pins/labels. Loads Google Maps + third-party cookies on page load. | VisitSection | ✅ |

## Header / navigation

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| H1 | breaks | Touch targets below 44px: theme toggle 34px, admin lock 32px, menu button 36px, nav links 28px tall. | Header.tsx | ✅ |
| H2 | looks off | Announcement bar wraps to two lines at 360/390 and has a looping pulse dot. | Header.tsx | ✅ |
| H3 | looks off | "Admin" padlock in the public header; customers don't need it. | Header.tsx | ✅ |
| H4 | looks off | Mobile menu is a 2-column grid of grey chips with mixed icons; emoji in theme label ("Light Theme ☀️"). | Header.tsx | ✅ |
| H5 | breaks | No visible keyboard focus style on most links/buttons (some have `focus:outline-none` with nothing replacing it). | Header, cards, filters | ✅ |
| H6 | polish | "Compare" nav link goes to `#compare`, which doesn't exist on the page. | Header.tsx | ✅ |

## Hero

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| HE1 | looks off | Copy is generic ad-speak: "Pure Performance. Unrivalled Craft. Curated in Amritsar.", "premier independent destination". Says nothing concrete. | Hero.tsx, store-config.ts | ✅ |
| HE2 | looks off | Fake round stat "10,000+ Devices Delivered"; floating glass badges ("100% Genuine Serial", "Up to ₹6,000 Off") over the image. | Hero.tsx | ✅ |
| HE3 | breaks | At 360/390 the device image falls below the fold after the stats and gets covered by the sticky bar; everything is centred. | Hero.tsx | ✅ |
| HE4 | polish | `min-h-screen` hero leaves big empty bands at 1024/1440. | Hero.tsx | ✅ |

## Category strip

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| C1 | looks off | Textbook template block: centred heading + row of identical icon-in-a-circle cards. It duplicates the catalog's filters. | CategoryStrip.tsx | ✅ |
| C2 | polish | Tags like "M4 Tandem OLED" at 10px. | CategoryStrip.tsx | ✅ |

## Catalog / product cards

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| P1 | breaks | Mobile "Filters" button toggles state that nothing reads; it does nothing. | CatalogSection.tsx | ✅ |
| P2 | breaks | Condition chips clip ("Pre-Ownec") at 1024–1440; filter row cramped. | CatalogSection.tsx | ✅ |
| P3 | looks off | Storage line repeats values ("128GB, 128GB, 256GB", "Standard, Standard"); long Mac storage strings wrap into 3 lines and push cards out of line. | ProductCard.tsx | ✅ |
| P4 | looks off | "100% Battery" shown on sealed Macs, AirPods Max, chargers: meaningless for new stock. | ProductCard.tsx | ✅ |
| P5 | looks off | Titles/taglines truncated mid-word ("iPhone 15 Pro (Certified Pre-…", "Apple Watch Ultra 2 (49mm…"). | ProductCard.tsx | ✅ |
| P6 | looks off | Each card has 3 badges + battery + chip table + 2 buttons + compare icon; price is not the first thing you read. Card heights differ by row. | ProductCard.tsx | ✅ |
| P7 | polish | "Only 2 left" pill pulses forever. | ProductCard.tsx | ✅ |
| P8 | polish | 22 cards in one wall (25,000px page at 360px). | CatalogSection.tsx | ✅ |
| P9 | polish | Search input has no label (placeholder only). | CatalogSection.tsx | ✅ |

## Offers

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| O1 | looks off | Three identical cards, three identical gold buttons: three accent moments in one section, no hierarchy. | OffersSection.tsx | ✅ |
| O2 | polish | "Limited Privileges", "Updated today by Store Desk": filler copy. | OffersSection.tsx | ✅ |

## EMI & trade-in

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| E1 | breaks | No-cost EMI switch has no accessible name or `role="switch"`; tenure label isn't associated with its buttons; range slider has no label. | EmiTradeInTools.tsx | ✅ |
| E2 | looks off | Centred heading + pill tabs + gradient result card. Gold used 5+ times. | EmiTradeInTools.tsx | ✅ |
| E3 | polish | Device dropdown lists all 22 products, including ₹4,290 chargers, for EMI. | EmiTradeInTools.tsx | ✅ |

## Trust / reviews / repair

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| T1 | looks off | "Why Discerning Buyers Choose Us": four identical icon-in-a-square cards in four different colours (green, gold, blue, purple). | TrustSection.tsx | ✅ |
| T2 | breaks | Review prev/next arrows change an index that nothing uses; they do nothing. | TrustSection.tsx | ✅ |
| T3 | looks off | "4.9 / 5.0 (850+ Verified Local Buyers)" is an invented aggregate; every review is 5 stars and reads like marketing ("seamlessly", "unmatched"). | TrustSection.tsx, seed.ts | ✅ |
| T4 | looks off | Heading order jumps (h2 → h4 for reviewer names). | TrustSection.tsx | ✅ |
| T5 | breaks | Repair form: no validation messages (phone accepts anything), success state vanishes after 3.5s, the service-mode toggle has no pressed state for screen readers. | TrustSection.tsx | ✅ |

## Visit

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| V1 | breaks | "Open now" uses the visitor's local clock, not Amritsar time; also ignores the shorter Sunday hours. | VisitSection.tsx | ✅ |
| V2 | looks off | "Visit the Retail Gallery… consult with our device specialists over espresso": invented and overblown. | VisitSection.tsx | ✅ |
| V3 | polish | Icon-only WhatsApp button has no accessible name. | VisitSection.tsx | ✅ |

## Footer / sticky bar

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| F1 | breaks | Mobile sticky bar covers the bottom of the footer (padding is on `<main>`, the footer sits outside it). No safe-area inset. | layout.tsx, MobileBottomBar.tsx | ✅ |
| F2 | breaks | Bottom bar offers Call / WhatsApp / Enquire, but no one-tap "Visit store" (directions). | MobileBottomBar.tsx | ✅ |
| F3 | looks off | Footer tagline "Crafted for refined device commerce with Next.js & TypeScript"; disclaimer repeats itself. | Footer.tsx | ✅ |
| F4 | polish | Enquiry modal is a div overlay: no focus trap, no Escape to close, background still scrolls. | MobileBottomBar.tsx | ✅ |

## Product detail / compare (same components, checked for consistency)

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| D1 | looks off | Product image stage uses a different ratio and a gold gradient; condition badge colours differ from cards. | ProductDetailClient.tsx | ✅ |
| D2 | breaks | Reserve modal: same overlay issues as F4; storage/colour group labels are `<label>` with no control. | ProductDetailClient.tsx | ✅ |
| D3 | polish | Breadcrumb links are 16px tall. | ProductDetailClient.tsx | ✅ |

## Performance / SEO

| # | Sev | Problem | Where | Status |
|---|-----|---------|-------|--------|
| X1 | looks off | `framer-motion` is a dependency but not imported anywhere. | package.json | ✅ |
| X2 | polish | 7 MB of Apple PNGs + 7 MB of pitch PDFs in `public/`. | public/ | ➖ Apple PNGs deleted; the two pitch PDFs in `public/` were left (not loaded by any page, owner's files). |

---

## How each fix was done

**Theme / tokens (G1–G8).** One token set in `src/app/globals.css` (CSS variables: light on `:root`, dark on `html.dark`) exposed to Tailwind as semantic names in `tailwind.config.ts`: `canvas`, `surface`, `subtle`, `tile`, `ink` / `ink-2` / `ink-3`, `line`, `gold` (fill) / `gold-ink` (text), `night` (dark sections), `ok` / `warn` / `bad`. Type scale `hero` → `title` → `subtitle` → `lead` → base → `small` → `caption` / `eyebrow`; radii `control` / `tile` / `card`; one `.section` rhythm and one `.wrap` grid. All customer-facing components use only these names: no hex values or `neutral-*` classes remain outside the admin. The `!important` light-mode sheet is gone. Every text/background pair was checked: all ≥ 4.5:1 in both themes, input borders ≥ 3:1. Theme follows the stored choice, else the system setting, set before first paint (no flash). Animations: one fade-up on scroll (`.reveal`, runs once, only when JS is active, off under `prefers-reduced-motion`); nothing loops. Favicon is the circle mark cropped from the supplied logo (`src/app/icon.png`).

**Images (I1–I8).** *Update 12 Nov, at the owner's request: official Apple product photos are back, done properly this time.* 41 official renders (one per model and finish, from Apple's store image CDN) are in `public/products/*.webp`, 1.5 MB in total. They were processed once so they match: the baked-in grey band and white card backgrounds were removed, each image was trimmed to the product and centred on a transparent 1000×1000 square with the same 8% padding. That fixes the original I2 problem (tiny phones in grey boxes). `src/lib/product-photos.ts` maps product slug + colour name → photo, so the product page photo follows the colour picker. Colours with no separate official shot use the model's default photo: Watch Ultra 2 / Series 10 / SE, and AirPods Max "Silver", which shows Starlight. The old glow SVGs and the download script stay deleted. `src/components/ui/DeviceArt.tsx` draws brand-free SVG devices (phone, Pro phone, laptop, tablet, watch, earbuds, headphones, MagSafe, adapter, pencil) on one 400×400 canvas, coloured from each variant's `colorHex`. On the product page the drawing switches colour with the colour selector. `src/components/ui/ProductImage.tsx` is the only product image component (cards, hero, detail page, compare, admin): a square `aspect-square` tile on the `tile` background, so there is no layout shift. It uses, in order: a photo URL the owner sets in admin, then the official photo, then the drawing from `DeviceArt.tsx`. Each one falls back to the next if it fails to load. All photos go through `next/image` (`object-contain`, `sizes`, lazy below the fold, eager for the hero). `src/components/ui/Logo.tsx` shows the supplied JPEG unaltered, trimmed to the artwork with clear space; it multiplies onto the off-white canvas in light mode. *Update:* on dark surfaces (dark theme header, footer, admin) it is shown reversed, white on dark, using `invert` + `screen` compositing instead of a white plate. The file is unchanged. The map is a click-to-load placeholder, so Google Maps and its cookies don't load with the page.

**Layout and copy.** Section order and shape now vary: split hero with one product "on the shelf today" → stock list with category tabs (the separate icon strip is gone) → dark "what happens to a used phone" feature with a real shelf tag → asymmetric offers (one lead offer, two smaller) → EMI/exchange tools in a split → reviews as one pull-quote plus a list → repairs (turnaround list + form) → visit (address, IST hours, map). The copy is rewritten in plain shop language across the hero, sections, all 22 product taglines/descriptions, offers and reviews (now a mix of 4 and 5 stars with specific details). Fake stats ("10,000+", "850+ buyers", "4.9") are removed; the rating shown is the real average of the reviews on the page. No Apple slogans. The disclaimer says plainly that the shop is not an Apple Authorised Reseller.

**UX.** Every interactive element is ≥ 44px (cards, chips, nav, footer links on phones) and shares one visible `:focus-visible` ring. There's a skip link. The phone bar is Call / WhatsApp / Directions, with a spacer so it never covers the footer, and it respects the iOS safe area. The mobile filter button now works. The stock list shows 8 devices, then "Show all 22". Cards lead with name, options, price, stock and battery (pre-owned only). The whole card links to the product, with Compare and WhatsApp as secondary actions; card heights match per row. Forms have real labels, inline messages tied with `aria-describedby`, Indian mobile validation, focus moves to the first error, and the success state stays until dismissed. Modals use native `<dialog>` (focus trap, Escape, focus return). The tabs, switch, toggle buttons and range slider have correct roles and names. "Open now" uses Amritsar time and Sunday hours.

## Verification (production build, `next build && next start`)

| Check | Result |
|---|---|
| Horizontal scroll at 360 / 390 / 768 / 1024 / 1440 | none (`scrollWidth == viewport` at every width, light and dark) |
| Text smaller than 12px | 0 nodes (was 109) |
| Console errors / warnings, failed requests | none (favicon 404 fixed) |
| Layout shift | CLS 0 |
| Lighthouse mobile, home | Performance 91–94 (3 runs; 92 with official photos), Accessibility 100, Best Practices 100, SEO 100 |
| Lighthouse mobile, product page | Performance 91–95, Accessibility 100, Best Practices 100, SEO 100 |
| `next build` | passes, 30 static pages |
| `tsc --noEmit` | passes |
| Interaction checks | mobile menu, Escape-to-close, compare dialog, form errors + success, admin login screen |

## Deliberately left / known limits

- **`npm run lint` doesn't run.** Next 16 removed `next lint`, and ESLint was never installed in this project. Type-check and build pass; adding ESLint is a new dependency, so I left it for you to decide.
- **Admin panel** (`/admin`, `src/components/admin/*`) keeps its original dark styling and hard-coded colours. It's a staff tool and was out of scope. It is wrapped in `.admin-scope` so it renders correctly now the global light overrides are gone. The only admin change: the "Official Apple Render" picker is now an optional "Product photo URL" field, because those files no longer exist.
- **Data layer unchanged.** The localStorage keys are the same, so a browser that already has saved demo data (`vas_products_v1` etc.) keeps the old names/copy until "Reset to default" in admin or clearing site data. Old `/devices/*.png` paths in saved data are ignored and drawn as illustrations instead of 404ing.
- **Mobile quick-enquiry modal removed** from the bottom bar to make room for one-tap Directions. Leads still come in through the repair form, "Hold it for my visit" on product pages, and WhatsApp.
- **Lighthouse performance** sits in the low 90s on the home page. Observed LCP is ~0.7s; the simulated 3.0–3.4s comes from Next's client JS evaluating before first paint (`'use client'` page + store context). Converting the home sections to server components would add headroom, but that touches the data layer, so I left it.
- **Apple product photos and licensing.** The shop is an independent retailer, not an Apple Authorised Reseller, and Apple licenses its marketing images to authorised partners. The owner chose to use them anyway. If Apple objects, delete `public/products/` (or empty the map in `src/lib/product-photos.ts`) and every tile falls back to the drawings automatically.
- **Product page colour/storage bug fixed along the way:** picking a colour that only exists in another storage size (e.g. Desert Titanium, 1TB only) used to keep showing the 256GB Natural unit. The picker now jumps to a storage/colour pair that exists.
- **Placeholder business facts** (phone, GST no., review text, offer codes, CEIR/IMEI check, repair turnaround times) are believable placeholders. The owner should confirm them before launch.
- `public/*.pdf` pitch decks and `AGENTS.md` were not touched.

## Follow-up, 12 Nov: dark-theme logo, admin separation, admin on phones

| Issue | Fix | Where |
|---|---|---|
| Dark theme: logo sat on a white box | Shown reversed (white mark, no plate) in dark mode; the footer and admin always use the reversed mark | `src/components/ui/Logo.tsx` (`tone="auto" \| "reverse"`) |
| Storefront header, footer, phone contact bar and compare dock appeared on `/admin`; admin's `<main>` was nested inside the site's `<main>` | Storefront pages moved into a `(site)` route group with their own layout; `/admin` has its own layout. URLs unchanged | `src/app/(site)/layout.tsx`, `src/app/admin/layout.tsx`, `src/app/layout.tsx` |
| `/admin` could be indexed | `noindex, nofollow` meta and `Disallow: /admin` in robots.txt | `src/app/admin/layout.tsx`, `src/app/robots.ts` |
| Quick Edit on phones: price/stock fields were off-screen in a sideways-scrolling table | Phone layout: one card per product, 44px price/stock fields, in-stock switch and Save per variant, floating "saved" confirmation. Table kept from 768px up | `src/components/admin/AdminQuickEdit.tsx` |
| **Data bug:** saving a stock-only change in Quick Edit wrote the price as ₹0 (and a price-only change reset stock to 1) | Unedited fields now come from the saved variant; verified that a stock-only save keeps ₹1,44,900 | `AdminQuickEdit.tsx` |
| Enquiries on phones: delete button pushed 31px off-screen, status dropdown truncated | Action row wraps; status gets its own row; delete has an accessible name | `src/components/admin/AdminEnquiries.tsx` |
| Admin text at 10–11px; small touch targets; iOS zooms into 12px fields | Admin text is at least 12px; on phones, form fields are 16px and buttons/fields are at least 44px tall | `.admin-scope` rules in `src/app/globals.css` |

Re-checked on the production build: storefront at 360/390/768/1024/1440 in light and dark, and all 7 admin tabs at all five widths. No horizontal overflow anywhere, no text below 12px, no console errors.

Local environment note (not a code issue): `node_modules/@next/swc-darwin-arm64` lost its native binary mid-session, which made `next build` fall back to WASM and fail. Reinstalled that one package at the locked version (16.4.6); `package.json` and the lockfile are unchanged.
