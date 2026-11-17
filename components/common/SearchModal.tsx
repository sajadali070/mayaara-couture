'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/context';
import { formatCurrency } from '@/lib/whatsapp';
import { products } from '@/lib/products';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t, locale } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live search filtering
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.nameTa && p.nameTa.toLowerCase().includes(q)) ||
        p.fabric.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
    setResults(matched.slice(0, 6));
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm animate-fade-in flex items-start justify-center pt-12 sm:pt-20 px-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-ivory-50 rounded-2xl shadow-2xl border border-gold-500/20 overflow-hidden z-10 animate-slide-up">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-ivory-200 px-4 py-3 sm:py-4">
          <Search className="w-5 h-5 text-gold-600 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.search}
            className="w-full bg-transparent px-3 text-base sm:text-lg text-charcoal-900 placeholder-charcoal-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-charcoal-400 hover:text-charcoal-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-ivory-200 text-charcoal-500 hover:text-charcoal-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Live Search Suggestions & Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-ivory-200/60">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400 mb-3">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Kanchipuram Silk', 'Bridal Lehenga', 'Chikankari Kurti', 'Organza Saree', 'Pre-Draped Gown'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setQuery(tag);
                    }}
                    className="px-3 py-1.5 rounded-full bg-ivory-200/70 hover:bg-gold-500/10 hover:text-maroon-800 text-xs text-charcoal-700 transition-all font-medium border border-transparent hover:border-gold-500/30"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                {results.length} garments found
              </p>
              {results.map((product) => {
                const effectivePrice = product.discountPrice || product.price;
                return (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-2 rounded-xl hover:bg-ivory-200/60 transition-colors group"
                  >
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-ivory-200 shrink-0 border border-ivory-300">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-charcoal-900 truncate group-hover:text-maroon-800 transition-colors">
                        {locale === 'ta' && product.nameTa ? product.nameTa : product.name}
                      </h4>
                      <p className="text-xs text-charcoal-500 truncate mt-0.5">
                        {product.fabric}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-maroon-900">
                          {formatCurrency(effectivePrice)}
                        </span>
                        {product.discountPrice && (
                          <span className="text-xs text-charcoal-400 line-through">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-maroon-800 group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full py-2.5 px-4 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-ivory-50 text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <span>View all results for &quot;{query}&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-charcoal-500">
              <p className="text-sm">No garments found matching &quot;{query}&quot;</p>
              <p className="text-xs text-charcoal-400 mt-1">
                Try searching for sarees, kurtis, lehengas, or pure silk.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
