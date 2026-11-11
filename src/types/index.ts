export type Category = 'iPhone' | 'Mac' | 'iPad' | 'AirPods' | 'Watch' | 'Accessories';

export type Condition = 'New' | 'Unboxed' | 'Pre-owned';

export interface ProductVariant {
  id: string;
  storage: string;
  colour: string;
  colorHex?: string;
  price: number;
  mrp: number;
  stock: number;
  sku?: string;
}

export interface ProductSpecs {
  chip: string;
  display: string;
  camera?: string;
  battery: string;
  port: string;
  biometrics: string;
  weight: string;
  warranty: string;
}

export interface GradingReport {
  batteryHealth?: number; // e.g., 96 (%)
  cosmeticScore: string; // e.g. "10/10 Pristine" | "9.5/10 Like-New"
  accessoriesIncluded: string[];
  inspectionDate?: string;
  technicianNotes?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  condition: Condition;
  basePrice: number;
  mrp: number;
  variants: ProductVariant[];
  images: string[];
  deviceModel: string;
  tagline: string;
  description: string;
  specs: ProductSpecs;
  gradingReport?: GradingReport;
  isVerified: boolean; // 40-point diagnostics passed
  isFeatured: boolean;
  isVisible: boolean;
  inStock: boolean;
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  badge: string; // e.g., "Bank Offer", "Festive Drop", "Limited Stock"
  description: string;
  discountText: string; // e.g., "₹5,000 Instant Card Discount"
  code?: string;
  validTill: string;
  isActive: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number; // 1-5
  date: string;
  productPurchased: string;
  comment: string;
  verifiedPurchase: boolean;
  isApproved: boolean;
}

export type EnquiryType = 'general' | 'product_reserve' | 'emi_quote' | 'trade_in' | 'repair_request';

export type EnquiryStatus = 'New' | 'Contacted' | 'Closed';

export interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  type: EnquiryType;
  productId?: string;
  productName?: string;
  variantDetails?: string;
  quotedPrice?: number;
  details?: Record<string, any>;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}
