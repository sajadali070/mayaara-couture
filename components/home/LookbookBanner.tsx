'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/context';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function LookbookBanner() {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-20 bg-ivory-50 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-charcoal-900 via-charcoal-950 to-maroon-950 rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 text-white relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-semibold tracking-widest uppercase">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Editorial Anthology</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory-50 leading-tight">
                {t.home.lookbookBannerTitle}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-ivory-200/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {t.home.lookbookBannerSubtitle}. Witness how our bridal ensembles, handloom drapes, and modern fusion co-ords come alive through cinematic photography.
              </p>
              <div className="pt-2">
                <Link
                  href="/lookbook"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-gold"
                >
                  <span>{t.home.exploreLookbook}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right photo preview */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-gold-500/20 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
                  alt="Banarasi Brocade Saree Lookbook"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-gold-500/20 transform rotate-2 hover:rotate-0 transition-transform duration-500 mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
                  alt="Indo Western Fusion Lookbook"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
