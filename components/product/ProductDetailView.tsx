'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductSize } from '@/types';
import { useTranslation } from '@/lib/i18n/context';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { formatCurrency, generateProductWhatsAppUrl } from '@/lib/whatsapp';
import SizeChartModal from '@/components/common/SizeChartModal';
import ProductCard from '@/components/common/ProductCard';
import SectionHeading from '@/components/common/SectionHeading';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Star,
  Ruler,
  Truck,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Award,
  Scissors,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { t, locale } = useTranslation();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  // Accordion open tabs
  const [openAccordion, setOpenAccordion] = useState<string>('fabric');

  const addItemToCart = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const effectivePrice = product.discountPrice || product.price;
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleWhatsAppOrder = () => {
    const url = generateProductWhatsAppUrl(product, selectedSize, selectedColor);
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    addItemToCart(product, selectedSize, selectedColor, 1);
  };

  const displayName = locale === 'ta' && product.nameTa ? product.nameTa : product.name;
  const displayDescription =
    locale === 'ta' && product.descriptionTa ? product.descriptionTa : product.description;
  const displayFabric = locale === 'ta' && product.fabricTa ? product.fabricTa : product.fabric;

  return (
    <div className="bg-ivory-50 min-h-screen py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-charcoal-400 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap"
        >
          <Link href="/" className="hover:text-maroon-800 transition-colors">
            {t.nav.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <Link href="/shop" className="hover:text-maroon-800 transition-colors">
            {t.nav.shop}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-maroon-800 capitalize transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-300" />
          <span className="text-charcoal-700 font-medium truncate max-w-xs">
            {displayName}
          </span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnail Rail */}
              {product.images.length > 1 && (
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] shrink-0 pb-2 md:pb-0 scrollbar-none">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                        selectedImageIdx === idx
                          ? 'border-maroon-900 shadow-md ring-2 ring-gold-500/40'
                          : 'border-ivory-300/80 hover:border-charcoal-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumb ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image with Zoom */}
              <div
                className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-ivory-100 border border-ivory-200/80 shadow-card cursor-crosshair group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={product.images[selectedImageIdx]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`object-cover object-top transition-transform duration-200 ${
                    isZoomed ? 'scale-150 origin-center' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        }
                      : undefined
                  }
                />

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                  {product.isNewArrival && (
                    <span className="px-3 py-1 rounded-full bg-maroon-900 text-ivory-50 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {t.common.newArrival}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="px-3 py-1 rounded-full bg-charcoal-900 text-gold-300 text-[10px] font-bold tracking-wider shadow-sm">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isWishlisted
                      ? 'bg-maroon-800 text-white'
                      : 'bg-white/90 text-charcoal-700 hover:text-maroon-800 hover:bg-white'
                  }`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-charcoal-400 mb-2">
                <span className="uppercase tracking-widest font-semibold text-gold-700">
                  {product.category}
                </span>
                <span className="font-mono text-charcoal-500">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 leading-tight">
                {displayName}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 5)
                            ? 'fill-gold-500 text-gold-500'
                            : 'text-ivory-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-charcoal-700">
                    {product.rating} / 5.0
                  </span>
                  <span className="text-xs text-charcoal-400">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>
              )}

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-ivory-200">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
                  {formatCurrency(effectivePrice)}
                </span>
                {product.discountPrice && (
                  <span className="text-base sm:text-lg text-charcoal-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-800 text-xs font-bold">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-charcoal-400 mt-1">
                Inclusive of all taxes • Complimentary insured shipping across India
              </p>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              {displayDescription}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-ivory-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-charcoal-700 uppercase tracking-wider">
                    {t.product.selectColor}:
                  </span>
                  <span className="font-semibold text-maroon-900">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === c.name
                          ? 'border-maroon-900 ring-2 ring-gold-500/50 scale-110'
                          : 'border-transparent hover:border-charcoal-400'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-ivory-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-charcoal-700 uppercase tracking-wider">
                    {t.product.selectSize}:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeChartOpen(true)}
                    className="flex items-center gap-1 text-gold-700 hover:text-maroon-900 font-semibold underline underline-offset-2 transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{t.product.sizeChart}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border-2 transition-all ${
                        selectedSize === size
                          ? 'border-maroon-900 bg-maroon-900 text-white shadow-sm'
                          : 'border-ivory-300 bg-white text-charcoal-700 hover:border-charcoal-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs: WhatsApp Primary + Add to Bag */}
            <div className="space-y-3 pt-4 border-t border-ivory-200">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-gold hover:shadow-xl transition-all duration-300 transform active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{t.common.orderOnWhatsApp}</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-ivory-100 border-2 border-maroon-900 text-maroon-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.common.addToCart}</span>
              </button>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="p-4 bg-gold-500/10 rounded-2xl border border-gold-500/20 space-y-2 text-xs text-charcoal-700">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-600 shrink-0" />
                <span><strong>Certified Silk Mark Weave:</strong> 100% verified pure silk</span>
              </div>
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-gold-600 shrink-0" />
                <span><strong>Custom Blouse Tailoring:</strong> Available upon WhatsApp request</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold-600 shrink-0" />
                <span><strong>Fast Dispatch:</strong> Dispatched in 24-48 hours via insured courier</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="border-t border-ivory-200 divide-y divide-ivory-200 pt-2">
              {/* Tab 1: Fabric & Craft */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-charcoal-800 hover:text-maroon-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-600" />
                    <span>{t.product.fabric}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-charcoal-500 transition-transform ${
                      openAccordion === 'fabric' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'fabric' && (
                  <div className="pb-4 text-xs text-charcoal-600 leading-relaxed space-y-2">
                    <p>{displayFabric}</p>
                    <p className="text-charcoal-500">
                      Crafted by traditional weavers adhering to centuries-old looms. Hand-finished edges and authentic temple motifs.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 2: Care Instructions */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-charcoal-800 hover:text-maroon-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-600" />
                    <span>{t.product.care}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-charcoal-500 transition-transform ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 text-xs text-charcoal-600 leading-relaxed">
                    <ul className="list-disc list-inside space-y-1">
                      {product.careInstructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tab 3: Delivery & Exchange */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'delivery' ? '' : 'delivery')
                  }
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-charcoal-800 hover:text-maroon-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gold-600" />
                    <span>Delivery & Boutique Exchange</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-charcoal-500 transition-transform ${
                      openAccordion === 'delivery' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'delivery' && (
                  <div className="pb-4 text-xs text-charcoal-600 leading-relaxed space-y-1.5">
                    <p>
                      <strong>Domestic Shipping:</strong> 3-5 business days across India. All shipments are insured and packed in rigid boutique gift boxes.
                    </p>
                    <p>
                      <strong>Exchange Guarantee:</strong> Hassle-free 7-day size or style exchange available on unworn pieces with tags intact.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Recommendation Rail */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-ivory-200">
            <SectionHeading
              badge="Handpicked Coordinates"
              title={t.product.relatedTitle}
              subtitle={t.product.relatedSubtitle}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />
    </div>
  );
}
