import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';

// Layout & Global Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingActions } from './components/FloatingActions';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';

// Flooring Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { VisualizerPage } from './pages/VisualizerPage';
import { SiteVisitPage } from './pages/SiteVisitPage';
import { SampleOrderPage } from './pages/SampleOrderPage';
import { ComparePage } from './pages/ComparePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { InstallationGuidePage } from './pages/InstallationGuidePage';
import { TradeProgramPage } from './pages/TradeProgramPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { BlogPage } from './pages/BlogPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';

import { Product } from './types';
import { initialProducts } from './data/seedData';

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const parseHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { page: 'home', param: undefined };
    const parts = hash.split('/');
    return { page: parts[0] || 'home', param: parts.slice(1).join('/') || undefined };
  };

  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState<string>(initial.page);
  const [pageParam, setPageParam] = useState<string | undefined>(initial.param);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && data.products && data.products.length > 0) {
        setProducts(data.products);
      }
    } catch {
      // Keep initialProducts fallback
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync with browser history and URL hash
  useEffect(() => {
    const onLocationChange = () => {
      const { page, param } = parseHash();
      setCurrentPage(page);
      setPageParam(param);
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, pageParam]);

  const handleNavigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    const newHash = param ? `#${page}/${param}` : (page === 'home' ? '#' : `#${page}`);
    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <CompareProvider>
          <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#241c15] selection:bg-[#7b5731] selection:text-[#f4eee1]">
            {/* Architectural Header */}
            <Header
              activePage={currentPage}
              onNavigate={handleNavigate}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenSearch={() => handleNavigate('shop')}
            />

            {/* Page Viewport Content */}
            <main className="flex-1 pb-16 md:pb-0">
              {currentPage === 'home' && (
                <HomePage
                  onNavigate={handleNavigate}
                  onQuickView={handleQuickView}
                />
              )}

              {currentPage === 'shop' && (
                <ShopPage
                  onNavigate={handleNavigate}
                  onQuickView={handleQuickView}
                  initialCategory={pageParam}
                />
              )}

              {currentPage === 'product-detail' && (
                <ProductDetailPage
                  slug={pageParam || products[0]?.slug}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'calculator' && (
                <CalculatorPage
                  products={products}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'visualizer' && (
                <VisualizerPage
                  products={products}
                  initialProductSlug={pageParam}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'site-visit' && (
                <SiteVisitPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'samples' && (
                <SampleOrderPage
                  products={products}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'compare' && (
                <ComparePage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'checkout' && (
                <CheckoutPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'track-order' && (
                <TrackOrderPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'installation-guide' && (
                <InstallationGuidePage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'trade-program' && (
                <TradeProgramPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'contact' && (
                <ContactPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'faq' && (
                <FaqPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'blog' && (
                <BlogPage
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'account' && (
                <AccountPage
                  products={products}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'admin' && (
                <AdminPage
                  products={products}
                  onRefreshProducts={fetchProducts}
                  onNavigate={handleNavigate}
                />
              )}
            </main>

            {/* Global Architectural Footer */}
            <Footer onNavigate={handleNavigate} />

            {/* Floating Quick Action Buttons (WhatsApp, Site Visit, Top) */}
            <FloatingActions onNavigate={handleNavigate} />

            {/* Mobile Bottom Navigation Bar */}
            <MobileBottomNav
              activePage={currentPage}
              onNavigate={handleNavigate}
              onOpenCart={() => setIsCartOpen(true)}
            />

            {/* Slide-out Architectural Cart Drawer */}
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onNavigate={handleNavigate}
            />

            {/* Quick View Product Modal */}
            <QuickViewModal
              isOpen={!!quickViewProduct}
              product={quickViewProduct}
              onClose={() => setQuickViewProduct(null)}
              onNavigate={handleNavigate}
            />
          </div>
        </CompareProvider>
      </CartProvider>
    </AuthProvider>
  );
}
