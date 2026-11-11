import { Product, Offer, Review, Enquiry } from '@/types';

export const initialProducts: Product[] = [
  {
    id: 'prod-ip16pm-01',
    slug: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    category: 'iPhone',
    condition: 'New',
    basePrice: 144900,
    mrp: 144900,
    deviceModel: 'iPhone 16 Pro Max',
    tagline: 'Titanium precision. Extended battery architecture.',
    description: 'The pinnacle of mobile performance featuring Grade 5 titanium, an ultra-advanced 48MP triple-lens fusion system with 5x optical telephoto, and studio-grade audio capture.',
    images: ['/devices/iphone-16-pro-natural.png', '/devices/iphone-16-pro-black.png', '/devices/iphone-16-pro-desert.png', '/devices/iphone-16-pro-white.png'],
    variants: [
      { id: 'v-16pm-256-nat', storage: '256GB', colour: 'Natural Titanium', colorHex: '#9E9A93', price: 144900, mrp: 144900, stock: 4, sku: 'VAS-IP16PM-256-NT' },
      { id: 'v-16pm-512-nat', storage: '512GB', colour: 'Natural Titanium', colorHex: '#9E9A93', price: 164900, mrp: 164900, stock: 2, sku: 'VAS-IP16PM-512-NT' },
      { id: 'v-16pm-256-blk', storage: '256GB', colour: 'Black Titanium', colorHex: '#2E2D30', price: 144900, mrp: 144900, stock: 3, sku: 'VAS-IP16PM-256-BT' },
      { id: 'v-16pm-1tb-des', storage: '1TB', colour: 'Desert Titanium', colorHex: '#C5A98D', price: 184900, mrp: 184900, stock: 1, sku: 'VAS-IP16PM-1TB-DT' }
    ],
    specs: {
      chip: 'A18 Pro with 6-core GPU',
      display: '6.9" Super Retina XDR OLED, 120Hz ProMotion',
      camera: '48MP Main + 48MP Ultra-Wide + 12MP 5x Telephoto',
      battery: 'Up to 33 hours video playback',
      port: 'USB-C (USB 3 up to 10Gb/s)',
      biometrics: 'Face ID',
      weight: '227 grams',
      warranty: '1 Year Brand Warranty + Store Activation Care'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Factory Sealed',
      accessoriesIncluded: ['Braided USB-C to USB-C Cable (1m)', 'Documentation', 'Official Sealed Box'],
      inspectionDate: '2026-11-10',
      technicianNotes: 'Direct distribution lot, verified serial for India (HN/A).'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-01T10:00:00Z'
  },
  {
    id: 'prod-ip16p-02',
    slug: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    category: 'iPhone',
    condition: 'Unboxed',
    basePrice: 112900,
    mrp: 119900,
    deviceModel: 'iPhone 16 Pro',
    tagline: 'Pro form factor. Zero cosmetic imperfections.',
    description: 'Open-box certified unit inspected through our 40-point hardware suite. Zero scratches, 100% battery cycle health, full manufacturer warranty valid through October 2027.',
    images: ['/devices/iphone-16-pro-white.png', '/devices/iphone-16-pro-natural.png', '/devices/iphone-16-pro-black.png', '/devices/iphone-16-pro-desert.png'],
    variants: [
      { id: 'v-16p-128-wht', storage: '128GB', colour: 'White Titanium', colorHex: '#E3E4E5', price: 112900, mrp: 119900, stock: 2, sku: 'VAS-IP16P-128-WT' },
      { id: 'v-16p-256-nat', storage: '256GB', colour: 'Natural Titanium', colorHex: '#9E9A93', price: 122900, mrp: 129900, stock: 3, sku: 'VAS-IP16P-256-NT' },
      { id: 'v-16p-512-blk', storage: '512GB', colour: 'Black Titanium', colorHex: '#2E2D30', price: 142900, mrp: 149900, stock: 1, sku: 'VAS-IP16P-512-BT' }
    ],
    specs: {
      chip: 'A18 Pro with 6-core GPU',
      display: '6.3" Super Retina XDR OLED, 120Hz ProMotion',
      camera: '48MP Main + 48MP Ultra-Wide + 12MP 5x Telephoto',
      battery: 'Up to 27 hours video playback',
      port: 'USB-C (USB 3 up to 10Gb/s)',
      biometrics: 'Face ID',
      weight: '199 grams',
      warranty: '11 Months Brand Warranty + 6 Months Store Support'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '9.9/10 Flawless Like-New',
      accessoriesIncluded: ['Original Box', 'Original Braided Cable', 'Sim Ejector Pin'],
      inspectionDate: '2026-11-08',
      technicianNotes: 'Customer unboxed unit, returned within 48h. Battery cycle count: 2. 0 micro abrasions.'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-03T11:00:00Z'
  },
  {
    id: 'prod-ip15p-03',
    slug: 'iphone-15-pro-preowned',
    name: 'iPhone 15 Pro (Certified Pre-Owned)',
    category: 'iPhone',
    condition: 'Pre-owned',
    basePrice: 74900,
    mrp: 134900,
    deviceModel: 'iPhone 15 Pro',
    tagline: 'Titanium strength at exceptional value.',
    description: 'Thoroughly tested and certified pre-owned iPhone 15 Pro. Never opened, all original parts guaranteed, 94%+ genuine battery health, backed by Vishal Apple Store 6-Month Warranty.',
    images: ['/devices/iphone-15-pro-natural.png', '/devices/iphone-15-pro-blue.png'],
    variants: [
      { id: 'v-15p-128-nat', storage: '128GB', colour: 'Natural Titanium', colorHex: '#9E9A93', price: 74900, mrp: 134900, stock: 2, sku: 'VAS-IP15P-128-NT' },
      { id: 'v-15p-256-blu', storage: '256GB', colour: 'Blue Titanium', colorHex: '#3B4454', price: 81900, mrp: 144900, stock: 1, sku: 'VAS-IP15P-256-BLT' },
      { id: 'v-15p-256-blk', storage: '256GB', colour: 'Black Titanium', colorHex: '#2E2D30', price: 81900, mrp: 144900, stock: 0, sku: 'VAS-IP15P-256-BT' }
    ],
    specs: {
      chip: 'A17 Pro with 6-core GPU',
      display: '6.1" Super Retina XDR OLED, 120Hz ProMotion',
      camera: '48MP Main + 12MP Ultra-Wide + 12MP 3x Telephoto',
      battery: 'Up to 23 hours video playback',
      port: 'USB-C (USB 3)',
      biometrics: 'Face ID',
      weight: '187 grams',
      warranty: '6 Months Vishal Apple Store Comprehensive Warranty'
    },
    gradingReport: {
      batteryHealth: 94,
      cosmeticScore: '9.3/10 Very Clean (Minor edge pocket mark)',
      accessoriesIncluded: ['Vishal Store Verified Bill', 'Premium Type-C Cable', 'Protective Case'],
      inspectionDate: '2026-11-05',
      technicianNotes: 'Motherboard, Face ID, True Tone, cameras, microphones all passed 40-point diagnostics. 100% original OLED.'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-04T09:30:00Z'
  },
  {
    id: 'prod-ip16-04',
    slug: 'iphone-16-sealed',
    name: 'iPhone 16',
    category: 'iPhone',
    condition: 'New',
    basePrice: 77900,
    mrp: 79900,
    deviceModel: 'iPhone 16',
    tagline: 'Camera control innovation. Next-generation speed.',
    description: 'Factory sealed pack with color-infused back glass, Camera Control tactile button, and high-efficiency A18 chip designed for intensive everyday multitasking.',
    images: ['/devices/iphone-16-teal.png', '/devices/iphone-16-black.png', '/devices/iphone-16-pink.png'],
    variants: [
      { id: 'v-16-128-blk', storage: '128GB', colour: 'Black', colorHex: '#1F2022', price: 77900, mrp: 79900, stock: 5, sku: 'VAS-IP16-128-BK' },
      { id: 'v-16-128-tea', storage: '128GB', colour: 'Teal', colorHex: '#9FC3C3', price: 77900, mrp: 79900, stock: 3, sku: 'VAS-IP16-128-TL' },
      { id: 'v-16-256-pnk', storage: '256GB', colour: 'Pink', colorHex: '#F6BBD2', price: 87900, mrp: 89900, stock: 2, sku: 'VAS-IP16-256-PK' }
    ],
    specs: {
      chip: 'A18 with 5-core GPU',
      display: '6.1" Super Retina XDR OLED',
      camera: '48MP Fusion + 12MP Ultra-Wide with Macro',
      battery: 'Up to 22 hours video playback',
      port: 'USB-C',
      biometrics: 'Face ID',
      weight: '170 grams',
      warranty: '1 Year Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Brand New Sealed',
      accessoriesIncluded: ['Official Box', 'USB-C Cable', 'Brand Warranty Card'],
      inspectionDate: '2026-11-09'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-02T14:00:00Z'
  },
  {
    id: 'prod-ip15-05',
    slug: 'iphone-15-unboxed',
    name: 'iPhone 15 (Unboxed Deal)',
    category: 'iPhone',
    condition: 'Unboxed',
    basePrice: 59900,
    mrp: 69900,
    deviceModel: 'iPhone 15',
    tagline: 'Dynamic Island clarity. Universal USB-C port.',
    description: 'Pristine open box device with 100% battery capacity, zero signs of usage. Includes original invoice and balance official warranty through mid-2027.',
    images: ['/devices/iphone-15-blue.png'],
    variants: [
      { id: 'v-15-128-blu', storage: '128GB', colour: 'Blue', colorHex: '#D4E1E8', price: 59900, mrp: 69900, stock: 4, sku: 'VAS-IP15-128-BL' },
      { id: 'v-15-128-grn', storage: '128GB', colour: 'Green', colorHex: '#D3E3D6', price: 59900, mrp: 69900, stock: 2, sku: 'VAS-IP15-128-GR' },
      { id: 'v-15-256-blk', storage: '256GB', colour: 'Black', colorHex: '#1C1D1F', price: 69900, mrp: 79900, stock: 1, sku: 'VAS-IP15-256-BK' }
    ],
    specs: {
      chip: 'A16 Bionic',
      display: '6.1" Super Retina XDR with Dynamic Island',
      camera: '48MP Main + 12MP Ultra-Wide (2x Telephoto)',
      battery: 'Up to 20 hours video playback',
      port: 'USB-C',
      biometrics: 'Face ID',
      weight: '171 grams',
      warranty: '8 Months Brand Warranty + 6 Months Store Support'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '9.8/10 Like New',
      accessoriesIncluded: ['Original Box', 'Original Braided USB-C Cable'],
      inspectionDate: '2026-11-06'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-04T12:00:00Z'
  },
  {
    id: 'prod-ip14-06',
    slug: 'iphone-14-preowned',
    name: 'iPhone 14 (Certified Pre-Owned)',
    category: 'iPhone',
    condition: 'Pre-owned',
    basePrice: 43900,
    mrp: 69900,
    deviceModel: 'iPhone 14',
    tagline: 'Reliable dual camera and all-day battery.',
    description: 'Carefully curated pre-owned unit. 100% genuine parts, battery health tested at 91%, comprehensive 6-month store warranty included.',
    images: ['/devices/iphone-14-midnight.png'],
    variants: [
      { id: 'v-14-128-mid', storage: '128GB', colour: 'Midnight', colorHex: '#1D232A', price: 43900, mrp: 69900, stock: 3, sku: 'VAS-IP14-128-MN' },
      { id: 'v-14-128-str', storage: '128GB', colour: 'Starlight', colorHex: '#FAF7F2', price: 43900, mrp: 69900, stock: 2, sku: 'VAS-IP14-128-SL' }
    ],
    specs: {
      chip: 'A15 Bionic with 5-core GPU',
      display: '6.1" Super Retina XDR OLED',
      camera: '12MP Dual Camera system with Photonic Engine',
      battery: 'Up to 20 hours video playback',
      port: 'Lightning',
      biometrics: 'Face ID',
      weight: '172 grams',
      warranty: '6 Months Vishal Apple Store Comprehensive Warranty'
    },
    gradingReport: {
      batteryHealth: 91,
      cosmeticScore: '9.2/10 Minor micro pocket swirls on back',
      accessoriesIncluded: ['Fast Charging Lightning Cable', 'Store Bill with Serial verification'],
      inspectionDate: '2026-11-02'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-10-28T16:00:00Z'
  },
  {
    id: 'prod-mbp14-07',
    slug: 'macbook-pro-14-m3-pro',
    name: 'MacBook Pro 14" (M3 Pro)',
    category: 'Mac',
    condition: 'New',
    basePrice: 184900,
    mrp: 199900,
    deviceModel: 'MacBook Pro 14-inch',
    tagline: 'Pro performance. Space Black anodized chassis.',
    description: 'Brand new sealed unit engineered for creators, coders, and studio workflows. Includes Liquid Retina XDR display with 1000 nits sustained brightness and HDMI 2.1.',
    images: ['/devices/macbook-pro-14.png'],
    variants: [
      { id: 'v-mbp14-18gb-512-blk', storage: '18GB Unified / 512GB SSD', colour: 'Space Black', colorHex: '#25262B', price: 184900, mrp: 199900, stock: 2, sku: 'VAS-MBP14-18-512-SB' },
      { id: 'v-mbp14-36gb-1tb-blk', storage: '36GB Unified / 1TB SSD', colour: 'Space Black', colorHex: '#25262B', price: 229900, mrp: 249900, stock: 1, sku: 'VAS-MBP14-36-1TB-SB' },
      { id: 'v-mbp14-18gb-512-slv', storage: '18GB Unified / 512GB SSD', colour: 'Silver', colorHex: '#E2E3E5', price: 184900, mrp: 199900, stock: 2, sku: 'VAS-MBP14-18-512-SL' }
    ],
    specs: {
      chip: 'Apple M3 Pro (11-core CPU, 14-core GPU)',
      display: '14.2" Liquid Retina XDR (3024x1964) 120Hz ProMotion',
      battery: 'Up to 18 hours wireless web',
      port: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, 3.5mm Headphone',
      biometrics: 'Touch ID on Magic Keyboard',
      weight: '1.61 kg',
      warranty: '1 Year Apple Official Warranty + Free Migration Setup'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Sealed Brand New',
      accessoriesIncluded: ['Official Box', '70W USB-C Power Adapter', 'MagSafe 3 Braided Cable'],
      inspectionDate: '2026-11-09'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-01T11:00:00Z'
  },
  {
    id: 'prod-mbp16-08',
    slug: 'macbook-pro-16-m3-max-unboxed',
    name: 'MacBook Pro 16" (M3 Max, Unboxed)',
    category: 'Mac',
    condition: 'Unboxed',
    basePrice: 289900,
    mrp: 349900,
    deviceModel: 'MacBook Pro 16-inch',
    tagline: 'Extreme compute power at significant savings.',
    description: 'Corporate executive return with less than 6 battery cycles. 16-core CPU, 40-core GPU, massive 48GB unified memory for 3D animation, 8K video, and local LLM execution.',
    images: ['/devices/macbook-pro-16.png'],
    variants: [
      { id: 'v-mbp16-48gb-1tb-blk', storage: '48GB Unified / 1TB SSD', colour: 'Space Black', colorHex: '#25262B', price: 289900, mrp: 349900, stock: 1, sku: 'VAS-MBP16-48-1TB-SB' }
    ],
    specs: {
      chip: 'Apple M3 Max (16-core CPU, 40-core GPU, 16-core Neural Engine)',
      display: '16.2" Liquid Retina XDR (3456x2234) 120Hz ProMotion',
      battery: 'Up to 22 hours video streaming (100Whr battery)',
      port: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3',
      biometrics: 'Touch ID',
      weight: '2.16 kg',
      warranty: '10 Months Apple Warranty + Store Lifetime Diagnostics'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '9.9/10 Pristine Condition',
      accessoriesIncluded: ['Original 140W USB-C Power Adapter', 'Black MagSafe 3 Cable', 'Original Retail Box'],
      inspectionDate: '2026-11-07'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-03T17:00:00Z'
  },
  {
    id: 'prod-mba15-09',
    slug: 'macbook-air-15-m3',
    name: 'MacBook Air 15" (M3)',
    category: 'Mac',
    condition: 'New',
    basePrice: 124900,
    mrp: 134900,
    deviceModel: 'MacBook Air 15-inch',
    tagline: 'Expansive display in an ultra-thin 11.5mm silhouette.',
    description: 'The world’s best 15-inch consumer laptop. Fanless silent design, crystal-clear 1080p FaceTime HD camera, and six-speaker sound system with Spatial Audio.',
    images: ['/devices/macbook-air-15.png'],
    variants: [
      { id: 'v-mba15-16gb-512-mid', storage: '16GB Unified / 512GB SSD', colour: 'Midnight', colorHex: '#1E2530', price: 139900, mrp: 154900, stock: 3, sku: 'VAS-MBA15-16-512-MN' },
      { id: 'v-mba15-8gb-256-str', storage: '8GB Unified / 256GB SSD', colour: 'Starlight', colorHex: '#FAF7F2', price: 124900, mrp: 134900, stock: 2, sku: 'VAS-MBA15-8-256-SL' }
    ],
    specs: {
      chip: 'Apple M3 (8-core CPU, 10-core GPU)',
      display: '15.3" Liquid Retina display (2880x1864) 500 nits',
      battery: 'Up to 18 hours battery life',
      port: '2x Thunderbolt / USB 4, MagSafe 3, 3.5mm Headphone',
      biometrics: 'Touch ID',
      weight: '1.51 kg',
      warranty: '1 Year Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Sealed Brand New',
      accessoriesIncluded: ['35W Dual USB-C Port Compact Power Adapter', 'MagSafe 3 Cable (2m)'],
      inspectionDate: '2026-11-09'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-05T08:00:00Z'
  },
  {
    id: 'prod-mba13-10',
    slug: 'macbook-air-13-m2-preowned',
    name: 'MacBook Air 13" (M2, Certified Pre-Owned)',
    category: 'Mac',
    condition: 'Pre-owned',
    basePrice: 66900,
    mrp: 99900,
    deviceModel: 'MacBook Air 13-inch',
    tagline: 'Ultralight everyday powerhouse.',
    description: 'Certified pre-owned MacBook Air with M2 chip. Inspected for keyboard tactile feel, hinge friction, screen color accuracy, and battery health at 93%.',
    images: ['/devices/macbook-air-13.png'],
    variants: [
      { id: 'v-mba13-8gb-256-gry', storage: '8GB Unified / 256GB SSD', colour: 'Space Grey', colorHex: '#68696D', price: 66900, mrp: 99900, stock: 2, sku: 'VAS-MBA13-8-256-SG' },
      { id: 'v-mba13-8gb-256-slv', storage: '8GB Unified / 256GB SSD', colour: 'Silver', colorHex: '#E2E3E5', price: 66900, mrp: 99900, stock: 1, sku: 'VAS-MBA13-8-256-SL' }
    ],
    specs: {
      chip: 'Apple M2 (8-core CPU, 8-core GPU)',
      display: '13.6" Liquid Retina display (2560x1664)',
      battery: 'Up to 18 hours battery life',
      port: '2x Thunderbolt / USB 4, MagSafe 3, Headphone jack',
      biometrics: 'Touch ID',
      weight: '1.24 kg',
      warranty: '6 Months Vishal Apple Store Warranty'
    },
    gradingReport: {
      batteryHealth: 93,
      cosmeticScore: '9.4/10 Clean with negligible bottom casing scuff',
      accessoriesIncluded: ['30W USB-C Adapter', 'Type-C Charging Cable', 'Tax Invoice with Serial Number'],
      inspectionDate: '2026-11-04'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-10-25T11:00:00Z'
  },
  {
    id: 'prod-padpro-11',
    slug: 'ipad-pro-13-m4',
    name: 'iPad Pro 13" (M4 Ultra-Thin)',
    category: 'iPad',
    condition: 'New',
    basePrice: 124900,
    mrp: 129900,
    deviceModel: 'iPad Pro 13-inch',
    tagline: 'Tandem OLED breakthrough. Unbelievable 5.1mm thinness.',
    description: 'The thinnest product ever created, powered by the breakthrough M4 chip with Ultra Retina XDR dual-panel OLED technology for infinite contrast.',
    images: ['/devices/ipad-pro-13.png'],
    variants: [
      { id: 'v-padpro-256-wifi-blk', storage: '256GB (Wi-Fi)', colour: 'Space Black', colorHex: '#25262B', price: 124900, mrp: 129900, stock: 2, sku: 'VAS-PADPRO-256-SB' },
      { id: 'v-padpro-512-wifi-slv', storage: '512GB (Wi-Fi)', colour: 'Silver', colorHex: '#E2E3E5', price: 144900, mrp: 149900, stock: 1, sku: 'VAS-PADPRO-512-SL' }
    ],
    specs: {
      chip: 'Apple M4 chip (9-core CPU, 10-core GPU, Hardware-accelerated ray tracing)',
      display: '13" Ultra Retina XDR Tandem OLED (2752x2064) 1000 nits',
      battery: 'Up to 10 hours of surfing the web on Wi-Fi',
      port: 'Thunderbolt / USB 4',
      biometrics: 'Face ID (Landscape orientation)',
      weight: '579 grams',
      warranty: '1 Year Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Sealed Brand New',
      accessoriesIncluded: ['USB-C Charge Cable (1m)', '20W USB-C Power Adapter'],
      inspectionDate: '2026-11-09'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-02T13:00:00Z'
  },
  {
    id: 'prod-padair-12',
    slug: 'ipad-air-11-m2-unboxed',
    name: 'iPad Air 11" (M2, Unboxed)',
    category: 'iPad',
    condition: 'Unboxed',
    basePrice: 53900,
    mrp: 59900,
    deviceModel: 'iPad Air 11-inch',
    tagline: 'Turbocharged by M2. Landscape front camera.',
    description: 'Fresh open box condition with zero signs of touch. 100% battery integrity, supports Apple Pencil Pro and Magic Keyboard.',
    images: ['/devices/ipad-air-11.png'],
    variants: [
      { id: 'v-padair-128-wifi-blu', storage: '128GB (Wi-Fi)', colour: 'Blue', colorHex: '#C5D6E5', price: 53900, mrp: 59900, stock: 3, sku: 'VAS-PADAIR-128-BL' },
      { id: 'v-padair-128-wifi-gry', storage: '128GB (Wi-Fi)', colour: 'Space Grey', colorHex: '#68696D', price: 53900, mrp: 59900, stock: 2, sku: 'VAS-PADAIR-128-SG' }
    ],
    specs: {
      chip: 'Apple M2 (8-core CPU, 9-core GPU)',
      display: '11" Liquid Retina LED-backlit (2360x1640) with True Tone',
      battery: 'Up to 10 hours continuous browsing',
      port: 'USB-C',
      biometrics: 'Touch ID in Top Button',
      weight: '462 grams',
      warranty: '11 Months Brand Warranty + Store Support'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '9.9/10 Like New',
      accessoriesIncluded: ['Original Box', 'Original 20W Adapter', 'Braided Cable'],
      inspectionDate: '2026-11-06'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-05T15:00:00Z'
  },
  {
    id: 'prod-pad10-13',
    slug: 'ipad-10th-gen-preowned',
    name: 'iPad 10th Gen (Certified Pre-Owned)',
    category: 'iPad',
    condition: 'Pre-owned',
    basePrice: 27900,
    mrp: 34900,
    deviceModel: 'iPad 10th Generation',
    tagline: 'Modern all-screen design for family and students.',
    description: 'Thoroughly tested student device with 10.9-inch Liquid Retina display, fast A14 Bionic processor, and USB-C connectivity.',
    images: ['/devices/ipad-10th-gen.png'],
    variants: [
      { id: 'v-pad10-64-slv', storage: '64GB (Wi-Fi)', colour: 'Silver', colorHex: '#E2E3E5', price: 27900, mrp: 34900, stock: 3, sku: 'VAS-PAD10-64-SL' },
      { id: 'v-pad10-64-blu', storage: '64GB (Wi-Fi)', colour: 'Blue', colorHex: '#6B90B2', price: 27900, mrp: 34900, stock: 1, sku: 'VAS-PAD10-64-BL' }
    ],
    specs: {
      chip: 'A14 Bionic chip with 4-core GPU',
      display: '10.9" Liquid Retina display (2360x1640)',
      battery: 'Up to 10 hours battery life',
      port: 'USB-C',
      biometrics: 'Touch ID',
      weight: '477 grams',
      warranty: '6 Months Vishal Apple Store Warranty'
    },
    gradingReport: {
      batteryHealth: 95,
      cosmeticScore: '9.3/10 Very Clean',
      accessoriesIncluded: ['20W USB-C Adapter', 'Type-C Cable', 'Store Verification Certificate'],
      inspectionDate: '2026-11-01'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'prod-app2-14',
    slug: 'airpods-pro-2-usbc',
    name: 'AirPods Pro 2 (USB-C)',
    category: 'AirPods',
    condition: 'New',
    basePrice: 20900,
    mrp: 24900,
    deviceModel: 'AirPods Pro (2nd generation)',
    tagline: '2x Active Noise Cancellation. Precision finding case.',
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio that tailors noise control to your environment, and universal USB-C charging with MagSafe.',
    images: ['/devices/airpods-pro-2.png'],
    variants: [
      { id: 'v-app2-std', storage: 'Standard', colour: 'Glossy White', colorHex: '#FFFFFF', price: 20900, mrp: 24900, stock: 8, sku: 'VAS-APP2-USBC' }
    ],
    specs: {
      chip: 'H2 headphone chip, U1/U2 chip in MagSafe Charging Case',
      display: 'Status LED with built-in case speaker for Find My',
      battery: 'Up to 6 hours listening with ANC (30 hours with case)',
      port: 'USB-C, MagSafe, Qi wireless',
      biometrics: 'Skin-detect sensor',
      weight: '5.3g per earbud, 50.8g case',
      warranty: '1 Year Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Factory Sealed',
      accessoriesIncluded: ['MagSafe Charging Case (USB-C) with speaker', 'Silicone ear tips (XS, S, M, L)', 'USB-C Charge Cable'],
      inspectionDate: '2026-11-10'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-01T15:00:00Z'
  },
  {
    id: 'prod-apmax-15',
    slug: 'airpods-max-usbc-unboxed',
    name: 'AirPods Max (USB-C, Unboxed)',
    category: 'AirPods',
    condition: 'Unboxed',
    basePrice: 47900,
    mrp: 59900,
    deviceModel: 'AirPods Max (USB-C)',
    tagline: 'Acoustic fidelity in anodized Midnight aluminum.',
    description: 'Pristine open box with USB-C connector. Breathable knit mesh canopy, memory foam acoustic ear cushions, and computational spatial audio.',
    images: ['/devices/airpods-max.png'],
    variants: [
      { id: 'v-apmax-mid', storage: 'Standard', colour: 'Midnight', colorHex: '#1D2228', price: 47900, mrp: 59900, stock: 2, sku: 'VAS-APMAX-MN' },
      { id: 'v-apmax-slv', storage: 'Standard', colour: 'Silver', colorHex: '#E2E3E5', price: 47900, mrp: 59900, stock: 1, sku: 'VAS-APMAX-SL' }
    ],
    specs: {
      chip: 'Apple H1 headphone chip (one in each ear cup)',
      display: 'Digital Crown for volume, track skip, and Siri',
      battery: 'Up to 20 hours listening on a single charge with ANC',
      port: 'USB-C Port',
      biometrics: 'Optical sensor, position sensor, case-detect sensor',
      weight: '384.8 grams',
      warranty: '11 Months Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '9.9/10 Like New',
      accessoriesIncluded: ['Smart Case', 'USB-C Charge Cable', 'Original Retail Box'],
      inspectionDate: '2026-11-07'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-04T18:00:00Z'
  },
  {
    id: 'prod-ap4-16',
    slug: 'airpods-4-anc-sealed',
    name: 'AirPods 4 with Active Noise Cancellation',
    category: 'AirPods',
    condition: 'New',
    basePrice: 16900,
    mrp: 17900,
    deviceModel: 'AirPods 4 ANC',
    tagline: 'Open-ear acoustic comfort with Active Noise Cancellation.',
    description: 'All-new acoustic architecture with H2 chip bringing Active Noise Cancellation, Transparency mode, and Adaptive Audio to an open-ear shape for the first time.',
    images: ['/devices/airpods-4.png'],
    variants: [
      { id: 'v-ap4-std', storage: 'Standard', colour: 'White', colorHex: '#FFFFFF', price: 16900, mrp: 17900, stock: 6, sku: 'VAS-AP4-ANC' }
    ],
    specs: {
      chip: 'Apple H2 chip',
      display: 'Wireless charging case with speaker for Find My',
      battery: 'Up to 5 hours listening (4 hours with ANC), 30 hours with case',
      port: 'USB-C, Apple Watch charger, Qi certified',
      biometrics: 'Optical in-ear sensors',
      weight: '4.3g per earbud, 34.7g case',
      warranty: '1 Year Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Sealed Brand New',
      accessoriesIncluded: ['Wireless Charging Case (USB-C)', 'Documentation'],
      inspectionDate: '2026-11-10'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-02T16:00:00Z'
  },
  {
    id: 'prod-wultra2-17',
    slug: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 (49mm Titanium)',
    category: 'Watch',
    condition: 'New',
    basePrice: 84900,
    mrp: 89900,
    deviceModel: 'Apple Watch Ultra 2',
    tagline: 'The ultimate sports and adventure watch.',
    description: 'Aerospace-grade 49mm titanium case, precision dual-frequency GPS, customizable Orange Action Button, and up to 3000 nits display brightness for extreme outdoor readability.',
    images: ['/devices/watch-ultra-2.png'],
    variants: [
      { id: 'v-wultra2-blk-alp', storage: '49mm GPS + Cellular', colour: 'Black Titanium / Dark Green Alpine Loop', colorHex: '#25262B', price: 84900, mrp: 89900, stock: 3, sku: 'VAS-WULTRA2-BT-ALP' },
      { id: 'v-wultra2-nat-ocn', storage: '49mm GPS + Cellular', colour: 'Natural Titanium / Blue Ocean Band', colorHex: '#9E9A93', price: 84900, mrp: 89900, stock: 2, sku: 'VAS-WULTRA2-NT-OCN' }
    ],
    specs: {
      chip: 'S9 SiP with 64-bit dual-core processor, 4-core Neural Engine',
      display: '49mm Always-On Retina OLED, 3000 nits brightness',
      battery: 'Up to 36 hours normal use (up to 72 hours in Low Power Mode)',
      port: 'Magnetic Fast Charger to USB-C Cable',
      biometrics: 'ECG app, Blood Oxygen sensor, Depth gauge to 40m, Water temperature',
      weight: '61.4 grams (Case only)',
      warranty: '1 Year Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Factory Sealed',
      accessoriesIncluded: ['Titanium Case', 'Official Band', 'Magnetic Fast Charger to USB-C Cable (1m)'],
      inspectionDate: '2026-11-09'
    },
    isVerified: true,
    isFeatured: true,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-01T12:00:00Z'
  },
  {
    id: 'prod-ws10-18',
    slug: 'apple-watch-series-10-unboxed',
    name: 'Apple Watch Series 10 (46mm, Unboxed)',
    category: 'Watch',
    condition: 'Unboxed',
    basePrice: 41900,
    mrp: 46900,
    deviceModel: 'Apple Watch Series 10',
    tagline: 'Thinnest Apple Watch ever with wide-angle OLED.',
    description: 'Open box 46mm GPS Series 10 watch. Up to 40% brighter when viewed off-axis, faster charging (80% in 30 mins), and sleep apnea notification capabilities.',
    images: ['/devices/watch-series-10.png'],
    variants: [
      { id: 'v-ws10-46-jet', storage: '46mm GPS', colour: 'Jet Black Aluminum', colorHex: '#080808', price: 41900, mrp: 46900, stock: 3, sku: 'VAS-WS10-46-JB' },
      { id: 'v-ws10-46-rgl', storage: '46mm GPS', colour: 'Rose Gold', colorHex: '#E8C5BE', price: 41900, mrp: 46900, stock: 1, sku: 'VAS-WS10-46-RG' }
    ],
    specs: {
      chip: 'S10 SiP with 64-bit dual-core processor',
      display: 'Wide-angle OLED, 2000 nits',
      battery: 'Up to 18 hours (up to 36 hours in Low Power Mode)',
      port: 'Fast Magnetic USB-C Puck',
      biometrics: 'Electrical heart sensor, Optical heart sensor (3rd gen), Temperature sensor',
      weight: '36.4 grams',
      warranty: '11 Months Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '9.9/10 Like New',
      accessoriesIncluded: ['Original Box', 'Magnetic Fast Charger', 'Sport Band'],
      inspectionDate: '2026-11-08'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-04T14:00:00Z'
  },
  {
    id: 'prod-wse2-19',
    slug: 'apple-watch-se-2-preowned',
    name: 'Apple Watch SE 2 (40mm, Pre-Owned)',
    category: 'Watch',
    condition: 'Pre-owned',
    basePrice: 17900,
    mrp: 29900,
    deviceModel: 'Apple Watch SE (2nd Gen)',
    tagline: 'Essential fitness, tracking, and safety features.',
    description: 'Certified pre-owned Apple Watch SE with 96% battery cycle health. Perfect everyday smart health companion with fall detection and crash detection.',
    images: ['/devices/watch-se-2.png'],
    variants: [
      { id: 'v-wse2-40-mid', storage: '40mm GPS', colour: 'Midnight', colorHex: '#1D232A', price: 17900, mrp: 29900, stock: 4, sku: 'VAS-WSE2-40-MN' }
    ],
    specs: {
      chip: 'S8 SiP with 64-bit dual-core processor',
      display: 'Retina LTPO OLED display (1000 nits)',
      battery: 'Up to 18 hours all-day battery',
      port: 'Magnetic Charger to USB-C',
      biometrics: 'Optical heart sensor (2nd gen), Compass, Always-on altimeter',
      weight: '26.4 grams',
      warranty: '6 Months Vishal Apple Store Warranty'
    },
    gradingReport: {
      batteryHealth: 96,
      cosmeticScore: '9.3/10 Very Minor edge rub',
      accessoriesIncluded: ['Magnetic Fast Charging Cable', 'Vishal Store Guarantee Card'],
      inspectionDate: '2026-11-03'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-10-24T10:00:00Z'
  },
  {
    id: 'prod-acc-magsafe-20',
    slug: 'magsafe-charger-2m',
    name: 'MagSafe Fast Charger (2-Metre Braided)',
    category: 'Accessories',
    condition: 'New',
    basePrice: 4290,
    mrp: 4500,
    deviceModel: 'MagSafe Charger',
    tagline: 'Up to 25W wireless fast charging with braided longevity.',
    description: 'Original Apple 2-metre braided MagSafe fast charger. Delivers up to 25W fast wireless power to iPhone 16 models when paired with a 30W adapter.',
    images: ['/devices/magsafe-charger.png'],
    variants: [
      { id: 'v-magsafe-2m', storage: '2 Metre', colour: 'Silver / White Braided', colorHex: '#E2E3E5', price: 4290, mrp: 4500, stock: 12, sku: 'VAS-ACC-MAG2M' }
    ],
    specs: {
      chip: 'Integrated Qi2 / MagSafe Power Controller',
      display: 'Magnetic auto-alignment ring',
      battery: 'N/A',
      port: 'USB-C Integrated connector',
      biometrics: 'N/A',
      weight: '82 grams',
      warranty: '1 Year Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Factory Sealed',
      accessoriesIncluded: ['Official Box', 'Documentation'],
      inspectionDate: '2026-11-10'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-05T09:00:00Z'
  },
  {
    id: 'prod-acc-gan-21',
    slug: 'apple-35w-dual-usbc-power-adapter',
    name: '35W Dual USB-C Compact Power Adapter',
    category: 'Accessories',
    condition: 'New',
    basePrice: 5390,
    mrp: 5800,
    deviceModel: '35W Dual USB-C Adapter',
    tagline: 'Charge two devices simultaneously with foldable pins.',
    description: 'Compact official power adapter allowing simultaneous charging of your MacBook and iPhone or iPad and Apple Watch from a single wall outlet.',
    images: ['/devices/power-adapter.png'],
    variants: [
      { id: 'v-gan-35w', storage: '35W Dual Port', colour: 'White', colorHex: '#FFFFFF', price: 5390, mrp: 5800, stock: 10, sku: 'VAS-ACC-35WDUAL' }
    ],
    specs: {
      chip: 'Dynamic Power Allocation Controller',
      display: 'N/A',
      battery: 'N/A',
      port: '2x USB-C Power Delivery Ports',
      biometrics: 'N/A',
      weight: '115 grams',
      warranty: '1 Year Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '10/10 Factory Sealed',
      accessoriesIncluded: ['Original Box', 'Warranty Booklet'],
      inspectionDate: '2026-11-10'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-05T09:30:00Z'
  },
  {
    id: 'prod-acc-pen-22',
    slug: 'apple-pencil-pro',
    name: 'Apple Pencil Pro',
    category: 'Accessories',
    condition: 'Unboxed',
    basePrice: 10900,
    mrp: 11900,
    deviceModel: 'Apple Pencil Pro',
    tagline: 'Squeeze gesture, barrel roll, and haptic feedback.',
    description: 'Like-new open box Apple Pencil Pro. Magnetic pairing and charging on compatible iPad Pro M4 and iPad Air M2 models.',
    images: ['/devices/apple-pencil-pro.png'],
    variants: [
      { id: 'v-penpro-wht', storage: 'Standard', colour: 'Matte White', colorHex: '#FAFAFA', price: 10900, mrp: 11900, stock: 4, sku: 'VAS-ACC-PENCILPRO' }
    ],
    specs: {
      chip: 'Haptic Engine & Gyroscope Motion Sensors',
      display: 'Find My tracking built-in',
      battery: 'Magnetic wireless charging',
      port: 'Magnetic iPad dock',
      biometrics: 'N/A',
      weight: '19.15 grams',
      warranty: '10 Months Brand Warranty'
    },
    gradingReport: {
      batteryHealth: 100,
      cosmeticScore: '9.9/10 Like New',
      accessoriesIncluded: ['Original Box', 'Original Tip'],
      inspectionDate: '2026-11-08'
    },
    isVerified: true,
    isFeatured: false,
    isVisible: true,
    inStock: true,
    createdAt: '2026-11-06T12:00:00Z'
  }
];

export const initialOffers: Offer[] = [
  {
    id: 'offer-01',
    title: 'Instant HDFC & ICICI Bank Card Cashback',
    badge: 'Bank Offer',
    description: 'Get up to ₹6,000 instant cashback on credit card full-swipe or No-Cost EMI on all iPhone 16 and MacBook M3 series.',
    discountText: 'Up to ₹6,000 Off',
    code: 'VASBANK6K',
    validTill: 'Valid till 30 Nov 2026',
    isActive: true,
    ctaText: 'Check Eligibility',
    ctaLink: '#emi-calculator'
  },
  {
    id: 'offer-02',
    title: 'Festive Upgrade Bonus on Pre-Owned Exchange',
    badge: 'Exchange Bonus',
    description: 'Exchange your current iPhone 11 or higher and get an additional flat ₹4,000 store bonus on top of fair market trade-in valuation.',
    discountText: 'Extra ₹4,000 Trade-In Bonus',
    code: 'UPGRADE2026',
    validTill: 'Limited to first 50 upgrades',
    isActive: true,
    ctaText: 'Estimate Trade-in',
    ctaLink: '#trade-in'
  },
  {
    id: 'offer-03',
    title: 'Creator Studio Bundle (Mac + GaN Charger)',
    badge: 'Combo Deal',
    description: 'Purchase any MacBook Pro or Air and get 50% discount on the 35W Dual USB-C Adapter + free 1-on-1 data transfer setup.',
    discountText: '50% Off Power Bundle',
    code: 'CREATOR50',
    validTill: 'Ongoing Store Exclusive',
    isActive: true,
    ctaText: 'Explore Macs',
    ctaLink: '#catalog'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-01',
    author: 'Harpreet Singh Dhillon',
    city: 'Ranjit Avenue, Amritsar',
    rating: 5,
    date: '3 days ago',
    productPurchased: 'iPhone 16 Pro Max 256GB (Natural Titanium)',
    comment: 'Exceptional transparency. I was skeptical about buying an open-box device, but Vishal personally ran the 40-point diagnostics in front of me with serial verification on Apple’s check-coverage portal. Saved ₹15,000 and walked out with a spotless device with 100% battery health.',
    verifiedPurchase: true,
    isApproved: true
  },
  {
    id: 'rev-02',
    author: 'Simran Kaur Sandhu',
    city: 'Lawrence Road, Amritsar',
    rating: 5,
    date: '1 week ago',
    productPurchased: 'MacBook Pro 14" M3 Pro (Space Black)',
    comment: 'Best retail purchase experience in Amritsar and Majha region. No hidden billing games. The team helped transfer 400GB of video edits from my old Intel Mac seamlessly while I enjoyed tea at their Ranjit Avenue lounge.',
    verifiedPurchase: true,
    isApproved: true
  },
  {
    id: 'rev-03',
    author: 'Gurinder Pal Singh',
    city: 'Model Town, Jalandhar',
    rating: 5,
    date: '2 weeks ago',
    productPurchased: 'Apple Watch Ultra 2 (Titanium)',
    comment: 'Got my Ultra 2 via WhatsApp enquiry with same-day express doorstep dispatch to Jalandhar with a genuine GST tax invoice. The device was pristine factory sealed.',
    verifiedPurchase: true,
    isApproved: true
  },
  {
    id: 'rev-04',
    author: 'Amanpreet Bedi',
    city: 'Mall Road, Amritsar',
    rating: 5,
    date: '3 weeks ago',
    productPurchased: 'iPhone 15 Pro (Certified Pre-Owned)',
    comment: 'Bought a certified pre-owned iPhone 15 Pro for my photography work. 95% battery health, practically zero hairline marks, and the store gave me a signed 6-month warranty card. Honest shopkeepers who know their devices inside out.',
    verifiedPurchase: true,
    isApproved: true
  },
  {
    id: 'rev-05',
    author: 'Rajiv Chawla',
    city: 'Green Avenue, Amritsar',
    rating: 5,
    date: '1 month ago',
    productPurchased: 'iPad Pro 13" M4 (Tandem OLED)',
    comment: 'Pricing is genuinely competitive compared to big box electronics chains, and the personal attention is unmatched. Vishal Apple Store is now my go-to for all family device upgrades in Amritsar.',
    verifiedPurchase: true,
    isApproved: true
  },
  {
    id: 'rev-06',
    author: 'Navjot Kaur',
    city: 'Court Road, Amritsar',
    rating: 5,
    date: '1 month ago',
    productPurchased: 'AirPods Pro 2 (USB-C)',
    comment: 'Verified the serial number right before payment. Quick UPI checkout, genuine billing, and great advice on selecting the right ear tips. Highly recommended!',
    verifiedPurchase: true,
    isApproved: true
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-01',
    customerName: 'Gaurav Kapoor',
    phone: '+91 98112 34567',
    email: 'gaurav.k@example.com',
    type: 'product_reserve',
    productId: 'prod-ip15p-03',
    productName: 'iPhone 15 Pro (Certified Pre-Owned)',
    variantDetails: '128GB - Natural Titanium',
    quotedPrice: 74900,
    message: 'Can I visit tomorrow at 4 PM to inspect the 94% battery certified pre-owned iPhone 15 Pro? Please hold this unit for me.',
    status: 'New',
    createdAt: '2026-11-11T14:30:00Z',
    details: { visitDate: '2026-11-12', visitTime: '4:00 PM' }
  },
  {
    id: 'enq-02',
    customerName: 'Pooja Narang',
    phone: '+91 99991 82736',
    email: 'pooja.narang@example.com',
    type: 'trade_in',
    message: 'Looking to trade in my iPhone 13 128GB Starlight (battery 86%, no cracks) against the new iPhone 16 Pro 256GB Natural Titanium.',
    status: 'Contacted',
    createdAt: '2026-11-11T11:15:00Z',
    details: { currentDevice: 'iPhone 13 128GB', condition: 'Good', estimatedCredit: 28500 }
  },
  {
    id: 'enq-03',
    customerName: 'Sameer Ahuja',
    phone: '+91 98710 55443',
    email: 'sameer.ahuja@example.com',
    type: 'emi_quote',
    productId: 'prod-mbp14-07',
    productName: 'MacBook Pro 14" (M3 Pro)',
    quotedPrice: 184900,
    message: 'Interested in HDFC No-Cost EMI for 12 months with ₹50,000 down payment. What is the net monthly installment?',
    status: 'New',
    createdAt: '2026-11-10T18:45:00Z',
    details: { tenureMonths: 12, downPayment: 50000, estimatedMonthly: 11242 }
  },
  {
    id: 'enq-04',
    customerName: 'Nitin Rastogi',
    phone: '+91 97118 90123',
    email: 'nitin.rastogi@example.com',
    type: 'repair_request',
    message: 'MacBook Air M1 battery service alert showing service recommended. Can you replace with OEM battery and what is the turnaround time?',
    status: 'Closed',
    createdAt: '2026-11-09T10:20:00Z',
    details: { deviceModel: 'MacBook Air M1 2020', issue: 'Battery Service Warning' }
  }
];
