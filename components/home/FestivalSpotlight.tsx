'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/site.config';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export default function FestivalSpotlight() {
  const handleWhatsAppBooking = () => {
    const msg = 'Hello Mayaara Couture! I would like to reserve a personalized bridal trousseau consultation session.';
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-20 bg-maroon-900 text-ivory-50 relative overflow-hidden border-b border-maroon-950">
      {/* Decorative luxury background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Wedding & Festive Privileges</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Bespoke Bridal Trousseau & Heirloom Silks
            </h2>

            <p className="text-sm sm:text-base text-ivory-200/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Planning your dream wedding or milestone anniversary? Our senior master weavers and personal couturiers in Chennai hand-craft exclusive custom motifs, initials, and bespoke colorways for the bride, groom, and wedding party.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-gold transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 fill-charcoal-950" />
                <span>Book Bridal Appointment on WhatsApp</span>
              </button>

              <Link
                href="/shop?category=lehengas"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-ivory-200/40 hover:bg-white/10 text-ivory-100 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300"
              >
                <span>View Bridal Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-gold-500/30">
              <Image
                src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80"
                alt="Bridal Couture Heritage Velvet Lehenga"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
