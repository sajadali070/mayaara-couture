'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/context';
import { siteConfig } from '@/site.config';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { t } = useTranslation();

  const handleWhatsAppConsultation = () => {
    const message = 'Hello Mayaara Couture! I would like to book a WhatsApp video shopping consultation.';
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-ivory-50 py-10 md:py-16 lg:py-20 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-800 text-xs font-semibold tracking-wider uppercase animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>{siteConfig.tagline}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 tracking-tight leading-[1.15]">
              {t.home.heroTitle}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-charcoal-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.home.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-maroon-900 hover:bg-maroon-800 text-ivory-50 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <span>{t.home.shopCollection}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleWhatsAppConsultation}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-ivory-100 text-charcoal-800 border border-charcoal-300 hover:border-emerald-600 hover:text-emerald-800 text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>{t.home.whatsappStylist}</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-ivory-200/80 flex items-center justify-center lg:justify-start gap-6 text-xs text-charcoal-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Certified Pure Silk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gold-500" />
                <span>WhatsApp Ordering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-maroon-800" />
                <span>Worldwide Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                alt="Mayaara Couture Silk Saree Hero"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-400">
                    Bridal Legacy
                  </span>
                  <p className="font-serif text-lg font-bold">
                    Pure Kanchipuram Gold Korvai Zari
                  </p>
                </div>
              </div>
            </div>

            {/* Floating small badge */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-ivory-200 max-w-[200px] items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-serif font-bold text-sm shrink-0">
                100%
              </div>
              <div className="text-[11px] text-charcoal-700 leading-tight">
                <strong>Handwoven</strong> by master artisan looms
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
