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
  tagline: "Apple devices, checked in front of you.",
  subtitle: "New sealed stock, open-box units and pre-owned phones we have tested ourselves. GST bill on every sale.",
  shortDescription: "An independent shop in Ranjit Avenue selling new, open-box and checked pre-owned iPhone, Mac, iPad and Apple Watch. Repairs and exchange too.",
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
    weekdays: "Mon–Sat: 10:30 am – 9 pm",
    sunday: "Sun: 11:30 am – 8 pm",
    note: "Walk in any time. A pre-owned check takes about 15 minutes.",
  },
  socials: {
    instagramHandle: "@vishalapplestore",
    instagramUrl: "https://instagram.com/vishalapplestore",
    googleReviewsUrl: "https://g.page/r/vishalapplestore/review",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.488390757989!2d74.85805567540203!3d31.64784997415598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964a387f3b89b%3A0x6b77243c3d526e0b!2sRanjit%20Avenue%2C%20Amritsar%2C%20Punjab%20143001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Ranjit+Avenue+District+Shopping+Complex+Amritsar+Punjab",
  },
  brand: {
    logoHorizontal: "/brand/logo-horizontal.jpg",
    logoStacked: "/brand/logo-stacked.jpg",
    accentColor: "#C9A24A",
    disclaimer: "Vishal Apple Store is an independent shop. We are not an Apple Authorised Reseller and are not affiliated with Apple Inc. Apple, iPhone, iPad, Mac, AirPods and Apple Watch are trademarks of Apple Inc.",
    gstNumber: "03AAAAA0000A1Z5 (Provided on official tax invoice)",
  },
};
