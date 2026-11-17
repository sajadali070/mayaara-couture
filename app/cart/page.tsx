'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/useCartStore';
import { useTranslation } from '@/lib/i18n/context';
import { formatCurrency, generateCartWhatsAppUrl } from '@/lib/whatsapp';
import SectionHeading from '@/components/common/SectionHeading';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore();
  const { t } = useTranslation();

  const [customerName, setCustomerName] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');

  const subtotal = getSubtotal();
  const freeShippingThreshold = 5000;
  const freeShippingDifference = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleWhatsAppCheckout = () => {
    const url = generateCartWhatsAppUrl(items, subtotal, customerName, deliveryCity);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Order Review"
          title={t.cart.title}
          subtitle="Your selected bespoke silhouettes and handloom weaves ready for checkout"
        />

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center max-w-xl mx-auto border border-ivory-200/80 shadow-subtle space-y-5">
            <div className="w-20 h-20 rounded-full bg-gold-500/10 text-gold-700 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              {t.cart.emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
              {t.cart.emptySubtitle}
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-maroon-900 hover:bg-maroon-800 text-ivory-50 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-card"
              >
                <span>{t.cart.continueShopping}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Items list */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Alert Bar */}
              <div className="bg-gold-500/10 border border-gold-500/20 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-charcoal-800 mb-2">
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
                <div className="w-full bg-ivory-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gold-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-ivory-200/80 shadow-subtle divide-y divide-ivory-200">
                <div className="flex items-center justify-between pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                    Product Details
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-charcoal-400 hover:text-red-700 transition-colors flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear Bag</span>
                  </button>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="py-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-ivory-200 shrink-0 border border-ivory-300">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/shop/${item.slug}`}
                          className="font-serif text-sm sm:text-base font-bold text-charcoal-900 hover:text-maroon-800 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-charcoal-500 mt-1">
                          <span>Size: <strong className="text-charcoal-800">{item.size}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-charcoal-800">{item.color}</strong></span>
                        </div>
                        <span className="text-xs font-mono text-charcoal-400 mt-0.5 block">
                          SKU: {item.sku}
                        </span>
                        <div className="sm:hidden mt-2 font-bold text-maroon-900 text-sm">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-ivory-300 rounded-xl bg-ivory-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-ivory-200 text-charcoal-700 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-charcoal-900 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-ivory-200 text-charcoal-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Line Price */}
                      <span className="hidden sm:inline-block font-serif text-base font-bold text-maroon-900 min-w-[100px] text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-charcoal-400 hover:text-red-700 p-2 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Order Summary & WhatsApp Checkout */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-200/80 shadow-subtle space-y-6 sticky top-28">
                <h3 className="font-serif text-lg font-bold text-charcoal-900 border-b border-ivory-200 pb-4">
                  Order Summary
                </h3>

                {/* Subtotal breakdown */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-charcoal-600">
                    <span>{t.cart.subtotal} ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                    <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-700">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Taxes</span>
                    <span className="font-semibold text-charcoal-900">Included</span>
                  </div>
                  <div className="pt-3 border-t border-ivory-200 flex justify-between text-base font-bold text-charcoal-900">
                    <span>{t.cart.estimatedTotal}</span>
                    <span className="font-serif text-xl text-maroon-900">{formatCurrency(subtotal)}</span>
                  </div>
                </div>

                {/* Optional Customer info to prefill into WhatsApp */}
                <div className="space-y-3 pt-2 border-t border-ivory-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-500">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Radhika Sundaram"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-xs text-charcoal-800 focus:outline-none focus:border-gold-500"
                  />

                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-500">
                    Delivery City & Pincode (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    placeholder="e.g. Chennai - 600017"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50 text-xs text-charcoal-800 focus:outline-none focus:border-gold-500"
                  />
                </div>

                {/* Primary WhatsApp Checkout Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-gold transition-all duration-300 transform active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{t.cart.checkoutWhatsApp}</span>
                </button>

                {/* Trust info */}
                <div className="space-y-2 pt-2 text-[11px] text-charcoal-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Orders verified personally by our boutique concierge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Payment via UPI / GPay / NetBanking on WhatsApp</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Link
                    href="/shop"
                    className="text-xs font-semibold text-maroon-800 hover:text-maroon-950 underline underline-offset-4"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
