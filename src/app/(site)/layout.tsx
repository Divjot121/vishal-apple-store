import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import CompareDrawer from '@/components/store/CompareDrawer';

/**
 * Storefront shell: header, footer, compare dock and the phone contact bar.
 * Lives in the (site) route group so /admin renders without any of it.
 * URLs are unchanged: route groups don't add a path segment.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-small focus:font-semibold focus:text-canvas"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CompareDrawer />
      <MobileBottomBar />
    </>
  );
}
