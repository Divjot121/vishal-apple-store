/**
 * Vishal Apple Store - Store Configuration
 * All contact, address, operating hours, and social details live here.
 * Store owner can update these values in /admin or directly edit this file.
 */

export interface StoreConfig {
  storeName: string;
  tagline: string;
  subtitle: string;
  shortDescription: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  address: {
    shopNo: string;
    building: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
    fullFormatted: string;
  };
  timings: {
    weekdays: string;
    sunday: string;
    note: string;
  };
  socials: {
    instagramHandle: string;
    instagramUrl: string;
    googleReviewsUrl: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
  };
  brand: {
    logoHorizontal: string;
    logoStacked: string;
    accentColor: string;
    disclaimer: string;
    gstNumber: string;
  };
}

export const defaultStoreConfig: StoreConfig = {
  storeName: "Vishal Apple Store",
  tagline: "Pure Performance. Unrivalled Craft. Curated in Amritsar.",
  subtitle: "New, Unboxed & Certified Pre-Owned Apple Devices with Transparent Diagnostics & Store Warranty.",
  shortDescription: "Amritsar and Punjab's trusted destination for genuine Apple devices, certified trade-ins, and precision hardware care.",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsapp: "+91 98765 43210",
  whatsappRaw: "919876543210",
  email: "contact@vishalapplestore.com",
  address: {
    shopNo: "Shop No. 14, Ground Floor",
    building: "District Shopping Complex",
    area: "B-Block, Ranjit Avenue",
    city: "Amritsar",
    state: "Punjab",
    pincode: "143001",
    landmark: "Near Custom Chowk, Ranjit Avenue",
    fullFormatted: "Shop No. 14, District Shopping Complex, B-Block, Ranjit Avenue, Amritsar, Punjab - 143001",
  },
  timings: {
    weekdays: "Monday – Saturday: 10:30 AM – 9:00 PM",
    sunday: "Sunday: 11:30 AM – 8:00 PM",
    note: "Walk-ins welcome. Device inspections take ~15 mins.",
  },
  socials: {
    instagramHandle: "@vishalapplestore",
    instagramUrl: "https://instagram.com/vishalapplestore",
    googleReviewsUrl: "https://g.page/r/vishalapplestore/review",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.488390757989!2d74.85805567540203!3d31.64784997415598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964a387f3b89b%3A0x6b77243c3d526e0b!2sRanjit%20Avenue%2C%20Amritsar%2C%20Punjab%20143001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Ranjit+Avenue+District+Shopping+Complex+Amritsar+Punjab",
  },
  brand: {
    logoHorizontal: "/brand/horizontal.jpeg",
    logoStacked: "/brand/main.jpeg",
    accentColor: "#C9A24A",
    disclaimer: "Vishal Apple Store is an independent retailer specializing in authentic Apple devices and accessories. We are not an Apple Authorized Reseller and Apple Inc. trademarks belong to their respective owners.",
    gstNumber: "03AAAAA0000A1Z5 (Provided on official tax invoice)",
  },
};
