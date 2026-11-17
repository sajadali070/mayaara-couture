import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (product: Product) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const safeLocalStorage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(name, value);
      } catch {
        // ignore
      }
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(name);
      } catch {
        // ignore
      }
    }
  },
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.productId === productId);
      },

      toggleItem: (product: Product) => {
        const exists = get().isInWishlist(product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      addItem: (product: Product) => {
        if (get().isInWishlist(product.id)) return;
        const newItem: WishlistItem = {
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          discountPrice: product.discountPrice,
          image: product.images[0],
          category: product.category,
          inStock: product.inStock,
          sku: product.sku,
        };
        set({ items: [...get().items, newItem] });
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'mayaara_wishlist_storage',
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);
