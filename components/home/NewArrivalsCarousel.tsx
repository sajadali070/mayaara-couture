'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/context';
import { getNewArrivals } from '@/lib/products';
import SectionHeading from '@/components/common/SectionHeading';
import ProductCard from '@/components/common/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function NewArrivalsCarousel() {
  const { t } = useTranslation();
  const products = getNewArrivals(4);

  return (
    <section className="py-16 sm:py-20 bg-ivory-50 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Fresh From Looms"
          title={t.home.newArrivalsTitle}
          subtitle={t.home.newArrivalsSubtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-maroon-900 text-maroon-900 hover:bg-maroon-900 hover:text-ivory-50 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
          >
            <span>{t.common.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
