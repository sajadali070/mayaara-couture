export type ProductCategory = 'sarees' | 'kurtis' | 'indo-western' | 'lehengas';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size';

export interface ProductColor {
  name: string;
  nameTa?: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameTa?: string;
  category: ProductCategory;
  price: number;
  discountPrice?: number;
  sizes: ProductSize[];
  colors: ProductColor[];
  images: string[];
  description: string;
  descriptionTa?: string;
  fabric: string;
  fabricTa?: string;
  careInstructions: string[];
  careInstructionsTa?: string[];
  tags: string[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  inStock: boolean;
  sku: string;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: ProductSize;
  color: string;
  quantity: number;
  sku: string;
}

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: ProductCategory;
  inStock: boolean;
  sku: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  size: string;
  color: string;
  priceRange: [number, number];
  onlyInStock: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc';
}

export type Locale = 'en' | 'ta';
