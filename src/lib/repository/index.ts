import { Product, Offer, Review, Enquiry } from '@/types';
import { StoreConfig, defaultStoreConfig } from '@/lib/store-config';
import { initialProducts, initialOffers, initialReviews, initialEnquiries } from '@/lib/data/seed';

// Storage Keys
const STORAGE_KEYS = {
  PRODUCTS: 'vas_products_v1',
  OFFERS: 'vas_offers_v1',
  REVIEWS: 'vas_reviews_v1',
  ENQUIRIES: 'vas_enquiries_v1',
  SETTINGS: 'vas_settings_v1',
  AUTH: 'vas_admin_session_v1',
};

// Event dispatched across components when data mutations occur
export const STORE_MUTATION_EVENT = 'vas_data_updated';

function emitUpdate(entity: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STORE_MUTATION_EVENT, { detail: { entity } }));
  }
}

// -------------------------------------------------------------
// REPOSITORY INTERFACES (Clean abstraction for Supabase or SQL)
// -------------------------------------------------------------
export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getById(id: string): Promise<Product | null>;
  create(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product>;
  update(id: string, updates: Partial<Product>): Promise<Product>;
  quickUpdate(productId: string, variantId: string, updates: { price?: number; stock?: number; inStock?: boolean }): Promise<Product>;
  delete(id: string): Promise<boolean>;
  resetToDefault(): Promise<Product[]>;
}

export interface IOfferRepository {
  getAll(): Promise<Offer[]>;
  create(offer: Omit<Offer, 'id'>): Promise<Offer>;
  update(id: string, updates: Partial<Offer>): Promise<Offer>;
  delete(id: string): Promise<boolean>;
}

export interface IEnquiryRepository {
  getAll(): Promise<Enquiry[]>;
  create(enquiry: Omit<Enquiry, 'id' | 'createdAt'>): Promise<Enquiry>;
  updateStatus(id: string, status: Enquiry['status']): Promise<Enquiry>;
  delete(id: string): Promise<boolean>;
}

export interface IReviewRepository {
  getAll(): Promise<Review[]>;
  create(review: Omit<Review, 'id' | 'date'>): Promise<Review>;
  toggleApproval(id: string): Promise<Review>;
  delete(id: string): Promise<boolean>;
}

export interface ISettingsRepository {
  get(): Promise<StoreConfig>;
  update(updates: Partial<StoreConfig>): Promise<StoreConfig>;
}

// -------------------------------------------------------------
// LOCAL STORAGE IMPLEMENTATION (Default with SSR fallback)
// -------------------------------------------------------------
class LocalStorageProductRepository implements IProductRepository {
  private getLocal(): Product[] {
    if (typeof window === 'undefined') return initialProducts;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
        return initialProducts;
      }
      return JSON.parse(stored);
    } catch {
      return initialProducts;
    }
  }

  private save(products: Product[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      emitUpdate('products');
    }
  }

  async getAll(): Promise<Product[]> {
    return this.getLocal();
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const list = this.getLocal();
    return list.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  async getById(id: string): Promise<Product | null> {
    const list = this.getLocal();
    return list.find((p) => p.id === id) || null;
  }

  async create(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const list = this.getLocal();
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newProduct);
    this.save(list);
    return newProduct;
  }

  async update(id: string, updates: Partial<Product>): Promise<Product> {
    const list = this.getLocal();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Product not found: ${id}`);
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    this.save(list);
    return updated;
  }

  async quickUpdate(
    productId: string,
    variantId: string,
    updates: { price?: number; stock?: number; inStock?: boolean }
  ): Promise<Product> {
    const list = this.getLocal();
    const index = list.findIndex((p) => p.id === productId);
    if (index === -1) throw new Error(`Product not found: ${productId}`);

    const product = { ...list[index] };
    const variantIndex = product.variants.findIndex((v) => v.id === variantId);

    if (variantIndex !== -1) {
      const variant = { ...product.variants[variantIndex] };
      if (typeof updates.price === 'number') {
        variant.price = updates.price;
        if (variantIndex === 0) product.basePrice = updates.price;
      }
      if (typeof updates.stock === 'number') {
        variant.stock = updates.stock;
      }
      product.variants[variantIndex] = variant;
    }

    if (typeof updates.inStock === 'boolean') {
      product.inStock = updates.inStock;
    } else {
      // Re-evaluate inStock based on sum of variant stock
      const totalStock = product.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
      product.inStock = totalStock > 0;
    }

    list[index] = product;
    this.save(list);
    return product;
  }

  async delete(id: string): Promise<boolean> {
    let list = this.getLocal();
    const initialLen = list.length;
    list = list.filter((p) => p.id !== id);
    if (list.length !== initialLen) {
      this.save(list);
      return true;
    }
    return false;
  }

  async resetToDefault(): Promise<Product[]> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
      emitUpdate('products');
    }
    return initialProducts;
  }
}

class LocalStorageOfferRepository implements IOfferRepository {
  private getLocal(): Offer[] {
    if (typeof window === 'undefined') return initialOffers;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(initialOffers));
        return initialOffers;
      }
      return JSON.parse(stored);
    } catch {
      return initialOffers;
    }
  }

  private save(offers: Offer[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
      emitUpdate('offers');
    }
  }

  async getAll(): Promise<Offer[]> {
    return this.getLocal();
  }

  async create(data: Omit<Offer, 'id'>): Promise<Offer> {
    const list = this.getLocal();
    const newOffer: Offer = {
      ...data,
      id: `offer-${Date.now()}`,
    };
    list.unshift(newOffer);
    this.save(list);
    return newOffer;
  }

  async update(id: string, updates: Partial<Offer>): Promise<Offer> {
    const list = this.getLocal();
    const index = list.findIndex((o) => o.id === id);
    if (index === -1) throw new Error(`Offer not found: ${id}`);
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    this.save(list);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    let list = this.getLocal();
    const len = list.length;
    list = list.filter((o) => o.id !== id);
    if (list.length !== len) {
      this.save(list);
      return true;
    }
    return false;
  }
}

class LocalStorageEnquiryRepository implements IEnquiryRepository {
  private getLocal(): Enquiry[] {
    if (typeof window === 'undefined') return initialEnquiries;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(initialEnquiries));
        return initialEnquiries;
      }
      return JSON.parse(stored);
    } catch {
      return initialEnquiries;
    }
  }

  private save(enquiries: Enquiry[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
      emitUpdate('enquiries');
    }
  }

  async getAll(): Promise<Enquiry[]> {
    return this.getLocal();
  }

  async create(data: Omit<Enquiry, 'id' | 'createdAt'>): Promise<Enquiry> {
    const list = this.getLocal();
    const newEnquiry: Enquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newEnquiry);
    this.save(list);
    return newEnquiry;
  }

  async updateStatus(id: string, status: Enquiry['status']): Promise<Enquiry> {
    const list = this.getLocal();
    const index = list.findIndex((e) => e.id === id);
    if (index === -1) throw new Error(`Enquiry not found: ${id}`);
    list[index].status = status;
    this.save(list);
    return list[index];
  }

  async delete(id: string): Promise<boolean> {
    let list = this.getLocal();
    const len = list.length;
    list = list.filter((e) => e.id !== id);
    if (list.length !== len) {
      this.save(list);
      return true;
    }
    return false;
  }
}

class LocalStorageReviewRepository implements IReviewRepository {
  private getLocal(): Review[] {
    if (typeof window === 'undefined') return initialReviews;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(initialReviews));
        return initialReviews;
      }
      return JSON.parse(stored);
    } catch {
      return initialReviews;
    }
  }

  private save(reviews: Review[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
      emitUpdate('reviews');
    }
  }

  async getAll(): Promise<Review[]> {
    return this.getLocal();
  }

  async create(data: Omit<Review, 'id' | 'date'>): Promise<Review> {
    const list = this.getLocal();
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    list.unshift(newReview);
    this.save(list);
    return newReview;
  }

  async toggleApproval(id: string): Promise<Review> {
    const list = this.getLocal();
    const index = list.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Review not found: ${id}`);
    list[index].isApproved = !list[index].isApproved;
    this.save(list);
    return list[index];
  }

  async delete(id: string): Promise<boolean> {
    let list = this.getLocal();
    const len = list.length;
    list = list.filter((r) => r.id !== id);
    if (list.length !== len) {
      this.save(list);
      return true;
    }
    return false;
  }
}

class LocalStorageSettingsRepository implements ISettingsRepository {
  private getLocal(): StoreConfig {
    if (typeof window === 'undefined') return defaultStoreConfig;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultStoreConfig));
        return defaultStoreConfig;
      }
      return JSON.parse(stored);
    } catch {
      return defaultStoreConfig;
    }
  }

  async get(): Promise<StoreConfig> {
    return this.getLocal();
  }

  async update(updates: Partial<StoreConfig>): Promise<StoreConfig> {
    const current = this.getLocal();
    const updated = {
      ...current,
      ...updates,
      address: {
        ...current.address,
        ...(updates.address || {}),
      },
      timings: {
        ...current.timings,
        ...(updates.timings || {}),
      },
      socials: {
        ...current.socials,
        ...(updates.socials || {}),
      },
      brand: {
        ...current.brand,
        ...(updates.brand || {}),
      },
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      emitUpdate('settings');
    }
    return updated;
  }
}

// -------------------------------------------------------------
// REPOSITORY INSTANCES (Can be easily swapped to SupabaseRepository)
// -------------------------------------------------------------
export const productRepository: IProductRepository = new LocalStorageProductRepository();
export const offerRepository: IOfferRepository = new LocalStorageOfferRepository();
export const enquiryRepository: IEnquiryRepository = new LocalStorageEnquiryRepository();
export const reviewRepository: IReviewRepository = new LocalStorageReviewRepository();
export const settingsRepository: ISettingsRepository = new LocalStorageSettingsRepository();
