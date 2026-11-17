'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/useCartStore';
import { useTranslation } from '@/lib/i18n/context';
import { formatCurrency, generateCartWhatsAppUrl } from '@/lib/whatsapp';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Truck,
  Sparkles,
} from 'lucide-react';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, getSubtotal } =
    useCartStore();
  const { t } = useTranslation();

  const subtotal = getSubtotal();
  const freeShippingThreshold = 5000;
  const freeShippingDifference = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    if (isDrawerOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  const handleWhatsAppCheckout = () => {
    const url = generateCartWhatsAppUrl(items, subtotal);
    window.open(url, '_blank');
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-50 shadow-2xl flex flex-col border-l border-gold-500/20 animate-slide-up">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-ivory-200 flex items-center justify-between bg-ivory-100/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-maroon-800" />
              <h2 className="font-serif text-lg font-bold text-charcoal-900">
                {t.cart.title}
              </h2>
              <span className="text-xs bg-maroon-900 text-ivory-50 px-2 py-0.5 rounded-full font-sans font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-charcoal-500 hover:text-charcoal-900 rounded-full hover:bg-ivory-200 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Bar */}
          <div className="px-5 py-3 bg-gold-500/10 border-b border-gold-500/20">
            <div className="flex items-center gap-2 text-xs font-medium text-charcoal-800 mb-1.5">
              <Truck className="w-4 h-4 text-gold-600 shrink-0" />
              <span>
                {freeShippingDifference === 0
                  ? t.cart.freeShippingUnlocked
                  : t.cart.freeShippingRemaining.replace(
                      '{amount}',
                      formatCurrency(freeShippingDifference)
                    )}
              </span>
            </div>
            <div className="w-full bg-ivory-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gold-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-ivory-200">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ivory-200/80 flex items-center justify-center text-charcoal-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal-900">
                    {t.cart.emptyTitle}
                  </h3>
                  <p className="text-xs text-charcoal-500 mt-1 max-w-xs mx-auto">
                    {t.cart.emptySubtitle}
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="px-6 py-2.5 rounded-full bg-maroon-900 text-ivory-50 text-xs font-semibold hover:bg-maroon-800 transition-colors tracking-wide flex items-center gap-2 shadow-sm"
                >
                  <span>{t.cart.continueShopping}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pt-3 first:pt-0">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-ivory-200 shrink-0 border border-ivory-300">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/shop/${item.slug}`}
                            onClick={closeDrawer}
                            className="text-xs sm:text-sm font-semibold text-charcoal-900 hover:text-maroon-800 line-clamp-2 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-charcoal-400 hover:text-red-700 transition-colors p-1"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[11px] text-charcoal-500 mt-1 flex items-center gap-2">
                          <span>Size: <strong className="text-charcoal-800">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-charcoal-800">{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-ivory-300 rounded-lg bg-ivory-100 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-ivory-200 text-charcoal-700 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-charcoal-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-ivory-200 text-charcoal-700 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs sm:text-sm font-bold text-maroon-900">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-ivory-200 bg-ivory-100/70 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-600 font-medium">{t.cart.subtotal}</span>
                <span className="font-serif text-lg font-bold text-maroon-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-charcoal-500 text-center">
                {t.cart.shippingNote}
              </p>

              {/* Primary WhatsApp Checkout CTA */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-gold transition-all duration-300 transform active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t.cart.checkoutWhatsApp}</span>
              </button>

              <div className="flex items-center justify-center gap-4 pt-1">
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="text-xs font-medium text-maroon-800 hover:text-maroon-950 underline underline-offset-4"
                >
                  View Full Cart Page
                </Link>
                <span className="text-charcoal-300">•</span>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="text-xs font-medium text-charcoal-600 hover:text-charcoal-900"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
