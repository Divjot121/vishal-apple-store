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
  tagline: "Pure Performance. Unrivalled Craft. Curated in Delhi.",
  subtitle: "New, Unboxed & Certified Pre-Owned Apple Devices with Transparent Diagnostics & Store Warranty.",
  shortDescription: "Delhi NCR's trusted destination for genuine Apple devices, certified trade-ins, and precision hardware care.",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsapp: "+91 98765 43210",
  whatsappRaw: "919876543210",
  email: "contact@vishalapplestore.com",
  address: {
    shopNo: "Shop No. 14, Ground Floor",
    building: "Regal Building",
    area: "Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    landmark: "Opposite Regal Cinema Exit, Outer Circle",
    fullFormatted: "Shop No. 14, Regal Building, Connaught Place, New Delhi - 110001",
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
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996024195748!2d77.21557057530268!3d28.630026275665807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b6059d47%3A0x6b77243c3d526e0b!2sRegal%20Building%2C%20Connaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Regal+Building+Connaught+Place+New+Delhi",
  },
  brand: {
    logoHorizontal: "/brand/horizontal.jpeg",
    logoStacked: "/brand/main.jpeg",
    accentColor: "#C9A24A",
    disclaimer: "Vishal Apple Store is an independent retailer specializing in genuine Apple devices and accessories. We are not an Apple Authorized Reseller and Apple Inc. trademarks belong to their respective owners.",
    gstNumber: "07AAAAA0000A1Z5 (Provided on official tax invoice)",
  },
};
