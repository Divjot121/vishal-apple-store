import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { defaultStoreConfig } from '@/lib/store-config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import CompareDrawer from '@/components/store/CompareDrawer';
import RevealObserver from '@/components/ui/RevealObserver';
import { themeColors } from '@/lib/tokens';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: themeColors.light },
    { media: '(prefers-color-scheme: dark)', color: themeColors.dark },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vishalapplestore.com'),
  title: {
    default: 'Vishal Apple Store | iPhone, Mac & iPad in Ranjit Avenue, Amritsar',
    template: '%s | Vishal Apple Store',
  },
  description:
    'New, open-box and checked pre-owned iPhone, Mac, iPad and Apple Watch in Ranjit Avenue, Amritsar. GST bill on every sale, 6-month store warranty on pre-owned, repairs and exchange.',
  keywords: [
    'Apple Store Amritsar',
    'iPhone 16 Pro Amritsar',
    'Pre-owned iPhone Amritsar',
    'Unboxed MacBook Pro Amritsar',
    'AirPods Pro 2 Amritsar',
    'Apple Watch Ultra Amritsar',
    'Vishal Apple Store Ranjit Avenue',
    'Genuine Apple Devices Punjab',
  ],
  authors: [{ name: 'Vishal Apple Store' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vishalapplestore.com',
    siteName: 'Vishal Apple Store',
    title: 'Vishal Apple Store | Ranjit Avenue, Amritsar',
    description:
      'New, open-box and checked pre-owned Apple devices. Tested in front of you, billed with GST, 6-month warranty on pre-owned.',
    images: [
      {
        url: '/brand/horizontal.jpeg',
        width: 1200,
        height: 630,
        alt: 'Vishal Apple Store logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishal Apple Store | Ranjit Avenue, Amritsar',
    description:
      'New, open-box and checked pre-owned Apple devices in Ranjit Avenue, Amritsar.',
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
      latitude: 31.64785,
      longitude: 74.858056,
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
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Set theme + js flag before first paint: stored choice, else system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('vas_theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.classList.add(t)}catch(e){d.classList.add('light')}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-small focus:font-semibold focus:text-canvas"
        >
          Skip to content
        </a>
        <StoreProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CompareDrawer />
          <MobileBottomBar />
          <RevealObserver />
        </StoreProvider>
      </body>
    </html>
  );
}
