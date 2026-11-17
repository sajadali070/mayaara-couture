'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/context';
import { products, filterAndSortProducts } from '@/lib/products';
import { FilterState, ProductSize } from '@/types';
import ProductCard from '@/components/common/ProductCard';
import SectionHeading from '@/components/common/SectionHeading';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'sarees', label: 'Handloom Sarees' },
  { id: 'kurtis', label: 'Kurtis & Sets' },
  { id: 'indo-western', label: 'Indo-Western' },
  { id: 'lehengas', label: 'Bridal Lehengas' },
];

const SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const COLORS = [
  { name: 'Red', hex: '#7A1C28' },
  { name: 'Gold', hex: '#C9A24B' },
  { name: 'Blue', hex: '#1B2A4A' },
  { name: 'Green', hex: '#1B4D3E' },
  { name: 'Pink', hex: '#C8B6D6' },
  { name: 'Maroon', hex: '#4A121E' },
  { name: 'Ivory', hex: '#FAF7F2' },
];

export default function ShopCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, locale } = useTranslation();

  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: queryParam,
    category: categoryParam,
    size: 'all',
    color: 'all',
    priceRange: [0, 50000],
    onlyInStock: false,
    sortBy: 'featured',
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync url param updates
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
    if (queryParam) {
      setFilters((prev) => ({ ...prev, searchQuery: queryParam }));
    }
  }, [categoryParam, queryParam]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, filters);
  }, [filters]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleCategoryChange = (catId: string) => {
    setFilters((prev) => ({ ...prev, category: catId }));
    router.replace(catId === 'all' ? '/shop' : `/shop?category=${catId}`, { scroll: false });
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      size: 'all',
      color: 'all',
      priceRange: [0, 50000],
      onlyInStock: false,
      sortBy: 'featured',
    });
    router.replace('/shop', { scroll: false });
  };

  const activeFiltersCount = [
    filters.category !== 'all',
    filters.size !== 'all',
    filters.color !== 'all',
    filters.onlyInStock,
    filters.searchQuery.trim() !== '',
    filters.priceRange[1] < 50000 || filters.priceRange[0] > 0,
  ].filter(Boolean).length;

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          badge="Boutique Catalog"
          title={t.shop.title}
          subtitle={t.shop.subtitle}
        />

        {/* Top Control Bar: Search & Sort */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-subtle border border-ivory-200/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
              placeholder={t.nav.search}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:border-gold-500 text-charcoal-800"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => setFilters((p) => ({ ...p, searchQuery: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Actions & Sorting */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-charcoal-800 text-xs font-semibold border border-ivory-300 transition-colors"
            >
              <Filter className="w-4 h-4 text-maroon-800" />
              <span>{t.shop.filters}</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-maroon-900 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Total Results */}
            <span className="hidden sm:inline-block text-xs text-charcoal-500">
              <strong className="text-charcoal-900">{filteredProducts.length}</strong> {t.shop.itemsFound}
            </span>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal-500 hidden sm:inline-block font-medium">
                {t.shop.sortBy}:
              </span>
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      sortBy: e.target.value as FilterState['sortBy'],
                    }))
                  }
                  className="appearance-none bg-ivory-50 border border-ivory-300 rounded-xl px-3.5 py-2 pr-8 text-xs font-semibold text-charcoal-800 focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="featured">{t.shop.featured}</option>
                  <option value="newest">{t.shop.newest}</option>
                  <option value="price-asc">{t.shop.priceLowHigh}</option>
                  <option value="price-desc">{t.shop.priceHighLow}</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills (Quick Switcher) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shrink-0 ${
                filters.category === cat.id
                  ? 'bg-maroon-900 text-ivory-50 shadow-sm'
                  : 'bg-white text-charcoal-700 hover:bg-ivory-200 border border-ivory-300/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Filters Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6 p-3 bg-gold-500/10 rounded-xl border border-gold-500/20 text-xs">
            <span className="text-charcoal-500 font-medium">Active:</span>
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-charcoal-800 border border-ivory-300 text-[11px] font-semibold">
                Category: {filters.category}
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.size !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-charcoal-800 border border-ivory-300 text-[11px] font-semibold">
                Size: {filters.size}
                <button
                  onClick={() => setFilters((p) => ({ ...p, size: 'all' }))}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.color !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-charcoal-800 border border-ivory-300 text-[11px] font-semibold">
                Color: {filters.color}
                <button
                  onClick={() => setFilters((p) => ({ ...p, color: 'all' }))}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.onlyInStock && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-charcoal-800 border border-ivory-300 text-[11px] font-semibold">
                In Stock Only
                <button
                  onClick={() => setFilters((p) => ({ ...p, onlyInStock: false }))}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-maroon-800 hover:text-maroon-950 underline underline-offset-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.shop.clearAll}</span>
            </button>
          </div>
        )}

        {/* Main Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-subtle border border-ivory-200/80 space-y-6 sticky top-28">
              <div className="flex items-center justify-between border-b border-ivory-200 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-maroon-800" />
                  <h3 className="font-serif font-bold text-base text-charcoal-900">
                    {t.shop.filters}
                  </h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-maroon-800 hover:underline"
                  >
                    {t.shop.clearAll}
                  </button>
                )}
              </div>

              {/* Sizes Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  {t.shop.size}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters((p) => ({ ...p, size: 'all' }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      filters.size === 'all'
                        ? 'bg-maroon-900 text-white'
                        : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
                    }`}
                  >
                    All
                  </button>
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setFilters((p) => ({ ...p, size }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        filters.size === size
                          ? 'bg-maroon-900 text-white'
                          : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  {t.shop.color}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters((p) => ({ ...p, color: 'all' }))}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      filters.color === 'all'
                        ? 'bg-maroon-900 text-white'
                        : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
                    }`}
                  >
                    All
                  </button>
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setFilters((p) => ({ ...p, color: c.name }))}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all ${
                        filters.color === c.name
                          ? 'ring-2 ring-maroon-800 font-bold bg-maroon-50'
                          : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                    Max Price: ₹{filters.priceRange[1].toLocaleString()}
                  </h4>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="50000"
                  step="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      priceRange: [p.priceRange[0], parseInt(e.target.value)],
                    }))
                  }
                  className="w-full accent-maroon-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-charcoal-400 mt-1">
                  <span>₹3,000</span>
                  <span>₹50,000+</span>
                </div>
              </div>

              {/* Stock Toggle */}
              <div className="pt-2 border-t border-ivory-200">
                <label className="flex items-center gap-2.5 text-xs text-charcoal-800 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onlyInStock}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, onlyInStock: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-maroon-800 accent-maroon-800 cursor-pointer"
                  />
                  <span>{t.shop.inStockOnly}</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {displayedProducts.length > 0 ? (
              <div className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="px-8 py-3.5 rounded-full bg-white hover:bg-maroon-900 hover:text-white text-maroon-900 border border-maroon-900 text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm"
                    >
                      Load More Pieces ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-ivory-200 shadow-subtle space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-700 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal-900">
                  {t.shop.noProducts}
                </h3>
                <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                  Try adjusting your filter criteria, resetting price parameters, or searching for other weave styles.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-maroon-900 text-ivory-50 text-xs font-semibold hover:bg-maroon-800 transition-colors shadow-sm"
                >
                  {t.shop.resetFilters}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 z-10 animate-slide-up">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-maroon-800" />
                  <h3 className="font-serif font-bold text-base text-charcoal-900">
                    {t.shop.filters}
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-ivory-100 text-charcoal-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sizes */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                  {t.shop.size}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilters((p) => ({ ...p, size: 'all' }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      filters.size === 'all'
                        ? 'bg-maroon-900 text-white'
                        : 'bg-ivory-100 text-charcoal-700'
                    }`}
                  >
                    All
                  </button>
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setFilters((p) => ({ ...p, size }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        filters.size === size
                          ? 'bg-maroon-900 text-white'
                          : 'bg-ivory-100 text-charcoal-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                  {t.shop.color}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() =>
                        setFilters((p) => ({
                          ...p,
                          color: p.color === c.name ? 'all' : c.name,
                        }))
                      }
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${
                        filters.color === c.name
                          ? 'ring-2 ring-maroon-800 font-bold bg-maroon-50'
                          : 'bg-ivory-100 text-charcoal-700'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div className="mt-6 pt-4 border-t border-ivory-200">
                <label className="flex items-center gap-2.5 text-xs text-charcoal-800 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onlyInStock}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, onlyInStock: e.target.checked }))
                    }
                    className="w-4 h-4 rounded text-maroon-800 accent-maroon-800"
                  />
                  <span>{t.shop.inStockOnly}</span>
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-ivory-200 space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 rounded-xl bg-maroon-900 text-white text-xs font-semibold tracking-wide shadow-sm"
              >
                Apply Filters ({filteredProducts.length} pieces)
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2.5 rounded-xl border border-charcoal-300 text-charcoal-700 text-xs font-semibold"
              >
                {t.shop.clearAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
