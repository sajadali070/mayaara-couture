'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductSize } from '@/types';
import { useTranslation } from '@/lib/i18n/context';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { formatCurrency, generateProductWhatsAppUrl } from '@/lib/whatsapp';
import { Heart, ShoppingBag, MessageCircle, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { t, locale } = useTranslation();
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [isHovered, setIsHovered] = useState(false);

  const addItemToCart = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const effectivePrice = product.discountPrice || product.price;
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = generateProductWhatsAppUrl(product, selectedSize, selectedColor);
    window.open(url, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItemToCart(product, selectedSize, selectedColor, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const displayName = locale === 'ta' && product.nameTa ? product.nameTa : product.name;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-ivory-200/80 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-100">
          <Link href={`/shop/${product.slug}`} className="block w-full h-full">
            <Image
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.isNewArrival && (
              <span className="px-2.5 py-0.5 rounded-full bg-maroon-900 text-ivory-50 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {t.common.newArrival}
              </span>
            )}
            {product.isBestSeller && !product.isNewArrival && (
              <span className="px-2.5 py-0.5 rounded-full bg-gold-600 text-ivory-50 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {t.common.bestSeller}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-charcoal-900/90 text-gold-300 text-[10px] font-bold tracking-wider shadow-sm">
                {discountPercent}% {t.common.discount}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 shadow-md ${
              isWishlisted
                ? 'bg-maroon-800 text-white'
                : 'bg-white/90 text-charcoal-700 hover:text-maroon-800 hover:bg-white'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick Add Overlay on Hover for Desktop */}
          <div className="hidden lg:flex absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-2 px-3 rounded-xl bg-ivory-50 hover:bg-white text-maroon-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.common.addToCart}</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm"
              title="Order directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-charcoal-400 mb-1">
            <span className="uppercase tracking-wider font-medium text-gold-700">
              {product.category}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 text-charcoal-600 font-semibold">
                <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                <span>{product.rating}</span>
                <span className="text-charcoal-400">({product.reviewCount})</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm sm:text-base font-semibold text-charcoal-900 line-clamp-1 group-hover:text-maroon-800 transition-colors">
            <Link href={`/shop/${product.slug}`}>{displayName}</Link>
          </h3>

          {/* Fabric subtitle */}
          <p className="text-xs text-charcoal-500 line-clamp-1 mt-0.5">
            {product.fabric}
          </p>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base sm:text-lg font-bold text-maroon-900">
              {formatCurrency(effectivePrice)}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-charcoal-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Quick Sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-charcoal-400 font-medium mr-1">Sizes:</span>
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(size);
                  }}
                  className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                    selectedSize === size
                      ? 'border-maroon-800 bg-maroon-50 text-maroon-900 font-bold'
                      : 'border-ivory-200 text-charcoal-600 hover:border-charcoal-400'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] text-charcoal-400">+{product.sizes.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile action button (always visible on mobile) */}
      <div className="p-4 pt-0 lg:hidden flex items-center gap-2">
        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>Order on WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          className="p-2 rounded-xl border border-maroon-800 text-maroon-800 hover:bg-maroon-50 transition-colors"
          aria-label="Add to bag"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
