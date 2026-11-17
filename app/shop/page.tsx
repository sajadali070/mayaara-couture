import { Suspense } from 'react';
import type { Metadata } from 'next';
import ShopCatalog from '@/components/shop/ShopCatalog';

export const metadata: Metadata = {
  title: 'Shop All Collections | Handloom Sarees, Kurtis & Bridal Lehengas',
  description:
    'Browse our curated collection of Kanchipuram silk sarees, designer kurtis, bridal lehengas, and contemporary Indo-Western dresses. Order directly on WhatsApp.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory-50 flex items-center justify-center p-8">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ShopCatalog />
    </Suspense>
  );
}
