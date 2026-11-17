import rawProducts from '@/data/products.json';
import { Product, ProductCategory, FilterState } from '@/types';

export const products: Product[] = rawProducts as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(limit: number = 8): Product[] {
  return products.filter((p) => p.isNewArrival).slice(0, limit);
}

export function getBestSellers(limit: number = 8): Product[] {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export function getRelatedProducts(
  productId: string,
  category: ProductCategory,
  limit: number = 4
): Product[] {
  return products
    .filter((p) => p.id !== productId && p.category === category)
    .slice(0, limit);
}

export function filterAndSortProducts(
  items: Product[],
  filters: FilterState
): Product[] {
  let result = [...items];

  // Search Query
  if (filters.searchQuery.trim()) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.nameTa && p.nameTa.toLowerCase().includes(q)) ||
        p.fabric.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  // Category
  if (filters.category && filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category);
  }

  // Size
  if (filters.size && filters.size !== 'all') {
    result = result.filter((p) =>
      p.sizes.includes(filters.size as Product['sizes'][number])
    );
  }

  // Color
  if (filters.color && filters.color !== 'all') {
    result = result.filter((p) =>
      p.colors.some((c) => c.name.toLowerCase() === filters.color.toLowerCase())
    );
  }

  // Price Range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter((p) => {
      const price = p.discountPrice || p.price;
      return price >= min && price <= max;
    });
  }

  // Stock
  if (filters.onlyInStock) {
    result = result.filter((p) => p.inStock);
  }

  // Sorting
  switch (filters.sortBy) {
    case 'newest':
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      break;
    case 'price-asc':
      result.sort(
        (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
      );
      break;
    case 'price-desc':
      result.sort(
        (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
      );
      break;
    case 'featured':
    default:
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      break;
  }

  return result;
}
