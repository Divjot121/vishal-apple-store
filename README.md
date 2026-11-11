# Vishal Apple Store — Premium Independent Apple Specialist

A polished, demo-ready e-commerce storefront and store-owner management platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed with luxury Apple-inspired minimalism (deep blacks, refined typography, hairline borders, and warm gold `#C9A24A` accents) specifically for an Indian retail context (Ranjit Avenue, Amritsar, Punjab).

---

## ⚡ Quick Start

### 1. Installation
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public storefront.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🔐 Demo Admin Access

- **Route:** `/admin` (or click the lock icon in the top navigation bar)
- **Email:** `admin@vishalapplestore.com`
- **Password:** `applepremium2026`
- **Convenience:** A **"One-Click Demo Admin Login"** button is provided directly on the `/admin` login screen for instant evaluation.

---

## 📁 Store Configuration File Structure

All store contact details, physical address, timings, Instagram handle, and Google Maps links live in a single config file:
```
src/lib/store-config.ts
```

### Structure Overview:
```typescript
export interface StoreConfig {
  storeName: string;            // e.g. "Vishal Apple Store"
  phone: string;                // e.g. "+91 98765 43210"
  phoneRaw: string;             // e.g. "+919876543210" (for tel: links)
  whatsappRaw: string;          // e.g. "919876543210" (for wa.me links)
  email: string;                // e.g. "contact@vishalapplestore.com"
  address: {
    shopNo: string;             // "Shop No. 14, Ground Floor"
    building: string;           // "Regal Building"
    area: string;               // "B-Block, Ranjit Avenue"
    city: string;               // "Amritsar"
    pincode: string;            // "110001"
    landmark: string;           // "Opposite Regal Cinema Exit, Outer Circle"
    fullFormatted: string;
  };
  timings: {
    weekdays: string;           // "Monday – Saturday: 10:30 AM – 9:00 PM"
    sunday: string;             // "Sunday: 11:30 AM – 8:00 PM"
    note: string;               // "Walk-ins welcome. Device inspections take ~15 mins."
  };
  socials: {
    instagramHandle: string;    // "@vishalapplestore"
    instagramUrl: string;
    googleMapsDirectionsUrl: string;
    googleMapsEmbedUrl: string;
  };
  brand: {
    logoHorizontal: string;     // "/brand/horizontal.jpeg"
    logoStacked: string;        // "/brand/main.jpeg"
    accentColor: string;        // "#C9A24A"
    disclaimer: string;
    gstNumber: string;
  };
}
```
> **Note:** The store owner can also modify all of these fields directly through the UI at `/admin` under the **Store Settings** tab.

---

## 🔄 Repository Layer & Swapping in Supabase

All data access (Products, Offers, Reviews, Enquiries, Settings) is strictly abstracted behind clean repository interfaces located in:
```
src/lib/repository/index.ts
```

### How Data Currently Works (Demo Mode)
- Data defaults to `LocalStorageProductRepository`, `LocalStorageOfferRepository`, etc.
- Pre-seeded with 22+ realistic devices (iPhone, Mac, iPad, AirPods, Watch, Accessories) across New, Unboxed, and Certified Pre-Owned conditions, 6 customer reviews, 3 active offers, and 4 sample enquiries.
- When an admin modifies a price, stock quantity, or status in `/admin`, a lightweight browser event (`vas_data_updated`) triggers immediate reactivity on the storefront in the same browser session without needing a page refresh.

### How to Swap in Supabase:
1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Run SQL migrations for tables: `products`, `offers`, `reviews`, `enquiries`, `store_settings`.
3. Add environment variables to `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. In `src/lib/repository/index.ts`, implement `SupabaseProductRepository`:
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   );

   class SupabaseProductRepository implements IProductRepository {
     async getAll(): Promise<Product[]> {
       const { data, error } = await supabase.from('products').select('*');
       if (error) throw error;
       return data;
     }
     // ... implement remaining methods matching IProductRepository
   }

   // Switch exported instance:
   export const productRepository: IProductRepository = process.env.NEXT_PUBLIC_SUPABASE_URL
     ? new SupabaseProductRepository()
     : new LocalStorageProductRepository();
   ```
5. Zero UI components need to be modified.

---

## 🎨 Design Theme & Brand Guidelines

- **Palette:** Jet Black (`#0A0A0A`), Charcoal (`#141418`), Crisp White (`#FFFFFF`), and Warm Gold (`#C9A24A`).
- **Typography:** Inter with confident tracking and display styling.
- **Brand Assets:** Uses original brand files located in `/public/brand/horizontal.jpeg` and `/public/brand/main.jpeg` unchanged.
- **Compliance:** Contains no unauthorized Apple trademarks, no Apple marketing slogans, and no claim of being an "Apple Authorised Reseller". Clearly branded as an independent premium retailer.
- **Currency:** Indian Rupee formatted with `en-IN` standards (`₹1,29,900`).

---

## 🚀 Deploy on Vercel

This repository is ready for zero-config deployment on Vercel:
1. Push this repository to GitHub or GitLab.
2. Import the project into Vercel.
3. Keep default settings (`Framework: Next.js`).
4. Click **Deploy**.
