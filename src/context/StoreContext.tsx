'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product, Offer, Review, Enquiry } from '@/types';
import { StoreConfig, defaultStoreConfig } from '@/lib/store-config';
import {
  initialProducts,
  initialOffers,
  initialReviews,
  initialEnquiries,
} from '@/lib/data/seed';
import {
  productRepository,
  offerRepository,
  reviewRepository,
  enquiryRepository,
  settingsRepository,
  STORE_MUTATION_EVENT,
} from '@/lib/repository';

interface StoreContextType {
  products: Product[];
  offers: Offer[];
  reviews: Review[];
  enquiries: Enquiry[];
  settings: StoreConfig;
  isLoading: boolean;
  // Compare state
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  // Mutations
  refreshData: () => Promise<void>;
  quickUpdateProduct: (
    productId: string,
    variantId: string,
    updates: { price?: number; stock?: number; inStock?: boolean }
  ) => Promise<Product>;
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt'>) => Promise<Enquiry>;
  // Auth
  isAdmin: boolean;
  loginAdmin: (password: string, email: string) => boolean;
  logoutAdmin: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [settings, setSettings] = useState<StoreConfig>(defaultStoreConfig);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const loadAll = useCallback(async () => {
    try {
      const [p, o, r, e, s] = await Promise.all([
        productRepository.getAll(),
        offerRepository.getAll(),
        reviewRepository.getAll(),
        enquiryRepository.getAll(),
        settingsRepository.get(),
      ]);
      setProducts(p);
      setOffers(o);
      setReviews(r);
      setEnquiries(e);
      setSettings(s);
    } catch (err) {
      console.error('Failed to load store data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load and auth check
  useEffect(() => {
    loadAll();

    // Check admin session
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('vas_admin_authenticated');
      if (savedAuth === 'true') {
        setIsAdmin(true);
      }
    }

    // Listen to cross-component mutations
    const handleMutation = () => {
      loadAll();
    };

    window.addEventListener(STORE_MUTATION_EVENT, handleMutation);
    window.addEventListener('storage', handleMutation);

    return () => {
      window.removeEventListener(STORE_MUTATION_EVENT, handleMutation);
      window.removeEventListener('storage', handleMutation);
    };
  }, [loadAll]);

  // Compare Tool handlers
  const addToCompare = useCallback(
    (product: Product): boolean => {
      if (compareList.length >= 3) {
        return false;
      }
      if (compareList.some((p) => p.id === product.id)) {
        return true;
      }
      setCompareList((prev) => [...prev, product]);
      return true;
    },
    [compareList]
  );

  const removeFromCompare = useCallback((productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const isInCompare = useCallback(
    (productId: string) => {
      return compareList.some((p) => p.id === productId);
    },
    [compareList]
  );

  // Quick edit product inline
  const quickUpdateProduct = useCallback(
    async (
      productId: string,
      variantId: string,
      updates: { price?: number; stock?: number; inStock?: boolean }
    ) => {
      const updated = await productRepository.quickUpdate(productId, variantId, updates);
      await loadAll();
      return updated;
    },
    [loadAll]
  );

  // Submit Enquiry
  const submitEnquiry = useCallback(
    async (enquiry: Omit<Enquiry, 'id' | 'createdAt'>) => {
      const created = await enquiryRepository.create(enquiry);
      await loadAll();
      return created;
    },
    [loadAll]
  );

  // Admin Auth
  const loginAdmin = useCallback((password: string, email: string) => {
    const validEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@vishalapplestore.com';
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'applepremium2026';

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedTarget = validEmail.trim().toLowerCase();

    if (
      (normalizedEmail === normalizedTarget || normalizedEmail === 'admin') &&
      password === validPass
    ) {
      sessionStorage.setItem('vas_admin_authenticated', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    sessionStorage.removeItem('vas_admin_authenticated');
    setIsAdmin(false);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        products,
        offers,
        reviews,
        enquiries,
        settings,
        isLoading,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        refreshData: loadAll,
        quickUpdateProduct,
        submitEnquiry,
        isAdmin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
