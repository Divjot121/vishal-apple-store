import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { defaultStoreConfig } from '@/lib/store-config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import CompareDrawer from '@/components/store/CompareDrawer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vishalapplestore.com'),
  title: {
    default: 'Vishal Apple Store | Premium Apple Specialist in Connaught Place, New Delhi',
    template: '%s | Vishal Apple Store',
  },
  description:
    'New, Unboxed & Certified Pre-Owned Apple devices in Delhi NCR. 40-point verified diagnostics, genuine GST tax invoice, transparent battery grading, and store warranty support.',
  keywords: [
    'Apple Store Delhi',
    'iPhone 16 Pro Connaught Place',
    'Pre-owned iPhone Delhi',
    'Unboxed MacBook Pro M3',
    'AirPods Pro 2 Delhi',
    'Apple Watch Ultra Delhi',
    'Vishal Apple Store',
    'Genuine Apple Devices Delhi NCR',
  ],
  authors: [{ name: 'Vishal Apple Store' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vishalapplestore.com',
    siteName: 'Vishal Apple Store',
    title: 'Vishal Apple Store | Curated Apple Devices in Delhi NCR',
    description:
      'Experience genuine New, Unboxed & Certified Pre-Owned Apple devices with transparent 40-point diagnostics, store warranty, and instant WhatsApp inquiry.',
    images: [
      {
        url: '/brand/horizontal.jpeg',
        width: 1200,
        height: 630,
        alt: 'Vishal Apple Store - Independent Apple Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishal Apple Store | Premium Apple Devices',
    description:
      'Curated Apple devices with transparent grading and verified store warranty. Connaught Place, New Delhi.',
    images: ['/brand/horizontal.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: defaultStoreConfig.storeName,
    image: 'https://vishalapplestore.com/brand/horizontal.jpeg',
    telephone: defaultStoreConfig.phoneRaw,
    email: defaultStoreConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: defaultStoreConfig.address.fullFormatted,
      addressLocality: defaultStoreConfig.address.city,
      addressRegion: defaultStoreConfig.address.state,
      postalCode: defaultStoreConfig.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.630026,
      longitude: 77.215571,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:30',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '11:30',
        closes: '20:00',
      },
    ],
    priceRange: '₹₹₹',
    url: 'https://vishalapplestore.com',
  };

  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0A0A0A] text-white min-h-screen flex flex-col antialiased selection:bg-[#C9A24A]/30 selection:text-white">
        <StoreProvider>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <CompareDrawer />
          <MobileBottomBar />
        </StoreProvider>
      </body>
    </html>
  );
}
