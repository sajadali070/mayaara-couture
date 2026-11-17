import React from 'react';
import { Award, MessageCircle, Scissors, Truck } from 'lucide-react';

export default function BrandPillars() {
  const pillars = [
    {
      icon: Award,
      title: 'Silk Mark Certified',
      description: 'Guaranteed 100% pure mulberry silk and authentic gold-silver zari certified by master weaving guilds.',
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Concierge',
      description: 'Order effortlessly via WhatsApp, request 1-on-1 video call tours, and consult our boutique stylists directly.',
    },
    {
      icon: Scissors,
      title: 'Bespoke Custom Tailoring',
      description: 'Custom necklines, padded blouse stitching, and fall-pico edging tailored to your exact measurements.',
    },
    {
      icon: Truck,
      title: 'Complimentary Express Delivery',
      description: 'Free doorstep shipping across India, with secure insured international air freight to 40+ countries.',
    },
  ];

  return (
    <section className="py-12 bg-ivory-100/60 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-ivory-200/80 hover:border-gold-500/40 hover:shadow-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-700 flex items-center justify-center mb-4 group-hover:bg-maroon-900 group-hover:text-gold-400 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-charcoal-900 mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
