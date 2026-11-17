'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/context';
import SectionHeading from '@/components/common/SectionHeading';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const reviews = [
    {
      name: 'Dr. Radhika Soundararajan',
      location: 'Mylapore, Chennai',
      garment: 'Kanchipuram Pure Zari Korvai Saree',
      rating: 5,
      review:
        'I ordered my muhurtham saree via their WhatsApp concierge. The team showed me the zari shine over high-definition video call and even customized the blouse tassels! The silk drape is simply royal and the pure gold zari has a magnificent heirloom warmth.',
    },
    {
      name: 'Ananya & Ashwin',
      location: 'Coimbatore, Tamil Nadu',
      garment: 'Royal Velvet Bridal Lehenga & Sherwani Stole',
      rating: 5,
      review:
        'Finding genuine zardozi craft in modern silhouettes can be so tough. Mayaara nailed the fitting on the first trial itself. Our guests couldn’t stop complimenting the intricate embroidery on the lehenga skirt!',
    },
    {
      name: 'Deepa Krishnan',
      location: 'Singapore (International Patron)',
      garment: 'Lucknowi Chikankari Anarkali & Tissue Saree',
      rating: 5,
      review:
        'Super easy checkout over WhatsApp! They answered all my measurement queries within minutes, packed everything in velvet bags, and DHL delivered it to Singapore in just 4 days. Absolutely in love with Mayaara!',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-ivory-100/60 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Boutique Reverence"
          title={t.home.testimonialsTitle}
          subtitle={t.home.testimonialsSubtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-subtle hover:shadow-card border border-ivory-200/80 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <Quote className="w-8 h-8 text-gold-500/30 mb-4" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic mb-6">
                  &quot;{rev.review}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-200/80">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif text-sm font-bold text-charcoal-900">
                    {rev.name}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <p className="text-[11px] text-charcoal-500 mt-0.5">{rev.location}</p>
                <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-700 text-[10px] font-semibold">
                  Wore: {rev.garment}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
