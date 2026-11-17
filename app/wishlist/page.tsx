'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useTranslation } from '@/lib/i18n/context';
import { formatCurrency, generateProductWhatsAppUrl } from '@/lib/whatsapp';
import { getProductById } from '@/lib/products';
import SectionHeading from '@/components/common/SectionHeading';
import {
  Heart,
  ShoppingBag,
  Trash2,
  MessageCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((s) => s.addItem);
  const { t } = useTranslation();

  const handleMoveToCart = (productId: string) => {
    const fullProduct = getProductById(productId);
    if (fullProduct) {
      addItemToCart(
        fullProduct,
        fullProduct.sizes[0],
        fullProduct.colors[0]?.name || 'Standard',
        1
      );
      removeItem(productId);
    }
  };

  const handleOrderWhatsApp = (productId: string) => {
    const fullProduct = getProductById(productId);
    if (fullProduct) {
      const url = generateProductWhatsAppUrl(
        fullProduct,
        fullProduct.sizes[0],
        fullProduct.colors[0]?.name || 'Standard'
      );
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Saved Pieces"
          title={t.wishlist.title}
          subtitle="Curate your dream bridal trousseau and festive wardrobe"
        />

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center max-w-xl mx-auto border border-ivory-200/80 shadow-subtle space-y-5">
            <div className="w-20 h-20 rounded-full bg-gold-500/10 text-gold-700 flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              {t.wishlist.emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
              {t.wishlist.emptySubtitle}
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-maroon-900 hover:bg-maroon-800 text-ivory-50 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-card"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                {items.length} saved garments
              </span>
              <button
                onClick={clearWishlist}
                className="text-xs text-charcoal-500 hover:text-red-700 transition-colors flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => {
                const effectivePrice = item.discountPrice || item.price;
                return (
                  <div
                    key={item.productId}
                    className="bg-white rounded-2xl overflow-hidden border border-ivory-200/80 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-100">
                        <Link href={`/shop/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover"
                          />
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-charcoal-600 hover:text-red-700 shadow-md transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-4">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-700">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-charcoal-900 line-clamp-1 mt-0.5 hover:text-maroon-800">
                          <Link href={`/shop/${item.slug}`}>{item.name}</Link>
                        </h4>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-base font-bold text-maroon-900">
                            {formatCurrency(effectivePrice)}
                          </span>
                          {item.discountPrice && (
                            <span className="text-xs text-charcoal-400 line-through">
                              {formatCurrency(item.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 space-y-2">
                      <button
                        type="button"
                        onClick={() => handleMoveToCart(item.productId)}
                        className="w-full py-2.5 px-3 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-ivory-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t.wishlist.moveToCart}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOrderWhatsApp(item.productId)}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>{t.wishlist.orderNow}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
