/**
 * Official Apple product renders, one per model and finish, stored in
 * /public/products. They were downloaded from Apple's store image CDN and
 * normalised (baked-in grey/white backgrounds removed, trimmed, centred on a
 * transparent 1000×1000 square with even padding) so every product sits at the
 * same scale inside the site's square image tiles.
 *
 * Keyed by product slug; each entry maps a variant colour name to a photo.
 * The first entry is the default. Products or colours without a photo fall back
 * to the drawn illustration in ProductImage.
 */
const P = (file: string) => `/products/${file}.webp`;

const PHOTOS: Record<string, [colour: string, src: string][]> = {
  'iphone-16-pro-max': [
    ['Natural Titanium', P('iphone-16-pro-max-natural')],
    ['Black Titanium', P('iphone-16-pro-max-black')],
    ['Desert Titanium', P('iphone-16-pro-max-desert')],
  ],
  'iphone-16-pro': [
    ['White Titanium', P('iphone-16-pro-white')],
    ['Natural Titanium', P('iphone-16-pro-natural')],
    ['Black Titanium', P('iphone-16-pro-black')],
  ],
  'iphone-15-pro-preowned': [
    ['Natural Titanium', P('iphone-15-pro-natural')],
    ['Blue Titanium', P('iphone-15-pro-blue')],
    ['Black Titanium', P('iphone-15-pro-black')],
  ],
  'iphone-16-sealed': [
    ['Black', P('iphone-16-black')],
    ['Teal', P('iphone-16-teal')],
    ['Pink', P('iphone-16-pink')],
  ],
  'iphone-15-unboxed': [
    ['Blue', P('iphone-15-blue')],
    ['Green', P('iphone-15-green')],
    ['Black', P('iphone-15-black')],
  ],
  'iphone-14-preowned': [
    ['Midnight', P('iphone-14-midnight')],
    ['Starlight', P('iphone-14-starlight')],
  ],
  'macbook-pro-14-m3-pro': [
    ['Space Black', P('mbp14-spaceblack')],
    ['Silver', P('mbp14-silver')],
  ],
  'macbook-pro-16-m3-max-unboxed': [['Space Black', P('mbp16-spaceblack')]],
  'macbook-air-15-m3': [
    ['Midnight', P('mba15-midnight')],
    ['Starlight', P('mba15-starlight')],
  ],
  'macbook-air-13-m2-preowned': [
    ['Space Grey', P('mba13-spacegray')],
    ['Silver', P('mba13-silver')],
  ],
  'ipad-pro-13-m4': [
    ['Space Black', P('ipad-pro-13-spaceblack')],
    ['Silver', P('ipad-pro-13-silver')],
  ],
  'ipad-air-11-m2-unboxed': [
    ['Blue', P('ipad-air-11-blue')],
    ['Space Grey', P('ipad-air-11-spacegray')],
  ],
  'ipad-10th-gen-preowned': [
    ['Silver', P('ipad-10-silver')],
    ['Blue', P('ipad-10-blue')],
  ],
  'airpods-pro-2-usbc': [['Glossy White', P('airpods-pro-2')]],
  'airpods-max-usbc-unboxed': [
    ['Midnight', P('airpods-max-midnight')],
    ['Silver', P('airpods-max-starlight')],
  ],
  'airpods-4-anc-sealed': [['White', P('airpods-4-anc')]],
  'apple-watch-ultra-2': [['*', P('watch-ultra-2')]],
  'apple-watch-series-10-unboxed': [['*', P('watch-s10')]],
  'apple-watch-se-2-preowned': [['*', P('watch-se')]],
  'magsafe-charger-2m': [['*', P('magsafe')]],
  'apple-35w-dual-usbc-power-adapter': [['*', P('adapter-35w')]],
  'apple-pencil-pro': [['*', P('pencil-pro')]],
};

/** Photo for a product (and colour, if one matches), or null if none exists */
export function officialPhoto(slug: string | undefined, colour?: string): string | null {
  const list = slug ? PHOTOS[slug] : undefined;
  if (!list?.length) return null;
  const match = colour && list.find(([c]) => c.toLowerCase() === colour.toLowerCase());
  return (match || list[0])[1];
}
